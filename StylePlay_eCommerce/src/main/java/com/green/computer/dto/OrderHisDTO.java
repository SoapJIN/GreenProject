package com.green.computer.dto;

import com.green.computer.constant.OrderStatus;
import com.green.computer.entity.Order;
import lombok.*;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderHisDTO { //주문정보

    public OrderHisDTO(Order order){
        this.orderId= order.getId();
        this.orderDate=order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        this.orderStatus = order.getOrderStatus();
    }

    private Long orderId; //주문아이디
    private String orderDate; //주문날짜
    private OrderStatus orderStatus; //주문상태
    //주문 상품 리스트
    private final List<OrderItemDTO> orderItemDTOList = new ArrayList<>();
    //객체를 주문상품 리스트에 추가
    public void addOrderItemDTO(OrderItemDTO orderItemDTO){ //주문 상품을 리스트에 추가!
        orderItemDTOList.add(orderItemDTO);
    }
}
