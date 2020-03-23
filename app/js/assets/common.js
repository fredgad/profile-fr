jQuery(document).ready(function(e) {
    $(document).on("focus gesturestart", function(e) {
        e.preventDefault()
    }),
    $("body").on("focus", "input.error, textarea.error, select.error", function() {
        $(this).removeClass("error")
    }),
    $("body").find("[phonemask]").each(function() {
        var t = $(this).attr("placeholder")
          , i = $(this).attr("code") || "+7";
        $(this).mask(i + " (hhh) hhh-hh-hh", {
            autoclear: !1
        }).attr({
            placeholder: t,
            type: "tel"
        })
    }),
    $("body").find(".phone ,[phone]").each(function() {
        $(this).attr("code");
        $(this).attr("href", "tel:" + $(this).text().trim().replace(/-|\(|\)|\s/g, "").replace(/^8/, "+7"))
    }),
    $("body").find(".whatsapp, [whatsapp]").each(function() {
        var t = $(this).data("message")
          , i = $(this).text().trim().replace(/-|\(|\)|\s/g, "").replace(/^8/, "+7");
        $(this).attr("code");
        $(this).attr("href", "whatsapp://send?phone=" + i + "&abid=" + i + "&text=" + t)
    }),
    $("body").find(".email, [email]").each(function() {
        $(this).attr("href", "mailto:" + $(this).text().trim())
    }),
    $("body").on("submit", "form:not([action])", function(e) {
        return e.preventDefault(),
        !1
    }),
    $("body").on("focus", 'input[type="text"], input[type="password"], input[type="number"], input[type="email"], input[type="tel"]', function() {
        $(this).removeAttrib("readonly")
    }),
    $("body").on("blur", 'input[type="text"], input[type="password"], input[type="number"], input[type="email"], input[type="tel"]', function() {
        $(this).setAttrib("readonly")
    }),
    $("body").on("change", 'input[type="checkbox"]', function() {
        $(this)[0].hasAttribute("checked") ? (e(this).prop("checked", !1),
        $(this)[0].removeAttribute("checked")) : (e(this).prop("checked", !0),
        $(this)[0].setAttribute("checked", ""))
    });
    var t;
    t = $(window).scrollTop(),
    t > 2 * $(window).height() ? $("[scrolltop]").addClass("visible") : $("[scrolltop]").removeClass("visible"),
    $(window).on("scroll", function() {
        t = $(this).scrollTop(),
        t > 2 * $(window).height() ? $("[scrolltop]").addClass("visible") : $("[scrolltop]").removeClass("visible hover")
    }),
    $("[scrolltop]").on("click", function(t) {
        t.preventDefault(),
        $("html, body").animate({
            scrollTop: 0
        }, 800, "easeInOutQuint")
    }),
    $("[scrolltop]").on("tap click mouseenter", function() {
        $(this).addClass("hover")
    }),
    $("[scrolltop]").on("mouseleave", function() {
        $(this).removeClass("hover")
    }),
    $("body").find("[parallax]").each(function() {
        var t = $(this).attr("parallax").split("|");
        $(this).parallax({
            imageSrc: t[0],
            speed: parseFloat(t[1])
        })
    }),
    $("body").on(tapEvent, ".tabstitles li", function() {
        var t = this
          , i = location.hash.substr(1, location.hash.length).split(".")
          , n = $(t).attr("id")
          , a = i[0]
          , s = $(t).closest(".tabstitles")
          , l = $(s).siblings(".tabscontent");
        $(t).removeClass("error"),
        void 0 == i[2] && $("#" + a).find(".tabstitles:not(.sub)").siblings(".tabscontent").find(".tabstitles.sub").each(function() {
            $(this).children("li").removeClass("active"),
            $(this).children("li:first").addClass("active"),
            $(this).siblings(".tabscontent").find("[tabid]").removeClass("visible"),
            $(this).siblings(".tabscontent").find("[tabid]:first").addClass("visible")
        }),
        $(s).children("li").removeClass("active"),
        $(t).addClass("active"),
        0 == $(s).hasClass("sub") ? location.hash = a + "." + n : location.hash = a + "." + i[1] + "." + n,
        0 == $(l).children('[tabid="' + n + '"]').hasClass("visible") && (e(l).children("[tabid]").removeClass("visible"),
        $(l).children('[tabid="' + n + '"]').addClass("visible")),
        initEditors()
    });
    var i, n, a, s = "", l = {
        images: "png|jpg|jpeg|gif|ico|bmp",
        videos: "mp4|avi|mov|wmv|mpeg|3gp|flv|m4v|mpg|swf",
        audios: "mp3|wav|wma|m3u|ogg|wav|wave",
        docs: "doc|docx|pdf|ppt|pptx|rtf|xls|xlsx|txt"
    };
    s += '<div class="filemanager__client" id="clientFileManager">',
    s += '<div class="filemanager__topdirs mb-2">',
    s += '<ul class="filemanager__dirstree noselect" id="clientFilemanagerDirs"></ul>',
    s += "</div>",
    s += '<div class="filemanager__bottomfiles">',
    s += '<div class="filemanager__content_files filemanager__content_clientfiles noselect" id="clientFilemanagerContentFiles">',
    s += '<p class="empty center">Выберите раздел</p>',
    s += "</div>",
    s += "</div>",
    s += "</div>",
    $("body").append(s),
    $("body").on(tapEvent, "[filemanager]", function() {
        a = lscache.get("clientmanagerdir") || !1,
        n = this,
        i = $(this).attr("filemanager") || 0,
        void 0 != l[i] && (i = l[i]),
        a && (getAjaxHtml("filemanager/files_get", {
            directory: a,
            filetypes: i
        }, function(t) {
            $("#clientFilemanagerContentFiles").html(t)
        }),
        getAjaxHtml("filemanager/dirs_get", {
            current_dir: a
        }, 
        function(t) {
            $("#clientFilemanagerDirs").html(t)
        })),
        0 == $("#clientFileManager").hasClass("visible") && $("#clientFileManager").addClass("visible")
    }),
    $("body").on(tapEvent, ".filemanager_remove", function() {
        var t = $(this).closest(".file");
        $(t).find(".image_name").text("нет файла"),
        $(t).find("img").attr("src", "./public/images/none.png"),
        $(t).find('input[type="hidden"]').val("")
    }),
    getAjaxHtml("filemanager/dirs_get", {
        current_dir: a
    }, 
    function(t) {
        $("#clientFilemanagerDirs").html(t)
    }),
    $("#clientFilemanagerDirs").on(tapEvent, "[directory]:not(.disabled):not(.active)", function() {
        var t = $(this).attr("directory");
        lscache.set("clientmanagerdir", t),
        $("#clientFilemanagerDirs").find("[directory]").removeClass("active"),
        $(this).addClass("active"),
        getAjaxHtml("filemanager/files_get", {
            directory: t,
            filetypes: i
        }, function(t) {
            $("#clientFilemanagerContentFiles").html(t)
        })
    }),
    $("#clientFilemanagerContentFiles").on(tapEvent, ".image", function() {
        var t = $(this).closest(".file")
          , i = $(t).attr("dirfile")
          , a = $(t).attr("namefile")
          , s = $(this).find("img").attr("src");
        $(n).closest(".file").find('input[type="hidden"]').val(i),
        $(n).find("img").attr("src", s),
        $(n).closest(".file").find(".image_name").text(a),
        $("#clientFileManager").removeClass("visible")
    }),
    $("body").on(tapEvent, function() {
        $("#clientFileManager").is(":hover") || 0 != $("[filemanager]:hover").length || $("#clientFileManager").hasClass("visible") && $("#clientFileManager").removeClass("visible")
    }),
    $("#clientFileManager").on("mouseenter", function() {
        disableScroll()
    }),
    $("#clientFileManager").on("mouseleave", function() {
        enableScroll()
    }),
    e.fn.scrollbarWidth = function() {
        var t = $("<div>").css({
            height: "50px",
            width: "50px"
        })
          , i = $("<div>").css({
            height: "200px"
        });
        $("body").append(t.append(i));
        var n = $("div", t).innerWidth();
        t.css("overflow-y", "scroll");
        var a = $("div", t).innerWidth();
        return $(t).remove(),
        n - a
    }
    ,
    e.fn.scrollHorizont = function(t) {
        function i() {
            d = $(window).scrollTop(),
            d >= c - 30 && d <= c + r ? $(s).scrollLeft(d - c) : d >= c && $(s).scrollLeft(999999)
        }
        var n = this
          , a = $(window).width()
          , s = $(n).find(".scrollblock__sticky")
          , l = $(n).find(".scrollblock__track")
          , r = $(l).outerWidth()
          , o = $(l).outerHeight()
          , c = $(n).offset().top
          , d = $(window).scrollTop();
        if ("center" == t) {
            var h = $(l).children(":first").outerWidth()
              , p = $(l).children(":last").outerWidth();
            $(l).css("padding-left", a / 2 - h / 2),
            $(l).css("padding-right", a / 2 - p / 2),
            r = $(l).outerWidth()
        } else
            void 0 != t && (e(l).css("padding-left", t || 0),
            $(l).css("padding-right", t || 0),
            r = $(l).outerWidth());
        o > r - a + o ? $(n).height(o) : $(n).height(r - a + o),
        i(),
        $(window).scroll(function() {
            i()
        })
    }
});
