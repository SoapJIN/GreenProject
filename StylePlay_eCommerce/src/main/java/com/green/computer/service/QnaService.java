package com.green.computer.service;

import com.green.computer.dto.NoticeDTO;
import com.green.computer.dto.QnaDTO;
import com.green.computer.entity.Member;
import com.green.computer.entity.Notice;
import com.green.computer.entity.Qna;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface QnaService {

    //이용자별 Qna문의 보여주기
    List<QnaDTO> getAllQnaForOneMember(String email);

    //이용자별 Qna 문의 등록하기 with 파일
    void registerQnaWithFile(QnaDTO qnaDTO, List<MultipartFile> qnaImageFileList, String email) throws Exception;

    //Qna 번호 누르면 그 내용 보여주기
    public QnaDTO getOneMemberQna(Long qnaId);

    //Qna 삭제
    void deleteQna(Long qnaId);


    default Qna dtoToEntity(QnaDTO qnaDTO) {
        Qna qna = Qna.builder()
                .qnaId(qnaDTO.getQnaId())
                .qnaType(qnaDTO.getQnaType())
                .qnaTitle(qnaDTO.getQnaTitle())
                .qnaContent(qnaDTO.getQnaContent())
                .qnaPhone((qnaDTO.getQnaPhone()))
                .build();
        return qna;
    }

    default QnaDTO entityToDto(Qna qna) {
        QnaDTO qnaDTO = QnaDTO.builder()
                .qnaId(qna.getQnaId())
                .qnaType(qna.getQnaType())
                .qnaTitle(qna.getQnaTitle())
                .qnaContent(qna.getQnaContent())
                .qnaPhone(qna.getQnaPhone())
                .regDate(qna.getRegDate())
                .build();
        return qnaDTO;
    }

    default Qna QnaWithMember(QnaDTO qnaDTO, Member member) {
        Qna qna = Qna.builder()
                .qnaId(qnaDTO.getQnaId())
                .qnaType(qnaDTO.getQnaType())
                .qnaTitle(qnaDTO.getQnaTitle())
                .qnaContent(qnaDTO.getQnaContent())
                .qnaPhone((qnaDTO.getQnaPhone()))
                .member(member)
                .build();
        return qna;
    }

}
