package com.green.computer.repository;

import com.green.computer.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@SpringBootTest
@Transactional
public class MemberTest {
    @Autowired
    private MemberRepository memberRepository;

    @PersistenceContext
    private EntityManager em;

    @Test
    public void aduitingTest(){
        Member member1 = new Member();
        memberRepository.save(member1);

        em.flush();
        em.clear();

        Member member = memberRepository.findById(member1.getId()).orElseThrow(EntityNotFoundException::new);

        System.out.println(member.getRegDate());
        System.out.println(member.getModDate());
    }
}
