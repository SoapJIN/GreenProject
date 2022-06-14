import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import BoardService from "../service/BoardService";
const CreateBoardComponent = () =>{
    const [type,setType] = useState('');
    const [title,setTitle] = useState('');
    const [contents,setContents] = useState('');
    const [memberNo,setMemberNo] = useState('');
    const [counts,setCounts] = useState(0);
    const [likes,setLikes] = useState(0);
    const [success , setSuccess] = useState(false);
    const [createdTime, setCreatedTime] = useState(new Date());
    // const [user, setUser] = useState({
    //     name: "",
    //     email: "",
    //     address: "",
    //     addressNumber: "",
    //     nickname: "",
    //     phone: "",
    // });

    const { bno } = useParams(); // URL의 파라미터를 얻어옴
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get("http://localhost:8080/main2");
    //         console.log("response_user:", response);
    //         setUser(response.data);
    //     };
    //     fetchData();
    // }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (bno === '_create') {
        await axios.post('http://localhost:8080/api/board',
            {
                type: type ,
                title:title,
                contents:contents,
                createdTime:createdTime,
                counts:counts,
                likes:likes
            },{})
            .then( response => {})
            .catch(function (error){
                if (error.response && error.status === 400) {}
                else if (error.response && error.status === 415) {}
                else {}
                console.log(error.config);
            });
        }else{
            axios.put( 'http://localhost:8080/api/board'+ "/" + bno,
                {
                    type: type ,
                    title:title,
                    contents:contents,
                    memberNo:memberNo,
                    createdTime:createdTime,
                    counts:counts,
                    likes:likes,
                },{})
                .then( response => {})
                .catch(function (error){
                    if (error.response && error.status === 400) {}
                    else if (error.response && error.status === 415) {}
                    else {}
                    console.log(error.config);
                });
        }
        setSuccess(true);
    }
    useEffect(()=>{
        if(bno ==='_create'){
            return
        }else{
            BoardService.getOneBoard(bno).then((res) => {
                let board = res.data;
                setType(board.type);
                setTitle(board.title);
                setContents(board.contents);
                setMemberNo(board.memberNo);
            });
        }
    },[])

    const onChangeType = (e) => {
        e.preventDefault();
        setType(e.target.value);
    }
    const onChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const onChangeContents = (e) => {
        e.preventDefault();
        setContents(e.target.value);
    }
        return (
            <div>
                {success ? (
                    <div>
                        {window.location.href='/board'}

                    </div>
                ):(
                <div className = "container" style={{ marginTop: "56px" }}>
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">게시글 작성</h3>
                            <div className = "card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className = "form-group" style={{marginBottom:"5px"}}>
                                        <label> Type </label>
                                        <select placeholder="type" name="type" className="form-control"
                                                value={type} onChange={onChangeType}>
                                            <option defaultValue="1" value="1">자유게시판</option>
                                        </select>
                                    </div>
                                    <div className = "form-group" style={{marginBottom:"5px"}}>
                                        <label> Title </label>
                                        <input type="text" placeholder="title" name="title" className="form-control"
                                               value={title} onChange={onChangeTitle}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Contents  </label>
                                        <textarea placeholder="contents" name="contents" className="form-control"
                                                  value={contents} onChange={onChangeContents}/>
                                    </div>
                                    <div style={{textAlign:"center"}}>
                                    <button className="btn btn-outline-dark" style={{marginRight:"-1px"}}>등록</button>
                                    <Link to="/board" className="btn btn-outline-dark" style={{marginLeft:"-1px"}} replace>
                                        취소
                                    </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>)}

            </div>
        );

}

export default CreateBoardComponent;