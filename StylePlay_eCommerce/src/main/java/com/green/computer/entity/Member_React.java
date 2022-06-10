package com.green.computer.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Member_React extends BaseEntity2{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bno;


    private String email;

    private String password;
    private String nickname;
}
