package com.green.computer.repository;

import com.green.computer.dto.NoticeInterfaceDTO;
import com.green.computer.entity.Notice;
import com.green.computer.entity.Qna;
import com.querydsl.core.BooleanBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface NoticeRepository extends JpaRepository<Notice,Long>, QuerydslPredicateExecutor<Notice> {
    //Modifying 애노테이션에
    //clearAutomatically = true 값을 주면 해당 쿼리 실행 후 영속성 컨텍스트를 clear() 해준다.
    //clear()로 인해 영속성 컨텍스트가 초기화(기존 엔티티 날라감) 되어서 select를 한 조회 결과가
    //모두 영속성 컨텍스트에 저장된다.
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Notice n set n.noticeType = :#{#notice.noticeType}, n.noticeTitle= :#{#notice.noticeTitle}, n.noticeContent = :#{#notice.noticeContent} where n.noticeId = :#{#notice.noticeId}")
    void updateNotice(@Param("notice") Notice notice);

    @Query("SELECT  n  FROM Notice n WHERE n.noticeType = 't-no'")
    List<Notice> findByNoticeType();

    @Query("SELECT  n FROM Notice n WHERE n.noticeType = 't-qna'")
    Page<Notice> findByNoticeTypeQna(BooleanBuilder booleanBuilder, Pageable pageable);

    @Query("SELECT  n FROM Notice n WHERE n.noticeType = 't-no'")
    Page<Notice> findByNoticeTypePage(Pageable pageable);

}
