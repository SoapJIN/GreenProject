package com.green.computer.service;

import com.green.computer.dto.*;
import com.green.computer.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface NoticeService {

    //공지 게시글 등록
    void register(NoticeDTO noticeDTO);
    
//   //공지 전체 가져오기
//    PageResultDTO<NoticeDTO, Notice> getList(PageRequestDTO pageRequestDTO);

    //공지 전체 불러오기
    List<NoticeDTO> getNoticeList();

    //공지 번호 누르면 그 내용 보여주기
    NoticeDTO getOneBoardNotice(Long notice_id);

    //공지 수정하기
    void modifyNotice(NoticeDTO noticeDTO);

    //공지 삭제하기
    void deleteNotice(Long notice_id);

    //자주묻는 질문 불러오기
    PageResultDTO<NoticeDTO, Notice> getQnaList(PageRequestDTO requestDTO);

    public Page<Notice> getTnoBoard(Integer page);


    //dto를 entity 변환하는 default
    default Notice dtoToEntity(NoticeDTO noticeDTO) {
        Notice notice = Notice.builder()
                .noticeId(noticeDTO.getNoticeId())
                .noticeTitle(noticeDTO.getNoticeTitle())
                .noticeContent(noticeDTO.getNoticeContent())
                .noticeType(noticeDTO.getNoticeType())
                .noticeWriter(noticeDTO.getWriterAdmin())
                .build();
        return notice;
    }

    //entity를 dto로 변환하는 default
    default NoticeDTO entityToDto(Notice notice) {
        NoticeDTO noticeDTO = NoticeDTO.builder()
                .noticeId(notice.getNoticeId())
                .noticeTitle(notice.getNoticeTitle())
                .noticeContent(notice.getNoticeContent())
                .noticeType(notice.getNoticeType())
                .writerAdmin(notice.getNoticeWriter())
                .regDate(notice.getRegDate())
                .modDate(notice.getModDate())
                .build();
        return noticeDTO;
    }
}
