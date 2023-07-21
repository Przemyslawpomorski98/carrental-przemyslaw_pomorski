// GENERAL ACTIONS

Cypress.Commands.add('clickElem', (selector) => {
    cy.get(selector).click()
})

Cypress.Commands.add('clickElemIndex', (selector, i) => {
    cy.get(selector).eq(i).click()
})

Cypress.Commands.add('typeData', (selector, data) => {
    cy.get(selector).type(data)
})

Cypress.Commands.add('selectOption', (selector, option) => {
    cy.get(selector).select(option)
})

Cypress.Commands.add('shouldVisible', (selector) => {
    cy.get(selector).should('be.visible')
})

Cypress.Commands.add('shouldVisibleHaveText', (selector, data) => {
    cy.get(selector).should('be.visible').and('have.text', data)
})

Cypress.Commands.add('shouldVisibleContainText', (selector, data) => {
    cy.get(selector).should('be.visible').and('contain.text', data)
})

Cypress.Commands.add('shouldVisibleHaveTextIndex', (i, selector, data) => {
    cy.get(selector).eq(i).should('be.visible').and('have.text', data)
})

Cypress.Commands.add('shouldHaveLengthGT', (selector, number) => {
    cy.get(selector).should('have.length.greaterThan', number)
})

Cypress.Commands.add('checkURL', (url) => {
    cy.url().should('include', '/' + url)
})