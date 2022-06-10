package com.green.computer.entity;


import com.green.computer.constant.OrderStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "orders")
@ToString
public class Order extends BaseEntity2{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @OneToMany(mappedBy = "order" , cascade = CascadeType.ALL , orphanRemoval = true,fetch = FetchType.LAZY)
    private final List<OrderItem> orderItems = new ArrayList<>();
    // 고객이 주문할 상품을 선택하고 주문할 때 주문(Order) 엔티티를 저장하면서 주문 상품(OrderItem) 엔티티도 함께 저장되는 경우

    public void addOrderItem(OrderItem orderItem){ //리스트에 주문상품정보 추가 -> order객체의 orderItems에 추가
        orderItems.add(orderItem); //orderItems 리스트에 orderItem 추가
        orderItem.setOrder(this); //orderItem객체에 order객체 세팅 (양방향 참조 관계)
    }

    public static Order createOrder(Member member,List<OrderItem> orderItemList){ //주문하기
        Order order = new Order();
        order.setMember(member); //주문한 회원
        for(OrderItem orderItem:orderItemList){
            order.addOrderItem(orderItem); // 주문한 물품들!
        }
        order.setOrderStatus(OrderStatus.ORDER); //주문상태를 order로 세팅
        order.setOrderDate(LocalDateTime.now()); //현재시간을 주문시간으로 세팅
        return order;
    }
    public  int getTotalPrice(){ // 총 주문금액을 구하는 메서드
        int totalPrice =0;
        for(OrderItem orderItem : orderItems){
            totalPrice += orderItem.getTotalPrice();
        }
        return totalPrice;
    }

    public void cancelOrder(){
        this.orderStatus = OrderStatus.CANCEL;
        for(OrderItem orderItem :orderItems){
            orderItem.cancle();
        }
    }



}
