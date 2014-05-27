#include <stdio.h>
#include <stdlib.h>
#include <hlib/hlib.h>
#include <string.h>
#include <time.h>
#include <hlib/socket.h>


void testAlert(Display *display, char *arg) {
call_user_def(display, "testAlert", "s", arg);}

void setup(Display *display, Event *event, void *data){
	    testAlert(display, "9");
}



int main(int argc, char *argv[])
{
    Display *display = NULL;
    char *host = "localhost";
    int port = 9090;
    char *received = NULL;

    Socket *sock = NULL;


    display = OpenDisplay("localhost", 9090);
    if (display == NULL) {
        fprintf(stderr, "Unable to connect to display %s:%d\n", host, port);
        exit(1);
    }
    sock = display->socket;


     
    /* Register Callbacks */
 /*   RegisterCallback(display, ExposeEventType, expose_event, NULL);
    RegisterCallback(display, MouseMoveEventType, mouse_move, NULL); */
    RegisterCallback(display, SetupEventType, setup, NULL);

    
    //MainLoop(display);
    while(1){
    received = socket_readline(sock, "\n");
    printf("%s\n", received);
    sleep(3); 
    }   
    CloseDisplay(display);
    return 0;
}
