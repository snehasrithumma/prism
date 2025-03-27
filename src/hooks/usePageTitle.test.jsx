import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import usePageTitle from './usePageTitle'

const MockCXomponent = ({ initailvalue }) => {
  const title = usePageTitle(initailvalue)
  return <div data-testid="page-title">{title}</div>
}

const renderWithRouter = (initialEntries, title) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          path="*"
          element={<MockCXomponent initailvalue={title} />}
        ></Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('test usepage Title return corrects data', () => {
  test('should set title as dashboard for root path', () => {
    renderWithRouter(['/'], 'Initial Value')
    expect(screen.getByTestId('page-title').textContent).toBe('Dashboard')
  })

  test('should set title as projects', () => {
    renderWithRouter(['/projects'], 'Initial Value')
    expect(screen.getByTestId('page-title').textContent).toBe('Projects')
  })

  test('should return default value page prism as title', () => {
    renderWithRouter(['/test'], 'Initial Value')
    // expect(screen.getByTestId('page-title').textContent).toBe('Page Prism')
    expect(screen.getByText('Page Prism')).toBeInTheDocument()
  })
})
