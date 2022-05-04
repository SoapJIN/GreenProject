import React, { useContext, useState } from "react";
import { ReviewStateContext } from "./Review";
import ReviewItem from "./ReviewItem";

const ReviewList = () => {

    const { data } = useContext(ReviewStateContext);


    const filterOptionList = [
    {
        value:"all", name : "전부다"
    },
    {
        value:"good", name : "좋은 리뷰만"
    },
    {
        value:"bad",name:"나쁜 리뷰만"
    }
]
    
    const ControlMenu = ({value,onChange,optionList}) => {
    return <select className='ControlMenu' value={value} onChange={(e)=> onChange(e.target.value)}>
        {optionList.map((it, idx) =>
            <option key={idx} value={it.value}>
                {it.name}
            </option>)
        }
    </select>
    }
    
    const [filter, setFilter] = useState("all");

    const filterCallBack = (item) => {
        if (filter === 'good') {
            return parseInt(item.rating) >= 3;
        }
        if (filter === 'bad') {
            return parseInt(item.rating) < 3;
        }
    }
        const getProcessedReviewList = () => {

        const copyList = JSON.parse(JSON.stringify(data)); // 제이슨 형태로 (문자열)로 싹 가져왔다가 parse를 하면 다시 복호화를 시켜줌 깊은 복사를 사용하기 위해

        const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
        return filteredList;
    }
    console.log(getProcessedReviewList())

  return (
        <div className="DiaryList_container">
      <h2>리뷰</h2>
          <h4>{data.length}개의 리뷰가 있습니다.</h4>

          <div>
        <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        {getProcessedReviewList().map((it, idx) => (
          <ReviewItem key={`Reviewitem_${it.id}`} {...it} />
        ))}
      </div>
    </div>
  )
}

export default ReviewList