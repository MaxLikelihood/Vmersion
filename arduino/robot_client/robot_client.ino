// Arduino include
#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include "utility/Adafruit_PWMServoDriver.h"
#include <hlib.h>
#include <SPI.h>
#include <Ethernet.h>

// pre-configured motor port # 
#define BASE_PORT 1
#define BODY_PORT 2
#define HEAD_PORT 3
#define HAND_PORT 4

#define BASE_INDEX BASE_PORT - 1
#define BODY_INDEX BODY_PORT - 1
#define HEAD_INDEX HEAD_PORT - 1
#define HAND_INDEX HAND_PORT -1

// default motor speed
#define BASE_DEFAULT_SPEED 100
#define BODY_DEFAULT_SPEED 100
#define HEAD_DEFAULT_SPEED 100
#define HAND_DEFAULT_SPEED 100

// LED pinout
#define LEDPIN 7

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = {
  0x98, 0x4F, 0xEE, 0x00, 0x62, 0xA1 };

Display* display = NULL;
char* host = "132.206.55.122";
//char* host = "192.168.54.15";
int port = 9090;
int print_error = 0;
boolean LEDState = false;
int timeout = 3000;

Adafruit_MotorShield AFMS = Adafruit_MotorShield();

Adafruit_DCMotor** motors = (Adafruit_DCMotor** )malloc(sizeof(Adafruit_DCMotor *) * 4);

void setup()
{
  Serial.begin(9600);
  // this check is only needed on the Leonardo:
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  delay(10000);
  // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    for(;;)
      ;
  }
  printIP();
  display = OpenDisplay(host, port);
  while(display == NULL){
    if (!print_error){
      Serial.println("OpenDisplay call failed");
      print_error = 1;
    }
    reconnect();
  }
 // setup motors
 motorSetup();
 pinMode(LEDPIN, OUTPUT);
 // turn off LED by default
 digitalWrite(LEDPIN, LOW);
}

void loop()
{
  // put your main code here, to run repeatedly: 
  delay(1);
  char * lineterm = "\n";
  char* buf = NULL;
  if ((buf = socket_readline(display->socket, lineterm)) != NULL)
  {
    //Serial.print(buf);
    //Serial.println();
    char ** strings = parse(buf);
    call(strings);
  } else 
  {
    Serial.println("nullstring received from server...server declared offline");
    display = NULL;
    while(display == NULL){
      reconnect();
    }
  } 
}

void reconnect()
{
  Serial.print("Attempting to reconnect in ");
  Serial.print(timeout);
  Serial.print(" ms...");
  delay(timeout);
  Serial.print("Reconnecting...");
  display = OpenDisplay(host, port);
  if (display == NULL)
  {
    Serial.println("Failed");
  }
  else
  {
    Serial.println("Success");
  }
}  

void printIP()
{
  Serial.print("Device IP address: ");
  for (byte thisByte = 0; thisByte < 4; thisByte++) {
    // print the value of each byte of the IP address:
    Serial.print(Ethernet.localIP()[thisByte], DEC);
    Serial.print("."); 
  }
  Serial.println();
}

int len(char ** str)
{
  int i = 0;
  while (*str[i] != '\0') i++;
  return i;
}

int toInt(char* str)
{
  return strtol(str, NULL, 10);
}

char** parse(char* buffer)
{
  const int MAX_NUM_TOKENS = 40;
  const int MAX_BUF_SIZE = 1024;
  const int MAX_TOKEN_SIZE = 24;
  char** tokens = (char **)malloc(sizeof(char *) * MAX_NUM_TOKENS);
  int i=0,j=i,k=j;
  char * ptr = buffer;
  for (i = 0; i < MAX_BUF_SIZE && j < MAX_NUM_TOKENS - 1; i++)
  {
    if (*ptr == ',')
    {
      i++;
      ptr++;
    }
    else if (*ptr != '\0')
    {
      char* tmpBuf = (char *)malloc(sizeof(char) * MAX_TOKEN_SIZE);
      k = 0;
      while (*ptr != ',' && *ptr != '\0' && k < MAX_TOKEN_SIZE - 1)
      {
        *tmpBuf++ = *ptr++;
        k++;
      }
      *++tmpBuf = '\0';
      tmpBuf -= (k+1);
      tokens[j++] = tmpBuf;
      i+=k;
    } 
    else if (*ptr == '\0')
    {
      tokens[j] = "\0";
      break;
    }
  }
  return tokens;
}

void call(char ** str)
{
  if (str == NULL || str[0] == NULL)
  {
    return;
  } 
  else
  {
    if (strcmp(str[0], "ledColor") == 0)
    {
      if (len(str) != 4)
      {
        return;
      }
      else
      {
         ///*
         Serial.print("ledColor(");
         Serial.print(toInt(str[1]));
         Serial.print(",");
         Serial.print(toInt(str[2]));
         Serial.print(",");
         Serial.print(toInt(str[3]));
         Serial.println(")");                               
         //*/
         //ledColor(toInt(str[1]), toInt(str[2]), toInt(str[3]));
      }
    }
    else if (strcmp(str[0], "LEDSwitch") == 0)
    {
      if (len(str) != 1)
      {
        return;
      }
      else
      {
        Serial.println("LEDSwitch()");
        LEDSwitch();
      }
    }
    else if (strcmp(str[0], "haltAllMotor") == 0)
    {
      if (len(str) != 1)
      {
        return;
      }
      else
      {
        Serial.println("haltAllMotor()");
        haltAllMotor();
      }
    }
    else if (strcmp(str[0], "moveMotor") == 0)
    {
      if (len(str) != 3)
      {
        return;
      }
      else
      {
         Serial.print("moveMotor(");
         Serial.print(toInt(str[1]));
         Serial.print(",");
         Serial.print(toInt(str[2]));
         Serial.println(")");
         moveMotor(toInt(str[1]), toInt(str[2]));         
      }
    }
    else if (strcmp(str[0], "setMotorSpeed") == 0)
    {
      if (len(str) != 3)
      {
        return;
      }
      else
      {
         Serial.print("setMotorSpeed(");
         Serial.print(toInt(str[1]));
         Serial.print(",");
         Serial.print(toInt(str[2]));
         Serial.println(")");
         setMotorSpeed(toInt(str[1]), toInt(str[2]));     
      }
    }
  }
}

void motorSetup()
{
  assignMotor();
  AFMS.begin();
  setDefaultSpeed();
  turnOnMotor();
  Serial.println("Motor setup complete");
}

void assignMotor()
{
  motors[BASE_INDEX] = AFMS.getMotor(BASE_PORT);
  motors[BODY_INDEX] = AFMS.getMotor(BODY_PORT);
  motors[HEAD_INDEX] = AFMS.getMotor(HEAD_PORT);
  motors[HAND_INDEX] = AFMS.getMotor(HAND_PORT);
}

void setDefaultSpeed()
{
  motors[BASE_INDEX]->setSpeed(BASE_DEFAULT_SPEED);
  motors[BODY_INDEX]->setSpeed(BODY_DEFAULT_SPEED);
  motors[HEAD_INDEX]->setSpeed(HEAD_DEFAULT_SPEED);
  motors[HAND_INDEX]->setSpeed(HAND_DEFAULT_SPEED);
}

void turnOnMotor()
{
  motors[BASE_INDEX]->run(RELEASE);
  motors[BODY_INDEX]->run(RELEASE);
  motors[HEAD_INDEX]->run(RELEASE);
  motors[HAND_INDEX]->run(RELEASE);
}

void LEDSwitch()
{
  if (LEDState == false)
  {
    digitalWrite(LEDPIN, HIGH);
    LEDState = true;
  } 
  else 
  {
    digitalWrite(LEDPIN, LOW);
    LEDState = false;
  }
}

void moveMotor(int port, int move)
{
  if (port < 0 || port > 3) return;
  if (move < 0)
  {
    motors[port]->run(BACKWARD);
  }
  else if (move == 0)
  {
    motors[port]->run(RELEASE);
  }
  else
  {
    motors[port]->run(FORWARD);
  }
}

void haltAllMotor()
{
  int i;
  for (i = 0; i < 4; i++)
  {
    motors[i]->run(RELEASE);
  }
}

void setMotorSpeed(int port, int speed)
{
  if (port < 0 || port > 3) return;
  if (speed >= 0 && speed <=255 )
  {
    motors[port]->setSpeed(speed);
  }
}
