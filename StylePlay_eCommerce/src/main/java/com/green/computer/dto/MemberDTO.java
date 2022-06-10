package com.green.computer.dto;


import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    private String name;

    private String email;

    private String address;

    private String pwd;

    private String nickname;

    private String phone;

}
