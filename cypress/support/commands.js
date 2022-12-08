Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Castro')
    cy.get('#email').type('luan@email.com')
    cy.get('#phone').type('71999999999')
    cy.get('#open-text-area').type('Teste')

    cy.get('button[type="submit"]').click()
})
