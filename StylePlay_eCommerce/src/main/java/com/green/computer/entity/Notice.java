package com.green.computer.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="notice")
@ToString(exclude = {"member"})
public class Notice extends BaseEntity2{

    @Id
    @Column(name = "notice_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId; //공지 게시글 번호

    @Column(name = "notice_type")
    private String noticeType; // int로 바꿀 가능성 있음

    @Column(name = "notice_title")
    private String noticeTitle; // 공지 제목

    @Column(name = "notice_content")
    private String noticeContent; // 공지 내용

    @Column(name = "notice_writer")
    private String noticeWriter; // 공지 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
    //유저 한명이 많은 게시글을 작성할 수 있으므로 ManyToOne 설정
    //but, ToString(exclude)를 통해 속성 제외


}
