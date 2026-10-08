import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import ServiceModal from '../components/ServiceModal/ServiceModal'
import { whatsappLink } from '../data/contact'

const service = {
  id: 'tarot-angelical',
  icon: '🔮',
  title: 'Tarot Angelical',
  description: 'Claridad sobre lo que estés atravesando.',
  fullDescription:
    'Primer párrafo del servicio.\n\nSegundo párrafo del servicio.',
}

function Harness() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir servicio</button>
      {open && <ServiceModal service={service} onClose={() => setOpen(false)} />}
    </>
  )
}

describe('ServiceModal', () => {
  it('renderiza el título y un párrafo por bloque de fullDescription', () => {
    render(<ServiceModal service={service} onClose={() => {}} />)
    expect(screen.getByText('Tarot Angelical')).toBeInTheDocument()
    expect(screen.getByText('Primer párrafo del servicio.')).toBeInTheDocument()
    expect(screen.getByText('Segundo párrafo del servicio.')).toBeInTheDocument()
  })

  it('se anuncia como diálogo modal con nombre accesible', () => {
    render(<ServiceModal service={service} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAccessibleName('Tarot Angelical')
  })

  it('se monta en document.body mediante un portal', () => {
    const { container } = render(<ServiceModal service={service} onClose={() => {}} />)
    expect(container).toBeEmptyDOMElement()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('enfoca el botón de cierre al abrir', () => {
    render(<ServiceModal service={service} onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Cerrar' })).toHaveFocus()
  })

  it('cierra con la tecla Escape', () => {
    const onClose = vi.fn()
    render(<ServiceModal service={service} onClose={onClose} />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('cierra al hacer click en el overlay', () => {
    const onClose = vi.fn()
    render(<ServiceModal service={service} onClose={onClose} />)
    const overlay = screen.getByRole('dialog').parentElement
    fireEvent.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('no cierra al hacer click dentro del modal', () => {
    const onClose = vi.fn()
    render(<ServiceModal service={service} onClose={onClose} />)
    fireEvent.click(screen.getByText('Tarot Angelical'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('encierra el foco: Tab desde el último focusable vuelve al primero', () => {
    render(<ServiceModal service={service} onClose={() => {}} />)
    const close = screen.getByRole('button', { name: 'Cerrar' })
    const cta = screen.getByRole('link')
    cta.focus()
    fireEvent.keyDown(window, { key: 'Tab' })
    expect(close).toHaveFocus()
  })

  it('encierra el foco: Shift+Tab desde el primero va al último', () => {
    render(<ServiceModal service={service} onClose={() => {}} />)
    const close = screen.getByRole('button', { name: 'Cerrar' })
    const cta = screen.getByRole('link')
    close.focus()
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true })
    expect(cta).toHaveFocus()
  })

  it('devuelve el foco al elemento que abrió el modal al cerrar', () => {
    render(<Harness />)
    const trigger = screen.getByRole('button', { name: 'Abrir servicio' })
    trigger.focus()
    fireEvent.click(trigger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('bloquea el scroll del body mientras está abierto y lo restaura al cerrar', () => {
    render(<Harness />)
    expect(document.body.style.overflow).toBe('')
    fireEvent.click(screen.getByRole('button', { name: 'Abrir servicio' }))
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(document.body.style.overflow).toBe('')
  })

  it('arma el CTA de WhatsApp con el título del servicio', () => {
    render(<ServiceModal service={service} onClose={() => {}} />)
    const cta = screen.getByRole('link', { name: /Consultar vía WhatsApp/ })
    expect(cta).toHaveAttribute(
      'href',
      whatsappLink('Hola Rocío, me interesa saber más sobre Tarot Angelical'),
    )
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
    expect(cta).toHaveAttribute('target', '_blank')
  })
})
