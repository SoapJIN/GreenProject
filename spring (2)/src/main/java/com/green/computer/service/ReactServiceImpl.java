package com.green.computer.service;


import com.green.computer.dto.Member_ReactDTO;
import com.green.computer.entity.Member_React;
import com.green.computer.repository.ReactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Log4j2
public class ReactServiceImpl implements ReactService{

    private final ReactRepository reactRepository;

    @Override
    public Long register(Member_React memberReact) {
        log.info("받은 dto: "+memberReact);
        reactRepository.save(memberReact);
        return memberReact.getBno();
    }

    @Override
    public List<Member_ReactDTO> getList() {

        List<Member_React> reactList = reactRepository.findAll();
        List<Member_ReactDTO> reactDTOList = new ArrayList<>();

        Member_ReactDTO member_reactDTO = null;
        for (Member_React react : reactList) {
            member_reactDTO = Member_ReactDTO.builder()
                    .bno(react.getBno())
                    .email(react.getEmail())
                    .nickname(react.getNickname())
                    .password(react.getPassword())
                    .build();
            reactDTOList.add(member_reactDTO);
        }


        return reactDTOList;
    }
}
