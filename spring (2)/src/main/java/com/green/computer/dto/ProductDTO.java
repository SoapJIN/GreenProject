package com.green.computer.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private int product_number;
    private String product_name;
    private int product_price;
    private int product_stock;
    private String product_desc;
    private LocalDateTime product_date;
    private int product_hits;

    //private String category_code;

}
