package com.green.computer.repository;

import com.green.computer.constant.ItemSellStatus;
import com.green.computer.dto.ItemDTO;
import com.green.computer.entity.Item;
import com.green.computer.entity.ItemImage;
import com.green.computer.service.ItemService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@Transactional
public class ItemServiceTest {

    @Autowired
    ItemService itemService;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemImgRepository itemImgRepository;

    List<MultipartFile> createMultipartFiles() throws Exception{

        List<MultipartFile> multipartFileList = new ArrayList<>();

        for(int i=0;i<5;i++){
            String path = "C:/shop/item/";
            String imageName = "image" + i + ".jpg";
            MockMultipartFile multipartFile =
                    new MockMultipartFile(path, imageName, "image/jpg", new byte[]{1,2,3,4});
            multipartFileList.add(multipartFile);
        }

        return multipartFileList;
    }

    @Test
    void saveItem() throws Exception {
        ItemDTO itemFormDto = new ItemDTO();
        itemFormDto.setItemName("테스트상품");
        itemFormDto.setItemSellStatus(ItemSellStatus.SELL);
        itemFormDto.setItemDetail("테스트 상품 입니다.");
        itemFormDto.setPrice(1000);
        itemFormDto.setStockNumber(100);

        List<MultipartFile> multipartFileList = createMultipartFiles();
        Long itemId = itemService.saveItem(itemFormDto, multipartFileList);
        List<ItemImage> itemImgList = itemImgRepository.findByItemIdOrderByIdAsc(itemId);
        Item item = itemRepository.findById(itemId)
                .orElseThrow(EntityNotFoundException::new);



        if(itemFormDto.getItemName() == item.getItemName()) System.out.println("첫번째 테스트 통과");

        System.out.println(multipartFileList.get(0).getOriginalFilename());
        System.out.println(itemImgList.get(0).getOriImgName());


    }

    @Test
    void test() throws Exception{
        Item item = itemRepository.findById(25L).get();
        System.out.println(item);


        System.out.println(itemService.getItemDtl(25L));
    }

    @Test
    void test2() throws Exception{
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setItemName("테스트상품");
        itemDTO.setItemSellStatus(ItemSellStatus.SELL);
        itemDTO.setItemDetail("테스트 상품 입니다.");
        itemDTO.setPrice(1000);
        itemDTO.setStockNumber(100);


        Item item = itemRepository.findById(25L)
                .orElseThrow(EntityNotFoundException::new);
        item.updateItem(itemDTO); // 엔티티 업데이트
        List<Long> itemImgIds = itemDTO.getItemImgIds(); // 리스트 조회
        System.out.println(item.getItemName());
        System.out.println(itemImgIds);


        List<MultipartFile> multipartFileList = createMultipartFiles();

        ItemImage savedItemImg = itemImgRepository.findById(26L)
                .orElseThrow(EntityNotFoundException::new);

        System.out.println(savedItemImg);

    }
}
