/**
 * Created by Ashutosh on 7/12/2016.
 */
function initUshur() {

    $.getScript("js/UshurclientAPI.js", function() {
        var init = new UshurApi();
        console.log("initialised");
        var cmd = $("#cmd").val();
        var username = $("#username").val;
        var message = $("#message").val();
        var phone = $("#phone").val();
        var callbacknum =null;
        init.initUshur(cmd,username,callbacknum,phone,message,function(err,success){
            if(!err){
                console.log("Success");
            }
        });
    })

}


