Cypress._.times(10, function() {
  it('Testa a página da política de privacidade de forma independente', function() {    
    cy.visit('./src/privacy.html')

    cy.get('h1#title').should('have.text', 'CAC TAT - Política de privacidade')
  })
})