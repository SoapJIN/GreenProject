import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function Template(props) {
  return (
    <>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </>
  );
}
 // <뭐시기> 도망가 </뭐시기>
 // 뭐시기 안에 있는것들을 자식이라고 한다
 // 그거와 같이 콘텐츠 밑에 있는 콤포넌트들을 가져오기 위해 사용한다.
export default Template;
