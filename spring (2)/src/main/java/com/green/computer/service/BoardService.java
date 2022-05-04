package com.green.computer.service;

import com.green.computer.dto.BoardDTO;
import com.green.computer.dto.PageRequestDTO;
import com.green.computer.dto.PageResultDTO;
import com.green.computer.entity.Board;
import com.green.computer.entity.Member;

public interface BoardService {

   /* Long register(BoardDTO dto); // 데이터 등록

    PageResultDTO<BoardDTO,Object[]> getList(PageRequestDTO pageRequestDTO);

    BoardDTO get(Long bno);

    void removeWithReplies(Long bno);

    void modify(BoardDTO boardDTO);


    // DTO => Entity 변환
    default Board dtoToEntity(BoardDTO dto){
        Member member = Member.builder()
                .email(dto.getWriterEmail())
                .build();
        Board board = Board.builder()
                .bno(dto.getBno())
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(member)
                .build();
        return board;
    }

    // Entity => DTO 변환
    default BoardDTO entityToDto(Board board, Member member, Long replyCount){
        BoardDTO boardDTO = BoardDTO.builder()
                .bno(board.getBno())
                .title(board.getTitle())
                .content(board.getContent())
                .regDate(board.getRegDate())
                .modDate(board.getModDate())
                .writerEmail(member.getEmail())
                .writerName(member.getName())
                .replyCount(replyCount.intValue()) // long => int 변환
                .build();
        return boardDTO;
    }*/
}
