package com.green.computer.controller;

import com.green.computer.entity.Review;
import com.green.computer.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // CORS문제를 해결하기 위함
@RestController
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/review")
    public List<Review> getAllReview(){
        return reviewService.getAllReview();
    }

    @PostMapping("/review")
    public Review createReview(@RequestBody Review review){
        return reviewService.createReview(review);
    }

    @DeleteMapping("/review/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteReviewById(
            @PathVariable Integer id){
        return reviewService.deleteReview(id);
    }

}
