// apiKey = 48cbb4ead8b74091a7a17abba5a3bfc8
var btnArray = ["Uncharted" , "Mario Kart"];
$(document).ready(function(){
	//make api call
	function gifphyCall(value){
		$("#gifContainer").empty()
		var apiKey = "48cbb4ead8b74091a7a17abba5a3bfc8"
		var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+value+"&api_key="+apiKey+"&limit=25"; 
		$.ajax({
			url: queryUrl,
			method: "GET"
		}).done(function(response){
			console.log(response);
			for(var i = 0; i < response.data.length; i++){
				var gifDiv = $("<div>");
				var image = $("<img>");
				var rating = $("<h1>");
				rating.html("Rating: " + response.data[i].rating);
				image.attr("src", response.data[i].images.fixed_height_still.url);  //fixed_width.
				image.attr("data-state" , "still")
				image.attr("data-animate" ,response.data[i].images.fixed_height.url);
				image.attr("data-still" , response.data[i].images.fixed_height_still.url);
				image.addClass("gifImg");
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

		for (var i = btnArray.length - 1; i >= 0; i--) {
			var btn = $("<button>");
			btn.attr("data-value" , btnArray[i]);
			btn.addClass("btn btn-lg")
			btn.html(btnArray[i]);
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
			btnArray.push(inputVal);
			RenderBtns();
			// add button
		}
		$("#gifInput").val("");
	});

	RenderBtns(btnArray);

})