import { useState } from 'react'

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title <input id="title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          author <input id="author" type="text" placeholder="Enter author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url <input type="text" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog