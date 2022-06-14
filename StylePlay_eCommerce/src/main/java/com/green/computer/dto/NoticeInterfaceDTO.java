package com.green.computer.dto;

import java.time.LocalDateTime;

public interface NoticeInterfaceDTO {
    Long getNoticeId();
    String getNoticeTitle();
    String getNoticeContent();
    String getNoticeWriter();
    LocalDateTime getRegDate() ;
    String getNoticeType();

}
