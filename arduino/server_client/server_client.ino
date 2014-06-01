#include <hlib.h>
#include <SPI.h>
#include <Ethernet.h>

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = {  
  0x98, 0x4F, 0xEE, 0x00, 0x60, 0xBC };

Display* display = NULL;
//char* host = "132.206.55.122";
char* host = "192.168.54.15";
char* app_name = "test_client";
int port = 9090;
int print_error = 0;
int REDPIN = 3;
int GREENPIN = 5;
int BLUEPIN = 6;
int timeout = 3000;

void setup() {
  
  Serial.begin(9600);
  // this check is only needed on the Leonardo:
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  delay(5000);
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
  /*
  // setup LED pin state
  /pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
  // turn all LED off initially
  analogWrite(REDPIN, 255);
  analogWrite(GREENPIN, 255);
  analogWrite(BLUEPIN, 255);
  */


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

void loop() {
  // put your main code here, to run repeatedly: 
  delay(1);
  char * lineterm = "\n";
  char* buf = NULL;
  if ((buf = socket_readline(display->socket, lineterm)) != NULL)
  {
    Serial.print(buf);
    Serial.println();
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
                               /*
                               Serial.print("ledColor(");
                               Serial.print(toInt(str[1]));
                               Serial.print(",");
                               Serial.print(toInt(str[2]));
                               Serial.print(",");
                               Serial.print(toInt(str[3]));
                               Serial.println(")");                               
			       */
                               ledColor(toInt(str[1]), toInt(str[2]), toInt(str[3]));
			}
		}
                else if (strcmp(str[0], "WHOISTHIS") == 0)
		{
                        if(len(str) != 1)
                        {
                                return;
                        }
                        else{
                                Serial.print("Identity Query Received...");
                                Serial.print("Responding with: ");
                                Serial.print(app_name);
                                if (sendIdentity(app_name))
                                {
                                  Serial.println("...Success");
                                }
                                else
                                {
                                  Serial.println("...Failed");
                                }
                        }
                }
	}
}

void ledColor(int r, int g, int b)
{
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return;  
  analogWrite(REDPIN, 255 - r);
  analogWrite(GREENPIN, 255 - g);
  analogWrite(BLUEPIN, 255 - b);
}

int sendIdentity(char* name)
{
  return ((socket_write(display->socket, "{ \"appName\":\"", strlen("{ \"appname\":\"")) == strlen("{ \"appname\":\"")) && 
          (socket_write(display->socket, name, strlen(name)) == strlen(name)) && 
          (socket_write(display->socket, "\" } \n", strlen("\" } \n")) == strlen("\" } \n")));
}
