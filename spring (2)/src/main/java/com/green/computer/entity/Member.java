package com.green.computer.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Member extends BaseEntity{

    @Id
    private String email;

    private String password;
    private String name;
}
