import { screen, render, fireEvent } from '@testing-library/react'
import Modal from './modal'

const mockProjectData = {
  name: ' Update Title',
  description: 'A new project 1 description',
  id: '51691f3a-733c-49c6-b2af-e85ead6f24d5',
}

describe('Modal tests', () => {
  test('Modal renders correctly when open is true', () => {
    render(<Modal project={mockProjectData} isOpen={true} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Edit Project')).toBeInTheDocument()
  })

  test('Should not render model when open is false', () => {
    render(<Modal project={mockProjectData} isOpen={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText(/edit project/i)).not.toBeInTheDocument()
  })

  test('Should close dialog on clicking x', () => {
    const handleClose = jest.fn()
    render(
      <Modal project={mockProjectData} isOpen={true} onClose={handleClose} />
    )
    expect(screen.getByText('Edit Project')).toBeInTheDocument()
    const closeButton = screen.getByText('X')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  test('calls onSave with the correct title and onClose after saving', () => {
    const handleSave = jest.fn()
    const handleClose = jest.fn()
    render(
      <Modal
        project={mockProjectData}
        isOpen={true}
        onSave={handleSave}
        onClose={handleClose}
      />
    )
    const input = screen.getByLabelText(/title/i)
    fireEvent.change(input, { target: { value: 'New Title' } })
    const submitButton = screen.getByText('Submit')

    fireEvent.click(submitButton)
    expect(handleSave).toHaveBeenCalledTimes(1)
    expect(handleClose).toHaveBeenCalledTimes(1)
    expect(handleSave).toHaveBeenCalledWith('New Title')
  })
})
