package com.green.computer.service;

import com.green.computer.dto.BoardDTO;
import com.green.computer.dto.Member_ReactDTO;
import com.green.computer.entity.Member_React;

import java.util.List;


public interface ReactService {


    Long register(Member_React memberReact); // 데이터 등록


    List<Member_ReactDTO> getList(); // 리스트로 뽑아오기


}
