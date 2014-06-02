import tornado.websocket
import json
import vxcontroller

class databaseSocketHandler(tornado.websocket.WebSocketHandler):

	def open(self):
		print "Database Connection Open"

	def on_message(self, message):
		print "Database On Query"
		print message
		try:
			request = json.loads(message)
			if (u'appName' in request) and (u'handler' in request) and (request[u'handler'] == '?'):
				request[u'handler'] = vxcontroller.vx.getAppHandlerPath(request[u'appName'])
				print "Query Respond:"
				print json.dumps(request)
				self.write_message(json.dumps(request))
		except ValueError:
			print "Invalid Request Received : " + message

	def on_close(self):
		print "Database Connection Close"
	