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

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Castro')
    cy.get('#email').type('luan@email.com')
    cy.get('#open-text-area').type('Teste')

    cy.get('#phone-checkbox').check()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Luan')
      .should('have.value', 'Luan')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Castro')
      .should('have.value', 'Castro')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('luan@email.com')
      .should('have.value', 'luan@email.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('71999999999')
      .should('have.value', '71999999999')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('Teste')
      .should('have.value', 'Teste')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', function () {
    cy.get('select').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu valor', function () {
    cy.get('select').select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu índice', function () {
    cy.get('select').select(1)
      .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('be.checked', 'feedback')
  })

  it('Marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]').check()
      .should('be.checked')
      .last().uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', function () {
    cy.get('.field input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('.field input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('.field input[type="file"]')
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })


})
