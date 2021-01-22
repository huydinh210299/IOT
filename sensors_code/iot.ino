#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include <string.h>

// Cập nhật thông tin wifi
#define ssid "Truong Hieu"
#define password "17191912"
const long utcOffsetInSeconds = 25200;
// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

// Thông tin về MQTT Broker
#define mqtt_server "13.90.147.94" // Địa chỉ server
#define mqtt_topic_pub "demo"   //Tạo topic tên là demo
#define mqtt_topic_sub "helo"

const uint16_t mqtt_port = 1883; //Port của CloudMQTT

//Khai báo chân của cảm biến nhiệt độ
const int DHTTYPE = DHT11;
const int DHTPIN = D1;
int value, real_value;
int timerHourL, timerMinuteL, timer, timerSecond, timerHourB, timerMinuteB;
int timerYear, timesL = 0, timesB = 0, times, statusB = 0, statusL = 0, checkL = 0, checkB = 0, checkLC = 0, checkLB = 0, checkBB = 0;
DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0, lastMsgTimerL = 0, lastMsgTimerB = 0, lastSS = 0;
char msg[50];
int count = 0;

void setup() {
  Serial.begin(115200);
  //set up wifi
  setup_wifi();
  //set up sensor
  pinMode(D0, INPUT_PULLUP); // Đặt chân D0 để làm cổng đọc digital
  pinMode(D2, OUTPUT); //Đặt chân D2 ở chế độ output
  pinMode(D6, OUTPUT);
  dht.begin();
  timeClient.begin();
  //set up pubsub
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

// Hàm kết nối wifi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  digitalWrite(D6, 1);
  digitalWrite(D2, 1);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// Hàm call back để nhận dữ liệu.
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.println(topic);
  if (strcmp(topic, "alarmLight") == 0) {
    char timer[200];
    for (int i = 0; i < length; i++) {
      timer[i] = (char)payload[i];
    }
    Serial.println(timer);
    StaticJsonBuffer<200> subscribes;
    JsonObject& root = subscribes.parseObject(timer);
    char alarm[20];
    char timess[20];
    int temp = 0;
    strcpy(alarm, root["alarm"]);
    strcpy(timess, root["time"]);
    timerHourL = int(alarm[0] - 48) * 10 + int(alarm[1] - 48);
    timerMinuteL = int(alarm[3] - 48) * 10 + int(alarm[4] - 48);
    for (int i = 0; timess[i] != '\0'; i++) {
      temp = temp * 10 + int(timess[i] - 48);
    }
    timesL = temp;
    //timerSecond = 0;
    Serial.println(timerHourL);
    Serial.println(timerMinuteL);
    Serial.println(timesL);
  }
  if (strcmp(topic, "alarmPump") == 0) {
    char timer[200];
    for (int i = 0; i < length; i++) {
      timer[i] = (char)payload[i];
    }
    Serial.println(timer);
    StaticJsonBuffer<200> subscribes;
    JsonObject& root = subscribes.parseObject(timer);
    char alarm[20];
    char timess[20];
    int temp = 0;
    strcpy(alarm, root["alarm"]);
    strcpy(timess, root["time"]);
    timerHourB = int(alarm[0] - 48) * 10 + int(alarm[1] - 48);
    timerMinuteB = int(alarm[3] - 48) * 10 + int(alarm[4] - 48);
    for (int i = 0; timess[i] != '\0'; i++) {
      temp = temp * 10 + int(timess[i] - 48);
    }
    timesB = temp;
    //timerSecond = 0;
    Serial.println(timerHourB);
    Serial.println(timerMinuteB);
    Serial.println(timesB);
  }
  if (strcmp(topic, "Pump") == 0) {
    char timer[200];
    for (int i = 0; i < length; i++) {
      timer[i] = (char)payload[i];
    }
    StaticJsonBuffer<200> subscribes;
    JsonObject& root = subscribes.parseObject(timer);
    char statuss[20];
    strcpy(statuss, root["Status"]);
    statusB = int(statuss[0] - 48);
    checkLB = 1;
  }
  if (strcmp(topic, "Light") == 0) {
    char timer[200];
    for (int i = 0; i < length; i++) {
      timer[i] = (char)payload[i];
    }
    StaticJsonBuffer<200> subscribes;
    JsonObject& root = subscribes.parseObject(timer);
    char statuss[20];
    strcpy(statuss, root["Status"]);
    statusL = int(statuss[0] - 48);
    checkLC = 1;
  }
}


// Hàm reconnect thực hiện kết nối lại khi mất kết nối với MQTT Broker
void reconnect() {
  // Chờ tới khi kết nối
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Thực hiện kết nối với mqtt user và pass
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      // Khi kết nối sẽ publish thông báo
      client.publish(mqtt_topic_pub, "ESP_reconnected");
      // ... và nhận lại thông tin này
      client.subscribe(mqtt_topic_sub);
      client.subscribe("Pump");
      client.subscribe("Light");
      client.subscribe("alarmLight");
      client.subscribe("alarmPump");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Đợi 5s
      delay(5000);
    }
  }
}


void loop() {
  // Kiểm tra kết nối
  if (!client.connected()) {
    reconnect();
  }

  client.loop();
  long now = millis();
  timeClient.update();
  if ((timeClient.getHours() == timerHourL) && (timeClient.getMinutes() == timerMinuteL) && (timeClient.getSeconds() == 0)) {
    Serial.println("hellow");
    digitalWrite(D6, 0);
    lastMsgTimerL = now;
    checkL = 1;
  }
  if ((now - lastMsgTimerL >= (timesL - 1) * 1000) && checkL) {
    digitalWrite(D6, 1);
    checkL = 0;
  }
  if (checkLC) {
    if (statusL == 1) {
      digitalWrite(D6, 0);
      checkLC = 0;
    }
    else {
      digitalWrite(D6, 1);
      checkLC = 0;
    }
  }
  if ((timeClient.getHours() == timerHourB) && (timeClient.getMinutes() == timerMinuteB) && (timeClient.getSeconds() == 0) ) {
    Serial.println("hellow");
    digitalWrite(D2, 0);
    lastMsgTimerB = now;
    checkB = 1;
  }
  if ((now - lastMsgTimerB >= (timesB - 1) * 1000) && checkB) {
    digitalWrite(D2, 1);
    checkB = 0;
  }
  if (checkLB) {
    if (statusB == 1) {
      digitalWrite(D2, 0);
      checkLB = 0;
    }
    else {
      digitalWrite(D2, 1);
      checkLB = 0;
    }
  }
  if (digitalRead(D0) == 0) {
    if (checkBB) {
      digitalWrite(D2, 1);
      checkBB = 0;
    }
  }
  else {
    digitalWrite(D2, 0);
    checkBB = 1;
  }


  // Chúng ta sẽ tạo một hàm for để đọc 10 lần giá trị cảm biến, sau đó lấy giá trị trung bình để được giá trị chính xác nhất.

  if (now - lastSS >= 20) {
    real_value += analogRead(A0);
    count++;
    lastSS = now;
  }
  if (count == 10) {
    value = real_value / 10;
    real_value = 0;
    count = 0;
  }
  int percent = map(value, 350, 1023, 0, 100);    // Set giá thang giá trị đầu và giá trị cuối để đưa giá trị về thang từ 0-100.
  // Cái này sẽ bằng thực nghiệm nhé
  percent = 100 - percent;                        // Tính giá trị phần trăm thực. Chuyển điện thế từ 3.3V ( khô ) thành 3.3V ( ẩm )
  percent = percent * 0.66;

  if (now - lastMsg > 2000) {
    //đọc nhiệt độ, độ ẩm
    float h = dht.readHumidity();    //Đọc độ ẩm
    float t = dht.readTemperature(); //Đọc nhiệt độ

    lastMsg = now;
    StaticJsonBuffer<300> JSONbuffer;
    JsonObject& JSONencoder = JSONbuffer.createObject();
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
  int ledStatus = digitalRead(D6);
  int bumpStatus = digitalRead(D2);
  StaticJsonBuffer<300> JSONbuffer;
  JsonObject& sensor = JSONbuffer.createObject();
  sensor["ledStatus"] = ledStatus;
  sensor["bumpStatus"] = bumpStatus;
  char sensorMessage[100];
  sensor.printTo(sensorMessage, sizeof(sensorMessage));
  client.publish("sensor", sensorMessage);
  delay(20);
}
