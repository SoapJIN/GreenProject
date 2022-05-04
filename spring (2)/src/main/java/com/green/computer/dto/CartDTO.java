package com.green.computer.dto;

import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
    private int cart_number;
    private String cart_value;
    private int product_count;

    private int product_number;
}
