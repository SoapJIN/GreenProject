package com.green.computer.service;


import com.green.computer.entity.Member_React;
import com.green.computer.repository.ReactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;




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
}
