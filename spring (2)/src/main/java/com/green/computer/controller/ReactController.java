package com.green.computer.controller;


import com.green.computer.dto.Member_ReactDTO;
import com.green.computer.dto.ReplyDTO;
import com.green.computer.entity.Member_React;
import com.green.computer.service.ReactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/react/*")
@Log4j2
@RequiredArgsConstructor
public class ReactController {

    private final ReactService reactService;

    @PostMapping( "/signup")
    public void register(Member_React memberReact){
        log.info(memberReact);
        Long rno = reactService.register(memberReact);
        System.out.println(rno+"테스트rno");
    }

    @ResponseBody
    @PostMapping("/test")
    public List<Member_ReactDTO> getList(){
        log.info("리스트");


        List<Member_ReactDTO> member_reactDTOList = reactService.getList();
        log.info(member_reactDTOList+"리스트 확인");
        return  member_reactDTOList;
    }


}
