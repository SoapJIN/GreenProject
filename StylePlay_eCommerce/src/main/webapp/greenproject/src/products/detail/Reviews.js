import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {MdDelete, MdDeleteOutline} from "react-icons/md";
import Ratings from "react-ratings-declarative";

const iconPath =
    "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

const Reviews=()=>{
    const [reviews,setReviews] = useState([]);
    const [loading,setLoading] = useState(false);

    const [content,setContent] = useState("");
    const [createdTime,setCreatedTime] = useState(new Date());
    const [rating,setRating] = useState(0);
    const [success,setSuccess] = useState(false);

    const [state,setState] = useState([]);
    const [isClicked,setIsClicked] = useState([]);
    const [isHovering, setIsHovering] = useState([]);


    const [isEditNow,setIsEditNow] = useState(false);

    useEffect(()=>{
        async function reviewData() {
            await axios.get("http://localhost:8080/api/review")
                .then(res => {
                    setLoading(true);
                    console.log(res.data);
                    setReviews(res.data);

                    setState(Array(res.data.length).fill(false));
                    setIsClicked(res.data.map(i=>i.id));
                    setIsHovering(res.data.map(i=>i.id));

                    setLoading(false);

                    console.log(state);
                });
        }
        reviewData();
    },[])

    const onChangeContents = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const ReviewSubmit = async(e) => {
        if(rating!==0){
        e.preventDefault();
        await axios.post('http://localhost:8080/api/review',
            {
                content:content,
                createdTime:createdTime,
                rating:rating
            },{})
            .then( response => {})
            .catch(function (error){
                if (error.response && error.status === 400) {}
                else if (error.response && error.status === 415) {}
                else {}
                console.log(error.config);
            });
        setSuccess(true);
        }else{
            alert("별점이 선택되지 않았습니다.");
            return ;
        }
    }
    async function ReviewDelete(id) {
        if(window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            axios.delete("http://localhost:8080/api/review"+"/"+id).then( res => {
                if (res.status == 200) {
                    window.location.reload() /* 새로고침 */
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    }

    function changeRating(newRate) {
        setRating(newRate);
    }
    const ReviewHandleClick = (idx) => {
        setState(state.map((element,index)=>{
            return isClicked[index] === idx ? !element : element;
        }))
    };

    const ReviewHandleHover = (idx) => {
        setState(state.map((element,index)=>{
            return isHovering[index] === idx ? !element : element;
        }))
    }
    return(
        <div>
            {success ? (
                <div>
                    {window.location.reload() /* 새로고침 */}
                </div>
            ):(
        <div>
        <form onSubmit={ReviewSubmit}>

            <div style={{width:"100%", height:"150px",display:"inline-block"}}>
                <div style={{width:"95%",display:"inline-block",textAlign:"center"}}>
                    <h3>리뷰({reviews.length})</h3>
                    <Ratings
                        rating={rating}
                        widgetRatedColors="rgb(253, 204, 13)"
                        changeRating={changeRating}
                        widgetSpacings="2px"
                    >
                        {Array.from({ length: 5 }, (_, i) => {
                            return (
                                <Ratings.Widget
                                    key={i}
                                    widgetDimension="20px"
                                    svgIconViewBox="0 0 19 20"
                                    svgIconPath={iconPath}
                                    widgetHoverColor="rgb(253, 204, 13)"
                                />
                            );
                        })}
                    </Ratings>
                    <div style={{}}>
                        <textarea placeholder="comments" className="form-control"
                                  value={content} onChange={onChangeContents} style={{float:"left",width:"89%",zIndex:"2",position:"relative"}}/>
                    <button className="btn btn-outline-dark" style={{float : "right",width:"11%",height:"60px"}}>등록</button>
                    </div>
                </div>
            </div>
            <hr/>
        </form>
            {loading ? "" :
                <div style={{zIndex:"1",position:"relative",overflow:"auto",height:"400px"}}>
                    {reviews.map((review,index) => (
                        <div key={review.id}>
                            <div className="DiaryItem_container">
                                <div className="info">
                                    <span className="author_info">
                                        | 작성자 : {review.author} | 별점 : <Ratings
                                        rating={review.rating}
                                        widgetRatedColors="rgb(253, 204, 13)"
                                        widgetSpacings="2px"
                                    >
                        {Array.from({ length: 5 }, (_, i) => {
                            return (
                                <Ratings.Widget
                                    key={i}
                                    widgetDimension="20px"
                                    svgIconViewBox="0 0 19 20"
                                    svgIconPath={iconPath}
                                    widgetHoverColor="rgb(253, 204, 13)"
                                />
                            );
                        })}
                    </Ratings> |
                                        <div style={{margin:"0 auto"}}>

                                        {
                                            state[index] ?
                                                <MdDelete style={{float:"right",cursor:"pointer"}}
                                                          onMouseLeave={()=>ReviewHandleHover(review.id)}
                                                               onClick={()=>{
                                                                   ReviewHandleClick(review.id)
                                                                   if(state[index]) return ReviewDelete(review.id);
                                                               }}
                                                />
                                                : <MdDeleteOutline style={{float:"right",cursor:"pointer"}}  onMouseEnter={()=>ReviewHandleHover(review.id)} ></MdDeleteOutline>
                                        }
                                        </div>

                                    </span>
                                    <br />
                                    <span className="date">{review.createdTime.split("T")[0]}</span>
                                </div>
                                <div className="content" style={{wordBreak:"break-all"}}>
                                    {review.content}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>}
        </div>
    )}
        </div>
    );
};
export default Reviews;