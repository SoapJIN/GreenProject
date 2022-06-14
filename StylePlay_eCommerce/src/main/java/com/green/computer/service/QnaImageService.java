package com.green.computer.service;

import com.green.computer.dto.QnaImageDTO;
import com.green.computer.entity.QnaImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface QnaImageService {

    void saveFileImg(QnaImage qnaImage, MultipartFile qnaImageFile) throws Exception;

    void updateFileImg(Long qnaImageId, MultipartFile qnaImageFile) throws Exception;

    public List<QnaImageDTO> getImagesById(Long qnaId);
}
