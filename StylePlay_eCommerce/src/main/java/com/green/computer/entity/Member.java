package com.green.computer.entity;

import com.green.computer.constant.Role;
import com.green.computer.dto.MemberDTO;
import lombok.*;

import javax.persistence.*;


@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "member")
public class Member extends BaseEntity2{

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Column(unique = true,name = "email")
    private String email;

    private String pwd;

    private String address;

    private String phone;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Role role;

    public static Member createMember(MemberDTO dto){
        Member member = Member.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .pwd(dto.getPwd())
                .nickname(dto.getNickname())
                .phone(dto.getPhone())
                .role(Role.USER)
                .build();
        return  member;
    }

}
