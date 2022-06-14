package com.green.computer.controller;

import com.green.computer.entity.Board;
import com.green.computer.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // CORS문제를 해결하기 위함
@RestController
@RequestMapping("/api")
public class BoardController {
    @Autowired
    private BoardService boardService;

//    @GetMapping("/board") // Service를 호출해 글목록의 데이터를 리턴
//    public Page<Board> getAllBoards(@RequestParam("page") Integer page) {
//        return boardService.getAllBoard(page);
//    }
    @GetMapping("/board")
	public List<Board> getAllBoards() {
		return boardService.getAllBoard();
	}

    @PostMapping("/board")
    public Board createBoard(@RequestBody Board board) {
        return boardService.createBoard(board);
    }

    @GetMapping("/board/{bno}")
    public ResponseEntity<Board> getBoardByNo(
            @PathVariable Integer bno) {

        return boardService.getBoard(bno);
    }

    @GetMapping("/board/search")
    public List<Board> getBoardByKeyword(@RequestParam("search") String search,
                                         @RequestParam("searchType") String searchType) {
        System.out.println("============================================================");
        System.out.println("============================================================");
        System.out.println("============================================================");
        System.out.println("============================================================");


        System.out.println("컨트롤러가 받은 search:"+search);
        System.out.println("컨트롤러가 받은 searchType:"+searchType);
        switch (searchType){
            case "tpc":return boardService.getBoardByTitleOrContents(search,search);
            case "title":return boardService.getBoardByTitle(search);
            case "contents":return boardService.getBoardByContents(search);
            default: return boardService.getAllBoard();
        }
    }
    @PutMapping("/board/{bno}")
    public ResponseEntity<Board> updateBoardByNo(
            @PathVariable Integer bno, @RequestBody Board board){

        return boardService.updateBoard(bno, board);
    }
    @PutMapping("/board/count/{bno}")
    public ResponseEntity<Board> updateBoardCountsByNo(
            @PathVariable Integer bno, @RequestBody Board board){

        return boardService.updateBoardCounts(bno,board);
    }
    @PutMapping("/board/likes/{bno}")
    public ResponseEntity<Board> updateBoardLikesByNo(
            @PathVariable Integer bno, @RequestBody Board board){

        return boardService.updateBoardLikes(bno,board);
    }

    @DeleteMapping("/board/{bno}")
    public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(
            @PathVariable Integer bno) {

        return boardService.deleteBoard(bno);
    }



}
