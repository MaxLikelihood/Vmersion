from tornado.websocket import WebSocketHandler
import cv2, numpy
import logging
from PIL import ImageFilter

sockets = []
frosted = True
ksize = 101
weight = 0.4

class videoSocketHandler(WebSocketHandler):
    def open(self):
        logging.info('Video socket connected')
        if self not in sockets:
            sockets.append(self)


    def on_message(self, frame):
        if frame == 'logged in':
            global frosted
            frosted = False
            print 'login done, sending unblurred video'

    def on_close(self):
        logging.info('Video socket disconnected')
        if self in sockets:
            sockets.remove(self)

            


def frost(image, ksize, weight):
    # kernel size must be odd and positive
    if (ksize % 2 == 0):
        ksize += 1
    if (ksize < 0):
        ksize *=-1;
    dst = cv2.GaussianBlur(image, (ksize,ksize), 0)
    white = numpy.zeros(image.shape, numpy.uint8)
    white[:] = (255,255,255)
    return cv2.addWeighted(dst, 1, white, weight, 1)

def ws_send(image):
    # Make sure client is still connected
    for ws in sockets:
        if not ws.ws_connection.stream.socket:
            sockets.remove(ws)
        else:
            ws.write_message(image, binary=True)






def videoFeed():
    global ksize
    global weight
    global frosted
    cv2.namedWindow("preview")
    vc = cv2.VideoCapture(0)
    vc.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH, 1280)
    vc.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT, 720)
    rval, image = vc.read()
    while True:
        if image is not None:
            if frosted:
                output = frost(image, ksize, weight)
            else:
                if (ksize > 1):
                    output = frost(image, ksize, weight)
                    ksize -= 2
                elif (ksize == 1):
                    output = frost(image, ksize, weight)
                    ksize = 0
                else:
                    output = image
            # cv2.imshow("preview", output)
            ws_send(numpy.array(cv2.imencode('.jpg', output, [int(cv2.IMWRITE_JPEG_QUALITY), 80])[1]).tostring()) 
        rval, image = vc.read()

        key = cv2.waitKey(1)

        if key & 0xFF == ord('q'):
            break
        elif key & 0xFF == ord('f'):
            frosted = not frosted
            if (frosted):
                ksize = 101
                weight = 0.4
