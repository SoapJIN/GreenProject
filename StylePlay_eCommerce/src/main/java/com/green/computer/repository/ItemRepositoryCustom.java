package com.green.computer.repository;

import com.green.computer.dto.ItemSearchDTO;
import com.green.computer.dto.MainItemDTO;
import com.green.computer.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepositoryCustom {

    Page<Item> getItemPage (ItemSearchDTO itemSearchDTO, Pageable pageable);

    Page<MainItemDTO> getMainItemPage(ItemSearchDTO itemSearchDTO
            , Pageable pageable, Integer priceStart
            ,Integer priceEnd,String filterName,String searchName);



}
