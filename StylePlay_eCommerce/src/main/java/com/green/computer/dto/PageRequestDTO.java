package com.green.computer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Builder
@AllArgsConstructor
@Data
public class PageRequestDTO {

    private int page;
    private int size;
    private String type;
    private String keyword;

    // 생성자
    public PageRequestDTO(){
        this.page = 1;
        this.size = 10;
    }

    // 메서드
    public Pageable getPageable(Sort sort){
        return PageRequest.of(page-1,size,sort);
    }
    // JPA를 이용하는 경우 페이지 번호가 0부터 시작하므로 1페이지의 경우 0이 될수 있도록 page-1을 함
}
