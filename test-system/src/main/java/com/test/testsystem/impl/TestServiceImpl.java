package com.test.testsystem.impl;

import org.springframework.stereotype.Service;
import service.TestService;

@Service
public class TestServiceImpl implements TestService {

    @Override
    public String test() {
       return  "测试实现类";
    }
}
