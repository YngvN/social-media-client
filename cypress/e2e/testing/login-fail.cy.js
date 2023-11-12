describe('Invalid User Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('The user cannot submit the login form with invalid credentials.', () => {
    cy.wait(1000);
    cy.get('#btn-go-to-login').first().click();

    cy.get('#loginEmail').type('email@email.com');
    cy.get('#loginPassword').type('password');

    cy.get('#loginForm').submit();

    cy.get('#loginForm').should('be.visible');


  });
});
