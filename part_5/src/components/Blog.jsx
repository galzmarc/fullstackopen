import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    handleLike(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    handleDelete(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </div>
      {visible &&
      <div>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes}
          <button onClick={addLike}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={deleteBlog}>Delete</button>
      </div>}
    </div> 
  )
}
export default Blog