package com.green.computer.controller;

import com.green.computer.dto.BoardDTO;
import com.green.computer.dto.PageRequestDTO;
import com.green.computer.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
@RequestMapping("/board/*")
@Log4j2
@RequiredArgsConstructor
public class BoardController {

    /*private final BoardService boardService;

    @GetMapping("/list")
    public void list(PageRequestDTO pageRequestDTO, Model model){
        log.info("BoardController=> list실행...........................");
        model.addAttribute("result",boardService.getList(pageRequestDTO));
    }

    @GetMapping("/register")
    public void register(){
        log.info("BoardController=> register Get 실행...........................");
    }

    @PostMapping("/register")
    public String registerPost(BoardDTO dto, RedirectAttributes redirectAttributes){
        log.info("BoardController=> register Post 실행...........................");

        long bno = boardService.register(dto);
        log.info("BNO: "+bno);
         redirectAttributes.addFlashAttribute("msg",bno);
        return "redirect:/board/list";
    }

    @GetMapping({"/read","/modify"})
    public void read(@ModelAttribute("requestDTO") PageRequestDTO pageRequestDTO, Long bno, Model model){
        log.info("BoardController=> Read/modify Get 실행...........................");
        log.info("받은 bno: "+bno);
        BoardDTO dto = boardService.get(bno);
        log.info("DTO: "+dto);
        model.addAttribute("dto",dto);
    }

    // 미완성(Service 미완성)
    @PostMapping("/remove")
    public String remove(long bno, RedirectAttributes redirectAttributes){
        log.info("BoardController=> remove...........................");
        log.info("BoardController=> remove 받은 bno: "+bno);
        redirectAttributes.addFlashAttribute("msg",bno);
        return "redirect:/board/list";
    }

    @PostMapping("/modify")
    public String modify(BoardDTO dto, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, RedirectAttributes redirectAttributes){
        log.info("BoardController=> modify Post...........................");
        log.info("BoardController=> modify 받은 DTO: "+dto);

        boardService.modify(dto);
        redirectAttributes.addAttribute("page",requestDTO.getPage());
        redirectAttributes.addAttribute("type",requestDTO.getType());
        redirectAttributes.addAttribute("keyword",requestDTO.getKeyword());

        redirectAttributes.addAttribute("bno",dto.getBno());
        return "redirect:/board/read";
    }*/

}
