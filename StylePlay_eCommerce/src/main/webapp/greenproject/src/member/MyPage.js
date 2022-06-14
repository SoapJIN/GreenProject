import axios from "axios";
import { useEffect, useState } from "react";
//import { ListGroup } from "react-bootstrap";

const MyPage = () => {
  const [success, setSuccess] = useState(false);
  const [member, setMember] = useState({});

  useEffect(() => {
    const getMember = async () => {
      try {
        const result = await axios.get("/member/mypage");
        console.log(result);
        setSuccess(true);
        setMember(result.data);
        //window.location.reload();
      } catch (error) {
        console.log("error", error);
      }
    };
    getMember();
    //window.location.reload();
  }, []);


  console.log(success);
  console.log("1빠따",member);

  return (
    <div>
      <div className="checkout ">
        <div className="checkout_left">
          <div>
            <h2 className="checkout_title text-3xl">
              {member.name}님의 마이페이지
            </h2>
          </div>
          <div className="m-11 ">
            <div>
              <label>이메일:</label>
              <input
                className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={member.email}
              ></input>
            </div>
            <div>
              <label>이름:</label>
              <input
                className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={member.name}
              ></input>
            </div>
            <div>
              <label>닉네임:</label>
              <input
                className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={member.nickname}
              ></input>
            </div>
            <div>
              <label>핸드폰번호:</label>
              <input
                className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={member.phone}
              ></input>
            </div>
            <div>
              <label>주소:</label>
              <input
                className="mt-1 ml-3 py-2 px-2 w-[310px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={member.address}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
