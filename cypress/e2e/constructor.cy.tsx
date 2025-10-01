describe('тесты для конструктора', function() {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
    
    cy.setCookie('accessToken', 'test-access');
    window.localStorage.setItem('refreshToken', 'test-refresh');

    cy.visit('/');
    cy.wait('@getUser');
    cy.wait('@getIngredients');

  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  Cypress.Commands.add('getIngredientItem', () => {
    cy.get('[data-cy=ingredient-item]')
});

Cypress.Commands.add('getModal', () => {
    cy.get('[data-cy=modal]')
});

Cypress.Commands.add('getPrice', () => {
    cy.get('[data-cy="constructor-price"]')
});

  it('добавление булки и ингридиента из списка в конструктор', () => {
    const bun = "Краторная булка N-200i";
    const bunPrice = 1255;
    const ingredient = "Биокотлета из марсианской Магнолии";
    const ingredientPrice = 424;
    const totalPrice = bunPrice * 2 + ingredientPrice;
    cy.getIngredientItem().contains(bun).as('bunIngredient');
    cy.get('@bunIngredient').parent().find('button').click();
    cy.getPrice().should('contain', `${bunPrice * 2}`);
    cy.get('[data-cy=constructor-bun]').contains(`${bun} (верх)`).should('exist');
    cy.get('[data-cy=constructor-bun]').contains(`${bun} (низ)`).should('exist');
    cy.getIngredientItem().contains(bun).parent().find('.counter').should('contain.text', '2');

    cy.getIngredientItem().contains(ingredient).as('ingredient');
    cy.get('@ingredient').parent().find('button').click();
    cy.getPrice().should('contain', totalPrice);
    cy.get('[data-cy=constructor-item]').contains(ingredient).should('exist');
    cy.getIngredientItem().contains(ingredient).parent().find('.counter').should('contain.text', '1');
  });

describe('модальные окна ингредиентов', () => {

  it('открывает модалку ингредиента при клике', () => {
    const bun = "Краторная булка N-200i";
    cy.getIngredientItem().contains(bun).click();
    cy.getModal().should('exist');
    cy.getModal().contains(bun);
    cy.contains(bun).should('exist');
  });

  it('закрывает модалку по клику на крестик', () => {
    cy.getIngredientItem().first().click();
    cy.getModal().should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.getModal().should('not.exist');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.getIngredientItem().first().click();
    cy.getModal().should('exist');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.getModal().should('not.exist');
  });
});

  it('создаёт заказ', () => {
    const bun = "Краторная булка N-200i";
    const orderNumber = 123;

    cy.getIngredientItem().contains(bun).as('bunIngredient');
    cy.get('@bunIngredient').parent().find('button').click();

    cy.get('[data-cy=order-button]').click();

    cy.wait('@createOrder');

    cy.getModal().should('exist');
    cy.getModal().contains(orderNumber);

    cy.get('[data-cy=modal-close]').click();

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
    cy.getPrice().should('contain', '0');
  });

});
