import { Then, When} from 'cypress-cucumber-preprocessor/steps'

When('Im on the main page', () => {
    cy.visit('')
})

Then('I can search for the car providing correct data', () => {
    cy.searchCar('France', 'Paris', 'Aygo')
})

Then('I can choose a car to rent', () => {
    cy.pickCarRandom()
})

Then('I can finalize the order', () => {
    cy.finalizeOrder('Tomek', 'Nowak', '123123123', 'tomek@mail.com')
})