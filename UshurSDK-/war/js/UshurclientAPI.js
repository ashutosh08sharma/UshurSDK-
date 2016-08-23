/**
 * Created by Ashutosh on 7/8/2016.
	JavaScript SDK
 */
function UshurApi() {
    //load the javascript sdk
    $.getScript("js/Restapi.js");
    var api = new Restapi();
    this.isLoggedIn = function () {
        return api.isLoggedIn();
    }

    this.user = function () {
        return api.user;
        console.log("api user" + api.user);
    }

    this.login = function (user, password, callback) {
        console.log("inside login");
        if (!this.isLoggedIn()) {
            callback(null, api.user);
        } else {
            api.login(user, password, function (err, response) {
                console.log("Restapi call");
                if (err == null) {
                    sessionStorage.setItem('user', JSON.stringify(response));
                    window.location.href = "home.html";
                }
                else {
                    alert("Invalid Credentials");
                }
            });
        }
    }

    this.sendTextMessage = function (msg, userName, usernum, callback) {
        if (this.isLoggedIn()) {
            api.sendTextMessage(msg, userName, usernum, function (err, response) {
                if (err == null) {
                    console.log("Message send " + response);
                    //alert("Message Sent");
                }
                else
                    console.log(err);
                //alert("Something went Wrong"+ err);
                console.log(response);
                if (callback) {
                    callback(err, null);
                }
            });
        }
        else {
            window.location.href("index.html");
        }


    }
    this.initUshur = function (menuId, userName, callBackNum, usernum, message, callback) {
        api.initiateUshur(menuId, userName, callBackNum, usernum, message, function (err, response) {
            if (err == null) {
                console.log("Ushur Initiated" + response);
            }
            else {
                console.log(response);
            }
            if (callback) {
                callback(err, null);
            }
        });
    }

    this.getCampaignStats = function (statsParams, campaigns, level, startDate, endDate, callback) {
        api.getCampaignStats(statsParams, campaigns, level, startDate, endDate, callback);
    }

    this.queryUshur = function (filtercmd, campaignId, UeTag, userPhoneNo, callback) {
        api.queryUshur(filtercmd, campaignId, UeTag, userPhoneNo, function (err, response) {
            if (err == null) {
                var rateUniv = response.UeTag_695393;
                var rateCourse = response.UeTag_679276;
                var Recommended = response.UeTag_957865;
                var Good = response.UeTag_053543;
                var Average = response.UeTag_594243;
                var Poor = response.UeTag_724463;
                var courseExcellent = response.UeTag_455505;
                var courseVgood = response.UeTag_282396;
                var coursegood = response.UeTag_103424;
                var courseAvg = response.UeTag_570603;
                var coursePoor = response.UeTag_491817;
                var counts = [rateUniv, rateCourse, Recommended, Good, Average, Poor, courseExcellent, courseVgood, coursegood, courseAvg, coursePoor];
                console.log("count" + counts);
                if (callback) {
                    callback(null, counts);
                }
            }
        });

    }
}
