package com.green.computer.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reply")
@DynamicInsert
@DynamicUpdate
@Data
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rno;

    @ManyToOne
    @JoinColumn(name="bno")
    @JsonBackReference //무한참조 방지
    private Board board;

    @Column(name="writer")
    private String writer;

    @Column(name="contents")
    private String contents;

    @Column(name="created_time")
    private LocalDateTime createdTime;


}
