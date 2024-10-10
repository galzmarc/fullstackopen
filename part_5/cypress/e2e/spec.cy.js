describe('Blog app', function() {
  beforeEach(function() {
    // empty the db here
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create a user for the backend here
    // const user = {
    //   name: 'Test User',
    //   username: 'testuser',
    //   password: 'password'
    // }
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('admin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a test blog')
      cy.get('#author').type('cypress')
      cy.contains('create').click()
      cy.contains('a test blog by cypress')
    })
  })

})