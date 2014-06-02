var host = "";
var connection = false;
var ws = null;
var appHandler = {};

function establishDBConnection(host, func)
{
	ws = new WebSocket(host + "/database");
	ws.onopen = function (e) {
		console.log('Database Connection Establish');
		open_connection();
		func();
	}
	ws.onmessage = function (e) {
		console.log('Database Query Respond');
		console.log(e.data);
		var receive_obj = JSON.parse(e.data);
		appHandler[receive_obj['appName']] = receive_obj['handler'];
	}
	ws.onclose = function (e) {
		console.log('Database Connection Close');
		close_connection();
	}
}

function requestAppHandler(appName)
{
	console.log('requestAppHandler:: ' + appName);
	if (connection)
	{
		console.log('requestAppHandler:: Live Connection');
		var json_request = {"appName":appName, "handler":"?"};
		console.log('Database Query: ' + JSON.stringify(json_request));
        ws.send(JSON.stringify(json_request));
	}
	else
	{
		console.log('requestAppHandler:: Dead Connection');
		return;
	}
}

function getAppHandler(appName)
{
	return appHandler[appName];
}

function open_connection()
{
	connection = true;
}

function close_connection()
{
	connection = false;
}