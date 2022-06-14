package com.green.computer.entity;

import com.green.computer.constant.ItemSellStatus;
import com.green.computer.dto.ItemDTO;
import com.green.computer.exception.OutOfStockException;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.*;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "item")
@DynamicInsert
@DynamicUpdate
@ToString
public class Item extends BaseEntity{
    @Id
    @Column(name="item_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;       //상품 코드

    @Column(nullable = false, length = 50)
    private String itemName; //상품명

    @Column(name="price", nullable = false)
    private int price; //가격

    @Column(nullable = false)
    private int stockNumber; //재고수량

    @Lob
    @Column(nullable = false)
    private String itemDetail; //상품 상세 설명

    @Enumerated(EnumType.STRING)
    private ItemSellStatus itemSellStatus; //상품 판매 상태

    private String itemType;

    @CreatedBy
    @Column(name = "createdBy"/*columnDefinition = "varchar(20) default 'item@naver.com'"*/)
    private String createdBy;


    public void updateItem(ItemDTO dto){
        this.itemName = dto.getItemName();
        this.price = dto.getPrice();
        this.stockNumber = dto.getStockNumber();
        this.itemDetail = dto.getItemDetail();
        this.itemSellStatus = dto.getItemSellStatus();
        this.itemType = dto.getItemType();
    }

    public void removeStock(int stockNumber){
        int restStock = this.stockNumber - stockNumber;
        if(restStock<0){
            throw new OutOfStockException("상품의 재고가 부족 합니다. (현재 재고 수량: " + this.stockNumber + ")");
        }
        this.stockNumber = restStock;
    }
    
    //주문 취소시 취소한 수량 다시 stockNumber에 저장
    public void addStock(int stockNumber){
        this.stockNumber += stockNumber;
    }
}
