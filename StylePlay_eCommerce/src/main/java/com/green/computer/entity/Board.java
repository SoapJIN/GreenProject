package com.green.computer.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "board")
@DynamicInsert
@DynamicUpdate
@Data
public class Board{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bno;

    @Column(name ="type")
    private String type;

    @Column(name="title")
    private String title;

    @Column(name="contents")
    private String contents;

    @Column(name="member_no")
    private String memberNo;

    @Column(name="created_time")
    private LocalDateTime createdTime;

    @Column(name="updated_time")
    private LocalDateTime updatedTime;

    @Column(name="likes")
    private Integer likes;

    @Column(name="counts")
    private Integer counts;

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE) // 게시글이 삭제되면 댓글도 같이 삭제
    @JsonManagedReference //무한참조 방지
    private List<Reply> reply;


    @Formula("(SELECT count(1) FROM reply r WHERE r.bno = bno)") // 가상칼럼
    private int replyCount;
}

