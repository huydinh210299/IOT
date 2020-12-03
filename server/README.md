# Chuyển tới thư mục server

# Chạy lệnh

```
npm i
npm start
```

# Xem các cấu hình ở .env

# Kiểm thử api ở thư mục test-api thông qua Rest Client extensions của VSCode

# api sensor
Đầu vào:\
    - Cho chọn tháng ngày giờ phút bắt đầu và kết thúc\
    - Giá trị tháng từ 0 - 11\
    - Giá trị ngày từ 1 - 31\
    - Giá trị giờ từ 0 - 23\
    - Giá trị phút từ 0 - 59\
vd body : \
data = {\
    begin_month: begin_month,\
    begin_date: begin_day,\
    begin_hour: begin_hour,\
    begin_minute: begin_minute,\
    end_month: end_month,\
    end_date: end_day,\
    end_hour: end_hour,\
    end_minute: end_minute\
}\

const res = await fetch('/api/sensor/getdata', {\
                    method: 'POST',\
                    body: JSON.stringify(data),\
                    headers: {\
                        'Content-Type': 'application/json'\
                    }\
                });\