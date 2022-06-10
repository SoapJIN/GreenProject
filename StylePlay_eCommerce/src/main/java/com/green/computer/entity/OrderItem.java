package com.green.computer.entity;


import lombok.*;

import javax.persistence.*;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OrderItem extends BaseEntity2{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="order_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oreder_id")
    private Order order;

    private int orderPrice;

    private int count;
    
    public static OrderItem createOrderItem(Item item, int count){
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item); //상품 
        orderItem.setCount(count); //주문수량
        orderItem.setOrderPrice(item.getPrice()); //주문 가격
        
        item.removeStock(count); //주문수량 만큼 재고수량 감소
        return orderItem;
    }
    public int getTotalPrice(){
        return orderPrice*count; //가격*주문수량 = 해당 상품의 총가격
    }
    public void cancle(){this.getItem().addStock(count);}
    
}
