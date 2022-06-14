package com.green.computer.repository;

import com.green.computer.entity.ItemImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface ItemImgRepository extends JpaRepository<ItemImage,Long> {

    List<ItemImage> findByItemIdOrderByIdAsc(Long itemId);
    ItemImage findByItemIdAndRepimgYn(Long itemId,String repimgYn);

    @Modifying
    Long deleteByItemId(Long id);
}
