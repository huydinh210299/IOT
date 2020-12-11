package com.example.iot2.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class loginRequest {
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("password")
    @Expose
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public loginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
