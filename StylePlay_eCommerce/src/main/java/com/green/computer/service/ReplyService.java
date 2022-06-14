package com.green.computer.service;

import com.green.computer.entity.Board;
import com.green.computer.entity.Reply;
import com.green.computer.repository.BoardRepository;
import com.green.computer.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final BoardRepository boardRepository;
    public List<Reply> getAllReply(Integer bno){
        Board board = boardRepository.findById(bno)
                .orElseThrow(EntityNotFoundException::new);
        return replyRepository.findAllByBoard(board);
    }

    public Reply createReply(Reply reply,Integer bno){
        Optional<Board> findBoard = boardRepository.findById(bno);
        reply.setBoard(findBoard.get());
        reply.setWriter("Min");
        return replyRepository.save(reply);
    }

    public ResponseEntity<Map<String, Boolean>> deleteReply(
            Integer rno) {
        Reply reply = replyRepository.findById(rno)
                .orElseThrow(EntityNotFoundException::new);

        replyRepository.delete(reply);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : ["+rno+"]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
