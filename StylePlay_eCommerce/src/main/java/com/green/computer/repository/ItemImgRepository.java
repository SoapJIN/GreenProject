package com.green.computer.repository;

import com.green.computer.entity.ItemImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemImgRepository extends JpaRepository<ItemImage,Long> {

    List<ItemImage> findByItemIdOrderByIdAsc(Long itemId);
    ItemImage findByItemIdAndRepimgYn(Long itemId,String repimgYn);
}
