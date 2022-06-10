import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ListMember = () => {
  const [members, setMembers] = useState([]);

  function getAllMember() {
    axios.get("/member/list").then((response) => {
      console.log(response.data);
      setMembers(response.data);
    });
  }
  useEffect(() => {
    let result = getAllMember();
    console.log(result);
  }, []);
  return (
    <div className="container">
      <h2 className="text-center">회원 목록</h2>
      <Link to="/register" className="btn btn-primary mb-2">
        회원 추가
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Member Number</th>
            <th>Name</th>
            <th>Password</th>
            <th>EmailID</th>
            <th>Nickname</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.pwd}</td>
              <td>{member.email}</td>
              <td>{member.address}</td>
              <td>{member.nickname}</td>
              <td>{member.phone}</td>
              <td>
                <Link className="btn btn-info" to={`/edit-member/${member.id}`}>
                  수정
                </Link>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMember;
