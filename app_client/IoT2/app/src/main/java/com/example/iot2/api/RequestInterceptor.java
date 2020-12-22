package com.example.iot2.api;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class RequestInterceptor implements Interceptor {

    @NotNull
    @Override
    public Response intercept(@NotNull Chain chain) throws IOException {
        Request newRequest = chain.request()
                .newBuilder()
                .addHeader("Content-Type","application/json")
                .build();

        return chain.proceed(newRequest);
    }
}
