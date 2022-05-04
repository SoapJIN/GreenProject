package com.green.computer.service;

import com.green.computer.dto.BoardDTO;
import com.green.computer.dto.PageRequestDTO;
import com.green.computer.dto.PageResultDTO;
import com.green.computer.entity.Board;
import com.green.computer.entity.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Log4j2
public class BoardServiceImpl implements BoardService{

    /*private final BoardRepository repository; // 자동 주입 final
    private final ReplyRepository replyRepository;

    @Override
    public Long register(BoardDTO dto) {
        log.info("받은 dto: "+dto);
        Board board = dtoToEntity(dto);
        repository.save(board);
        return board.getBno();
    }

    @Override
    public PageResultDTO<BoardDTO, Object[]> getList(PageRequestDTO pageRequestDTO) {
        log.info("받은 pageRequestDTO: "+pageRequestDTO);

        // 입력으로 받은 entity 배열에서 하나씩 꺼내면 0 index = Board, 1 index = Member, 2 index = replyCount
        Function<Object[],BoardDTO> fn = (en->entityToDto((Board)en[0],(Member)en[1], (Long)en[2]));
        //Page<Object[]> result = repository.getBoardWithReplyCount(pageRequestDTO.getPageable(Sort.by("bno").descending()));
        Page<Object[]> result = repository.searchPage(
                pageRequestDTO.getType(),
                pageRequestDTO.getKeyword(),
                pageRequestDTO.getPageable(Sort.by("bno").descending())
        );
        return new PageResultDTO<>(result,fn);
    }

    @Override
    public BoardDTO get(Long bno) {
        Object result = repository.getBoardByBno(bno);
        Object[] arr = (Object[]) result;
        return entityToDto((Board) arr[0], (Member) arr[1], (Long) arr[2]);
    }

    @Transactional
    @Override
    public void removeWithReplies(Long bno) {
        replyRepository.deleteByBno(bno);
        repository.deleteById(bno);
    }

    @Transactional
    @Override
    public void modify(BoardDTO boardDTO) {
        Board board = repository.getById(boardDTO.getBno());
        board.changeContent(boardDTO.getContent());
        board.changeTitle(boardDTO.getTitle());
        repository.save(board);
    }*/


}
