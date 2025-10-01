import orderReducer, {
  fetchOrder,
  fetchOrders,
  initialState,
  orderBurger
} from './orderSlice';

const mockOrders = [
  {
    _id: '1',
    status: 'done',
    name: 'order 1',
    createdAt: 'data',
    updatedAt: 'data2',
    number: '1',
    ingredients: ['bun1', 'ing1', 'bun2']
  },
  {
    _id: '2',
    status: 'cooking',
    name: 'order 2',
    createdAt: 'data3',
    updatedAt: 'data4',
    number: '2',
    ingredients: ['bun2', 'ing2', 'bun1']
  }
];

describe('ingredientsSliceTests', () => {
  describe('fetchOrderTests', () => {
    it('При вызове экшена fetchOrder Request isLoading меняется на true', () => {
      const action = { type: fetchOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена fetchOrder Success и передаче в него заказа эти данные записываются в стор и isLoading меняется на false', () => {
      const action = {
        type: fetchOrder.fulfilled.type,
        payload: mockOrders[1]
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.currentOrder).toEqual(mockOrders[1]);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена fetchOrder Failed и передаче в него ошибки она записывается в стор и isLoading меняется на false', () => {
      const action = {
        type: fetchOrder.rejected.type,
        error: { message: 'Error' }
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.currentOrder).toBeNull();
      expect(state.error).toBe('Error');
    });
  });

  describe('fetchOrdersTests', () => {
    it('При вызове экшена fetchOrders Request isLoading меняется на true', () => {
      const action = { type: fetchOrders.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.ordersLoading).toBe(true);
      expect(state.ordersError).toBeNull();
    });

    it('При вызове экшена fetchOrders Success и передаче в него заказов эти данные записываются в стор и isLoading меняется на false', () => {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = orderReducer(initialState, action);

      expect(state.ordersLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.ordersError).toBeNull();
    });

    it('При вызове экшена fetchOrders Failed и передаче в него ошибки она записывается в стор и isLoading меняется на false', () => {
      const action = {
        type: fetchOrders.rejected.type,
        error: { message: 'Error' }
      };
      const state = orderReducer(initialState, action);

      expect(state.ordersLoading).toBe(false);
      expect(state.orders).toEqual([]);
      expect(state.ordersError).toBe('Error');
    });
  });

  describe('orderBurgerTests', () => {
    it('При вызове экшена orderBurger Request isLoading меняется на true', () => {
      const action = { type: orderBurger.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.orderError).toBeNull();
    });

    it('При вызове экшена orderBurger Success и передаче в него заказа эти данные записываются в стор и isLoading меняется на false', () => {
      const action = {
        type: orderBurger.fulfilled.type,
        payload: { order: mockOrders[0] }
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrders[0]);
      expect(state.orderError).toBeNull();
    });

    it('При вызове экшена orderBurger Failed и передаче в него ошибки она записывается в стор и isLoading меняется на false', () => {
      const action = {
        type: orderBurger.rejected.type,
        error: { message: 'Error' }
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toBeNull();
      expect(state.orderError).toBe('Error');
    });
  });
});
