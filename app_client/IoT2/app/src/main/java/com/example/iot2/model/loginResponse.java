package com.example.iot2.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class loginResponse {
    @SerializedName("accessToken")
    @Expose
    private String accessToken;

    @SerializedName("message")
    @Expose
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    private User user;
}
