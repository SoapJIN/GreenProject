package com.green.computer.service;

import com.green.computer.entity.Review;
import com.green.computer.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public List<Review> getAllReview(){
        return reviewRepository.findAll();
    }

    public Review createReview(Review review){
        review.setAuthor("Min");
        return reviewRepository.save(review);
    }

    public ResponseEntity<Map<String, Boolean>> deleteReview(
            Integer id){
        Review review = reviewRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        reviewRepository.delete(review);
        Map<String,Boolean> response = new HashMap<>();
        response.put("Deleted Review Data by id : ["+id+"]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
