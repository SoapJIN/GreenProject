package com.green.computer.repository;

import com.green.computer.constant.ItemSellStatus;
import com.green.computer.dto.OrderDTO;
import com.green.computer.entity.Item;
import com.green.computer.entity.Member;
import com.green.computer.entity.Order;
import com.green.computer.entity.OrderItem;
import com.green.computer.service.OrderService;
import org.aspectj.weaver.ast.Or;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class OrderServiceTest {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    MemberRepository memberRepository;

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
    @DisplayName("주문테스트")
    public void order(){
        Item item = saveItem();
        Member member = saveMember();

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setCount(10);
        orderDTO.setItemId(item.getId());
        Long orderId = orderService.order(orderDTO,member.getEmail());
        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
        int totalPrice = orderDTO.getCount()*item.getPrice();
        assertEquals(totalPrice,order.getTotalPrice());
    }
}
