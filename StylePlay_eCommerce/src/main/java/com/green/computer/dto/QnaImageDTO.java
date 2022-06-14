package com.green.computer.dto;

import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QnaImageDTO {

    private Long qnaImgeId;

    private String imgName;

    private String orgImgName;

    private String imgUrl;

    private String haveImg;
}
