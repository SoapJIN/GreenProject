package com.green.computer.entity;

import com.green.computer.dto.QnaDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="Qna")
@ToString(exclude = {"member"})
public class Qna extends BaseEntity2{

    // memeber 당 1:1문의

    @Id
    @Column(name="qna_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qnaId;

    @Column(nullable = false)
    private String qnaType;

    @Column(nullable = false)
    private String qnaTitle;

    @Column(nullable = false)
    private String qnaContent;

    @Column(nullable = false)
    private String qnaPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;
    //유저 한명이 많은 게시글을 작성할 수 있으므로 ManyToOne 설정
    //but, ToString(exclude)를 통해 속성 제외


}
