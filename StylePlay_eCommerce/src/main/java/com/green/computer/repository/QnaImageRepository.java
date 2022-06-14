package com.green.computer.repository;

import com.green.computer.entity.ItemImage;
import com.green.computer.entity.QnaImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QnaImageRepository extends JpaRepository<QnaImage,Long> {

    @Query("select qi from Qna q left outer join QnaImage qi on qi.qna = q ")
    List<QnaImage> getMovieImageWithAll(Long qnaId);// 특정 영화 조회

}
