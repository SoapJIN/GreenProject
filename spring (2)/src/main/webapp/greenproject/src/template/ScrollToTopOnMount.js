import { useEffect } from "react";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
// 함수가 호출되면 useEffect  [] 의존성 빈배열 (시작할때 한번만 실행) 
// 함수가 호출되면 한번 스크롤이 (0,0)(x좌표 0, y좌표 0)으로 상태변화를 하기 위해 useEffect 처리
export default ScrollToTopOnMount;
