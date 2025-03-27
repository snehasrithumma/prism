import { screen, render } from '@testing-library/react'
import MobileMenuButton from './MobileMenuButton'
import { Disclosure } from '@headlessui/react'

jest.mock('./MobileMenuButton.module.css', () => ({
  button: 'mock-button',
  icon: 'mock-icon',
}))

jest.mock('@heroicons/react/24/outline', () => ({
  Bars3Icon: () => <svg data-testid="bar-icon" />,
  XMarkIcon: () => <svg data-testid="mark-icon" />,
}))

describe('Mobile Menu Button', () => {
  test('renders correctly with mark icon when open is true', () => {
    render(
      <Disclosure>
        <MobileMenuButton open={true} />
      </Disclosure>
    )
    expect(screen.getByText('Open main menu')).toBeInTheDocument()
    expect(screen.getByTestId('mark-icon')).toBeInTheDocument()
  })

  test('renders corrrectly with bar icon when open is false', () => {
    render(
      <Disclosure>
        <MobileMenuButton open={false} />
      </Disclosure>
    )
    expect(screen.getByTestId('bar-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('mark-icon')).not.toBeInTheDocument()
  })
})
