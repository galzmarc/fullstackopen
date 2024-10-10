describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', function() {
    cy.contains('Log in').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
    cy.contains('admin logged in')
  })

})