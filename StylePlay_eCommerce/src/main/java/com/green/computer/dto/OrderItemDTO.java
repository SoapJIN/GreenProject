package com.green.computer.dto;

import com.green.computer.entity.OrderItem;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO { //주문 상품 정보
    public OrderItemDTO(OrderItem orderItem, String imgUrl){
        this.itemName =orderItem.getItem().getItemName();
        this.count = orderItem.getCount();
        this.orderPrice = orderItem.getOrderPrice();
        this.imgUrl = imgUrl;
    }
    private String itemName;//상품명
    private int count; //수량
    private int orderPrice; //주문금액
    private String imgUrl; //상품 이미지 경로
}
