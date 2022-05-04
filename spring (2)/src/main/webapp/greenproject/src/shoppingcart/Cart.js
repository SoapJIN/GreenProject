import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import './cart.css';
import axios from "axios";


const Cart = () => {

    const [test, setTest] = useState("");


    useEffect(() => {
        // axios({
        //   method : 'GET',
        //   url : 'https://jsonplaceholder.typicode.com/photos',
        // }).then(response => setMessage(response.data)) 첫번째 방법

        // axios.get('https://jsonplaceholder.typicode.com/photos%27).then(response => setMessage(response.data));
        // 두번째 방법
        const fetchData = async () => {
            const response = await axios.post('/react/test');
            setTest(response.data);
        }
        fetchData();
        // 3번째 비동기 통신을 위한 방법
    },[])

    console.log(test);


    const item = useSelector(cart => cart.basket);
    console.log(item,"확인카트");

    console.log("여기는 장바구니 콤퍼넌트입니다.")
  return (
    <div className="checkout">
    <div className="checkout_left">
          <div>
                 <h2 className="checkout_title">   님의 장바구니 </h2>
                 {item.map((item,i) => (
                    <div key={i}>
                        <img src={item.image} alt=""/><br/>
                        {item.id} {item.title} {item.price}
                    </div>
                 ))}
              <div>

              </div>
             </div>
    </div>
</div>
  )
}

export default Cart