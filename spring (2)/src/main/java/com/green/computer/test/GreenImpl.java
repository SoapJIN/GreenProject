package com.green.computer.test;

import java.util.Map;

public class GreenImpl implements Green{
    @Override
    public int add(int a, int b) {
        return a+b;
    }

    @Override
    public int sub(int a, int b) {
        return a-b;
    }

    @Override
    public int mul(int a, int b) {
        return a*b;
    }

    @Override
    public String gugu(int a) {
        String gugu = "";
        for (int i =0; i< 10; i++){
            gugu +=  a+"x"+i+"="+a*i;
        }

        return gugu;
    }

    @Override
    public boolean map(Map<Integer, Car> car) {





        return false;
    }

    @Override
    public Car car(int a) {
        return null;
    }
}
