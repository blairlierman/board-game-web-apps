import {
  getTotalText,
  goBackToMainPage,
  openSettings,
  selectCharacter,
  setInputValue,
} from '../support/app.po';

describe('farming-game-calc-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().then((window) => {
      window.sessionStorage.clear();
    });
    cy.reload();
  });

  it('navigates to settings from toolbar and back to main page', () => {
    openSettings();

    cy.contains('Settings').should('be.visible');
    goBackToMainPage();
    cy.contains('Farming Game Net Asset Calculator').should('be.visible');
  });

  it('persists updated settings and reflects price changes on main page', () => {
    openSettings();

    setInputValue('input#hayPricePerAcre', 3000);
    setInputValue('input#playerCount', 3);
    selectCharacter(0, 'Satus Sam');
    selectCharacter(1, 'Toppenish Tom');
    selectCharacter(2, 'Roza Ray');

    cy.get('input#hayPricePerAcre').should('have.value', '3000');
    cy.get('input#playerCount').should('have.value', '3');

    goBackToMainPage();
    getTotalText().should('contain.text', '$50,000');

    openSettings();
    cy.reload();

    cy.get('input#hayPricePerAcre').should('have.value', '3000');
    cy.get('input#playerCount').should('have.value', '3');
    cy.get('#playerCharacter0 option:selected').should(
      'contain.text',
      'Satus Sam',
    );
    cy.get('#playerCharacter1 option:selected').should(
      'contain.text',
      'Toppenish Tom',
    );
    cy.get('#playerCharacter2 option:selected').should(
      'contain.text',
      'Roza Ray',
    );

    goBackToMainPage();
    getTotalText().should('contain.text', '$50,000');
  });
});
