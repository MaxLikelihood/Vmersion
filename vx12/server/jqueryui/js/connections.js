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
			$("#connect2_text").text("Connect devices");
		} else {
			$("#outerLamp2").css("opacity", 0.5);
			$("#connect1_text").text("Connecting...");
			$("#outerLamp2").click(function() {
				lightsConnected = true;
				$("#outerLamp2").css("opacity", 0);
				$("#outerLamp2").unbind("click");
				$("#connect1_text").text("Disconnect device");
				$("#connect2_text").text("Disconnect device");
			});
		}
	});

	$("#connect2").click(function() {
		if(lightsConnected) {
			lightsConnected = false;
			$("#connect1_text").text("Connect devices");
			$("#connect2_text").text("Connect devices");
		} else {
			$("#outerLamp1").css("opacity", 0.5);
			$("#connect2_text").text("Connecting...");
			$("#outerLamp1").click(function() {
				lightsConnected = true;
				$("#outerLamp1").css("opacity", 0);
				$("#outerLamp1").unbind("click");
				$("#connect1_text").text("Disconnect device");
				$("#connect2_text").text("Disconnect device");
			});
		}
	});
});