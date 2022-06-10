import axios from "axios";

/**
 * @description 백엔드 데이터 가져오거나 수정!
 */

//cartItem 수량 업데이트 하기 - 버튼 수량증가!
export const updateCart_ADD = async (item, cartitemId) => {
  const response = await axios
    .patch(`/cartItem/${cartitemId}?count=${item.count + 1}`)
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
    });
  console.log("수량증가 완료!", response.data);
};

//cartItem 수량 업데이트 하기 - 버튼 수량감소!
export const updateCart_DECREASE = async (item, cartitemId) => {
  if (item.count === 1) {
    const response = await axios
      .delete(`/cartItem/${cartitemId}`)
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
      });
    console.log("삭제 완료!", response.data);
  } else {
    const response = await axios
      .patch(`/cartItem/${cartitemId}?count=${item.count - 1}`)
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
      });
    console.log("수량감소 완료!", response.data);
  }
};

//cartItem 수량 업데이트하기 - 입력 수정하기!
export const updateCart_MODIFY = async (cartitemId, count) => {
  const response = await axios
    .patch(`/cartItem/${cartitemId}?count=${count}`)
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
      if (error.response.status === 400) {
        alert("최소 1개 이상 담아주세요!");
      }
    });
  console.log("수량 입력 수정완료!", response.data);
};

//cartItem 바구니에서 삭제하기
export const updateCart_REMOVE = async (cartitemId) => {
  const response = await axios
    .delete(`/cartItem/${cartitemId}`)
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
    });
  console.log("삭제 완료!", response.data);
};
