/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.get('#firstName').type('Luan')
        cy.get('#lastName').type('Castro')
        cy.get('#email').type('luan@email.com')
        cy.get('#phone').type('71999999999')
        cy.get('#open-text-area').type(longText, { delay: 0 })

        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Luan')
        cy.get('#lastName').type('Castro')
        cy.get('#email').type('luan@emailcom')
        cy.get('#phone').type('71999999999')
        cy.get('#open-text-area').type('Teste')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Telefone permanece vazio ao ser preenchido com valor não numérico', function () {
        cy.get('#phone').type('abc!@').should('have.value', '')
    })

    it.only('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Luan')
        cy.get('#lastName').type('Castro')
        cy.get('#email').type('luan@email.com')
        cy.get('#open-text-area').type('Teste')

        cy.get('#phone-checkbox').check()

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

})
