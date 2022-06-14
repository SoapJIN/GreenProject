package com.green.computer.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QnaDTO {

    private Long qnaId;

    private String qnaType;

    private String qnaTitle;

    private String qnaContent;

    private String qnaPhone;

    private LocalDateTime regDate;

    private LocalDateTime modDate;

    //이미지 리스트
    private List<QnaImageDTO> qnaImageDTOList = new ArrayList<>();

    private List<Long> qnaImageList = new ArrayList<>();


}
