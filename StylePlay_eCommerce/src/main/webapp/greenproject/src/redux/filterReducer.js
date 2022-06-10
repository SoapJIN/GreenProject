import {
  CLEAR_FILTER,
  FILTER_DATA,
  GET_DATA,
  SEARCH_ITEMS,
  SORT_DATA,
} from "./filter_constants";

const initState = {
  data: [],
  filterData: [],

  searchData: [],
};

export const filterReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_DATA:
      var items = payload.data;
      var newdata;
      items.forEach((x) => {
        if (payload.cate_id === "all" || payload.cate_id === undefined) {
          newdata = items;
        } else if (payload.cate_id === x.itemType) {
          newdata = items.filter((item) => item.itemType === payload.cate_id);
        }
      });
      return {
        ...state,
        data: newdata,
      };
    case SORT_DATA:
      return {
        ...state,
        data: state.data.sort((a, b) => {
          if (payload === "l2h") {
            return Number(a.price) - Number(b.price);
          } else {
            return Number(b.price) - Number(a.price);
          }
        }),
      };
    case FILTER_DATA:
      return {
        ...state,
        filterData: state.data.filter((item) => {
          return +item.price < +payload;
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filterData: [],
      };
    case SEARCH_ITEMS:
      return {
        ...state,
        searchData: payload,
      };
    default:
      return state;
  }
};
