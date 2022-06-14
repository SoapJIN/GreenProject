import React, {useState} from "react";
import {BsSearch} from "react-icons/bs";

const Search=({search,searchType})=>{
    const [keyword,setKeyword] = useState("");
    const [keywordType,setKeywordType] = useState("tpc");
    const onChangeSearchSpace=(e)=>{
        setKeyword(e.target.value);
    }

    const onChangeKeywordType = (e) => {
        e.preventDefault();
        setKeywordType(e.target.value);
        console.log(e.target.value);
    }
    return(
        <div>
            <select placeholder="type"
                    onChange={onChangeKeywordType} defaultValue={keywordType} style={{border:"1px solid"}}>
                <option value="tpc">제목+내용</option>
                <option value="title">제목</option>
                <option value="contents">내용</option>
            </select>
            <input type="text" style={{borderRadius:"20px",marginLeft:"5px",border:"1px solid"}} placeholder=" 검색어를 입력하세요" onChange={(e)=>onChangeSearchSpace(e)}/>

                <div className="btn btn-outline-dark"
                      style={{borderRadius: "20px"}}
                      onClick={()=>{
                          search(keyword)
                          searchType(keywordType)
                      }}>
                    <BsSearch/>
                </div>


        </div>
    );
};
export default Search;