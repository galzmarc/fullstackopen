import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fecthBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setErrorMessage('Wrong credentials')
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
    try {
      const createdBlog = await blogService.createOne(blog)
      setSuccessMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setBlogs([...blogs, createdBlog]);
    } catch (error) {
      console.log(error)
    }
  }

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        {errorMessage &&
          <p style={{color: 'red'}}>{errorMessage}</p>
        }
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername}
          password={password} 
          setPassword={setPassword}
        />
      </>
    )
  }
  
  return (
    <>
      <h2>blogs</h2>
      {successMessage && 
        <p style={{color: 'green'}}>{successMessage}</p>
      }
      <div>
        <p>{user.name} logged in<button onClick={handleLogout}>log out</button></p>
        <CreateBlog handleCreateBlog={handleCreateBlog} />
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default App