package com.green.computer.repository;

import com.green.computer.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.transaction.annotation.Transactional;

public interface ItemRepository extends JpaRepository<Item,Long> , QuerydslPredicateExecutor<Item>, ItemRepositoryCustom {

    @Modifying
    @Transactional
    @Query("update Item m set m.createdBy = :createdBy where m.id =:id")
    Integer updateCreatedBy(String createdBy,Long id);
}
