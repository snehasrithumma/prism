import { screen, render } from '@testing-library/react'
import MobileNavigation from './MobileNavigation'
import { MemoryRouter, Route, Router } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'

jest.mock('./MobileNavigation.module.css', () => ({
  navigationContainer: 'mock-navigationContainer',
  navigationItem: 'mock-navigationItem',
  navigationItemCurrent: 'mock-navigationItemCurrent',
  navigationItemDefault: 'mock-navigationItemDefault',
}))

describe('Mobile Navigation Component', () => {
  test('Dashboard and Projects are rendered correctly', () => {
    const renderedComponet = (initialEntries) => {
      render(
        <MemoryRouter initialEntries={initialEntries}>
          <Disclosure>
            <MobileNavigation />
          </Disclosure>
        </MemoryRouter>
      )
    }
    renderedComponet(['/'])
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toHaveClass(
      'mock-navigationItemCurrent'
    )
    expect(screen.getByText('Dashboard')).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Projects')).not.toHaveClass(
      'mock-navigationItemCurrent'
    )
  })
})
