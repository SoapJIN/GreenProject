package com.green.computer.dto;

import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResultDTO<DTO,EN> { // generic(template)형태로 관리
    private List<DTO> dtoList;

    private int totalPage; // 총 페이지 번호
    private int page; // 현재 페이지 번호
    private int size; // 목록 사이즈

    // 시작페이지 번호, 끝페이지 번호
    private int start,end;

    // 이전, 다음
    private boolean prev, next;

    // 페이지 번호 목록
    private List<Integer> pageList;

    // 생성자(dtoList, totalPage)
    public PageResultDTO(Page<EN> result, Function<EN,DTO> fn){ // Function<들어오는것,나가는것>
        dtoList = result.stream().map(fn).collect(Collectors.toList());
        totalPage = result.getTotalPages();
        makePageList(result.getPageable());
    }

    // 메서드(Paging)
    private void makePageList(Pageable pageable){
        this.page = pageable.getPageNumber()+1; // 현재페이지 번호 *0부터 시작하므로 1 더함
        this.size = pageable.getPageSize(); // 한페이지당 데이터개수

        // temp end page
        int tempEnd = (int)(Math.ceil(page/10.0))*10; // 현재 페이지 기준 끝페이지(화면상의 끝페이지 번호) 번호 산출
        start = tempEnd-9; // 현재 페이지 기준 시작페이지(화면상의 시작페이지 번호) 번호 산출
        prev = start>1; // 이전 버튼 유무
        end = totalPage>tempEnd? tempEnd:totalPage; // 현재 페이지 기준 끝페이지 번호 산출
        next = totalPage>tempEnd; // 다음 버튼 유무
        pageList = IntStream.rangeClosed(start,end).boxed().collect(Collectors.toList()); // 현재페이지 기준 페이지번호 리스트(start=1, end=10 이면 1~10페이지)
    }
}
