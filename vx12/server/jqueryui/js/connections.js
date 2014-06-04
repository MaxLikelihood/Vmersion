// jsPlumb.ready(function() {
//     jsPlumb.setContainer(document.getElementById("jsPlumbContainer"));
//     jsPlumb.connect({
// 	    source:"outerLamp1",
// 	    target:"outerHand",
// 	    endpoint:"Rectangle"
// 	});
// });


$(function() {
	$("#connect1").click(function() {
		if(lightsConnected) {
			lightsConnected = false;
			$("#connect1_text").text("Connect devices");
		} else {
			$("#Lamp2").css("visibility", "visible");
			$("#Lamp2").click(function() {
				lightsConnected = true;
				$("#Lamp2").css("visibility", "hidden");
				$("#Lamp2").unbind("click");
				$("#connect1_text").text("Disconnect device");
			});
		}
	});

	$("#connect2").click(function() {
		if(lightsConnected) {
			lightsConnected = false;
			$("#connect2_text").text("Connect devices");
		} else {
			$("#Lamp1").css("visibility", "visible");
			$("#Lamp1").click(function() {
				lightsConnected = true;
				$("#Lamp1").css("visibility", "hidden");
				$("#Lamp1").unbind("click");
				$("#connect2_text").text("Disconnect device");
			});
		}
	});
});