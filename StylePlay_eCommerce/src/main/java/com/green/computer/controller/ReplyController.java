package com.green.computer.controller;

import com.green.computer.entity.Reply;
import com.green.computer.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // CORS문제를 해결하기 위함
@RestController
@RequestMapping("/api")
public class ReplyController {
    @Autowired
    private ReplyService replyService;

    @GetMapping("/replyList/{bno}")
    public List<Reply> getAllReply(@PathVariable Integer bno){
        return replyService.getAllReply(bno);
    }

    @PostMapping("/reply/{bno}")
    public Reply createReply(@RequestBody Reply reply,
                             @PathVariable Integer bno){

        return replyService.createReply(reply,bno);
    }

    @DeleteMapping("/reply/{rno}")
    public ResponseEntity<Map<String, Boolean>> deleteReplyByNo(
        @PathVariable Integer rno){
        return replyService.deleteReply(rno);
    }
}
