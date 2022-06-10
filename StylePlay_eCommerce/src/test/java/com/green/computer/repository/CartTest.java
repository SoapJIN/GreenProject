package com.green.computer.repository;


import com.green.computer.constant.ItemSellStatus;
import com.green.computer.dto.CartItemDTO;
import com.green.computer.dto.MemberDTO;
import com.green.computer.entity.Cart;
import com.green.computer.entity.CartItem;
import com.green.computer.entity.Item;
import com.green.computer.entity.Member;
import com.green.computer.service.CartService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestPropertySource(locations = "classpath:application-test.properties")
@SpringBootTest
@Transactional
public class CartTest {

    @Autowired
    CartRepository cartRepository;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CartService cartService;
    @Autowired
    CartItemRepository cartItemRepository;

    public Member createMember(){
        MemberDTO memberDTO = MemberDTO.builder()
                .email("testEmail@naver.com")
                .name("이름")
                .address("성남시 분당구")
                .password("1234")
                .build();
        return Member.createMember(memberDTO);
    }

    public Item saveItem(){
        Item item = new Item();
        item.setItemName("테스트상품");
        item.setPrice(2000);
        item.setItemDetail("테스트 상품 상세 설명");
        item.setItemSellStatus(ItemSellStatus.SELL);
        item.setStockNumber(100);
        return itemRepository.save(item);
    }

    public Member saveMember(){
        Member member = new Member();
        member.setEmail("test@test.com");
        return memberRepository.save(member);
    }

    @Test
    public void findCartAndMemberTest(){
        Member member = createMember();
        memberRepository.save(member);

        Cart cart = new Cart();
        cart.setMember(member);
        cartRepository.save(cart);



        Cart savedCart = cartRepository.findById(cart.getId()).orElseThrow(EntityNotFoundException::new);

        if(savedCart.getMember().getId() == member.getId()){ //cart에 저장된 memberid랑 memberid랑 같은지
            System.out.println("같아요!!");
        }
        else {
            System.out.println("다른데요?");
        }

    }

    @Test
    @DisplayName("addCartTest")
    public void addCart(){
        Item item = saveItem();
        System.out.println(item);
        Member member = saveMember();
        System.out.println(member);

        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setCount(5);
        cartItemDTO.setItemId(item.getId());

        Long cartItemId = cartService.addCart(cartItemDTO,member.getEmail());

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(EntityNotFoundException::new);
        assertEquals(item.getId(),cartItem.getItem().getId());
        assertEquals(cartItemDTO.getCount(),cartItem.getCount());
    }
}
