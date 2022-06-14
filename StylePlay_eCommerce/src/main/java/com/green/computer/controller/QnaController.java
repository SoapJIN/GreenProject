package com.green.computer.controller;

import com.green.computer.dto.MemberDTO;
import com.green.computer.dto.QnaDTO;
import com.green.computer.dto.QnaImageDTO;
import com.green.computer.service.QnaImageService;
import com.green.computer.service.QnaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.File;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
@Slf4j
public class QnaController {

    //@Value("${com.green.upload.path}") //application.properties 변수
    private String uploadPath="c:\\qna\\contact";

    private final QnaService qnaService;

    private final QnaImageService qnaImageService;

    //1:1문의 이동하면 로그인 중인지 아닌지 판단
    @RequestMapping(value = "/contact", method = RequestMethod.GET )
    public ResponseEntity CheckToLoginContact(HttpSession session) {
        System.out.println("여기 세션 체크 잘 들어오나?" + session.getAttribute("login"));
        //로그인 중이면  그동안 문의 내역 가져오기
        MemberDTO memberDTO = (MemberDTO) session.getAttribute("login");
        String email = memberDTO.getEmail();

        try {
            List<QnaDTO> qnaDTOList = qnaService.getAllQnaForOneMember(email);
            System.out.println(qnaDTOList + "==================== qna dto list ===================");
            return new ResponseEntity<>(qnaDTOList, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(email + "왜안되는거야" + memberDTO);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        //로그인 중 아니면 글쓰기 불가(프론트에서는 알림 후 로그인 화면으로 이동)
    }

    //1:1문의(파일 포함) 등록처리 with member
    @PostMapping(value = "/contact/register")
    public ResponseEntity registerContact(@Valid QnaDTO qnaDto, BindingResult bindingResult
            , @RequestParam("qnaImgFiles") List<MultipartFile> qnaImageFileList, HttpSession session) {
        System.out.println("qna 등록 컨트롤러 ???????????????????????????");
        MemberDTO memberDTO = (MemberDTO) session.getAttribute("login");
        String email = memberDTO.getEmail();

        // bindingResult -> 유효성 검증(간단하게 필수값 있는지 없는지)
        if (bindingResult.hasErrors()) {
            //입력값 없으면 에러 전송(파일 제외 전부 필수 값)
            System.out.println("필수값 없음");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); //400
        }

        try {
            qnaService.registerQnaWithFile(qnaDto, qnaImageFileList, email);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); //403
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    //1:1문의 누르면 조회
    @RequestMapping(value = "/qnadetail/{qnaId}", method = RequestMethod.GET)
    public  ResponseEntity<QnaDTO> oneQnaForMember(@PathVariable("qnaId") Long qnaId) {
        System.out.println("여기 하나 조회하는 곳 1)  ================= qnaId" + qnaId);
        QnaDTO qnaDTO = qnaService.getOneMemberQna(qnaId);
        List<QnaImageDTO> images = qnaImageService.getImagesById(qnaId);
        qnaDTO.setQnaImageDTOList(images);
        System.out.println("images: 5) " + qnaDTO);
        return new ResponseEntity<>(qnaDTO,HttpStatus.OK);
    }


    //1:1문의 삭제처리(수정은 없다 그냥 삭제해라)
    @RequestMapping(value="/qnadelete/{qnaId}", method = RequestMethod.DELETE)
    public void deleteQna(@PathVariable("qnaId") Long qnaId) {
        System.out.println("1:1문의 삭제처리");
        qnaService.deleteQna(qnaId);
    }

    //이미지 보여주기
    @GetMapping("/display")
    public ResponseEntity<byte[]> getFile(String fileName){
        System.out.println("display: " +fileName);
        ResponseEntity<byte[]> result =null;
        try{
            String srcFileName = URLDecoder.decode(fileName,"UTF-8");
            System.out.println("fileName: " +fileName);
            File file =new File(uploadPath+ File.separator+srcFileName);

            System.out.println("File : " +file);
            HttpHeaders header = new HttpHeaders();
            //MIME 타입 처리
            header.add("Content-Type", Files.probeContentType(file.toPath()));
            //파일 데이터 처리
            result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file),header, HttpStatus.OK);
        } catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

}

