import React, { createContext, useState , useReducer} from 'react';

const initialState = {
  meals: [],
  favorites: [],
};

export const Store = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, meals: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>;
}
