describe('тесты для конструктора', function() {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
    
    cy.setCookie('accessToken', 'test-access');
    window.localStorage.setItem('refreshToken', 'test-refresh');

    cy.visit('http://localhost:4000');
    cy.wait('@getUser');
    cy.wait('@getIngredients');

  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('добавление булки и ингридиента из списка в конструктор', () => {
    const bun = "Краторная булка N-200i";
    const bunPrice = 1255;
    const ingredient = "Биокотлета из марсианской Магнолии";
    const ingredientPrice = 424;
    const totalPrice = bunPrice * 2 + ingredientPrice;
    cy.get('[data-cy=ingredient-item]').contains(bun).as('bunIngredient');
    cy.get('@bunIngredient').parent().find('button').click();
    cy.get('[data-cy="constructor-price"]').should('contain', `${bunPrice * 2}`);
    cy.get('[data-cy=constructor-bun]').contains(`${bun} (верх)`).should('exist');
    cy.get('[data-cy=constructor-bun]').contains(`${bun} (низ)`).should('exist');
    cy.get('[data-cy=ingredient-item]').contains(bun).parent().find('.counter').should('contain.text', '2');

    cy.get('[data-cy=ingredient-item]').contains(ingredient).as('ingredient');
    cy.get('@ingredient').parent().find('button').click();
    cy.get('[data-cy="constructor-price"]').should('contain', totalPrice);
    cy.get('[data-cy=constructor-item]').contains(ingredient).should('exist');
    cy.get('[data-cy=ingredient-item]').contains(ingredient).parent().find('.counter').should('contain.text', '1');
  });

describe('модальные окна ингредиентов', () => {

  it('открывает модалку ингредиента при клике', () => {
    const bun = "Краторная булка N-200i";
    cy.get('[data-cy=ingredient-item]').contains(bun).click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains('Детали ингридиента');
    cy.contains(bun).should('exist');
  });

  it('закрывает модалку по клику на крестик', () => {
    cy.get('[data-cy=ingredient-item]').first().click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.get('[data-cy=ingredient-item]').first().click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

  it('создаёт заказ', () => {
    const bun = "Краторная булка N-200i";
    const orderNumber = 123;

    cy.get('[data-cy=ingredient-item]').contains(bun).as('bunIngredient');
    cy.get('@bunIngredient').parent().find('button').click();

    cy.get('[data-cy=order-button]').click();

    cy.wait('@createOrder');

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains(orderNumber);

    cy.get('[data-cy=modal-close]').click();

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
    cy.get('[data-cy="constructor-price"]').should('contain', '0');
  });

});
