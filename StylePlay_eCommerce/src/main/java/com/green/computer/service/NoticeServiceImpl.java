package com.green.computer.service;

import com.green.computer.dto.*;
import com.green.computer.entity.Notice;
import com.green.computer.entity.QNotice;
import com.green.computer.repository.NoticeRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    private final NoticeRepository noticeRepository;

    //공지 게시글 등록
    @Override
    public void register(NoticeDTO noticeDTO) {
        Notice notice = dtoToEntity(noticeDTO);
        noticeRepository.save(notice);
    }

    //공지 전체 불러오기
    @Override
    public List<NoticeDTO> getNoticeList() {
        //저장된 공지사항을 전부 불러옴
        List<Notice> list = noticeRepository.findByNoticeType();

        //불러온 공지사항 DTO로 변환(default로 만들어둔 entityToDto)
        List<NoticeDTO> noticeDTOList =
                list.stream()
                        .map(notice -> entityToDto(notice))
                        .collect(Collectors.toList());
        return noticeDTOList;
    }

    //공지 번호 누르면 가져와서 보여주기
    @Override
    public NoticeDTO getOneBoardNotice(Long notice_id) {
        Optional<Notice> notice = noticeRepository.findById(notice_id);
        NoticeDTO dto = NoticeDTO.builder()
                .noticeId(notice.get().getNoticeId())
                .noticeTitle(notice.get().getNoticeTitle())
                .noticeType(notice.get().getNoticeType())
                .noticeContent(notice.get().getNoticeContent())
                .regDate(notice.get().getRegDate())
                .build();
        return dto;
    }

    //공지 수정하기
    @Override
    public void modifyNotice(NoticeDTO noticeDTO) {
        Notice notice = dtoToEntity(noticeDTO);
        noticeRepository.updateNotice(notice);
    }

    //공지 삭제하기
    @Override
    public void deleteNotice(Long notice_id) {
        noticeRepository.deleteById(notice_id);
    }

    //자주묻는 질문 게시글 가져오기(전체) with page
    @Override
    public PageResultDTO<NoticeDTO, Notice> getQnaList(PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("noticeId").descending());
        BooleanBuilder booleanBuilder = getSearch(requestDTO);
        Page<Notice> result= noticeRepository.findByNoticeTypeQna(booleanBuilder, pageable);
        System.out.println(result);
        Function<Notice, NoticeDTO> no = (entity->entityToDto(entity));
        return new PageResultDTO<>(result,no);
    }

    @Override
    public Page<Notice> getTnoBoard(Integer page) {
        Page<Notice> Notice = noticeRepository.findByNoticeTypePage(PageRequest.of(page,10));
        return Notice;
    }


    //검색조건
    private BooleanBuilder getSearch(PageRequestDTO requestDTO){ //Querydsl 처리
        String type= requestDTO.getType();
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QNotice qNotice = QNotice.notice;
        String keyword = requestDTO.getKeyword();
        BooleanExpression expression = qNotice.noticeId.gt(0L);// gno>0 조건만 생성
        booleanBuilder.and(expression);
        if(type==null || type.trim().length()==0) return  booleanBuilder;//검색조건이 없는 경우 종료
        //검색 조건 작성하기(conditonBuilder에 포함되는걸 다 모은다.)
        BooleanBuilder conditionBuilder = new BooleanBuilder();

        //where title = "sample"
        if(type.contains("t")) conditionBuilder.or(qNotice.noticeTitle.contains(keyword));
        // or content = "sample"
        if(type.contains("c")) conditionBuilder.or(qNotice.noticeContent.contains(keyword));
        if(type.contains("w")) conditionBuilder.or(qNotice.noticeWriter.contains(keyword));
        //모든 조건 통합
        booleanBuilder.and(conditionBuilder); //booleanBuilder에 결합됨
        return booleanBuilder;
    }

}
