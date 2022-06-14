package com.green.computer.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass // 이 어노테이션이 적용된 클래스는 테이블로 생성되지 않음, 실제 클래스는 이것을 상속 받는 Entity가 테이블에 적용됨
@EntityListeners(value = {AuditingEntityListener.class}) // 이벤트가 발생하면 감시함
@Getter
@DynamicUpdate
abstract public class BaseEntity { // 추상클래스
    @CreatedDate
    @Column(name = "regdate",updatable = false) // updatable: 수정 가능여부
    private LocalDateTime regDate;

    @LastModifiedDate
    @Column(name = "moddate")
    private LocalDateTime modDate;



}
