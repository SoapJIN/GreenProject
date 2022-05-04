package com.green.computer.entity;

import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "writer") // 항상 해야함(테이블 조인할때 writer는 제외시켜라)
public class Board extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bno;

    private String title;
    private String content;

    // 다 대 일 ([bno,title,content]:다 / [writer]:일)
    // FetchType: LAZY(Board 내역 출력(ToString)할때 writer는 가져오지 말아라(가져오려면 쿼리문 커짐(Member도 가져와야 하므로)),
    // writer 내역(Member)은 .writer로 추가 호출 시에 Member의 칼럼들까지 가져와라(BoardTest코드 참고)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member writer; // 연관관계 설정(Relation), ERD(Entity Relational Diagram)

    public void changeTitle(String title){
        this.title = title;
    }

    public void changeContent(String content){
        this.content = content;
    }

}
