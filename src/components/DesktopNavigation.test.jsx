import { screen, render, fireEvent } from '@testing-library/react'
import DesktopNavigation from './DesktopNavigation'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('Navigation checks', () => {
  const renderWithRouter = (initialEntries) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <DesktopNavigation />
      </MemoryRouter>
    )
  }
  test('Should have Dashboard and Projects', () => {
    renderWithRouter(['/projects'])
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toHaveClass('navItemCurrent')
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  test('Should have aria-current true for Dashboard', () => {
    renderWithRouter(['/'])
    const dashboard = screen.getByText('Dashboard')
    const projects = screen.getByText('Projects')
    // fireEvent.click(dashboard)
    expect(dashboard).toHaveClass('navItemCurrent')
    expect(dashboard).toHaveAttribute('aria-current', 'page')
    expect(projects).not.toHaveClass('navItemCurrent')
    expect(projects).not.toHaveAttribute('aria-current')
  })
})
