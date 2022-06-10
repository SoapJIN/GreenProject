package com.green.computer.dto;

import com.green.computer.entity.ItemImage;
import lombok.*;
import org.modelmapper.ModelMapper;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemImgDto {
    private Long id;

    private String imgName;

    private String oriImgName;

    private String imgUrl;

    private String repImgYn; // 대표이미지

    private static ModelMapper modelMapper = new ModelMapper();

    public static ItemImgDto of(ItemImage itemImage){
        return modelMapper.map(itemImage,ItemImgDto.class);
    }
    // 엔티티 객체를 파라미터로 받아서  엔티티 객체의 자료형과 맴버변수의 이름이 같을때 dto로 값을 복사해서 변환합니다.
    // static 메소드로 선언해 dto 객체를 생성하지 않아도 호출할 수 있도록함 
    // 관련 링크 https://devwithpug.github.io/java/java-modelmapper/ 참고
}
