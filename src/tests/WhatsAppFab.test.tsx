import { render, screen } from '@testing-library/react'
import WhatsAppFab from '../components/WhatsAppFab/WhatsAppFab'
import { whatsappLink } from '../data/contact'

describe('WhatsAppFab', () => {
  it('enlaza a WhatsApp con el número del sitio', () => {
    render(<WhatsAppFab />)
    const link = screen.getByRole('link', { name: /escribir por whatsapp/i })

    expect(link).toHaveAttribute('href', whatsappLink())
  })

  it('abre el chat en una pestaña nueva sin acceso al opener', () => {
    render(<WhatsAppFab />)
    const link = screen.getByRole('link', { name: /escribir por whatsapp/i })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })

  it('oculta el ícono a los lectores de pantalla', () => {
    const { container } = render(<WhatsAppFab />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
