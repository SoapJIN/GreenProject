package com.green.computer.controller;


import com.green.computer.dto.MemberDTO;
import com.green.computer.entity.Member;
import com.green.computer.repository.MemberRepository;
import com.green.computer.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
    private final MemberService memberService;
    @GetMapping(value="/list") //회원 리스트
    public ResponseEntity<List<Member>> memberList(){
        List<Member> members = memberService.getMemberList();
        return new ResponseEntity<List<Member>>(members,HttpStatus.OK);
    }

    @PostMapping(value="/member")
    public String memberForm(MemberDTO dto){
        Member member = Member.createMember(dto);
        memberService.saveMember(member);

        return "redirect:/";
    }
    @GetMapping("/signup") //가입창
    public void register(){
        System.out.println("???가입창");
    }

    @PostMapping("/signup") //가입창
    public ResponseEntity<MemberDTO> registerPost(MemberDTO dto,HttpServletResponse response) throws IOException {
        //회원 가입 목록에 데이터 입력하지 않아도 성공으로 react에서 처리되는 오류 범함
        if(dto.getEmail()==null) {
            System.out.println("이메일입력하지 않았어요");
            response.sendRedirect("http://localhost:3000/member/error");
            return new ResponseEntity<MemberDTO>(dto,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Long id = memberService.register(dto); //회원가입 저장
        if(id!=null) {
            System.out.println("id: " +id);
            response.sendRedirect("http://localhost:3000/member/login/" +id);
            return new ResponseEntity<MemberDTO>(dto,  HttpStatus.OK);
        }
        else {
            System.out.println("일치하는 사람이 없어요");
            response.sendRedirect("http://localhost:3000/member/error");
            return new ResponseEntity<MemberDTO>(dto,  HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping({"/login","/login/{id}"})
    public void login(@PathVariable("id") String id,HttpServletResponse response) throws IOException {
        System.out.println("여기는 그냥 " + "id: " +id);

    }

    @PostMapping("/login/{id}")
    public ResponseEntity logincCheck(@PathVariable String id,MemberDTO dto, HttpServletResponse response, HttpSession session) throws IOException {
        System.out.println("logincCheck 컨트롤러 : " + dto );
        HttpHeaders headers =new HttpHeaders();
        MemberDTO member = memberService.login(dto.getEmail(), dto.getPwd());
        if (member != null) {
            System.out.println("성공!");
            session.setAttribute("login",member);
            response.sendRedirect("http://localhost:3000/");
            return new ResponseEntity(headers, HttpStatus.OK);
        }
        if(member == null && dto.getEmail()!=null){
            System.out.println("그런 사람 없어요");
            response.sendRedirect("http://localhost:3000/member/error");
            return new ResponseEntity(headers, HttpStatus.NOT_FOUND);
        } else {
            System.out.println("아무것도 입력하지 않았어요 ");
            return new ResponseEntity(headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/edit/{email}")
    public ResponseEntity editPost(@PathVariable("email") String email, MemberDTO dto, HttpServletResponse response, HttpSession session) throws IOException {
        System.out.println("editPost 수정  컨트롤러 : " + dto );
        //회원 가입 목록에 데이터 입력하지 않아도 성공으로 react에서 처리되는 오류 범함
        if(dto.getEmail()==null) {
            System.out.println("이메일입력하지 않았어요");
            response.sendRedirect("http://localhost:3000/member/error");
            return new ResponseEntity<MemberDTO>(dto,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Member member = memberService.findByEmail(dto.getEmail());
        Long id = memberService.register(dto); //회원가입 저장
        if(id!=null) {
            System.out.println("id: " +id);
            response.sendRedirect("http://localhost:3000");
            return new ResponseEntity<MemberDTO>(dto,  HttpStatus.OK);
        }
        else {
            System.out.println("일치하는 사람이 없어요");
            response.sendRedirect("http://localhost:3000/member/error");
            return new ResponseEntity<MemberDTO>(dto,  HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/edit/{email}")
    public ResponseEntity memberEdit(@PathVariable String email,MemberDTO dto, HttpServletResponse response, HttpSession session) throws IOException {
        System.out.println("memberEdit 컨트롤러 : " + email );
//        HttpHeaders headers =new HttpHeaders();
//        MemberDTO member = memberService.login(dto.getEmail(), dto.getPwd());
//        if (member != null) {
//            System.out.println("성공!");
//            session.setAttribute("login",member);
//            response.sendRedirect("http://localhost:3000/");
            return new ResponseEntity(session.getAttribute("login"), HttpStatus.OK);
        }

    @PostMapping("/login")
    public ResponseEntity logincCheckPost(MemberDTO dto, HttpServletResponse response, HttpSession session) throws IOException {
        System.out.println("logincCheck 컨트롤러 : " + dto );
        HttpHeaders headers =new HttpHeaders();
        MemberDTO member = memberService.login(dto.getEmail(), dto.getPwd());
        if (member != null) {
            System.out.println("성공!");
            session.setAttribute("login",member);
            response.sendRedirect("http://localhost:3000/");
            return new ResponseEntity(headers, HttpStatus.OK);
        }
        if(member == null && dto.getEmail()!=null){
            System.out.println("그런 사람 없어요");
            response.sendRedirect("http://localhost:3000/member/error");
            return new ResponseEntity(headers, HttpStatus.NOT_FOUND);
        } else {
            System.out.println("아무것도 입력하지 않았어요 ");
            return new ResponseEntity(headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/mypage")
    public ResponseEntity<Member> mypagePost(HttpServletResponse response, HttpSession session) throws IOException {
        System.out.println("mypagePost 컨트롤러 : ");
        MemberDTO login = (MemberDTO) session.getAttribute("login");
        System.out.println("mypagePost login 된 사람 : " +login);

        Member member = memberService.findByEmail(login.getEmail());
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @GetMapping("/error")
    public void error(){
        System.out.println("error");
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response, HttpSession session) throws IOException {
        System.out.println("로그아웃 컨트롤러 ");
        System.out.println(session.getAttribute("login"));
        if(session.getAttribute("login") == null) {
            System.out.println("여기로 넘어오는지?");
            return  new ResponseEntity<>("ok",HttpStatus.BAD_REQUEST);
        }
        else {
            System.out.println("인벨리데이트로 넘어오는지?");
            session.invalidate();
            return  new ResponseEntity<>("ok",HttpStatus.OK);
        }
    }
}



