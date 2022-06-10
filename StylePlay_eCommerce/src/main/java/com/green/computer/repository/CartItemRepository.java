package com.green.computer.repository;

import com.green.computer.dto.CartDetailDTO;
import com.green.computer.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    CartItem findByCartIdAndItemId(Long carId, Long itemId);

    // 장바구니 페이지에 전달할 CartDetailDto 를 쿼리로 조회해서 CartDetailDtoList 에 담아줌
    @Query("select new com.green.computer.dto.CartDetailDTO(ci.id, i.itemName, i.price, ci.count, im.imgUrl, ci.item.id, ci.cart.id) " +
            "from CartItem ci, ItemImage im " +
            "join ci.item i " +
            "where ci.cart.id = :cartId " +
            "and im.item.id = ci.item.id " +
            "and im.repimgYn = 'Y' " + // 장바구니에 담겨있는 상품의 대표 이미지만 가져옴
            "order by ci.regDate desc"
    )
    List<CartDetailDTO> findCartDetailDtoList(Long cartId);
}
