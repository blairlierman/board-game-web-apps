export const openSettings = () =>
  cy.get('[aria-label="Open settings"]').click();

export const goBackToMainPage = () =>
  cy.get('[aria-label="Back to main page"]').click();

export const setInputValue = (selector: string, value: string | number) =>
  cy
    .get(selector)
    .invoke('val', String(value))
    .trigger('input')
    .trigger('change');

export const selectCharacter = (playerIndex: number, character: string) =>
  cy.get(`#playerCharacter${playerIndex}`).select(character);

export const getTotalText = () => cy.get('#totalAmount h3');
