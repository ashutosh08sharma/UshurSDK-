/**
 * Created by Ashutosh on 7/13/2016.
 */
function loginjs() {
	self.login = function(user, password, callback) {
		console.log("inside login");
		if (self.isLoggedIn()) {
			callback(null, api.user);
		} else {
			api.login(user, password, function(err, response) {
				console.log("Restapi call");
				if (err == null) {
					localStorage.setItem("user", JSON.stringify(response));
					window.location.href = "index.html";
				}
				callback(err, response);
			})
		}
	}

	$.getScript("js/UshurclientAPI.js", function() {
		var user = $("#user").val();
		var pass = $("#pass").val();
		console.log(user + pass);
		loginsdk = new UshurApi();
		loginsdk.login(user, pass, function(err, response) {
			if (!err) {
				console.log(response.status);
			}

		});

	});

}
