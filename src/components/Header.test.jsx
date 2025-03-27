import { render, screen } from '@testing-library/react'
import Header from './Header'
jest.mock('./Header.module.css', () => ({
  header: 'mock-header',
  container: 'mock-container',
  title: 'mock-title',
}))

describe('Header Component test to check title', () => {
  test('renders the Header component without crashing', () => {
    render(<Header title="Test Title" />)
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toBeInTheDocument()
  })
  test('should have title', () => {
    render(<Header title="Hello" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  test('should have css applied correctly', () => {
    render(<Header title="Test Title" />)
    const banner = screen.getByRole('banner')
    expect(banner).toHaveClass('mock-header')

    const titleElement = screen.getByText('Test Title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass('mock-title')

    const containerElement = screen.getByText('Test Title').parentElement
    expect(containerElement).toHaveClass('mock-container')
  })
})
