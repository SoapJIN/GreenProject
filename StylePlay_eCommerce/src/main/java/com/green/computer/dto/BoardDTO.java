package com.green.computer.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDTO {

    // Board arr[0]
    private Long bno;
    private String title;
    private String content;

    // Member arr[1]
    private String writerEmail; // 작성자의 이메일 id
    private String writerName; // 작성자의 이름
    private LocalDateTime regDate;
    private LocalDateTime modDate;

    // Reply(count) arr[2]
    private int replyCount; // 해당 게시글의 댓글 수
}
