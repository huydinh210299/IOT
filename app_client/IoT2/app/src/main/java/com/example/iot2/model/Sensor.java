package com.example.iot2.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Sensor {
    @SerializedName("humidityLand")
    @Expose
    private Double humidityLand;
    @SerializedName("humidityAir")
    @Expose
    private Double humidityAir;
    @SerializedName("temperature")
    @Expose
    private Double temperature;
    @SerializedName("time")
    @Expose
    private Double time;

    public Double getHumidityLand() {
        return humidityLand;
    }

    public void setHumidityLand(Double humidityLand) {
        this.humidityLand = humidityLand;
    }

    public Double getHumidityAir() {
        return humidityAir;
    }

    public void setHumidityAir(Double humidityAir) {
        this.humidityAir = humidityAir;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getTime() {
        return time;
    }

    public void setTime(Double time) {
        this.time = time;
    }

}
