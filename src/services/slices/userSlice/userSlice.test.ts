import { setCookie } from "../../../utils/cookie";
import userReducer, { checkUserAuth, getUser, initialState, login, logout, registerUser, setIsAuthChecked, setUser, updateUser } from "./userSlice";


const mockUser = {
        email: "example@gmail.com",
        name: "Honey"
    };
const mockUpdatedUser = {
    email: "example2@gmail.com",
    name: "Lemon"
};

jest.mock("../../../utils/cookie", () => ({
  setCookie: jest.fn()
}));

beforeEach(() => {
  const store: Record<string, string> = {};
  global.localStorage = {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
    key: jest.fn(),
    length: Object.keys(store).length
  };
});

describe('userSliceTests', () => {
    describe('loginTests', () => {
        it('При вызове экшена login Request ошибка пустая и isAuthChecked - false', () => {
      const action = { type: login.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена login Success и передаче в него юзера эти данные записываются в стор и isAuthChecked меняется на true', () => {
      const action = {
        type: login.fulfilled.type,
        payload: {user: mockUser}
      };
      const state = userReducer(initialState, action);
      
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена login Failed и передаче в него ошибки она записывается в стор и isAuthChecked меняется на true', () => {
      const action = {
        type: login.rejected.type,
        error: {message: "Error"}
      };
      const state = userReducer(initialState, action);
      
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBeNull();
      expect(state.error).toBe("Error");
    });
    });

    describe('logoutTests', () => {
        it('При вызове экшена logout Request ошибка пустая', () => {
      const action = { type: logout.pending.type };
      const state = userReducer(initialState, action);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена logout Success юзер очищается и вызывается очистка localStorage и cookie', () => {
      const action = {
        type: logout.fulfilled.type
      };
      const state = userReducer(initialState, action);
      
      expect(localStorage.removeItem).toHaveBeenCalledWith("refreshToken");
      expect(setCookie).toHaveBeenCalledWith("accessToken", "", { expires: -1 });
      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
    });

    it('При вызове экшена logout Failed и передаче в него ошибки она записывается в стор', () => {
      const action = {
        type: logout.rejected.type,
        error: {message: "Error"}
      };
      const state = userReducer(initialState, action);

      expect(state.error).toBe("Error");
    });
    });

    describe('getUserTests', () => {
        it('При вызове экшена getUser Request ошибка пустая', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена getUser Success и передаче в него юзера эти данные записываются в стор и isAuthChecked меняется на true', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: {user: mockUser}
      };
      const state = userReducer(initialState, action);
      
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена getUser Failed и передаче в него ошибки она записывается в стор и isAuthChecked - true', () => {
      const action = {
        type: getUser.rejected.type,
        error: {message: "Error"}
      };
      const state = userReducer(initialState, action);
      
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe("Error");
    });
    });

        describe('registerUserTests', () => {
        it('При вызове экшена registerUser Request ошибка пустая', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена registerUser Success и передаче в него юзера эти данные записываются в стор и isAuthChecked меняется на true', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: {user: mockUser}
      };
      const state = userReducer(initialState, action);
      
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена registerUser Failed и передаче в него ошибки она записывается в стор и isAuthChecked - true', () => {
      const action = {
        type: registerUser.rejected.type,
        error: {message: "Error"}
      };
      const state = userReducer(initialState, action);
      
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe("Error");
    });
    });

    describe('updateUserTests', () => {
        it('При вызове экшена updateUser Request ошибка пустая', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена updateUser Success и передаче в него нового юзера эти данные записываются в стор', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: {user: mockUpdatedUser}
      };
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(mockUpdatedUser);
      expect(state.error).toBeNull();
    });

    it('При вызове экшена updateUser Failed и передаче в него ошибки она записывается в стор', () => {
      const action = {
        type: updateUser.rejected.type,
        error: {message: "Error"}
      };
      const state = userReducer(initialState, action);
  
      expect(state.error).toBe("Error");
    });
    });

it('setUser устанавливает пользователя', () => {
  const state = userReducer(initialState, setUser(mockUser));
  expect(state.user).toEqual(mockUser);
});

it('setIsAuthChecked меняет параметр isAuthChecked', () => {
  const state = userReducer(initialState, setIsAuthChecked(true));
  expect(state.isAuthChecked).toEqual(true);
});
  
});
