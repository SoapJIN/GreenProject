package com.green.computer.controller;

import com.fasterxml.jackson.databind.ext.OptionalHandlerFactory;
import com.green.computer.dto.*;
import com.green.computer.service.CartService;
import com.green.computer.service.ItemService;
import com.green.computer.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final CartService cartService;
    private final ItemService itemService;

    @PostMapping(value = "/products/order")
    public @ResponseBody ResponseEntity order(@RequestBody @Valid OrderDTO orderDTO //@ResponseBody,@RequestBody 비동기 처리
            ,BindingResult bindingResult, HttpSession session){
        System.out.println("order---------orderDTO:"+orderDTO+" session:"+session.getAttribute("login"));
        if(bindingResult.hasErrors()){ //orderDTO 객채에 데이터 바인딩 시 에러가 있는지 검사
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for(FieldError fieldError:fieldErrors){
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(),HttpStatus.BAD_REQUEST);
        }
        MemberDTO memberDTO = (MemberDTO) session.getAttribute("login");
        String email = memberDTO.getEmail(); //현재 로그인한 이메일 정보를 조회
        try {
            Long orderId = orderService.order(orderDTO,email);
        }catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        ItemDTO itemDTO = itemService.getItemDtl(orderDTO.getItemId());
        return new ResponseEntity(itemDTO,HttpStatus.OK);
    }

    @GetMapping(value={"/orders","/orders/{page}"})
    public ResponseEntity orderHist(@PathVariable("page")Optional<Integer> page, HttpSession session){
        System.out.println("orderHist---------page:"+page+" session:"+session.getAttribute("login"));
        MemberDTO memberDTO = (MemberDTO) session.getAttribute("login");
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() :0,4);
        Page<OrderHisDTO> orderHisDTOList = orderService.getOrderList(memberDTO.getEmail(),pageable);
        return new ResponseEntity<>(orderHisDTOList,HttpStatus.OK);
    }

    @PostMapping(value="/cart/orders")
    public @ResponseBody ResponseEntity orderCartItem (@RequestBody List<CartOrderDTO> cartOrderDTO,HttpSession session){
        System.out.println("order---------cartOrderDTO:"+cartOrderDTO+" session:"+session.getAttribute("login"));
        MemberDTO memberDTO = (MemberDTO) session.getAttribute("login");
        List<CartOrderDTO> cartOrderDTOList = cartOrderDTO.get(0).getCartOrderDTOList();
        System.out.println(cartOrderDTOList);
        if(cartOrderDTOList == null || cartOrderDTOList.size()==0){
            return new ResponseEntity("주문할 상품을 선택해주세요",HttpStatus.FORBIDDEN);
        }
        for(CartOrderDTO cartOrder:cartOrderDTOList){
            if(!cartService.validateCartItem(cartOrder.getCartItemId(),memberDTO.getEmail())){
                return new ResponseEntity("주문 권한이 없습니다.",HttpStatus.FORBIDDEN);
            }
        }
        Long orderId =cartService.orderCartItem(cartOrderDTOList,memberDTO.getEmail());
        HttpHeaders headers =new HttpHeaders();
        return new ResponseEntity(orderId,HttpStatus.OK);
    }

    // 주문 취소를 위한 컨트롤러
    // @ResponseBody 는 return 을 json 처럼 되게 해줌 == @RestController
    @PostMapping("/order/{orderId}/cancel")
    public @ResponseBody ResponseEntity cancelOrder(
            @PathVariable("orderId") Long orderId,Optional<Integer> page , HttpSession session){
        System.out.println("cancelOrder---------orderId:"+orderId+" session:"+session.getAttribute("login"));
        MemberDTO memberDTO = (MemberDTO) session.getAttribute("login");
        if(!orderService.validateOrder(orderId, memberDTO.getEmail())){
            return new ResponseEntity<String>("주문 취소 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }
        orderService.cancelOrder(orderId);
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() :0,4);
        Page<OrderHisDTO> orderHisDTOList = orderService.getOrderList(memberDTO.getEmail(),pageable);
        return new ResponseEntity(orderHisDTOList, HttpStatus.OK);
    }
}
