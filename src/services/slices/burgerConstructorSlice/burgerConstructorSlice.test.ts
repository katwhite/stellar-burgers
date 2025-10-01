import { orderBurger } from "../orderSlice/orderSlice";
import burgerConstructorReducer, { addBun, addIngredient, initialState, moveDown, moveUp, removeIngredient } from "./burgerConstructorSlice";

const mockIngredients = [
  {
    _id: '1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '2',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '3',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];
const mockConstructorIngredients = [
  {
    id: '01',
    _id: '1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    id: '02',
    _id: '2',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

jest.mock('@reduxjs/toolkit', () => {
  const original = jest.requireActual('@reduxjs/toolkit');
  return {
    ...original,
    nanoid: jest.fn(() => '01')
  };
});

describe('burgerConstructorSliceTests', () => {
    it('При вызове экшена orderBurger Success конструктор очищается', () => {
      const action = {
        type: orderBurger.fulfilled.type
      };
      const state = burgerConstructorReducer(initialState, action);
      
      expect(state.ingredients).toEqual([]);
      expect(state.bun).toBeNull();
    });

    it('addBun добавляет булку', () => {
        const state = burgerConstructorReducer(initialState, addBun(mockIngredients[1]));
        expect(state.bun).toEqual(mockIngredients[1]);
    });

    it('addIngredient добавляет ингридиент', () => {
        const state = burgerConstructorReducer(initialState, addIngredient(mockIngredients[0]));
        expect(state.ingredients).toEqual([mockConstructorIngredients[0]]);
    });

    it('removeIngredient удаляет ингридиент', () => {
        const fullConstructorState = {...initialState, ingredients: mockConstructorIngredients}
        const state = burgerConstructorReducer(fullConstructorState, removeIngredient(mockConstructorIngredients[0]));
        expect(state.ingredients).toEqual([
  {
    id: '02',
    _id: '2',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
]);
    });

    it('moveUp перемещает ингридиент наверх', () => {
        const fullConstructorState = {...initialState, ingredients: mockConstructorIngredients}
        const state = burgerConstructorReducer(fullConstructorState, moveUp(1));
        expect(state.ingredients).toEqual([
        {
            id: '02',
            _id: '2',
            name: 'Соус с шипами Антарианского плоскоходца',
            type: 'sauce',
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
        },
        {
            id: '01',
            _id: '1',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
        ]);
    });

    it('moveDown перемещает ингридиент вниз', () => {
        const fullConstructorState = {...initialState, ingredients: mockConstructorIngredients}
        const state = burgerConstructorReducer(fullConstructorState, moveDown(0));
        expect(state.ingredients).toEqual([
        {
            id: '02',
            _id: '2',
            name: 'Соус с шипами Антарианского плоскоходца',
            type: 'sauce',
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
        },
        {
            id: '01',
            _id: '1',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
        ]);
    })

});
