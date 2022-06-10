package com.green.computer.repository;

import com.green.computer.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);

    @Query(value = "select m from Member m where m.email = :email AND m.pwd = :pwd")
    Member login(@Param("email") String email, @Param("pwd") String pwd); //로그인 확인
}
