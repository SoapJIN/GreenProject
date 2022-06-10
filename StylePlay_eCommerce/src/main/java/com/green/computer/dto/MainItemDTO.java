package com.green.computer.dto;


import com.green.computer.constant.ItemSellStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;

@Data
@ToString
@Builder
@NoArgsConstructor
public class MainItemDTO {

    private Long id;

    private String itemName;

    private String itemDetail;

    private String imgUrl;

    private Integer price;

    private Integer stockNumber;

    private ItemSellStatus itemSellStatus;

    private LocalDateTime regDate;

    private LocalDateTime modDate;

    private String createdBy;

    private String itemType;

    @QueryProjection // QueryDSL에서 결과를 DTO로 조회할 때는 Projections를 사용한다.
    public MainItemDTO(Long id,String itemName, String itemDetail,String imgUrl,Integer price, Integer stockNumber , ItemSellStatus itemSellStatus
    , LocalDateTime regDate , LocalDateTime modDate , String createdBy,String itemType){
        this.id = id;
        this.itemName = itemName;
        this.itemDetail = itemDetail;
        this.imgUrl = imgUrl;
        this.price = price;
        this.stockNumber = stockNumber;
        this.itemSellStatus = itemSellStatus;
        this.regDate =regDate;
        this.modDate = modDate;
        this.createdBy = createdBy;
        this.itemType = itemType;

    }

}
