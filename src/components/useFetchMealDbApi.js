import { useState, useEffect, useReducer, createContext } from 'react';
import axios from 'axios';

const initialData = {
  data: [],
  favorites: [],
};

export const Store = createContext(initialData);

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (meal) => meal !== action.payload
        ),
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useFetchMealDbApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchMeals = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchMeals();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default useFetchMealDbApi;

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialData);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
