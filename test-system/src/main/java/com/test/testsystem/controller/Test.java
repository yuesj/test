package com.test.testsystem.controller;

import com.test.testsystem.impl.TestServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test{

    @Autowired
    private TestServiceImpl testService;


    @RequestMapping("/test")
    public String test() {
        return testService.test();
    }
}
