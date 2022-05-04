package com.green.computer.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cart_number;

    private int product_number;
    private String cart_value;
    private int product_count;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;
}
