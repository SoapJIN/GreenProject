package com.green.computer.service;

import com.green.computer.dto.ItemDTO;
import com.green.computer.dto.ItemImgDto;
import com.green.computer.dto.ItemSearchDTO;
import com.green.computer.dto.MainItemDTO;
import com.green.computer.entity.Item;
import com.green.computer.entity.ItemImage;
import com.green.computer.repository.ItemImgRepository;
import com.green.computer.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.jboss.jandex.Main;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class ItemService {
    private final ItemRepository itemRepository;

    private final ItemImgService itemImgService;

    private final ItemImgRepository itemImgRepository;



    public Long saveItem(ItemDTO itemDTO, List<MultipartFile> itemImgFileList) throws Exception{

        //상품 등록
        Item item = itemDTO.createItem();
        itemRepository.save(item);

        //이미지 등록
        for(int i=0;i<itemImgFileList.size();i++){
            ItemImage itemImg = new ItemImage();
            itemImg.setItem(item);

            if(i == 0)
                itemImg.setRepimgYn("Y");
            else
                itemImg.setRepimgYn("N");

            itemImgService.saveItemImg(itemImg, itemImgFileList.get(i));
        }

        return item.getId();
    }

    @Transactional(readOnly = true)
    public ItemDTO getItemDtl(Long itemId){
        List<ItemImage> itemImageList = itemImgRepository.findByItemIdOrderByIdAsc(itemId); //상품의 이미지 조회
        List<ItemImgDto> itemImgDtoList = new ArrayList<>();
        for (ItemImage itemImg : itemImageList) {
            ItemImgDto itemImgDto = ItemImgDto.of(itemImg);
            itemImgDtoList.add(itemImgDto);
        }

        Item item = itemRepository.findById(itemId) //상품아이디를 통해 상품조회
                .orElseThrow(EntityNotFoundException::new);
        ItemDTO itemDTO = ItemDTO.of(item);
        itemDTO.setItemImgDtoList(itemImgDtoList);
        return itemDTO;
    }

    public Long updateItem(ItemDTO itemDTO, List<MultipartFile> itemImgFileList) throws Exception{
        //상품 수정
        Item item = itemRepository.findById(itemDTO.getId()) // 상품 아이디를 이용해서 엔티티 조회
                .orElseThrow(EntityNotFoundException::new);
        item.updateItem(itemDTO); // 엔티티 업데이트
        List<Long> itemImgIds = itemDTO.getItemImgIds();
        //이미지 등록
        for(int i=0;i<itemImgFileList.size();i++){
            itemImgService.updateItemImg(itemImgIds.get(i),
                    itemImgFileList.get(i));
        }

        return item.getId();
    }


    @Transactional(readOnly = true)
    public Page<Item> getPage(ItemSearchDTO itemSearchDTO, Pageable pageable){
        return itemRepository.getItemPage(itemSearchDTO,pageable);
    }

    @Transactional(readOnly = true)
    public Page<MainItemDTO> getMainItemPage(ItemSearchDTO itemSearchDTO, Pageable pageable){
        return itemRepository.getMainItemPage(itemSearchDTO,pageable);
    }
}
