"use strict";$(function(){var e=!1;$(".img-up").on("mousedown",function(){$(window).mousemove(function(){e=!0,$(window).unbind("mousemove")})}).on("mouseup",function(){var t=e;if(e=!1,$(window).unbind("mousemove"),!t){var o=$(this),n=$($(o.parent()).parent()).find("img").map(function(e,t){return t.src}),i=+o.attr("data-nbr");$("body").append('<div class="img-popup">\n        <div class="img-popup_bg"></div>\n        <div class="prev-up"><div class="before-up"></div><div class="after-up"></div></div>\n        <img src="'.concat(n[i],'" class="img-popup_img" /> \n        <div class="next-up"><div class="before-up"></div><div class="after-up"></div></div>\n      </div>')),setTimeout(function(){$(".img-popup").addClass("show-up")},0),$(".img-popup_bg").click(function(){$(".img-popup").removeClass("show-up"),setTimeout(function(){$(".img-popup").remove()},800)}),$(".prev-up").on("click",function(){i>0?i--:i=n.length-1,$(".img-popup_img").attr("src",n[i])}),$(".next-up").on("click",function(){i<n.length-1?i++:i=0,$(".img-popup_img").attr("src",n[i])}),$(window).on("swipeleft",function(){i<n.length-1?i++:i=0,$(".img-popup_img").attr("src",n[i])}),$(window).on("swiperight",function(){i>0?i--:i=n.length-1,$(".img-popup_img").attr("src",n[i])})}}),$(".card-group").on("init",function(){$(".card-group").animate({opacity:"1"},1e3)}),$(".card-group").slick({dots:!0,infinite:!1,speed:300,slidesToShow:1,centerMode:!1,arrows:!1,autoplay:!1,variableWidth:!0,focusOnSelect:!0});var t=0;$(".reded.card-group").on("afterChange",function(){t=+$(this).find(".slick-current.slick-active .card-body").attr("data-number"),$("#teachersBlock > div").addClass("hiddenText"),$("#teachersBlock > .teacher_".concat(t)).removeClass("hiddenText")}),$(".reded.card-group").on("swipe",function(e,o,n){n&&(t=+$(this).find(".slick-current.slick-active .card-body").attr("data-number"),$("#teachersBlock > div").addClass("hiddenText"),$("#teachersBlock > .teacher_".concat(t)).removeClass("hiddenText"))});var o=document.querySelectorAll(".selected-date"),n=document.querySelectorAll(".calendar-body"),i=$(".full-calendar"),s=($(".selected-date"),new Date);if($("#calendar")[0]){for(var a=0;a<i.length;a++){var r=$(i[a]).find(".selected-date");$($(r[0]).children()[0]).removeAttr("data-calendar_month"),$($(r[r.length-1]).children()[2]).removeAttr("data-calendar_month")}for(var c=0;c<o.length;c++){+(d=o[c].getAttribute("data-calendar_date").split("_"))[0]<s.getMonth()+1||+d[1]<s.getFullYear()||+d[0]!==s.getMonth()+1&&+d[1]!==s.getFullYear()||($($(".selected-date")[c]).addClass("active"),$($(".calendar-body")[c]).addClass("active"))}for(var l=0;l<n.length;l++){var d;if((+(d=n[l].getAttribute("data-calendar_body").split("_"))[0]<s.getMonth()+1||+d[1]<s.getFullYear())&&$(n[l]).find(".calendar__data_date").css("color","grey"),+d[0]==s.getMonth()+1&&+d[1]==s.getFullYear())for(var u=0;u<$(n[l]).children().length;u++){parseInt($($($(n[l]).children()[u]).children()[0]).text())<s.getDate()&&$($($(n[l]).children()[u]).children()[0]).css("color","grey")}}}$(".opener").on("click",function(e){$(this).parent().parent().parent().parent().toggleClass("open-text")}),$(".text-cont").on("click",function(e){$(this).parent().parent().parent().parent().toggleClass("open-text")});var f=window.pageYOffset||document.scrollTop;$(window).on("wheel",function(){}),$(window).on("scroll",function(){$("#calendar").length?f+90>$("#calendar").offset().top?($(".bars").addClass("red"),$(".menu__lang > span").hide()):($(".bars").removeClass("red"),$(".menu__lang > span").show()):(f+90>$("#numbers").offset().top?($(".bars").addClass("red"),$(".menu__lang > span").hide()):($(".bars").removeClass("red"),$(".menu__lang > span").show()),f+90>$("#everywhere").offset().top&&$(".bars").removeClass("red"),f+90>$("#everywhere").offset().top&&$(".bars").removeClass("red"),f+90>$("#educational_services").offset().top&&$(".bars").addClass("red"),f+90>$("#contacts").offset().top&&$(".bars").removeClass("red")),f=window.pageYOffset||document.scrollTop}),$("#mobile_mentors > div").on("click",function(){$(this).hasClass("active")||($(this).parent().find(".active").removeClass("active"),$(this).addClass("active"),$(".about_us__tab__description > div").hide("slow"),"switch_1"===this.id&&$("#mentors_mobile_1").show("slow"),"switch_2"===this.id&&$("#mentors_mobile_2").show("slow"),"switch_3"===this.id&&$("#mentors_mobile_3").show("slow"))}),$("#about_us .about_us__tabs > .flex-column > .nav-item > .nav-link").on("click",function(){$(this).hasClass("forChild")?(console.log($(this).parent().find(".flex-column .nav-link.active")),$(this).find(".nav-link.active").css("border","20px solid red"),$(".flex-column.child").hide(),$(this).parent().find(".flex-column.child").show(),$(this).attr("href",$(this).parent().find(".flex-column .nav-link.active").attr("href"))):$(".flex-column.child").hide()}),$(".calendar__tabs > .flex-column > .nav-item > .nav-link").on("click",function(){$(this).hasClass("forChild")?($(".flex-column.child").show(),$(this).attr("href",$(".flex-column.child .nav-link.active").attr("href"))):$(".flex-column.child").hide()});var p="",h="",m=!0,v=!0;$.get("https://fluentrussia-metrika.firebaseio.com/profile_1.json",function(e){p=Object.values(e).length,console.log("The HR video was viewed ".concat(p," times"))}),$.get("https://fluentrussia-metrika.firebaseio.com/profile_2.json",function(e){h=Object.values(e).length,console.log("The Quiz video was viewed ".concat(h," times"))}),$("#my-video_1").on("click",function(){m&&($.ajax({url:"https://fluentrussia-metrika.firebaseio.com/profile_1.json",type:"POST",data:JSON.stringify(p),success:function(e){},error:function(e){console.log(e)}}),$.get("https://fluentrussia-metrika.firebaseio.com/profile_1.json",function(e){p=Object.values(e).length,console.log("The HR video was viewed ".concat(p," times"))}),m=!1)}).on("touchstart",function(){m&&($.ajax({url:"https://fluentrussia-metrika.firebaseio.com/profile_1.json",type:"POST",data:JSON.stringify(p),success:function(e){},error:function(e){console.log(e)}}),$.get("https://fluentrussia-metrika.firebaseio.com/profile_1.json",function(e){p=Object.values(e).length,console.log("The HR video was viewed ".concat(p," times"))}),m=!1)}),$("#my-video_2").on("click",function(){v&&($.ajax({url:"https://fluentrussia-metrika.firebaseio.com/profile_2.json",type:"POST",data:JSON.stringify(h),success:function(e){},error:function(e){console.log(e)}}),$.get("https://fluentrussia-metrika.firebaseio.com/profile_2.json",function(e){h=Object.values(e).length,console.log("The Quiz video was viewed ".concat(h," times"))}),v=!1)}).on("touchstart",function(){v&&($.ajax({url:"https://fluentrussia-metrika.firebaseio.com/profile_2.json",type:"POST",data:JSON.stringify(h),success:function(e){},error:function(e){console.log(e)}}),$.get("https://fluentrussia-metrika.firebaseio.com/profile_2.json",function(e){h=Object.values(e).length,console.log("The Quiz video was viewed ".concat(h," times"))}),v=!1)})});