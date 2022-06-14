package com.green.computer.controller;

import com.green.computer.dto.ItemDTO;
import com.green.computer.dto.ItemSearchDTO;
import com.green.computer.dto.MemberDTO;
import com.green.computer.entity.Item;
import com.green.computer.repository.ItemRepository;
import com.green.computer.service.CartService;
import com.green.computer.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.security.Principal;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@Log4j2
public class ItemController {

    private final ItemService itemService;

    private final ItemRepository itemRepository;

    @PostMapping(value = "/item/new")
    public ResponseEntity itemNew(@Valid ItemDTO dto, BindingResult bindingResult
            , @RequestParam("itemImgFile") List<MultipartFile> itemImgFileList
            , HttpSession session
    ){
        // bindingResult 가 뭐냐면 예외처리라고 생각하면 됨(유효성 검증)
        // 에러를 확인하고 넘겨줄 수 있게 BindingResult를 사용한다
        //  BindingResult를 사용하지 않을 시에는 Valid에서 걸리면 바로 Exception이 발생한다.
        System.out.println("itemNew---------ItemDTO:"+dto+" itemImgFileList:"+itemImgFileList.size());


        if(session.getAttribute("login") == null) return  new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED); //로그인 상태에서만 상품을 등록할수 있도록
        if(bindingResult.hasErrors()){ // 상품 등록시 필수 값이 없다면
            System.out.println("필수값 없음");
            return new ResponseEntity(HttpStatus.BAD_REQUEST); // 입력한 필수 값이 없으면 다시 이동하게 이건 강사님한테 물어봐야함 에러코드 400
        }

        if(itemImgFileList.get(0).isEmpty() && dto.getId() == null){ // 상품의 첫번째 이미지는 무조건 있어야함!
            System.out.println("이미지 없음");
            return new ResponseEntity(HttpStatus.UNAUTHORIZED); // 뭘넣어야하지 에러코드 401
        }
        if(itemImgFileList.size()>3){ // 이미지 파일 업로드를 3개까지 제한
            return new ResponseEntity(HttpStatus.EXPECTATION_FAILED);
        }


        try {
            MemberDTO login = (MemberDTO) session.getAttribute("login");
            System.out.println(login);
            Long getID = itemService.saveItem(dto, itemImgFileList);
            itemRepository.updateCreatedBy(login.getName(), getID);
        } catch (Exception e){
            return new ResponseEntity(HttpStatus.FORBIDDEN);  // 에러 발생시 다시 아이템 넣는 페이지로 이동하게 에러코드 403
        }

        return new ResponseEntity(HttpStatus.OK);
    }


    @PostMapping(value = "/item/{itemId}")
    public ResponseEntity itemModify(
            @Valid ItemDTO itemDTO,
            BindingResult bindingResult,
            @RequestParam("itemImgFile") List<MultipartFile> itemImgFileList
    ){
        System.out.println("itemNew---------ItemDTO:"+itemDTO+" itemImgFileList:"+ itemImgFileList.size());
        if(bindingResult.hasErrors()){ // 상품 등록시 필수 값이 없다면
            System.out.println("필수값 없음");
            return new ResponseEntity(HttpStatus.BAD_REQUEST); //
        }
        if(!itemImgFileList.get(0).isEmpty() && itemDTO.getId()==null){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        try{
            itemService.updateItem(itemDTO,itemImgFileList);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    //상세페이지에서 장바구니추가 하면  item 정보 보내기! ->안하면 상세페이지 오류뜸 ㅠ.ㅠ
    @GetMapping(value = "/products/item/{itemId}")
    public ResponseEntity itemDtl(@PathVariable("itemId") Long itemId){
        try {
            ItemDTO itemDTO = itemService.getItemDtl(itemId);
            return new ResponseEntity(itemDTO,HttpStatus.OK);
        } catch(EntityNotFoundException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping(value = "/item/{itemId}")
    public ResponseEntity itemDtl2(@PathVariable("itemId") Long itemId){
        System.out.println("itemDtl2-----------itemId"+itemId);
        try {
            ItemDTO itemDTO = itemService.getItemDtl(itemId);
            System.out.println(itemDTO);
            return new ResponseEntity(itemDTO,HttpStatus.OK);
        } catch(EntityNotFoundException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping(value = {"/items" , "/items/{page}"}) // 페이지 번호가 없는 메인페이지와 페이지 번호가 있는 페이지를 구분
    public ResponseEntity itemPageable(ItemSearchDTO itemSearchDTO, @PathVariable("page")Optional<Integer> page){

        Pageable pageable = PageRequest.of(page.isPresent()? page.get():0,3); // 페이징을 하기 위해서
        // 페이지 번호가 있으면 해당 페이지를 세팅하고 없으면 0 페이지를 세팅
        // 첫번째 파라미터 page.get():0 요거는 조회할 페이지 번호 뒤에는 사이즈 일단 편의를 위해 사이즈를 3개로 설정 나중에 10개로 바꿀꺼임

        Page<Item> items = itemService.getPage(itemSearchDTO,pageable); // 조회 조건과 페이징 정보를 파라미터로 넘김

        return new ResponseEntity(items,HttpStatus.OK);
    }

    @DeleteMapping("/items/delete/{id}")
    public ResponseEntity itemDelete(@PathVariable("id") Long id){
        log.info(id+"삭제된 id를 확인합니다.");
        itemService.deleteItem(id);

        return new ResponseEntity(HttpStatus.OK);
    }



}
