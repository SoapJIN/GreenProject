package com.green.computer.service;


import com.green.computer.entity.ItemImage;
import com.green.computer.repository.ItemImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemImgService {

    private final ItemImgRepository itemImgRepository;

    @Value("${itemImgLocation}")
    private String itemImgLocation;

    private final FileService fileService;

    public void saveItemImg(ItemImage itemImage, MultipartFile itemImgFile) throws Exception {
        String oriImgName = itemImgFile.getOriginalFilename();
        String imgName = "";
        String imgUrl = "";

        if (!StringUtils.isEmpty(oriImgName)) {
            //isBlank -> "", null, whitespace 체크
            //isEmpty -> "", null만 체크(최근버전부터 deprecated됨)
            //hasText -> "", null, whitespace 체크
            imgName = fileService.uploadFile(itemImgLocation, oriImgName, itemImgFile.getBytes());
            // 사용자가 상품 이미지를 등록했다면
            // 저장할 경로 , 파일의 이름 , 파일의 바이트 배열을 파일 업로트 파라미터로 사용함
            imgUrl = "/images/item/" + imgName;
            // 저장한 상품 이미지를 불러올 경로를 설정정

            itemImage.updateItemImg(oriImgName, imgName, imgUrl);
            System.out.println(itemImage+"확인용 1번");
            itemImgRepository.save(itemImage);
        }
    }
    public void updateItemImg(Long itemImgId, MultipartFile itemImgFile) throws Exception{

        if(!itemImgFile.isEmpty()){
            ItemImage savedItemImg = itemImgRepository.findById(itemImgId)
                    .orElseThrow(EntityNotFoundException::new);

            //기존 이미지 파일 삭제
            if(!StringUtils.isEmpty(savedItemImg.getImgName())) {
                fileService.deleteFile(itemImgLocation+"/"+
                        savedItemImg.getImgName());
            }

            String oriImgName = itemImgFile.getOriginalFilename();
            String imgName = fileService.uploadFile(itemImgLocation, oriImgName, itemImgFile.getBytes());
            String imgUrl = "/images/item/" + imgName;
            savedItemImg.updateItemImg(oriImgName, imgName, imgUrl);
        }

    }
}
