import { screen, render } from '@testing-library/react'
import Navbar from './Navbar'

jest.mock('./Navbar.module.css', () => ({
  nav: 'mock-nav',
  container: 'mock-container',
  innerContainer: 'mock-innerContainer',
  mobileMenuContainer: 'mock-mobileMenuContainer',
}))

jest.mock('./MobileMenuButton.module.css', () => ({
  button: 'mock-button',
  icon: 'mock-icon',
}))

jest.mock('./NavbarMobile', () => () => <div>Mibile Navigation</div>)
jest.mock('./NavbarDesktop', () => () => <div>Desktop Navigation</div>)

describe('Mobile Menu Button render tests', () => {
  test('renders the DisclosureButton', () => {
    render(<Navbar />)
    const button = screen.getByRole('button', { name: /open main menu/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('mock-button')
  })
  test('Navbar Desktop renders correctly', () => {
    render(<Navbar />)
    expect(screen.getByText('Desktop Navigation')).toBeInTheDocument()
  })
})
