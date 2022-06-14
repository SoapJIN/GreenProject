package com.green.computer.service;

import com.green.computer.dto.QMainItemDTO;
import com.green.computer.dto.QnaDTO;
import com.green.computer.dto.QnaImageDTO;
import com.green.computer.entity.Member;
import com.green.computer.entity.Qna;
import com.green.computer.entity.QnaImage;
import com.green.computer.repository.MemberRepository;
import com.green.computer.repository.NoticeRepository;
import com.green.computer.repository.QnaImageRepository;
import com.green.computer.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService{

    private final MemberRepository memberRepository;
    private final QnaRepository qnaRepository;

    private final QnaImageRepository qnaImageRepository;
    private final QnaImageService qnaImageService;

    //로그인 사용자의 Qna문의 보여주기
    @Override
    public List<QnaDTO> getAllQnaForOneMember(String email) {
        List<QnaDTO> qnaDTOList = new ArrayList<>();

        //이메일로 그동안 쓴 문의 내역 가져오기(이메일은 고유값)
        //2중 for 문이라 delay 가 많이 되겠지만... 일단은 ㅠ
        List<Qna> entityList = qnaRepository.findAllByQna(email);

        //qnaImg dto로 변환해서 담을 list
        List<QnaImageDTO> qnaImageDTOList =new ArrayList<>();

        for(Qna entity : entityList) {
            QnaDTO qnaDto = entityToDto(entity);
            List<QnaImage> imgList = qnaImageRepository.findAllById(Collections.singleton(qnaDto.getQnaId()));

            // 파일처리
            for(QnaImage img : imgList) {
                QnaImageDTO qnaImageDTO = QnaImageDTO.builder()
                        .imgName(img.getImgName())
                        .imgUrl(img.getImgUrl())
                        .orgImgName(img.getOrgImgName())
                        .haveImg(img.getHaveImg())
                        .qnaImgeId(img.getId())
                        .build();
                qnaImageDTOList.add(qnaImageDTO);
            }
            //dto 이미지 리스트에 넣어주기
            qnaDto.setQnaImageDTOList(qnaImageDTOList);
            qnaDTOList.add(qnaDto);
        }
        return qnaDTOList;
    }

    //Qna 등록
    @Override
    public void registerQnaWithFile(QnaDTO qnaDto, List<MultipartFile> qnaImageFileList, String email) throws Exception {
        System.out.println("QnaServiceImpl Qna 저장------------------------");

        //entity로 변환후 저장
        Member member = memberRepository.findByEmail(email);
        Qna qna = QnaWithMember(qnaDto, member);
        qnaRepository.save(qna);


        for (int i=0; i<qnaImageFileList.size(); i++) {
            QnaImage qnaImage = new QnaImage();
            qnaImage.setQna(qna);
            qnaImageService.saveFileImg(qnaImage, qnaImageFileList.get(i));
        }
    }

//    //Qna 하나 조회한거 돌려주기
//    @Override
//    public QnaDTO getOneMemberQna(Long qnaId) {
//        //qnaId로 qna와 qnaImg 조회
//        Optional<Qna> qna = qnaRepository.findById(qnaId);
//        List<QnaImage> list = qnaImageRepository.findAllById(Collections.singleton(qnaId));
//
//        //qnaImg dto로 변환해서 담을 list
//        List<QnaImageDTO> qnaImageDTOList =new ArrayList<>();
//
//        //qnaImg dto로 변환
//        for(QnaImage img : list) {
//            QnaImageDTO qnaImageDTO = QnaImageDTO.builder()
//                    .imgName(img.getImgName())
//                    .imgUrl(img.getImgUrl())
//                    .orgImgName(img.getOrgImgName())
//                    .haveImg(img.getHaveImg())
//                    .qnaImgeId(img.getId())
//                    .build();
//            qnaImageDTOList.add(qnaImageDTO);
//        }
//
//        System.out.println(qnaImageDTOList + "여기 서비스단 이미지 리스트");
//
//        //최종 qnaDto로 변환
//        QnaDTO qnaDTO = QnaDTO.builder()
//                .qnaId(qna.get().getQnaId())
//                .qnaTitle(qna.get().getQnaTitle())
//                .qnaContent(qna.get().getQnaContent())
//                .qnaPhone(qna.get().getQnaPhone())
//                .qnaType(qna.get().getQnaType())
//                .qnaImageDTOList(qnaImageDTOList)
//                .build();
//
//        return qnaDTO;
//    }

    //Qna 하나 조회한거 돌려주기
    @Override
    public QnaDTO getOneMemberQna(Long qnaId) {
        //qnaId로 qna와 qnaImg 조회
        Optional<Qna> qna = qnaRepository.findById(qnaId);
        Qna qna_1 = qna.get();
        System.out.println("qna_1 2) " + qna_1);
        //qna_1.getQnaId();
        //Optional<QnaImage> list = qnaImageRepository.findById(qna_1.getQnaId());
        //System.out.println("member qna list :" +list.get());
        //qnaImg dto로 변환해서 담을 list
        List<QnaImageDTO> qnaImageDTOList =new ArrayList<>();



        System.out.println(qnaImageDTOList + "여기 서비스단 이미지 리스트");

        //최종 qnaDto로 변환
        QnaDTO qnaDTO = QnaDTO.builder()
                .qnaId(qna.get().getQnaId())
                .qnaTitle(qna.get().getQnaTitle())
                .qnaContent(qna.get().getQnaContent())
                .qnaPhone(qna.get().getQnaPhone())
                .qnaType(qna.get().getQnaType())
                .qnaImageDTOList(qnaImageDTOList)
                .build();

        return qnaDTO;
    }


    //qna 문의 삭제
    @Transactional
    @Override
    public void deleteQna(Long qnaId) {
        qnaImageRepository.deleteById(qnaId);
        qnaRepository.deleteById(qnaId);
    }


}
