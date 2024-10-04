import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author but not details by default', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger Dijkstra',
    url: 'https://example.com',
    likes: 10,
    user: {
      name: 'Test User'
    }
  }

  // Render the component
  render(<Blog blog={blog} />)

  // Check that the title and author are visible
  const summaryElement = screen.getByTestId('blog-summary')
  expect(summaryElement).toHaveTextContent('Go To Statement Considered Harmful')
  expect(summaryElement).toHaveTextContent('Edsger Dijkstra')

  // Check that the blog details (url, likes) are not visible
  const detailsElement = screen.queryByTestId('blog-details')
  expect(detailsElement).toBeNull()
})

test('renders blog URL and likes when the "View" button is clicked', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger Dijkstra',
    url: 'https://example.com',
    likes: 10,
    user: {
      name: 'Test User'
    }
  }

  render(<Blog blog={blog} />)

  // Simulate clicking the "View" button using userEvent
  const button = screen.getByText('View')
  await userEvent.click(button)

  // Check that the blog URL and likes are displayed
  const detailsElement = screen.getByTestId('blog-details')
  expect(detailsElement).toHaveTextContent('https://example.com')
  expect(detailsElement).toHaveTextContent('Likes: 10')
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger Dijkstra',
    url: 'https://example.com',
    likes: 10,
    user: {
      name: 'Test User'
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()

  // First click the "View" button to reveal the Like button
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  // Now the Like button should be visible, click it twice
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Check that the handler was called twice
  expect(mockHandler.mock.calls).toHaveLength(2)
})