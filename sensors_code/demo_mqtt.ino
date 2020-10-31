#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include <DHT.h>

#include <ArduinoJson.h>

// Cập nhật thông tin wifi
#define ssid "Truong Hieu"
#define password "17191912"

// Thông tin về MQTT Broker
#define mqtt_server "52.229.154.12" // Thay bằng thông tin của bạn
#define mqtt_topic_pub "demo"       //Giữ nguyên nếu bạn tạo topic tên là demo
#define mqtt_topic_sub "helo"

//#define mqtt_user "esp8266"    //Giữ nguyên nếu bạn tạo user là esp8266 và pass là 123456
//#define mqtt_pwd "123456"

const uint16_t mqtt_port = 1883; //Port của CloudMQTT

//Khai báo chân của cảm biến nhiệt độ
const int DHTTYPE = DHT11;
const int DHTPIN = D1;
int value, real_value;
DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
char msg[50];
int count = 0;

void setup()
{
    Serial.begin(115200);
    //set up wifi
    setup_wifi();

    //set up sensor
    pinMode(D0, INPUT_PULLUP); // Mình sẽ dùng chân D1-GPIO5 để làm cổng đọc digital, còn chân A0 vào thì không cần khai báo cũng được nhé
    dht.begin();

    //set up pubsub
    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(callback);
    pinMode(D2, OUTPUT);
}

// Hàm kết nối wifi
void setup_wifi()
{
    delay(10);
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

// Hàm call back để nhận dữ liệu
void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
    Serial.println();
}

// Hàm reconnect thực hiện kết nối lại khi mất kết nối với MQTT Broker
void reconnect()
{
    // Chờ tới khi kết nối
    while (!client.connected())
    {
        Serial.print("Attempting MQTT connection...");
        // Thực hiện kết nối với mqtt user và pass
        if (client.connect("ESP8266Client"))
        {
            Serial.println("connected");
            // Khi kết nối sẽ publish thông báo
            client.publish(mqtt_topic_pub, "ESP_reconnected");
            // ... và nhận lại thông tin này
            client.subscribe(mqtt_topic_sub);
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            // Đợi 5s
            delay(5000);
        }
    }
}

void loop()
{
    // Kiểm tra kết nối
    if (!client.connected())
    {
        reconnect();
    }

    client.loop();

    if (digitalRead(D0) == 1)
    {
        digitalWrite(D2, 1);
    }
    else
    {
        digitalWrite(D2, 0);
    }

    // Sau mỗi 2s sẽ thực hiện publish dòng hello world lên MQTT broker và
    long now = millis();
    if (now - lastMsg > 2000)
    {
        //đọc nhiệt độ, độ ẩm
        float h = dht.readHumidity();    //Đọc độ ẩm
        float t = dht.readTemperature(); //Đọc nhiệt độ

        // Chúng ta sẽ tạo một hàm for để đọc 10 lần giá trị cảm biến, sau đó lấy giá trị trung bình để được giá trị chính xác nhất.
        real_value = 0;
        for (int i = 0; i <= 9; i++)
        {
            real_value += analogRead(A0);
            delay(20);
        }

        value = real_value / 10;
        int percent = map(value, 350, 1023, 0, 100); // Set giá thang giá trị đầu và giá trị cuối để đưa giá trị về thang từ 0-100.
                                                     // Cái này sẽ bằng thực nghiệm nhé
        percent = 100 - percent;                     // Tính giá trị phần trăm thực. Chuyển điện thế từ 3.3V ( khô ) thành 3.3V ( ẩm )
        percent = percent * 0.66;

        lastMsg = now;
        ++count;
        StaticJsonBuffer<300> JSONbuffer;
        JsonObject &JSONencoder = JSONbuffer.createObject();

        //Sửa property thành camelCase
        JSONencoder["humidityLand"] = percent;
        JSONencoder["humidityAir"] = h;
        JSONencoder["temperature"] = t;

        char JSONmessageBuffer[100];
        JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));

        //    snprintf(msg, 75, "hello world #%ld", count);
        //    Serial.print("Publish message: ");
        //    Serial.println(msg);
        client.publish(mqtt_topic_pub, JSONmessageBuffer);
    }
}
