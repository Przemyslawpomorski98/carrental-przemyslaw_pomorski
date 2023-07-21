import search from '../../fixtures/selectors/search.json'
import list from '../../fixtures/selectors/list.json'

Cypress.Commands.add('searchCar', (country, city, model) => {
    // Prepare future date in the correct format
    var date = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10)

    const columns = ['#', 'Company', 'Model', 'License plate', 'Price', 'Price per day', 'Action']
    
    // Spy request for verification
    cy.intercept('GET', '/?country=**').as('getCarList')

    // Fill in search form
    cy.selectOption(search.country.select, country)
    cy.selectOption(search.city.select, city)
    cy.typeData(search.model.input, model)
    cy.typeData(search.pickup.input, date)
    cy.typeData(search.dropoff.input, date)
    cy.clickElem(search.searchBtn)

    cy.wait('@getCarList').then(({request, response}) => {
        expect(response.statusCode).to.eq(200)
        expect(request.query).to.have.property("country")
        expect(request.query).to.have.property("city")
        expect(request.query).to.have.property("model", model)
        expect(request.query).to.have.property("pickup", date)
        expect(request.query).to.have.property("dropoff", date)
    })

    // Validate cars list
    cy.shouldVisible(list.carList)
    cy.get(list.carList).within(() => {
        cy.get(list.columnTitle).each(($th, i) => {
            cy.wrap($th).should('have.text', columns[i])
        })
    })
})