package com.green.computer.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Qna_img")
@ToString
public class QnaImage extends BaseEntity2{

    @Id
    @Column(name="qna_image")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String imgName;

    private String orgImgName;

    private String imgUrl;

    private String haveImg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qnaId")
    private Qna qna;

    public void updateImg(String imgName, String orgImgName, String imgUrl) {
        this.imgName = imgName;
        this.orgImgName = orgImgName;
        this.imgUrl = imgUrl;
    }
}
