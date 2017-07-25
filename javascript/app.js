// apiKey = 48cbb4ead8b74091a7a17abba5a3bfc8
var topics = ["The Office" , "Firefly" , "Silicon Valley" , "The Simpsons" , "Futurama", "That 70's Show" ,
				"Attack on Titan" , "Sword Art Online" , "My Hero Academia" , "Slo Mo Guys" , "MythBusters" ,
				"The Daily Show"] ;
$(document).ready(function(){
	//make api call
	function gifphyCall(value){
		$("#gifContainer").empty()
		var apiKey = "48cbb4ead8b74091a7a17abba5a3bfc8"
		var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+value+"&api_key="+apiKey+"&limit=12"; 
		$.ajax({
			url: queryUrl,
			method: "GET"
		}).done(function(response){
			for(var i = 0; i < response.data.length; i++){
				var gifDiv = $("<div>");
				var image = $("<img>");
				var rating = $("<h1>");
				rating.html("Rating: " + response.data[i].rating.toUpperCase());
				image.attr("src", response.data[i].images.original_still.url);
				image.attr("data-state" , "still");
				image.attr("data-animate" ,response.data[i].images.original.url);
				image.attr("data-still" , response.data[i].images.original_still.url);
				image.height(200);
				gifDiv.addClass("col-sm-3 gifImages");
				image.addClass("gifImg img-responsive");
				gifDiv.append(rating);
				gifDiv.append(image);
				$("#gifContainer").append(gifDiv);
			}
		})
	}

	// // click button with value
	$(document).on("click" , ".gifImg" ,function(){
		var state = $(this).attr("data-state");
		var animate = $(this).attr("data-animate");
		var still = $(this).attr("data-still");
		if(state === "still"){
			$(this).attr("src" , animate);
			$(this).attr("data-state" , "animate");
		}else{
			$(this).attr("src" , still);
			$(this).attr("data-state" , "still");
		}
	});

	// render buttons in div
	function RenderBtns(){
		$("#btnList").empty();

		for (var i = 0; i < topics.length; i++) {
			var btn = $("<button>");
			btn.attr("data-value" , topics[i]);
			btn.addClass("btn btn-lg")
			btn.html(topics[i]);
			$("#btnList").append(btn);
		}
	}

	$(document).on("click", ".btn-lg",function(E){
		E.preventDefault();
		var value = $(this).attr("data-value");
		gifphyCall(value);
	})



	//add value to button bar
	$("#gifSubmit").on("click", function(e){
		e.preventDefault();

		var inputVal = $("#gifInput").val().trim();
		if(inputVal.length < 1){
			// error with hidden label
		}else{
			topics.push(inputVal);
			RenderBtns();
			// add button
		}
		$("#gifInput").val("");
	});

	RenderBtns(topics);

})