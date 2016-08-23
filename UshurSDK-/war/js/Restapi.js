/**
 * Created by Ashutosh on 7/8/2016.
 * Ushur JavaScript SDK 
 *
 */
function Restapi() {
    var msUshurHost = "ushur.me";
    var msScheme = "https";
    var hostPath = msScheme + "://" + msUshurHost + "/rest/signin/web?";

    this.user = function () {
        var self = this;
        return self.user;
    }

    this.isLoggedIn = function () {
        var self = this;
        return self.user != null;
    }
    //Log in
    this.login = function (username, password, callback) {
        var self = this;
        var loginurl = hostPath + "email=" + username + "&password=" + password;
        console.log(loginurl);
        $.ajax({
            type: "GET",
            url: loginurl,
            contentType: "application/json",
            dataType: "json",
            Origin: "http://1-dot-ushur-1380.appspot.com",
            data: JSON.stringify({
                "username": username,
                "password": password
            }),
            success: function (response) {
                if (response.status === "success") {
                    tokenId = response.tokenId;
                    var status = response.status;
                    user = response.userName;
                    console.log("Token Id" + tokenId + status);
                    if (tokenId != null) {
                        // store credentials
                        sessionStorage.setItem('username', user);
                        sessionStorage.setItem('token', tokenId);
                    }
                    callback(null, response.Data);
                } else {
                    callback(response.infoText, null);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(errorThrown, null);
            }
        });

    }
    // send message 
    this.sendTextMessage = function (msg, username, usernum, callback) {
        var sendTextUrl = 'https://ushur.me/initsess';
        var token = sessionStorage.getItem('token');
        console.log("token" + token);
        var self = this;
        $.ajax({
            type: "POST",
            url: sendTextUrl,
            contentType: "application/json",
            Origin: "http://1-dot-ushur-1380.appspot.com",
            dataType: "json",
            data: JSON.stringify({
                "tokenId": token,
                "campaignId": "NotifyMsg",
                "cmd": "initCampaign",
                "userPhoneNo": usernum,
                "userName": username,
                "userMsg": msg,
                "apiVer": "2.1"
            })

        }).done(function (response) {
            console.log("Response" + response);
            if (response.status === "success") {
                console.log("inside success");
                callback(null, response);
            } else {
                callback(response, null);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus);
            if (callback) {
                callback(errorThrown, null);
            }
        });
    }
    // initiate an ushur from your created ushur 
    this.initiateUshur = function (menuId, username, callbacknum, usernum, message, callback) {
        var self = this;
        var tokenID = sessionStorage.getItem('token');
        console.log("token" + tokenID);
        $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "https://ushur.me/initUshur",
                Origin: "http://1-dot-ushur-1380.appspot.com",
                dataType: "json",
                data: JSON.stringify({
                    "cmd": "initCampaign",
                    "userName": username,
                    "callBackNum": "",
                    "tokenId": tokenID,
                    "userPhoneNo": usernum,
                    "userMsg": "",
                    "apiVer": "2.1",
                    "campaignId": menuId
                })
            })
            .done(function (response, status) {
                var resp = response;
                console.log(resp);
                if (response.status === "success") {
                    callback(null, resp);
                }
                else {
                    callback(resp.InfoText, null);
                }
                console.log("Successfully delivered message" + status);
            }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus);
            if (callback) {
                callback(errorThrown, null);
            }
        });
    }

    /*
     To query ushur based on the UeTag and get responses
     */
    this.queryUshur = function (filtercmd, campaignId, UeTag, userPhoneNo, callback) {
        var tokenid = sessionStorage.getItem('token');
        $.ajax({
            type: "POST",
            url: "https://ushur.me/infoQuery",
            contentType: "application/json",
            Origin: "http://1-dot-ushur-1380.appspot.com",
            dataType: "json",
            data: JSON.stringify({
                "tokenId": tokenid,
                "filterCmd": "getCounts",
                "campaignId": "StudentFeedback",
                "UeTag": "UeTag_695393,UeTag_679276,UeTag_597669,UeTag_957865,UeTag_053543,UeTag_594243,UeTag_724463,UeTag_731791,UeTag_455505,UeTag_282396,UeTag_103424,UeTag_570603,UeTag_491817",
                "apiVer": "2.1"
            })
        }).done(function (response, status) {
            var resp = response;
            console.log(resp);
            if (status === "success") {
                console.log(status);
                var uniCourse = resp.UeTag_695393;
                console.log("UnicourseRestAPI" + uniCourse);
                callback(null, resp);
                console.log(resp);
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus);
            console.log(status);
            if (callback) {
                callback(errorThrown, null);
            }
        });
    }

    // get campaign data
    this.getCampaignStats = function (statsParams, campaigns, level, startDate, endDate, callback) {
        var self = this;
        $.ajax({
            type: "POST",
            url: "https://ushur.me/rest/campaign/stats",
            contentType: "application/json",
            Origin: "http://1-dot-ushur-1380.appspot.com",
            dataType: "text",
            data: JSON.stringify({
                "statsParams": statsParams,
                "campaigns": campaigns,
                "level": level,
                "startDate": startDate.toISOString(),
                "endDate": endDate.toISOString(),
                "tokenId": token
            }),
            success: function (data) {
                console.log(resp);
                if (response.status === "success") {
                    callback(null, resp);
                } else {
                    callback(response.infoText, null);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(errorThrown, null);
            }
        });
    };


}
