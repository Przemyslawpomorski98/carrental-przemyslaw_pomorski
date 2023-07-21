import search from '../../fixtures/selectors/search.json'
import list from '../../fixtures/selectors/list.json'
import confirmation from '../../fixtures/selectors/confirmation.json'
import order from '../../fixtures/selectors/orderFinalization.json'

Cypress.Commands.add('mockCarList', () => {
    cy.intercept('GET', '/', {
        fixture: 'mock_data/prepareCarList.html'
    }).as('prepareList')
})

Cypress.Commands.add('pickCarRandom', () => {
    // Spy requests for verification
    cy.intercept('GET', '/details/**').as('carDetails')
    cy.intercept('GET', '/rent/**').as('finalization')

    // Prepare blank array for order informations
    const orderInfo = []

    // Prepare future date in the correct format and push it to the array
    var date = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10)
    orderInfo.push(date)

    // Push country and city to the array
    cy.get(search.country.select).find('option:selected').then(($option) => {
        orderInfo.push($option.text())
    })
    cy.get(search.city.select).find('option:selected').then(($option) => {
        orderInfo.push($option.text())
    })

    // Pick a car and go next
    cy.get(list.carList).within(() => {
        cy.shouldHaveLengthGT(list.tableRow, 0)

        // Push columns names to the array
        cy.get('tbody > tr').first().find('td').each(($td) => {
            orderInfo.push($td.text())
        })

        cy.clickElemIndex(list.rentBtn, 0)
    })

    cy.wait('@carDetails').its('response.statusCode').should('eq', 200)
    cy.checkURL('details')

    // Validate order details and go next
    cy.shouldVisible(confirmation.infoContainer)
    cy.get(confirmation.infoContainer).within(() => {
        cy.shouldVisibleContainText(confirmation.header, orderInfo[4])
        cy.shouldVisibleHaveText(confirmation.company, 'Company: ' + orderInfo[3])
        cy.shouldVisibleHaveText(confirmation.pricePerDay, 'Price per day: ' + orderInfo[7])
        cy.shouldVisibleHaveText(confirmation.location, 'Location: ' + orderInfo[1] + ', ' + orderInfo[2])
        cy.shouldVisibleHaveText(confirmation.licensePlate, 'License plate: ' + orderInfo[5])
        cy.shouldVisibleHaveText(confirmation.pickup, ' Pickup date: ' + orderInfo[0])
        cy.shouldVisibleHaveText(confirmation.dropoff, ' Dropoff date: ' + orderInfo[0])

        cy.clickElem(confirmation.rentBtn)
    })

    cy.wait('@finalization').its('response.statusCode').should('eq', 200)
    cy.checkURL('rent')

    // Validate summary
    cy.get(order.summary.container).within(() => {
        cy.shouldVisibleHaveText(order.summary.title, ' Summary:')
        cy.shouldVisibleHaveText(order.summary.company, 'Company: ' + orderInfo[3])
        cy.shouldVisibleHaveText(order.summary.pricePerDay, 'Price per day: ' + orderInfo[7])
        cy.shouldVisibleHaveText(order.summary.location, 'Location: ' + orderInfo[1] + ', ' + orderInfo[2])
        cy.shouldVisibleHaveText(order.summary.licensePlate, 'License plate: ' + orderInfo[5])
        cy.shouldVisibleHaveText(order.summary.pickup, ' Pickup date: ' + orderInfo[0])
        cy.shouldVisibleHaveText(order.summary.dropoff, ' Dropoff date: ' + orderInfo[0])
    })
})