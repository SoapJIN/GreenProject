package com.green.computer.repository;

import com.green.computer.dto.QnaDTO;
import com.green.computer.entity.Member;
import com.green.computer.entity.Notice;
import com.green.computer.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QnaRepository extends JpaRepository<Qna,Long> {


    @Query("select q from Qna q " +
            "where q.member.id = (select m.id from Member m where m.email = :email) " +
            "order by q.regDate desc")
    List<Qna> findAllByQna(String email);


}
