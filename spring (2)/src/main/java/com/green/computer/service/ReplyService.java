package com.green.computer.service;

import com.green.computer.dto.ReplyDTO;
import com.green.computer.entity.Board;
import com.green.computer.entity.Reply;

import java.util.List;

public interface ReplyService {
   /* Long register(ReplyDTO replyDTO); // 댓글 등록
    List<ReplyDTO> getList(Long bno); // 특정 게시물의 댓글 목록
    void modify (ReplyDTO replyDTO); // 댓글 수정
    void remove(Long rno); // 댓글 삭제

    // ReplyDTO를 Reply객체로 변환 Board객체의 처리가 수반됨

    default Reply dtoToEntity(ReplyDTO dto){
        Board board = Board.builder()
                .bno(dto.getBno())
                .build();
        Reply reply = Reply.builder()
                .rno(dto.getRno())
                .text(dto.getText())
                .replyer(dto.getReplyer())
                .build();
        return reply;
    }

    default ReplyDTO entityTODTO(Reply reply){
        ReplyDTO dto = ReplyDTO.builder()
                .rno(reply.getRno())
                .text(reply.getText())
                .replyer(reply.getReplyer())
                .regDate(reply.getRegDate())
                .modDate(reply.getModDate())
                .build();
        return dto;
    }*/

}
