package com.green.computer.controller;


import com.green.computer.dto.ItemSearchDTO;
import com.green.computer.dto.MainItemDTO;
import com.green.computer.dto.MemberDTO;
import com.green.computer.entity.Member;
import com.green.computer.service.ItemService;
import com.green.computer.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@CrossOrigin("/*")
@RestController
@RequiredArgsConstructor
public class MainController {

    private final ItemService itemService;
    private final MemberService memberService;

    @GetMapping(value = {"/main" , "/main/{page}"}) //제품 페이지
    public ResponseEntity main(ItemSearchDTO itemSearchDTO, @PathVariable("page")Optional<Integer> page,HttpSession session){
        System.out.println("로그인된 사람:"+session.getAttribute("login"));
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 3);
        Page<MainItemDTO> items = itemService.getMainItemPage(itemSearchDTO, pageable);

        return new ResponseEntity(items, HttpStatus.OK);

    }

    @GetMapping(value = "/main/{page}/{size}") //메인 페이지 // 프론트단에서 무조건 page에 0을 넣어서 처리 메인화면에는 6개만 보여줄꺼임!
    public ResponseEntity mainHome(ItemSearchDTO itemSearchDTO, @PathVariable("page")Optional<Integer> page, @PathVariable("size") int size){

        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, size);
        Page<MainItemDTO> items = itemService.getMainItemPage(itemSearchDTO, pageable);

        return new ResponseEntity(items, HttpStatus.OK);

    }


    @GetMapping(value="/main2")
    public ResponseEntity<MemberDTO> main2(HttpSession session){
        System.out.println("로그인된 사람:"+session.getAttribute("login"));
        MemberDTO getmemberDTO = (MemberDTO) session.getAttribute("login");
        MemberDTO memberDTO = memberService.entityToDto(memberService.findByEmail(getmemberDTO.getEmail()));
        return new ResponseEntity<>(memberDTO,HttpStatus.OK);
    }

}
