package com.green.computer.dto;


import com.green.computer.constant.ItemSellStatus;
import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemSearchDTO {
    private String searchDateType; // 조회 시간을 기준으로

    private ItemSellStatus searchSellStatus; // 상품의 판매상태를 기준

    private String searchBy; // 조회할때에 어떤 유형으로

    private String searchQuery = ""; // 조회할 검색어 저장할 변수
}
