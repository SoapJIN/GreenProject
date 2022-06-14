package com.green.computer.repository;

import com.green.computer.entity.Board;
import com.green.computer.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply,Integer> {
    List<Reply> findAllByBoard(Board board);
}
