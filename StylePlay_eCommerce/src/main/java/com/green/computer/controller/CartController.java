package com.green.computer.controller;

import com.green.computer.dto.*;
import com.green.computer.service.CartService;
import com.green.computer.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@Log4j2
public class CartController {

    private final ItemService itemService;
    private final CartService cartService;

    // 장바구니 페이지에 전달할 CartDetailDto 를 쿼리로 조회해서 CartDetailDtoList 에 담아줌
    @GetMapping(value = "/cart")
    public ResponseEntity cartItemsGet(HttpSession session){
        System.out.println("cartItemsGet---------session:"+session.getAttribute("login"));
        MemberDTO memberDTO = (MemberDTO) session.getAttribute("login");
        List<CartDetailDTO> cartDetailList = cartService.getCartList(memberDTO.getEmail());
        return new ResponseEntity(cartDetailList,HttpStatus.OK);
    }

    //products,상세 페이지에서 장바구니 추가
    @PostMapping(value = {"/item/cart/{itemId}","/products/item/cart/{itemId}"})
    public ResponseEntity itemCartAdd(@RequestBody CartItemDTO cartItemDTO, HttpSession session , BindingResult bindingResult){
        System.out.println("itemCartAdd---------cartItemDTO:"+cartItemDTO+"session:"+session.getAttribute("login"));
        MemberDTO memberDTO = (MemberDTO) session.getAttribute("login");
        String email = memberDTO.getEmail();
        ItemDTO itemDTO = itemService.getItemDtl(cartItemDTO.getItemId());
        System.out.println(itemDTO);

        if(bindingResult.hasErrors()){
            StringBuilder sb =new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError :fieldErrors){
                sb.append(fieldError.getDefaultMessage());
            }
            return  new ResponseEntity(sb.toString(),HttpStatus.BAD_REQUEST);
        }
        if(itemDTO.getStockNumber()<1){
            return new ResponseEntity<>("상품 재고가 부족해요!",HttpStatus.BAD_REQUEST);
        }

        try {
            cartService.addCart2(cartItemDTO,email);
        } catch(EntityNotFoundException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ItemDTO>(itemDTO,HttpStatus.OK);
    }
    //리액트-cart에서 getcartId 필요해서 만듬!
    @GetMapping(value = "/cartItemId/{itemId}")
    public ResponseEntity getCartId(@PathVariable("itemId") Long itemId){
        System.out.println("getCartId---------itemId:"+itemId);
        try {
            Long cartItemId = cartService.getCartItemId(itemId);
            return new ResponseEntity<Long>(cartItemId,HttpStatus.OK);
        } catch(EntityNotFoundException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
    
    //장바구니 상품 수량 수정
    @PatchMapping(value="/cartItem/{cartItemId}")
    public @ResponseBody ResponseEntity updateCartItem
            (@PathVariable("cartItemId") Long cartItemId,int count, HttpSession session){
        System.out.println("updateCartItem---------count:"+count+" cartItemId:"+cartItemId);
        MemberDTO getmemberDTO =(MemberDTO) session.getAttribute("login");
        if(count <= 0){
            return new ResponseEntity<String>("최소 1개 이상 담아주세요",HttpStatus.BAD_REQUEST);
        }
        else if(!cartService.validateCartItem(cartItemId,getmemberDTO.getEmail())){
            return new ResponseEntity<>("수정 권환이 없습니다",HttpStatus.FORBIDDEN);
        }
        cartService.updateCartItemCount(cartItemId,count);
        return new ResponseEntity<Long>(cartItemId,HttpStatus.OK);
    }


    //장바구니 상품 삭제
    @DeleteMapping(value = "/cartItem/{cartItemId}")
    public @ResponseBody ResponseEntity deleteCartItem
            (@PathVariable("cartItemId") Long cartItemId, Principal principal){
        System.out.println("deleteCartItem---------cartItemId:"+cartItemId);
//        if(!cartService.validateCartItem(cartItemId,principal.getName())){
//            return new ResponseEntity<>("수정 권한이 없습니다",HttpStatus.FORBIDDEN);
//        }
        cartService.deleteCartItem(cartItemId);
        return new ResponseEntity<Long>(cartItemId,HttpStatus.OK);
    }



}
