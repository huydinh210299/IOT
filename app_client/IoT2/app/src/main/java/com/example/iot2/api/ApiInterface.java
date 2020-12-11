package com.example.iot2.api;

import com.example.iot2.model.Sensor;
import com.example.iot2.model.User;
import com.example.iot2.model.loginRequest;
import com.example.iot2.model.loginResponse;
import com.example.iot2.model.registerRequest;
import com.example.iot2.model.registerResponse;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiInterface {
//    @Headers({
//            "",
//    })
    @POST("auth/login")
    Call<loginResponse> postLogin(@Body loginRequest loginRequest);
    @POST("auth/register")
    Call<registerResponse> postRegister(@Body registerRequest registerRequest);

    @Headers({ "Content-Type: application/json;charset=UTF-8"})
    @GET("sensor")
    Call<List<Sensor>> getListSensor(@Query("begin") String begin,@Query("end") String end,@Header("Authorization") String token);

}
