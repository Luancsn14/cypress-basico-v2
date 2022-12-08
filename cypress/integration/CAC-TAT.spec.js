/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Luan')
        cy.get('#lastName').type('Castro')
        cy.get('#email').type('luan@email.com')
        cy.get('#phone').type('71999999999')
        cy.get('#open-text-area').type('Teste')

        cy.get('button[type="submit"]').click()

        cy.get('.success > strong').should('be.visible')
        
   })
})
