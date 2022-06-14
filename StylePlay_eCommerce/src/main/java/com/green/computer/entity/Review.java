package com.green.computer.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "review")
@DynamicInsert
@DynamicUpdate
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="author")
    private String author;

    @Column(name="content")
    private String content;

    @Column(name="created_time")
    private LocalDateTime createdTime;

    @Column(name="rating")
    private Integer rating;
}
