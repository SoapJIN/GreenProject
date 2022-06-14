package com.green.computer.service;

import com.green.computer.dto.QnaImageDTO;
import com.green.computer.entity.QnaImage;
import com.green.computer.repository.QnaImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class QnaImageServiceImpl implements QnaImageService{

    private final QnaImageRepository qnaImageRepository;

    private final FileService fileService;

    //저장할 경로가 없을 경우 만들어 주는 방법은 없는지 -> 찾아봐야 함
    @Value("c:/qna/contact")
    private String qnaImgLocation;

//    //Qna Img 저장
//    @Override
//    public void saveFileImg(QnaImage qnaImage, MultipartFile qnaImageFile) throws Exception {
//        System.out.println("QnaImageServiceImpl 이미지 저장===========================");
//        String orgImgName = qnaImageFile.getOriginalFilename();
//        String imgName;
//        String imgUrl;
//
//        if(orgImgName != null || orgImgName != "") {
//            // 저장할 경로 , 파일의 이름 , 파일의 바이트 배열을 파일 업로트 파라미터로 사용함
//            imgName = fileService.uploadFile(qnaImgLocation, orgImgName, qnaImageFile.getBytes());
//
//            // 저장한 상품 이미지를 불러올 경로를 설정
//            imgUrl = "/notice/contact/" + imgName;
//
//            System.out.println(imgName + "imgname");
//            System.out.println(imgUrl + "imgUrl");
//
//            qnaImage.updateImg(imgName, orgImgName, imgUrl);
//            qnaImageRepository.save(qnaImage);
//        }


 //   }

    //Qna Img 저장
    @Override
    public void saveFileImg(QnaImage qnaImage, MultipartFile qnaImageFile) throws Exception {
        System.out.println("QnaImageServiceImpl 이미지 저장===========================");
        String orgImgName = qnaImageFile.getOriginalFilename();
        String imgName;
        String imgUrl;

        if(orgImgName != null || orgImgName != "") {
            // 저장할 경로 , 파일의 이름 , 파일의 바이트 배열을 파일 업로트 파라미터로 사용함
            imgName = fileService.uploadFile(qnaImgLocation, orgImgName, qnaImageFile.getBytes());

            // 저장한 상품 이미지를 불러올 경로를 설정
            imgUrl = "/notice/contact/" + imgName;

            System.out.println(imgName + "imgname");
            System.out.println(imgUrl + "imgUrl");

            qnaImage.updateImg(imgName, orgImgName, imgUrl);
            qnaImageRepository.save(qnaImage);
        }


    }

    //Qna Img 업뎃
    @Override
    public void updateFileImg(Long qnaImageId, MultipartFile qnaImageFile) throws Exception {

        //파일이 있을때
        if(!qnaImageFile.isEmpty()) {
            QnaImage savedQnaImage = qnaImageRepository.findById(qnaImageId)
                    .orElseThrow(EntityNotFoundException::new);

            //기존 파일 삭제
            if(savedQnaImage.getImgName() != null || savedQnaImage.getImgName() != "") {
                fileService.deleteFile(qnaImgLocation+"/"+savedQnaImage.getImgName());
            }

            String orgImgName = qnaImageFile.getOriginalFilename();
            String imgName = fileService.uploadFile(qnaImgLocation, orgImgName, qnaImageFile.getBytes());
            String imgUrl = "/notice/contact/" + imgName;
            savedQnaImage.updateImg(orgImgName,imgName,imgUrl);
        }
    }

    @Override
    public List<QnaImageDTO> getImagesById(Long qnaId) {
        System.out.println("image get by id service 3) " + qnaId);
        List<QnaImage> qnaImages = qnaImageRepository.getMovieImageWithAll(qnaId);
        List<QnaImage> qnaImages1= new ArrayList<>();
        System.out.println("entity images 4)  : " + qnaImages);
        for(QnaImage  i : qnaImages){
            if(i!=null){
                qnaImages1.add(i);
            }
        }
        //qnaImg dto로 변환
        List<QnaImageDTO> qnaImageDTOList = new ArrayList<>();
        for(QnaImage img : qnaImages1) {
            QnaImageDTO qnaImageDTO = QnaImageDTO.builder()
                    .imgName(img.getImgName())
                    .imgUrl(img.getImgUrl())
                    .orgImgName(img.getOrgImgName())
                    .haveImg(img.getHaveImg())
                    .qnaImgeId(img.getId())
                    .build();
            qnaImageDTOList.add(qnaImageDTO);
        }
        return qnaImageDTOList;
    }
}
