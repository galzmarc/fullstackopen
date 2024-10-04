import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fecthBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      } catch (error) {
        console.log(error)
      }
    }
    fecthBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      console.log(error)
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('user')
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.createOne(blog)
      setSuccessMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setBlogs([...blogs, createdBlog])
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const returnedBlog = await blogService.updateOne(updatedBlog)
      setBlogs(blogs.map(b => (b.id === returnedBlog.id ? returnedBlog : b)))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteOne(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        {errorMessage &&
          <p style={{ color: 'red' }}>{errorMessage}</p>
        }
        <LoginForm handleLogin={handleLogin} />
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      {successMessage &&
        <p style={{ color: 'green' }}>{successMessage}</p>
      }
      <p>{user.name} logged in<button onClick={handleLogout}>log out</button></p>
      <Toggle buttonLabel='create new blog' ref={blogFormRef} >
        <CreateBlog handleCreateBlog={handleCreateBlog} />
      </Toggle>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
        )}
      </div>
    </>
  )
}

export default App