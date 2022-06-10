package com.green.computer.repository;


import com.green.computer.constant.ItemSellStatus;
import com.green.computer.entity.Item;
import com.green.computer.entity.Member;
import com.green.computer.entity.Order;
import com.green.computer.entity.OrderItem;
import org.aspectj.weaver.ast.Or;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@SpringBootTest
@Transactional
public class OrderTest {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ItemRepository itemRepository;

    @PersistenceContext
    EntityManager em;

    public Item createItem(){
        Item item = Item.builder()
                .itemName("테스트")
                .price(10000)
                .itemDetail("상세설명")
                .itemSellStatus(ItemSellStatus.SELL)
                .stockNumber(100)
                .build();
        return item;

    }

    @Test
    public void cascadeTest(){
        Order order = new Order();

        for(int i=0;i<3;i++){
            Item item = this.createItem();
            itemRepository.save(item);
            OrderItem orderItem = OrderItem.builder()
                    .item(item)
                    .count(10)
                    .orderPrice(1000)
                    .order(order)
                    .build();
            order.getOrderItems().add(orderItem);
        }

        orderRepository.saveAndFlush(order); //order 엔티티를 저장하면서 강제로 flush호출 영속성 컨테스트 객체 데이터 베이스 반영

        em.clear(); // 영속성 컨텍스트 상태 초기화



        Order saveOrder = orderRepository.findById(order.getId()).orElseThrow(EntityNotFoundException::new);
        System.out.println(saveOrder.getId()+"왜 안나오는데 알려주세요");
        if(3 == saveOrder.getOrderItems().size()){
            System.out.println("테스트 통과!");
        }
        else{
            System.out.println("테스트실패..");
        }
        // https://lng1982.tistory.com/300 참고 롬복 toString stackoverflow 오류
        // https://conservative-vector.tistory.com/entry/%EC%98%A4%EB%A5%98   TransientPropertyValueException: object references an unsaved transient instance 이 오류 날때 참고
        // 위에는 주문을 3번했을때 itemOrder엔티티가 3번 저장되있는지 테스트


    }
    @Autowired
    private MemberRepository memberRepository;

    public Order createOrder(){
        Order order = new Order();

        for (int i = 0; i < 3; i++) {
            Item item = createItem();
            itemRepository.save(item);
            OrderItem orderItem = OrderItem.builder()
                    .item(item)
                    .count(10)
                    .orderPrice(1000)
                    .order(order)
                    .build();
            order.getOrderItems().add(orderItem);
        }

        Member member = new Member();
        memberRepository.save(member);

        order.setMember(member);
        orderRepository.save(order);
        return order;

    }

    @Test
    public void remove(){
        Order order = this.createOrder();
        order.getOrderItems().remove(0);
        em.flush();
    }
 // 고아객체 제거 되는지 확인 order가 관리하는 oderitem리스트의 0번째 인덱스를 제거하면
    // 0번째 인덱스에 있던 oderitem과 order의 연관관계가 끊어졌기 떄문에 orderitem  삭제  orphanRemoval = true 이기 때문에

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Test
    public void lazyloadingTest(){
        Order order = this.createOrder();
        Long orderItemId = order.getOrderItems().get(0).getId();
        em.flush();
        em.clear();

        OrderItem orderItem = orderItemRepository.findById(orderItemId).orElseThrow(EntityNotFoundException::new);

        System.out.println("Order class"+orderItem.getOrder().getClass());

    }

    // 일대일 다대일로 매핑할 경우 기본 전략인 즉시 로딩을 통해 엔티티를 가져온다
    // 심지어 Order 엔티티는 자신과 다대일로 매핑된 Member 엔티티도 가지고 온다. 그래서 FetchType.LAZY 방식을 사용해야 한다.
    // 지연 로딩으로 설정하면 실제 엔티티 대신에 프록시 객체를 넣어둔다.



}
