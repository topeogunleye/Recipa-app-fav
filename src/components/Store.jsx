import React, { createContext, useState } from 'react';

export const Store = createContext();

const initialState = {}

function reducer() {

}

export function StoreProvider(props) {
  return <Store.Provider value={'test'}>{props.children}</Store.Provider>
}