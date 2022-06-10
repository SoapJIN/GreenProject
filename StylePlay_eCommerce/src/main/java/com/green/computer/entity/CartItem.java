package com.green.computer.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "cart_item")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartItem extends BaseEntity2{
    @Id
    @GeneratedValue
    @Column(name="cart_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="item_id")
    private Item item;

    private int count;

    public static CartItem createCartItem(Cart cart,Item item,int count){
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setItem(item);
        cartItem.setCount(count);
        return cartItem;
    }

    public static CartItem createCartItem2(Cart cart,Item item){
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setItem(item);
        return cartItem;
    }

    public void addCount(int count){
        this.count +=count;
    }

    public void updateCount(int count){
        this.count =count;
    }
}
