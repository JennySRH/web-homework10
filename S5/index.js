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
        $("#message").text("");
    });

    var a = 0;

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
            var button = this;
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
                callback.call(button);
            });            
        }

    });


    $("#info-bar").click(function(event,callback){
        if (!$("#info-bar").hasClass("disabled")) {
            var sum = 0;
            $(".unread").each(function () {
                sum += parseInt($(this).text());
            });
            $(".info").text(sum);
            $("info-bar").addClass("disabled");
        }
        callback();
    });

    $(".apb").click(function () {
        $("#button").trigger("mouseenter");

        // 打乱顺序
        var arr=['A','B','C','D','E'];
        var arrFun=[aHandler,bHandler,cHandler,dHandler,eHandler];
        for(var i = 0;i < 5;i ++) {
            var a = parseInt(Math.random()*10%5);
            var b = parseInt(Math.random()*10%5);
            // swap arr[a] and arr[b]
            var t = arr[a];
            arr[a] = arr[b];
            arr[b] = t;
            // swap afun and bfun
            var m = arrFun[a];
            arrFun[a] = arrFun[b];
            arrFun[b] = m;
        }
        var temp = "";
        for(var i = 0; i < 5;i ++) {
            temp += arr[i];
            temp += " ";
            arr[i] = "#" + arr[i];
            console.log(arr[i]);
        }
        // 显示顺序
        $("#display").text(temp);
        var triggerQueue = [];

        // 根据顺序挨个显示
        for(var i = 0;i < arrFun.length;i ++) {
            (function(i) {
                triggerQueue[i] = function(curSum) {
                    arrFun[i](curSum,function(err,message,curSum) {
                        if(err) {
                            $("#message").text(err.message);
                            console.log("err");
                            // 出错后恢复现场
                            $(arr[i]).removeClass("disabled");
                            $(arr[i]).children(".unread").hide();
                            triggerQueue[i](err.curSum);
                        }
                        else {
                            $("#message").text(message);
                            triggerQueue[i+1](curSum);
                        }
                    })
                }
            })(i);
        } 
        triggerQueue[arrFun.length] = function () {
            $("#info-bar").trigger('click', function () {
                $("#message").text("楼主异步调用战斗力感人，目测不超过 " + $("#info-bar").text());
            });
        };
        triggerQueue[0](0);

    });

}

function aHandler(curSum, callback) {
    Handler($("#A"), curSum, "A: 这是一个天大的秘密", "A: 这不是一个天大的秘密", callback);
}

function bHandler(curSum, callback) {
    Handler($("#B"), curSum, "B: 我不知道", "B: 我知道", callback);
}

function cHandler(curSum, callback) {
    Handler($("#C"), curSum, "C: 你不知道", "C: 你知道", callback);
}

function dHandler(curSum, callback) {
    Handler($("#D"),curSum, "D: 他不知道", "D: 他知道", callback);
}

function eHandler(curSum, callback) {
    Handler($("#E"),curSum, "E: 才怪", "E: 才不怪", callback);
}

function Handler(button,curSum, succeedMsg, failMsg, callback) {
    // 0.5的概率出错
    $(button).trigger("click", function () {
        if (Math.random() < 0.5) {
            // 检测info-bar是否可以显示结果
            if (!$(".button:not(.disabled),.button:has(.unread:hidden)").length) {
                $("#info-bar").removeClass("disabled");
            }            
            callback(null, succeedMsg, curSum + parseInt($(button).children(".num").text()));
        } else {
            callback({ message: failMsg, curSum: curSum }, null, null);
        }
    });
}

