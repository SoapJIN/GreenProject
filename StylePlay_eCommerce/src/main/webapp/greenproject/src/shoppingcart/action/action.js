import {
  ADD_TO_BASKET,
  DECREASE_FROM_BASKET,
  EMPTY_BASKET,
  GET_USERDATA_FROM_BASKET,
  MODIFY_FROM_BASKET,
  REMOVE_FROM_BASKET,
} from "../../redux/cart_constants";

export const addCart = (id, title, price, image) => {
  return {
    type: ADD_TO_BASKET,
    item: { id, title, price, image },
  };
};

//cart에 item 개수 감소!
export const decCart = (id) => {
  return {
    type: DECREASE_FROM_BASKET,
    item: { id },
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_BASKET,
  };
};

export const modifyCart = (id, count) => {
  return {
    type: MODIFY_FROM_BASKET,
    item: { id, count },
  };
};

export const deleteCart = (id) => {
  return {
    type: REMOVE_FROM_BASKET,
    item: { id },
  };
};

export const getUserCart = (id, title, price, image, count) => {
  return {
    type: GET_USERDATA_FROM_BASKET,
    item: { id, title, price, image, count },
  };
};
