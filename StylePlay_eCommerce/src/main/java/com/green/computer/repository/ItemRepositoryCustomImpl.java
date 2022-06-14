package com.green.computer.repository;

import com.green.computer.constant.ItemSellStatus;
import com.green.computer.dto.ItemSearchDTO;
import com.green.computer.dto.MainItemDTO;
import com.green.computer.dto.QMainItemDTO;
import com.green.computer.entity.Item;
import com.green.computer.entity.QItem;
import com.green.computer.entity.QItemImage;
import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

public class ItemRepositoryCustomImpl implements ItemRepositoryCustom{


    private JPAQueryFactory queryFactory; // 동적으로 쿼리를 생성하기 위해서

    public ItemRepositoryCustomImpl(EntityManager em){   // JPAQueryFactory 생성자로 EntityManager 를 넣어줌
        this.queryFactory = new JPAQueryFactory(em);
    }

    private BooleanExpression searchSellStatusEq(ItemSellStatus searchSellStatus){
        return searchSellStatus == null ? null : QItem.item.itemSellStatus.eq(searchSellStatus);
    }
    // 상품 판매 상태 조건이 null 일경우 null을 리턴
    // 프론트단에서 상품 상태 조건을 무조건 넣게 해서 상관은 없지만 혹시모를 오류를 방지하기위해서 null 체킹
    // null이 아닐 경우에는 둘 중 하나의 상태를 조회하도록 함


    private BooleanExpression regDtsAfter(String searchDateType){

        LocalDateTime dateTime = LocalDateTime.now();

        if(StringUtils.equals("all", searchDateType) || searchDateType == null){
            return null;
        } else if(StringUtils.equals("1d", searchDateType)){
            dateTime = dateTime.minusDays(1);
        } else if(StringUtils.equals("1w", searchDateType)){
            dateTime = dateTime.minusWeeks(1);
        } else if(StringUtils.equals("1m", searchDateType)){
            dateTime = dateTime.minusMonths(1);
        } else if(StringUtils.equals("6m", searchDateType)){
            dateTime = dateTime.minusMonths(6);
        }

        return QItem.item.regDate.after(dateTime);
    }
    // dateTime의 값을 이전 시간의 값으로 세팅 후 해당 시간 이후로 등록된 상품만 조회
    // 만약 1w이면 1주전으로 시간을 세팅 후 최근 일주동안 등록된 상품만 조회

    private BooleanExpression searchByLike(String searchBy, String searchQuery){

        if(StringUtils.equals("itemNm", searchBy)){
            return QItem.item.itemName.like("%" + searchQuery + "%");
        } else if(StringUtils.equals("createdBy", searchBy)){
            return QItem.item.createdBy.like("%" + searchQuery + "%");
        }

        return null;
    }

    // searchBy의 값에 따라서 상품명 검색어를 포함하고 있는 상품 또는 상품 생성자의 아이디에 검색어를 포함하고 있는 상품을 조회하도록 조건값을 반환합니다.

    //페이징 관련
    @Override
    public Page<Item> getItemPage(ItemSearchDTO itemSearchDTO, Pageable pageable) {
        List<Item> content = queryFactory
                .selectFrom(QItem.item) // 상품데이터를 조회
                .where(regDtsAfter(itemSearchDTO.getSearchDateType()),
                        searchSellStatusEq(itemSearchDTO.getSearchSellStatus()),
                        searchByLike(itemSearchDTO.getSearchBy(),
                                itemSearchDTO.getSearchQuery())) // BooleanExpression에서 반환하는 조건문을 넣어줌 ,로 넣으면 and로 인식
                .orderBy(QItem.item.id.desc())
                .offset(pageable.getOffset()) // 데이터를 가지고 올 시작 인덱스를 지정
                .limit(pageable.getPageSize()) // 한번에 가지고 올 최대 개수를 지정합니다.
                .fetch(); // 리스트로 반환해서 사이즈로 해결
        //.fetchResults(); // 조회한 리스트 및 전체 개수를 포함하는 쿼리결과를 반환  근데 이게 지금 디플리에키티드 되서 해결책 찾는중..



        return new PageImpl<>(content, pageable, content.size()); // 조회한 데이터를 PageImpl 객체로 변환
    }
    // https://devwithpug.github.io/java/querydsl-with-datajpa/ 관련 링크
// https://velog.io/@nestour95/QueryDsl-fetchResults%EA%B0%80-deprecated-%EB%90%9C-%EC%9D%B4%EC%9C%A0 관련 링크
// https://intrepidgeeks.com/tutorial/goodbye-fetchresults-fetchcount 관령링크
    private BooleanExpression itemNameLike(String searchQuery){

        return searchQuery.equals("Search products...") ? null : QItem.item.itemName.like("%"+searchQuery+"%");
    } // 검색어가 null이 아니면 검색어가 포함되는 상품을 반환함

    private BooleanExpression itemFilter(String type){
        System.out.println("itemFilter---==========type:"+type);
        return type == null ? null : QItem.item.itemType.like("%"+type+"%");
    }

    private BooleanExpression price2(Integer priceStart,Integer priceEnd){
        return priceStart == 0 ? null : QItem.item.price.between(priceStart,priceEnd);

    }

    @Override
    public Page<MainItemDTO> getMainItemPage(ItemSearchDTO itemSearchDTO, Pageable pageable, Integer priceStart, Integer priceEnd,String filterName,String searchName) {

        QItem item = QItem.item;
        QItemImage itemImage = QItemImage.itemImage;

        List<MainItemDTO> results = queryFactory
                .select(
                        new QMainItemDTO(
                                item.id,
                                item.itemName,
                                item.itemDetail,
                                itemImage.imgUrl,
                                item.price,
                                item.stockNumber,
                                item.itemSellStatus,
                                item.regDate,
                                item.modDate,
                                item.createdBy,
                                item.itemType)
                ) // 생성자 순서 중요!
                .from(itemImage)
                .join(itemImage.item, item)
                .where(itemImage.repimgYn.eq("Y")) // 대표이미지가 있을경우만
                .where(itemNameLike(searchName))
                .where(itemFilter(filterName))
                .where(price2(priceStart,priceEnd))
                .orderBy(item.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Tuple> result3 = queryFactory
                .select(
                        item.count(),
                        item.id.max()
                )
                .from(item)
                .where(itemFilter(filterName))
                .where(price2(priceStart,priceEnd))
                .where(itemNameLike(searchName))
                .fetch();
        Tuple tuple = result3.get(0);

        System.out.println("getMainItemPage:"+tuple.get(item.count()));
        System.out.println("priceStart:"+priceStart);

        return new PageImpl<>(results, pageable, tuple.get(item.count()));
    }

}
