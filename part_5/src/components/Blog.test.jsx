import { render, screen } from '@testing-library/react'
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
