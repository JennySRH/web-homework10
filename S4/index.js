window.onload = function () {
    // init
    $("#button").on("mouseenter", function () {
        $(".button").removeClass("disabled");
        $("#info-bar").addClass("disabled");
        $(".unread").hide();
        $(".info").text("");
        $("#display").text("");
    });

    $('#button').on("mouseleave",function() {
        $("#display").text("");
    });

     $(".button").click(function(event,callback) {
        var currentId = event.currentTarget.id;
        var currentButton = '#'+ event.currentTarget.id;
        if(!$(currentButton).hasClass("disabled") && 
        $(currentButton).children(".unread:hidden").length>=1){
            if (!$(".button:not(.disabled),.button:has(.unread:hidden)").length) {
                $("#info-bar").removeClass("disabled");
            }
            $(currentButton).children(".unread").text("...").show();
            $(currentButton).siblings().addClass("disabled");
            $.get('/'+ currentId, function (data) {
                if (!$(currentButton).hasClass("disabled") && 
                !$(currentButton).children(".disabled:hidden").length) {
                    $(currentButton).children(".unread").text(data);
                    $(currentButton).addClass("disabled");
                    $(currentButton).siblings(":has(.unread:hidden)").removeClass("disabled");
                }
                if (!$(".button:not(.disabled),.button:has(.unread:hidden)").length) {
                    $("#info-bar").removeClass("disabled");
                }
                if($.isFunction(callback)){
                    callback();
                }
            });            
        }

    });

    $("#info-bar").click(function(event){
        if (!$("#info-bar").hasClass("disabled")) {
            var sum = 0;
            $(".unread").each(function () {
                sum += parseInt($(this).text());
            });
            $(".info").text(sum);
            $("info-bar").addClass("disabled");
        }
    });

    $(".apb").click(function () {
        $("#button").trigger("mouseenter");
        var arr=['A','B','C','D','E'];
        for(var i = 0;i < 5;i ++) {
            var a = parseInt(Math.random()*10%5);
            var b = parseInt(Math.random()*10%5);
            var temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }
        var temp = "";
        for(var i = 0; i < 5;i ++) {
            temp += arr[i];
            temp += " ";
            arr[i] = "#" + arr[i];
        }
        $("#display").text(temp);
        $(arr[0]).triggerHandler('click',function() {
            $(arr[1]).triggerHandler('click',function() {
                $(arr[2]).triggerHandler('click',function(){
                    $(arr[3]).triggerHandler('click',function() {
                        $(arr[4]).triggerHandler('click',function() {
                            $('#info-bar').trigger('click');
                        });
                    });
                });
            });
        });


    });

}