context('Testing my air quality app', () => {
    it('page displays proper title', () => {
        cy.visit('http://localhost:3000/?cities=&compounds=')
        cy.get('.title h1')
            .should('have.attr', 'src', './images/phptravels-logo.png')
    })  
    it('page displays logo at ./images/phptravels-logo.png', () => {
        cy.get('header img')
            .should('have.attr', 'src', './images/phptravels-logo.png')
    })  
})