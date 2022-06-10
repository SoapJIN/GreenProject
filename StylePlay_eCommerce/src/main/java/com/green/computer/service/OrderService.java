package com.green.computer.service;

import com.green.computer.dto.CartOrderDTO;
import com.green.computer.dto.OrderDTO;
import com.green.computer.dto.OrderHisDTO;
import com.green.computer.dto.OrderItemDTO;
import com.green.computer.entity.*;
import com.green.computer.repository.ItemImgRepository;
import com.green.computer.repository.ItemRepository;
import com.green.computer.repository.MemberRepository;
import com.green.computer.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final ItemImgRepository itemImgRepository;


    public Long order(OrderDTO orderDTO , String email){
        Item item = itemRepository.findById(orderDTO.getItemId())
                .orElseThrow(EntityNotFoundException::new); //주문할 상품을 조회,orElseThrow-> null값인지 확인
        Member member = memberRepository.findByEmail(email); // 로그인한 이메일 정보를 이용해서 회원 정보를 조회함
        List<OrderItem> orderItemList = new ArrayList<>();
        OrderItem orderItem = OrderItem.createOrderItem(item,orderDTO.getCount());
        orderItemList.add(orderItem);

        Order order = Order.createOrder(member,orderItemList); //주문생성
        orderRepository.save(order); //주문 저장

        return order.getId();
    }

    public Long orders(List<OrderDTO> orderDTOList, String email){
        Member member = memberRepository.findByEmail(email);//user email로 조회
        List<OrderItem> orderItemList = new ArrayList<>(); //주문아이템리스트 만듬
        for(OrderDTO orderDTO:orderDTOList){ //파라미터로 받음 orderDTOList로 find(itemId) -> orderItem
            Item item = itemRepository.findById(orderDTO.getItemId())
                    .orElseThrow(EntityNotFoundException::new);
            OrderItem orderItem = OrderItem.createOrderItem(item,orderDTO.getCount());
            orderItemList.add(orderItem); //orderItem 추가
        }
        Order order = Order.createOrder(member,orderItemList);
        orderRepository.save(order);
        return order.getId();
    }

    @Transactional(readOnly = true)
    public Page<OrderHisDTO> getOrderList(String email, Pageable pageable){ //주문내역리스트 가져오기!
        List<Order> orders = orderRepository.findOrders(email); //email,페이징조건을 이용하여 주문목록 조회
        Long totalCount = orderRepository.countOrder(email);
        List<OrderHisDTO> orderHisDTOs =new ArrayList<>();

        for(Order order:orders){
            OrderHisDTO orderHisDTO = new OrderHisDTO(order);
            List<OrderItem> orderItems = order.getOrderItems();
            for(OrderItem orderItem:orderItems){
                ItemImage itemImage = itemImgRepository
                        .findByItemIdAndRepimgYn(orderItem.getItem().getId(),"Y");
                OrderItemDTO orderItemDTO = new OrderItemDTO(orderItem,itemImage.getImgUrl());
                orderHisDTO.addOrderItemDTO(orderItemDTO);
            }
            orderHisDTOs.add(orderHisDTO);
        }
        return new PageImpl<OrderHisDTO>(orderHisDTOs,pageable,totalCount);
    }

    // DB 에 있는 email 과 주문자 email 대조함
    @Transactional(readOnly = true)
    public boolean validateOrder(Long orderId, String email){
        Member curMember = memberRepository.findByEmail(email); // 유저 이메일 받아옴
        Order order = orderRepository.findById(orderId) // 주문 데이터 받아오고
                .orElseThrow(EntityNotFoundException::new);
        Member savedMember = order.getMember(); // 위의 주문을 한 유저의 정보를 받아옴

        if(!StringUtils.equals(curMember.getEmail(), savedMember.getEmail())){
            return false; // 그 둘이 같지 않으면은 false
        }

        return true; // 같으면 true
    }

    // 주문 취소하는 로직 구현 service
    public void cancelOrder(Long orderId){
        Order order = orderRepository.findById(orderId)
                .orElseThrow(EntityNotFoundException::new);
        order.cancelOrder();
    }
}
