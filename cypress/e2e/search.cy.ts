describe('home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('search a pokemon', () => {
    cy.get('#search').type('bulb');
    cy.get('[data-test=pokemon-card]').should('have.text', 'Bulbasaur')
  });
});
