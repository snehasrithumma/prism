import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import ProjectDetail from './ProjectDetail'
import { MemoryRouter } from 'react-router-dom'
import { deleteProject, getProject, updateProject } from '../services/project'
import Modal from './modal'

const mockProjectData = {
  name: 'Update Title',
  description: 'A new project 1 description',
  id: '51691f3a-733c-49c6-b2af-e85ead6f24d5',
  inspirations: [
    { id: 1, websiteMetadata: { title: 'test-inspirations', url: '/inspo' } },
    { id: 2, websiteMetadata: { url: '/inspirations-desktop' } },
  ],
}

jest.mock('../services/project', () => ({
  getProject: jest.fn(),
  deleteProject: jest.fn(),
  updateProject: jest.fn(),
}))

describe('Project details', () => {
  const renderDetails = (initialEntries) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <ProjectDetail />
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    getProject.mockResolvedValue(mockProjectData)
  })

  test('Project details loading correctly', async () => {
    renderDetails(['/projects/51691f3a-733c-49c6-b2af-e85ead6f24d5'])

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(
        screen.getByText('A new project 1 description')
      ).toBeInTheDocument()
    })
  })
  test('Should have inspirations', async () => {
    renderDetails(['/projects/51691f3a-733c-49c6-b2af-e85ead6f24d5'])
    await waitFor(() => {
      expect(screen.getByText('Inspirations')).toBeInTheDocument()
      expect(screen.getByText('test-inspirations')).toBeInTheDocument()
      expect(screen.getByText('/inspirations-desktop')).toBeInTheDocument()
    })
  })

  test('Should not have inspirations', async () => {
    const mockData1 = {
      name: 'Update Title',
      description: 'A new project 1 description',
      id: '516',
    }
    getProject.mockResolvedValue(mockData1)
    renderDetails(['/projects/516'])
    await waitFor(() => {
      expect(screen.getByText('Inspirations')).toBeInTheDocument()
      expect(screen.getByText('No inspirations added yet.')).toBeInTheDocument()
    })
  })
  test('Edit button should open dialog', async () => {
    renderDetails(['/projects/51691f3a-733c-49c6-b2af-e85ead6f24d5'])
    await waitFor(() => {
      const editButton = screen.getByText('Edit')
      fireEvent.click(editButton)
      expect(screen.queryByRole('dialog')).toBeInTheDocument()
      const closeButton = screen.getByText('X')
      fireEvent.click(closeButton)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
  test('save button updates project details', async () => {
    const handleSave = jest.fn()
    updateProject.mockResolvedValue({ ...mockProjectData, name: 'New Title' })
    renderDetails(['/projects/51691f3a-733c-49c6-b2af-e85ead6f24d5'])
    await waitFor(() => {
      expect(screen.getByText('Update Title')).toBeInTheDocument()
    })
    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const input = screen.getByLabelText(/title/i)
    fireEvent.change(input, { target: { value: 'New Title' } })
    const submitButton = screen.getByText('Submit')

    fireEvent.click(submitButton)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('New Title')).toBeInTheDocument()
    })
  })
})
