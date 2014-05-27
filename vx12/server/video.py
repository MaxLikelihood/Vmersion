from tornado.websocket import WebSocketHandler
import cv2, numpy
import logging
from PIL import ImageFilter

sockets = []
frosted = True
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

            


def frost(image):
    dst = cv2.GaussianBlur(image, (55,55), 70)
    white = numpy.zeros(image.shape, numpy.uint8)
    white[:] = (255,255,255)
    return cv2.addWeighted(dst, 1, white, 0.3, 1)

def ws_send(image):
    # Make sure client is still connected
    for ws in sockets:
        if not ws.ws_connection.stream.socket:
            sockets.remove(ws)
        else:
            ws.write_message(image, binary=True)






def videoFeed():
    cv2.namedWindow("preview")
    vc = cv2.VideoCapture(1)
    vc.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH, 1280)
    vc.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT, 720)
    rval, image = vc.read()
    while True:
        if image is not None:
            output = frost(image)
           #frosted = checkfrost()
            if not frosted:
                output = image
            #cv2.imshow("preview", output)
            ws_send(numpy.array(cv2.imencode('.jpg', output, [int(cv2.IMWRITE_JPEG_QUALITY), 80])[1]).tostring()) 
        rval, image = vc.read()

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

