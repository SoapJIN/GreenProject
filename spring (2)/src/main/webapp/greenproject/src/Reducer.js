export const initialState = {
    basket :[]
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
      case "ADD_TO_BASKET": {
        return{
            ...state,
            basket : [...state.basket , action.item]
        }
      }
    //   basket의 정보를 데이터 레이어 or 데이터 베이스에서 받는다  초기엔 빈배열
    //   그 basket에 action.item을 추가한다.
    case 'EMPTY_BASKET':
        return {
            ...state,
            basket: []
        }

    case 'REMOVE_FROM_BASKET':
        console.log(state);
        console.log(action);

        const index = state.basket.findIndex(
            (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];

        if (index >= 0) {
            newBasket.splice(index, 1);

        } else {
            console.warn(
                ' (id: ' +
                action.id +
                ')이 장바구니에 존재하지 않습니다 '
            )
        }

        return {
            ...state,
            basket: newBasket
        }
        default:
            return state;

    }
}

  export default reducer;