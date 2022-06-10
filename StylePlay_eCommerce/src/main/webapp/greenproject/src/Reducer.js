import {
  ADD_TO_BASKET,
  DECREASE_FROM_BASKET,
  EMPTY_BASKET,
  GET_TOTAL,
  GET_USERDATA_FROM_BASKET,
  MODIFY_FROM_BASKET,
  REMOVE_FROM_BASKET,
} from "./products/constants/constants";

export const initialState = {
  basket: [],
  isCouponUsed: false,
  totalAmount: 0,
  totalItem: 0,
};

const reducer = (state = initialState, action) => {
  const product = action.item;
  console.log("state:", state);
  switch (action.type) {
    case ADD_TO_BASKET: {
      const exist = state.basket.find((x) => x.id === product.id);
      if (exist) {
        return {
          ...state,
          basket: [
            ...state.basket.map((x) =>
              x.id === product.id ? { ...x, count: x.count + 1 } : x
            ),
          ],
        };
      }
      return {
        ...state,
        basket: [...state.basket, { ...product, count: 1 }],
      };
    }

    case DECREASE_FROM_BASKET: {
      const exist = state.basket.find((x) => x.id === product.id);
      if (exist.count === 1) {
        return {
          ...state,
          basket: [...state.basket.filter((x) => x.id !== exist.id)],
        };
      } else {
        return {
          ...state,
          basket: [
            ...state.basket.map((x) =>
              x.id === product.id ? { ...x, count: x.count - 1 } : x
            ),
          ],
        };
      }
    }

    case MODIFY_FROM_BASKET: {
      return {
        ...state,
        basket: [
          ...state.basket.map((x) =>
            x.id === product.id ? { ...x, count: product.count } : x
          ),
        ],
      };
    }

    //   basket의 정보를 데이터 레이어 or 데이터 베이스에서 받는다  초기엔 빈배열
    //   그 basket에 action.item을 추가한다.
    case EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case GET_TOTAL:
      let { totalItem, totalAmount } = state.basket.reduce(
        (accum, curVal) => {
          let { price, count } = curVal;
          let updatedTotalAmount = price * count;
          accum.totalAmount += updatedTotalAmount;

          accum.totalItem += count;
          return accum;
        },
        {
          totalItem: 0,
          totalAmount: 0,
        }
      );
      return { ...state, totalAmount, totalItem, isCouponUsed: false };

    case GET_USERDATA_FROM_BASKET:
      const exist = state.basket.find((x) => x.id === product.id);
      if (exist) {
        return { ...state };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...product }],
        };
      }

    case REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === product.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          " (id: " + action.id + ")이 장바구니에 존재하지 않습니다 "
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
