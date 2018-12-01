window.onload = function () {
    // init
    $("#button").on("mouseenter", function () {
        $(".button").removeClass("disabled");
        $("#info-bar").addClass("disabled");
        $(".unread").hide();
        $(".info").text("");
    });

     $(".button").click(function(event) {
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
}