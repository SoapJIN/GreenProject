package com.green.computer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartOrderDTO {

    private Long cartItemId;
    private List<CartOrderDTO> cartOrderDTOList;
}
