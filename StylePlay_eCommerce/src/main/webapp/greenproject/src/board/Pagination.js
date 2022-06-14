import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage,firstPage,lastPage }) => {
    const pageNumbers = [];
    const [lt,setLt] = useState("<");
    const [llt,setLlt] = useState("<<");
    const [rt,setRt] = useState(">");
    const [rrt,setRrt] = useState(">>");
    const [num,setNum] = useState(0);
    const [first,setFirst] = useState(true);
    const [isLoad,setIsLoad] = useState(false);
    const pageButton = useRef([]);
    const [page,setPage] = useState([10]);
    useEffect(()=>{
        if (isLoad)
            pageButton.current[0].style.backgroundColor='gray';
    },[isLoad])
    function handleClick(number){ // 선택된 페이지에 색깔 넣기

        if(pageButton.current[num].style.backgroundColor==='gray')
            pageButton.current[num].style.backgroundColor='white';

        // console.log("useRef():"+pageButton.current);
        // console.log(pageButton.current[0].style.backgroundColor);
        if(number-1===num) {
            if(!first){
                pageButton.current[number-1].style.backgroundColor='gray';
            }else{
                setFirst(!first);
                pageButton.current[num].style.backgroundColor='white';
                pageButton.current[number-1].style.backgroundColor='gray';
            }
        }else {
            if(!first) {
                pageButton.current[num].style.backgroundColor='white';
                pageButton.current[number-1].style.backgroundColor='gray';

            }else{
                setFirst(!first);
                pageButton.current[number-1].style.backgroundColor='gray';
            }
        }
        setNum(number-1);
    }
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    function isPagingPrev(){
        if (currentPage!==firstPage) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => {
                        paginate( currentPage - 1 )
                        pageButton.current[num].style.backgroundColor='white';
                        pageButton.current[num-1].style.backgroundColor="gray";
                        setNum(num-1);
                    }} tabIndex="-1">{lt}</a>
                </li>
            );
        }
    }
    function isPagingNext(){
        if (currentPage!==lastPage) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => {
                        paginate( currentPage+1 )
                        pageButton.current[num].style.backgroundColor='white';
                        pageButton.current[num+1].style.backgroundColor="gray";
                        setNum(num+1);
                    }} tabIndex="-1">{rt}</a>

                </li>
            );
        }
    }
    function isMoveToFirstPage() {
        if (currentPage !== firstPage) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => {
                        paginate(firstPage)
                        pageButton.current[num].style.backgroundColor='white';
                        pageButton.current[0].style.backgroundColor="gray";
                        setNum(0);
                    }}
                       tabIndex="-1">{llt} </a>
                </li>
            );
        }
    }
    function isMoveToLastPage() {
        if (currentPage !== lastPage) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => {
                        paginate(lastPage)
                        pageButton.current[num].style.backgroundColor='white';
                        pageButton.current[lastPage-1].style.backgroundColor="gray";
                        setNum(lastPage-1);
                    }} tabIndex="-1">{rrt} </a>
                </li>
            );
        }
    }
    return (
        <div style={{ marginBottom: "80px" ,textAlign:"center"}} >
            <div className ="row">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {
                            isMoveToFirstPage()
                        }
                        {
                            isPagingPrev()
                        }
                        {pageNumbers.map((number) => (
                            <div key={number} className="page-item">
                                <div onClick={() => {
                                    paginate(number)
                                    handleClick(number)
                                }} className={"page-link"} id={number} style={{backgroundColor:`white`}} ref={el =>(pageButton.current[number-1]=el)}>
                                    {number}
                                </div>
                                {
                                    (isLoad ? "" : setIsLoad(!isLoad))
                                }
                            </div>
                        ))}
                        {
                            isPagingNext()
                        }
                        {
                            isMoveToLastPage()
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Pagination;