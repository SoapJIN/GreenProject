package com.green.computer.service;

import com.green.computer.dto.MemberDTO;
import com.green.computer.entity.Member;
import com.green.computer.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface MemberService {

    public Member saveMember(Member member);

    List<Member> getMemberList();
    Long register(MemberDTO dto); //회원가입
    MemberDTO login(String email, String pwd);

    Member findByEmail(String email); //회원정보 하나만 불러오기



    


    default Member dtoToEntity(MemberDTO memberDTO) {
        Member member = Member.builder()
                .name(memberDTO.getName())
                .pwd(memberDTO.getPwd())
                .email(memberDTO.getEmail())
                .address(memberDTO.getAddress())
                .nickname(memberDTO.getNickname())
                .phone(memberDTO.getPhone())
                .build();
        return member;
    }

    default MemberDTO entityToDto(Member notice) {
        MemberDTO memberDTO = MemberDTO.builder()
                .name(notice.getName())
                .pwd(notice.getPwd())
                .email(notice.getEmail())
                .address(notice.getAddress())
                .nickname(notice.getNickname())
                .phone(notice.getPhone())
                .build();
        return memberDTO;
    }



}
