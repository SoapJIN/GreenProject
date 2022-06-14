package com.green.computer.controller;

import com.green.computer.dto.NoticeDTO;
import com.green.computer.dto.PageRequestDTO;
import com.green.computer.dto.PageResultDTO;
import com.green.computer.entity.Notice;
import com.green.computer.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @RequestMapping ("/main")
    public ResponseEntity getNotice() {
        List<NoticeDTO> noticeList = noticeService.getNoticeList();
        return new ResponseEntity<>(noticeList, HttpStatus.OK);
    }

    //공지 게시글 조회
    @RequestMapping(value = "/detail/{noticeId}", method = RequestMethod.GET)
    public ResponseEntity<NoticeDTO> findOneBoard(@PathVariable("noticeId") Long noticeId) {
        NoticeDTO oneNoticeDTO = noticeService.getOneBoardNotice(noticeId);
        return new ResponseEntity<>(oneNoticeDTO,HttpStatus.OK);
    }

    //공지 게시글 등록
    @RequestMapping(value = "/create/{noticeId}", method=RequestMethod.POST)
    public void insertNotice(@RequestBody NoticeDTO dto) {
        noticeService.register(dto);
    }

    //공지 게시글 수정
    @PutMapping(value = "/modify/{noticeId}")
    public void updateNotice(@RequestBody NoticeDTO dto) {
        noticeService.modifyNotice(dto);

    }
    //공지 게시글 삭제
    @RequestMapping(value = "/delete/{noticeId}" , method = RequestMethod. DELETE)
    public void deleteNotice(@PathVariable("noticeId") Long noticeId) {
        noticeService.deleteNotice(noticeId);
    }

    //자주묻는 질문 게시글 조회
    @RequestMapping(value = "/qna", method = RequestMethod.GET)
    public ResponseEntity findOneQnaBoard(PageRequestDTO pageRequestDTO) {
        PageResultDTO<NoticeDTO, Notice> qnaList = noticeService.getQnaList(pageRequestDTO);
        return new ResponseEntity<>(qnaList, HttpStatus.OK);
    }

}