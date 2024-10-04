import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('the form calls event handler with correct details when a new blog is created', async () => {
  const mockHandler = vi.fn()

  render(<CreateBlog handleCreateBlog={mockHandler} />)

  const user = userEvent.setup()

  // Simulate user input into the form fields
  const titleInput = screen.getByPlaceholderText('Enter title')
  const authorInput = screen.getByPlaceholderText('Enter author')
  const urlInput = screen.getByPlaceholderText('Enter URL')

  await user.type(titleInput, 'Test Blog Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'https://test-url.com')

  // Simulate form submission
  const createButton = screen.getByText('create')
  await user.click(createButton)

  // Assert that the mock handler was called with the correct details
  expect(mockHandler).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'https://test-url.com',
  })
})