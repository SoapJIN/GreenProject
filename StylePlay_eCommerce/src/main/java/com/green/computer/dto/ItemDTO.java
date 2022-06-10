package com.green.computer.dto;

import com.green.computer.constant.ItemSellStatus;
import com.green.computer.entity.Item;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {

    private Long id;


    private String itemName;

    private Integer price;

    private String itemDetail;

    private Integer stockNumber;

    private ItemSellStatus itemSellStatus;

    private String itemType;

    private List<ItemImgDto> itemImgDtoList = new ArrayList<>(); //상품 이미지 저장리스트
    
    // 해당 경고 문구는 좀있다가 https://multifrontgarden.tistory.com/221 읽어보기 힘들다 지금은

    private List<Long> itemImgIds = new ArrayList<>(); //상품이미지아이디 리스트 저장->수정시 이미지아이디 담을 용도


    private static ModelMapper modelMapper = new ModelMapper();

    public Item createItem(){
        return modelMapper.map(this,Item.class);
    }
    public static ItemDTO of(Item item){
        return modelMapper.map(item,ItemDTO.class);
    }

}
