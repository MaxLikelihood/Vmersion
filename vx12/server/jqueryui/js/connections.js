jsPlumb.ready(function() {
    jsPlumb.setContainer(document.getElementById("jsPlumbContainer"));
    jsPlumb.connect({
	    source:"outerLamp1",
	    target:"outerHand",
	    endpoint:"Rectangle"
	});
});