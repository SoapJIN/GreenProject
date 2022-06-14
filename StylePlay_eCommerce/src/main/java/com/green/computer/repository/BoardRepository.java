package com.green.computer.repository;

import com.green.computer.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board,Integer> {
//    Page<Board> findAll(Pageable pageable);
    List<Board> findAllByOrderByBnoDesc();

    List<Board> findByTitleContainingOrderByBnoDesc(@Param("search") String search); // @Param 안넣으면 2번이상 검색시 오류
    List<Board> findByContentsContainingOrderByBnoDesc(@Param("search") String search);
    List<Board> findByTitleContainingOrContentsContainingOrderByBnoDesc(@Param("search") String title,@Param("search") String contents);

}
