const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  } 
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('the blog posts have an id field instead of _id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id, 'Expected blog post to have an id field')
  assert(!response.body[0]._id, 'Expected blog post not to have an _id field')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('a blog can be deleted', async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }

  let blogObject = new Blog(newBlog)
  let savedBlog = await blogObject.save()
  let initialBlogId = savedBlog._id.toString()

  const blogsAtStart = await Blog.find({})
  assert.strictEqual(blogsAtStart.length, 3)

  await api
    .delete(`/api/blogs/${initialBlogId}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})
  assert.strictEqual(blogsAtEnd.length, 2)

})

test('a blog\'s likes can be updated', async () => {
  const blog = new Blog({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0
  })

  const savedBlog = await blog.save()
  initialBlogId = savedBlog._id.toString()

  const newLikes = 5

  await api
    .put(`/api/blogs/${initialBlogId}`)
    .send({ likes: newLikes })
    .expect(200)

  const updatedBlog = await Blog.findById(initialBlogId)
  assert.strictEqual(updatedBlog.likes, newLikes)
})

after(async () => {
  await mongoose.connection.close()
})

