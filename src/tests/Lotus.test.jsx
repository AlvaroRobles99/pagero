import { render } from '@testing-library/react'
import Lotus from '../components/Lotus/Lotus'

describe('Lotus', () => {
  it('renderiza un SVG', () => {
    const { container } = render(<Lotus />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('usa el tamaño por defecto (48)', () => {
    const { container } = render(<Lotus />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('acepta un tamaño custom', () => {
    const { container } = render(<Lotus size={64} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '64')
    expect(svg).toHaveAttribute('height', '64')
  })
})
