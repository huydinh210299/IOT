package com.example.iot2.api;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {
    public static final String BASE_URL = "http://168.62.43.5:8080/api/"; //http://192.168.55.105:4000
    private static Retrofit retrofit = null;

    public static ApiInterface getClient() {
        HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient client = new OkHttpClient.Builder()
               // .addInterceptor(new RequestInterceptor())
                .addInterceptor(interceptor)
                .build();

        if(retrofit==null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(client)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }

        ApiInterface api = retrofit.create(ApiInterface.class);
        return api;
    }


}
