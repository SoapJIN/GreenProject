package com.green.computer.dto;


import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member_ReactDTO {

    private Long bno;


    private String email;

    private String password;
    private String nickname;
}
