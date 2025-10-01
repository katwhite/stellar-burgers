import feedReducer, { fetchFeed, initialState } from './feedSlice';

const mockFeed = [
  {
    orders: [
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
    ],
    total: 2,
    totalToday: 2
  }
];

describe('feedSliceTests', () => {
  it('При вызове экшена Request isLoading меняется на true', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('При вызове экшена Success и передаче в него заказов эти данные записываются в стор и isLoading меняется на false', () => {
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: mockFeed
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ordersData).toEqual(mockFeed);
    expect(state.error).toBeNull();
  });

  it('При вызове экшена Failed и передаче в него ошибки она записывается в стор и isLoading меняется на false', () => {
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ordersData).toEqual(initialState.ordersData);
    expect(state.error).toBe('Error');
  });
});
