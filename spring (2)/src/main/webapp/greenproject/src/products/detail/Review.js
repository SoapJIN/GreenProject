import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  createContext
} from "react";
import './Review.css';
import ReviewList from "./ReviewList";
import Check2 from "./Check";

export const ReviewStateContext = createContext(null);
export const ReviewDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();

      const newItem = {
        ...action.data,
        created_date
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              content: action.newContent
            }
          : it
      );
    }
    default:
      return state;
  }
};

const Review = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  const getData = async () => {
    setTimeout(async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      ).then((res) => res.json());

      const initData = res.slice(0, 5).map((it) => {
        return {
          author: it.email,
          content: it.body,
          rating: Math.floor(Math.random() * 5) + 1,
          created_date: new Date().getTime(),
          id: dataId.current++
        };
      });

      dispatch({ type: "INIT", data: initData });
    }, 2000);
  };
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, rating) => {
    dispatch({
      type: "CREATE",
      data: { author, content, rating, id: dataId.current }
    });
    dataId.current += 1;
  }, []);

  // 메모제이션된 콜백을 반환한다. 의존성 배열의 값이 변하지 않으면 함수를 계속 재사용 할 수 있게 하는 useCallback
  // useMemo랑 비슷하다고 생각 할 수 있는데 useMemo는 값을 반환하는거고 useCallback은 함수를 반환한다고 생각하면 편하다.
  // 이걸 왜 사용하냐면 chcek 컴포넌트에 값을 전달하는데 app 컴포넌트가 재 랜더링 될때마다 onCreate 함수가 재랜더링 되면
  // check 컴포넌트에 Context로 값을 계속 주므로 재 랜더링 되서 성능상으로 낭비가 발생한다.
  // 그러므로 onCreate에 메모제이션된 콜백을 반환하게 해서 재 랜더링을 방지한다.  
  // 재 사용 한다는 의미는 재 렌더링이 되더라도 메모제이션이 되있어서 특별한 렌더링 없이 다시 사용할 수 있다는 말이다.

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent
    });
  }, []);

  const memoizedDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.rating >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  // 함수를 기억하기 위해 useMemo 연산 최적화 한번만 실행하면 되니깐... 별점은 수정이 안되게 해놔서 별점은 고정되있으니깐!

  const { goodCount, badCount, goodRatio } = memoizedDiaryAnalysis;

  const store = {
    data
  };

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  return (
    <ReviewStateContext.Provider value={store}>
         <ReviewDispatchContext.Provider value={memoizedDispatch}>
              <div className="App">
                  
          <div>전체 리뷰 : {data.length}</div>
          <div>좋은 리뷰 평가 : {goodCount}</div>
          <div>나쁜 리뷰 평가 : {badCount}</div>
          <div>좋은 리뷰 비율 : {goodRatio}%</div>
                  <ReviewList></ReviewList>
                  <Check2></Check2>
        </div>
      </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider>
  );
};

export default Review;