package com.green.computer.controller;


import com.green.computer.entity.Member_React;
import com.green.computer.service.ReactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Log4j2
@RequiredArgsConstructor
public class ReactController {

    private final ReactService reactService;

    @PostMapping(value =  "/signup/new")
    public ResponseEntity register(@Valid Member_React memberReact, BindingResult bindingResult){
        log.info(memberReact);
        if(bindingResult.hasErrors()){ // 상품 등록시 필수 값이 없다면
            System.out.println("필수값 없음");
            return new ResponseEntity(HttpStatus.BAD_REQUEST); // 입력한 필수 값이 없으면 다시 이동하게 이건 강사님한테 물어봐야함 에러코드 400
        }
        try {
            Long mno = reactService.register(memberReact);
            System.out.println("============mno:"+mno);
        } catch (Exception e){
            return new ResponseEntity(HttpStatus.FORBIDDEN);  // 에러 발생시 다시 회원가입 페이지로 이동하게 에러코드 403
        }
        return new ResponseEntity(HttpStatus.OK);
    }

}
