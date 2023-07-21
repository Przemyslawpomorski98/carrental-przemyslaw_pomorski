import order from '../../fixtures/selectors/orderFinalization.json'

Cypress.Commands.add('mockOrder', () => {
    cy.intercept('GET', '/', {
        fixture: 'mock_data/prepareOrder.html'
      }).as('prepareOrder')
})

Cypress.Commands.add('finalizeOrder', (name, lastname, card_number, email) => {
    // Spy request for verification
    cy.intercept('GET', '/success').as('isSuccess')

    // Fill in form
    cy.typeData(order.form.name, name)
    cy.typeData(order.form.lastName, lastname)
    cy.typeData(order.form.card, card_number)
    cy.typeData(order.form.email, email)

    cy.clickElem(order.form.rentBtn)

    // Check if order was successful
    cy.wait('@isSuccess').its('response.statusCode').should('eq', 200)
    cy.checkURL('success')
    cy.shouldVisibleHaveText(order.alert, 'Success')
})