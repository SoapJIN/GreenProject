package com.green.computer.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "cart")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Cart extends BaseEntity2{ //member에 맞는 cart불러오기
    @Id
    @Column(name ="cart_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    public static Cart createCart(Member member){
        Cart cart = new Cart();
        cart.setMember(member);
        return cart;
    }



}
