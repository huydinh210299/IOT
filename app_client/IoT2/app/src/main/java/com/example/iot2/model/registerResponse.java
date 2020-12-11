package com.example.iot2.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class registerResponse {
    @SerializedName("role")
    @Expose
    private String role;
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("password")
    @Expose
    private String password;
    @SerializedName("createdDate")
    @Expose
    private String createdDate;
    @SerializedName("modifiedDate")
    @Expose
    private String modifiedDate;
    @SerializedName("__v")
    @Expose
    private Integer v;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

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

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(String modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Integer getV() {
        return v;
    }

    public void setV(Integer v) {
        this.v = v;
    }

    public registerResponse(String role, String id, String name, String email, String password, String createdDate, String modifiedDate, Integer v) {
        this.role = role;
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.v = v;
    }
}
