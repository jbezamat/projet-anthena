
/* This sketch mesure humidity(%), temperature(°C) & light(%) once per 30min
 *
 * datas are send to API with using post request :
 *    post on "add_API/light" to send lght value
 *    post on "add_API/temperature" to send lght value
 *    post on "add_API/light" to send lght value
*/

//Librairies http/wifi connection
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiServer.h>
#include <WiFiServerSecure.h>
#include <WiFiUdp.h>


//connection to wifi
const char* ssid = "SICLO";
const char* password = "11235813";


//variables & librairies:
#include <DHT.h>  //translate analog data into conventionnal units
#include <DHT_U.h>
#define DHTTYPE DHT11
uint8_t DHTPin = D4;
DHT dht(DHTPin, DHTTYPE);
static char celsiusTemp[7];
static char fahrenheitTemp[7];
static char humidityTemp[7];

//Datas mesured
float light_value;
int h;
int t;
int timeBetweenMeasures = 1800000;

//API address :
String add_API = "192.168.10.17:8080";


//This function send a JSON form using POST (JSON : "name"_value="value") to add_API/"name"
void sendData(String name, String value){
   if(WiFi.status() == WL_CONNECTED){
      String data;   //will contain JSON form
      HTTPClient http;
      data = name + "_value=" + value;
      http.begin("http://" + add_API + "/" + name);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");    //Specify content-type header
      int httpCode = http.POST(data);
      if(httpCode > 0){
        Serial.print("OK");
        String payload = http.getString();
        Serial.println(payload);
      }
    http.end();
    }
};


void setup() {
  Serial.begin(115200);

    //connection to wifi :
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {

    delay(1000);
    Serial.print("Connecting..");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to the ESP device
}

void loop() {

    //read temperature & humidity
    h = dht.readHumidity()*4;  //*4 -> translate into percentages
    if (h > 100){
      h =100;
    }
    t = dht.readTemperature();
    float f = dht.readTemperature(true);

      //translate and send temperature :
    if(isnan(h) || isnan(t) || isnan(f)){
      Serial.println("Probleme acquisition temp hum");
    }
    else{
        //analog data traduction into scientist units
      float hic = dht.computeHeatIndex(t, h, false);
      dtostrf(hic, 6, 2, celsiusTemp);
      float hif = dht.computeHeatIndex(f, h);
      dtostrf(hif, 6, 2, fahrenheitTemp);
      dtostrf(h, 6, 2, humidityTemp);

      //Serial.print("Temperature : ");
      //Serial.println(t);
      sendData("temperature", String(t));
    }

      //Humidity
    //Serial.print("humidity : ");
    //Serial.println(h);
    sendData("humidity", String(h));

      //Light
    light_value = int(analogRead(A0)*100/1024);   //analog value
    //Serial.print("light value : ");
    //Serial.println(light_value);
    sendData("light",String(light_value));
   // delay(5000); //Take measures every 5min
   delay(timeBetweenMeasures);  //Take measures every XX ms
 }
