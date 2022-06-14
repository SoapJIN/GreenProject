package com.green.computer.service;

import com.green.computer.entity.Board;
import com.green.computer.entity.Member;
import com.green.computer.repository.BoardRepository;
import com.green.computer.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    // get boards data
//    public Page<Board> getAllBoard(Integer page) { //Repository 호출하여 글목록 데이터를 리턴
//        Page<Board> boards = boardRepository.findAll(PageRequest.of(page,10));
//
//        return boards;
//    }
    public List<Board> getAllBoard() {
        return boardRepository.findAllByOrderByBnoDesc();
    }


    public Board createBoard(Board board) {

        board.setMemberNo("min");
        return boardRepository.save(board);
    }

    public ResponseEntity<Board> getBoard(Integer bno) {
        Board board = boardRepository.findById(bno)
                .orElseThrow(EntityNotFoundException::new);
        return ResponseEntity.ok(board);
    }

    public List<Board> getBoardByTitle(String search) {
        List<Board> board = boardRepository.findByTitleContainingOrderByBnoDesc(search);
        return board;
    }

    public List<Board> getBoardByContents(String search) {
        List<Board> board = boardRepository.findByContentsContainingOrderByBnoDesc(search);
        return board;
    }

    public List<Board> getBoardByTitleOrContents(String title,String contents) {
        List<Board> board = boardRepository.findByTitleContainingOrContentsContainingOrderByBnoDesc(title,contents);
        return board;
    }
    public ResponseEntity<Board> updateBoard(
            Integer bno, Board updatedBoard) {
        Board board = boardRepository.findById(bno)
                .orElseThrow(EntityNotFoundException::new);
        board.setType(updatedBoard.getType());
        board.setTitle(updatedBoard.getTitle());
        board.setContents(updatedBoard.getContents());
        board.setUpdatedTime(LocalDateTime.now());

        Board endUpdatedBoard = boardRepository.save(board);
        return ResponseEntity.ok(endUpdatedBoard);
    }

    public ResponseEntity<Board> updateBoardCounts(
            Integer bno, Board updatedBoard) {
        Board board = boardRepository.findById(bno)
                .orElseThrow(EntityNotFoundException::new);
        board.setCounts(updatedBoard.getCounts());
        Board endUpdatedBoard = boardRepository.save(board);
        return  ResponseEntity.ok(endUpdatedBoard);
    }
    public ResponseEntity<Board> updateBoardLikes(
            Integer bno, Board updatedBoard) {
        Board board = boardRepository.findById(bno)
                .orElseThrow(EntityNotFoundException::new);
        board.setLikes(updatedBoard.getLikes());
        Board endUpdatedBoard = boardRepository.save(board);
        return  ResponseEntity.ok(endUpdatedBoard);
    }

    public ResponseEntity<Map<String, Boolean>> deleteBoard(
            Integer bno) {
        Board board = boardRepository.findById(bno)
                .orElseThrow(EntityNotFoundException::new);

        boardRepository.delete(board);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : ["+bno+"]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
