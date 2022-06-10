package com.green.computer.service;

import com.green.computer.dto.MemberDTO;
import com.green.computer.entity.Member;
import com.green.computer.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl  implements  MemberService{
    private final MemberRepository memberRepository;

    public Member saveMember(Member member){
        validateDuplicateMember(member);
        return memberRepository.save(member);
    }

    @Override
    public List<Member> getMemberList() {
        return memberRepository.findAll();
    }

    @Override
    public Long register(MemberDTO dto) {
        Member member = dtoToEntity(dto);
        memberRepository.save(member);
        return member.getId();
    }

    @Override
    public MemberDTO login(String email, String pwd) {
        System.out.println("login 서비스  :email  " +email + " " +pwd);
        Member member= memberRepository.login(email, pwd);
        if(member!=null){
            System.out.println("서비스 검색 결과 : " +member);
            MemberDTO dto = MemberDTO.builder()
                    .email(member.getEmail())
                    .pwd(member.getPwd())
                    .build();
            return dto;
        }  else {
            System.out.println("검색된 사람이 없어요");
            return null;
        }

    }

    @Override
    public Member findByEmail(String email) {
        Member member = memberRepository.findByEmail(email);
        return member;
    }

    private void validateDuplicateMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        if (findMember != null) {
            throw new IllegalStateException("이미 가입된 회원입니다");
        }
    }

}
