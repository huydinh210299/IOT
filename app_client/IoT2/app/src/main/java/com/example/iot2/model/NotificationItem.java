package com.example.iot2.model;

public class NotificationItem {
    private String content;
    private String tine;

    public NotificationItem(String content, String tine) {
        this.content = content;
        this.tine = tine;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTine() {
        return tine;
    }

    public void setTine(String tine) {
        this.tine = tine;
    }
}
