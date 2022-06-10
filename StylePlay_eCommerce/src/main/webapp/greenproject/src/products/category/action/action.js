import { CLEAR_FILTER, FILTER_DATA, GET_DATA, SEARCH_ITEMS, SORT_DATA } from "../../../redux/filter_constants";



export const getData = (cate_id,data) => {
  return{
    type: GET_DATA,
    payload: {
      cate_id,data
    },
  }
};

export const sortData = (payload) => ({
  type: SORT_DATA,
  payload,
});

export const filterData = (payload) => ({
  type: FILTER_DATA,
  payload,
});

export const clearFilter = () => ({
  type: CLEAR_FILTER,
});

export const searchItem = (payload,data) => ({
  type: SEARCH_ITEMS,
  payload: data[payload],
});