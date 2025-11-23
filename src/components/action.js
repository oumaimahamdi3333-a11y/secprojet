export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  payload: id
});
