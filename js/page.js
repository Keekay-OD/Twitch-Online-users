//global variables
var FRIENDS = ["jkiddjustplays", "braveryarcade", "LCK_Korea", "mackenseize", "storbeck", "habathcx", "DJ_JELLY", "waffles_beware"];

//****************************************************************

function populateList(filter) {

	//clears pallet
	$("#users-area").html("");

	//steps through FRIENDS to get information on each

	for (var j = 0; j < FRIENDS.length; j++) {
		//
		(function() {
			var i = j;
			//getJSON url for stream
			//var streamUrl = "https://api.twitch.tv/kraken/streams/" + FRIENDS[i] + "?callback=?";
			var streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/" + FRIENDS[i] + "?callback=?";

			//getJSON url for channel
			//var channelUrl = "https://api.twitch.tv/kraken/channels/" + FRIENDS[i] + "?callback=?";
			var channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/" + FRIENDS[i] + "?callback=?";

			//the onClick new tab url for their page
			var twitchChannel = "https://www.twitch.tv/" + FRIENDS[i];

			//resets these variable
			var online = false;
			var twitchLiveIcon = "";
			var streamStatus = "";

			//checks whether FRIENDS[i] is online and then sets the icon
			$.getJSON(streamUrl, function(stream) {
				//if streaming live
				if (stream.stream != null) {
					twitchLiveIcon = "<img src='https://braxwolf.files.wordpress.com/2014/08/live_icon.png' class='user-online'>";
					online = true;
				}
				
				$.getJSON(channelUrl, function(channel) {
					
					var shortStreamStatus = "";
					
					if (online == true) {
						streamStatus = channel.game + ": " + channel.status;
						if (streamStatus.length > 20) {
							shortStreamStatus = "<div class='tooltip'>" + streamStatus.substr(0, 18);
							shortStreamStatus = shortStreamStatus.concat("..") + "<span class='tooltiptext'>" 
								+ streamStatus + "</span><div>";
						}
					}
					
					var nextUser = "<a href=" + twitchChannel + " target='_new' class='userLink'><table class='user-table'>" 
						+	"<td rowspan='2'><img class='user-image' src='" 
						+ channel.logo + "'></td><td><p>" 
						+ channel.display_name + '<br>' 
						+ shortStreamStatus + "</p></td><td>" 
						+	twitchLiveIcon + "</td></table></a>";
					console.log(i, online, "<br>", nextUser);

					switch (filter) {
						case "all":
							$("#users-area").append(nextUser);
							break;

						case "online":
							if (stream.stream != null)
								$("#users-area").append(nextUser);
							break;

						case "offline":
							if (stream.stream == null)
								$("#users-area").append(nextUser);
							break;
					}
				}); //end getJSON channel
			}); //endgetJSON stream
		})(); //end module?
	} //end for loop
} //end populateList function

//****************************************************************

function buttonFunction(type) {

	$("button").css("background-color", "#66ffcc");
	$("#" + type).css("background-color", "#00e699");

	populateList(type);
}

//****************************************************************

$(document).ready(function() {
	buttonFunction("all");
})