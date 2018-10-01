context('phptravels', () => {
    it('page displays correct title', () => {
        cy.visit('http://localhost:3000/')
        cy.get('h1')
            .should('contain', 'Air Quality Around the World!') 

    })
    it('page has a dropdown menus with the correct list of compounds', () => {
        cy.contains('Black Carbon')
        cy.contains('Carbon Monoxide')
        cy.contains('Nitrogen Dioxide')
        cy.contains('Ozone')
        cy.contains('Particulate matter less than 10 micrometers in diameter')
        cy.contains('Particulate matter less than 2.5 micrometers in diameter')
        cy.contains('Sulfur Dioxide')

    })
})