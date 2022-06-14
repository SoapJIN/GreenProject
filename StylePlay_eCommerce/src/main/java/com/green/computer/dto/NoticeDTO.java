package com.green.computer.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NoticeDTO {

    private Long noticeId;
    private String noticeTitle;
    private String noticeContent;
    private String noticeType;

    private String writerAdmin; //공지 작성자

    private LocalDateTime regDate;
    private LocalDateTime modDate; //필요 없을듯
}
