package com.green.computer.service;

import com.green.computer.dto.CartDetailDTO;
import com.green.computer.dto.CartItemDTO;
import com.green.computer.dto.CartOrderDTO;
import com.green.computer.dto.OrderDTO;
import com.green.computer.entity.Cart;
import com.green.computer.entity.CartItem;
import com.green.computer.entity.Item;
import com.green.computer.entity.Member;
import com.green.computer.repository.CartItemRepository;
import com.green.computer.repository.CartRepository;
import com.green.computer.repository.ItemRepository;
import com.green.computer.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    private final OrderService orderService;

    //로그인 아직 안해서 email을 그냥 넣음!
    public Long getCartItemId(Long itemId){
        Member member = memberRepository.findByEmail("user@naver.com");
        Cart cart = cartRepository.findByMemberId(member.getId());
        CartItem savedCartItem= cartItemRepository.findByCartIdAndItemId(cart.getId(), itemId);
        return savedCartItem.getId();
    }

    // 이메일을 이용하여 카트 리스트를 조회합니다.
    @Transactional(readOnly = true)
    public List<CartDetailDTO> getCartList(String email){

        List<CartDetailDTO> cartDetailDtoList = new ArrayList<>();

        Member member = memberRepository.findByEmail(email);
        Cart cart = cartRepository.findByMemberId(member.getId());

        if(cart == null){ // 위에서 유저 카트 조회해서, 없으면은 그냥 반환하고
            return cartDetailDtoList;
        }

        cartDetailDtoList = cartItemRepository.findCartDetailDtoList(cart.getId());
        return cartDetailDtoList; // 카트 있으면은 cartItemRepository 의 JPQL 쿼리로 걸러진 아이템들을 담아서 반환
    }

    //cart에 아이템 추가!
    public Long addCart2(CartItemDTO cartItemDTO,String email){
        Item item = itemRepository.findById(cartItemDTO.getItemId()).orElseThrow(EntityNotFoundException::new);
        Member member = memberRepository.findByEmail(email);
        System.out.println("member"+member);
        Cart cart = cartRepository.findByMemberId(member.getId());
        if(cart == null){ //상품 처음 담을시에 해당회원의 장바구니 엔티티를 생성
            cart = Cart.createCart(member);
            cartRepository.save(cart);
        }

        CartItem savedCartItem= cartItemRepository.findByCartIdAndItemId(cart.getId(),item.getId()); //현재상품이 장바구니에 이미 들어가 있는지 조회
        if(savedCartItem !=null){
            savedCartItem.addCount(cartItemDTO.getCount()); //기존에 장바구니에 있는 상품이면 담을수량만큼 늘려줌
            return savedCartItem.getId();
        }else {
            CartItem cartItem = CartItem.createCartItem(cart,item,cartItemDTO.getCount());//생성자로 파라미터 줌!
            cartItemRepository.save(cartItem); //장바구니 아이템 저장
            return cartItem.getId();
        }
    }

    //로그인 한 회원이랑 장바구니 상품 저장한 회원이랑 같은지 확인
    @Transactional(readOnly = true)
    public boolean validateCartItem(Long cartItemId,String email){
        Member curMember =memberRepository.findByEmail(email);
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(EntityNotFoundException::new);
        Member savedMember = cartItem.getCart().getMember();

        if(!StringUtils.pathEquals(curMember.getEmail(),savedMember.getEmail())){
            return false;
        }
        return true;
    }

    //cartItem count 업데이트!
    public void updateCartItemCount(Long cartItemId,int count){
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(EntityExistsException::new);
        System.out.println(cartItem);
        cartItem.updateCount(count);
    }

    //cart에 아이템 삭제!
    public void deleteCartItem(Long cartItemId){
        CartItem cartItem =cartItemRepository.findById(cartItemId)
                .orElseThrow(EntityNotFoundException::new);
        cartItemRepository.delete(cartItem);
    }

    //order하면 장바구니에서 cartItem 제거함!
    public Long orderCartItem(List<CartOrderDTO> cartOrderDTOList, String email){
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for(CartOrderDTO cartOrderDTO : cartOrderDTOList){ //cartOrder 리스트에 데이터를 orderDTO로 넣고
            CartItem cartItem = cartItemRepository.findById(cartOrderDTO.getCartItemId())
                    .orElseThrow(EntityNotFoundException::new);
            OrderDTO orderDTO =new OrderDTO();
            orderDTO.setItemId(cartItem.getItem().getId());
            orderDTO.setCount(cartItem.getCount());
            orderDTOList.add(orderDTO);// orderDTOList에 orderDTO 추가
        }
        Long orderId = orderService.orders(orderDTOList,email); //장바구니에 담은 상품을 주문하도록 로직을 호출
        for(CartOrderDTO cartOrderDTO:cartOrderDTOList){ //주문한 상품을 장바구니에서 제거함!
            CartItem cartItem = cartItemRepository.findById(cartOrderDTO.getCartItemId())
                    .orElseThrow(EntityNotFoundException::new);
            cartItemRepository.delete(cartItem);
        }
        return orderId;
    }

}
