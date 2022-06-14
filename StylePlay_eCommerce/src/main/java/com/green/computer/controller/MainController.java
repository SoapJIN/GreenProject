package com.green.computer.controller;


import com.green.computer.dto.ItemSearchDTO;
import com.green.computer.dto.MainItemDTO;
import com.green.computer.dto.MemberDTO;
import com.green.computer.entity.Member;
import com.green.computer.service.ItemService;
import com.green.computer.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
import java.util.*;

@CrossOrigin("/*")
@RestController
@RequiredArgsConstructor
@Log4j2
public class MainController {

    private final ItemService itemService;
    private final MemberService memberService;

    //제품 페이지
    @GetMapping(value = {"/main" , "/main/{page}","/main/{page}/{startPrice}/{endPrice}/{filterName}/{searchName}"})
    public ResponseEntity main(ItemSearchDTO itemSearchDTO, @PathVariable("page")Optional<Integer> page
            , @PathVariable("startPrice") Integer startPrice
            , @PathVariable("endPrice") Integer endPrice
            , @PathVariable("filterName") String filterName
            , @PathVariable("searchName") String searchName
    ) {
        System.out.println("main----------itemSearchDTO:" + itemSearchDTO
                + " page:" + page + " startPrice:" + startPrice
                + " endPrice:" + endPrice + " filterName:" + filterName
                +" searchName:"+searchName);
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 6);
            if (filterName.equals("all") || filterName.equals("undefined")) {
                Page<MainItemDTO> items = itemService.getMainItemPage(itemSearchDTO, pageable, startPrice, endPrice, null,searchName);
                log.info(items.getTotalElements());
                return new ResponseEntity(items, HttpStatus.OK);
            } else  {
                Page<MainItemDTO> items = itemService.getMainItemPage(itemSearchDTO, pageable, startPrice, endPrice, filterName,searchName);
                log.info(items.getTotalElements());
                return new ResponseEntity(items, HttpStatus.OK);
        }
    }

    //메인 페이지 // 프론트단에서 무조건 page에 0을 넣어서 처리 메인화면에는 6개만 보여줄꺼임!
    @GetMapping(value = "/main/{page}/{size}")
    public ResponseEntity mainHome(ItemSearchDTO itemSearchDTO, @PathVariable("page")Optional<Integer> page, @PathVariable("size") int size){
        System.out.println("mainHome----------itemSearchDTO:"+itemSearchDTO+" page:"+page+" size:"+size);
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, size);
        Page<MainItemDTO> items = itemService.getMainItemPage(itemSearchDTO, pageable,0,0,null,"Search products...");

        return new ResponseEntity(items, HttpStatus.OK);

    }

    //로그인 확인
    @GetMapping(value="/main2")
    public ResponseEntity<MemberDTO> main2(HttpSession session){
        System.out.println("main2-----로그인된 사람:"+session.getAttribute("login"));
        MemberDTO getmemberDTO = (MemberDTO) session.getAttribute("login");
        if(getmemberDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        MemberDTO memberDTO = memberService.entityToDto(memberService.findByEmail(getmemberDTO.getEmail()));
        return new ResponseEntity<>(memberDTO,HttpStatus.OK);
    }


}
