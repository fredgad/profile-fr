"use strict";

$(function () { 


  // Img gallery
  let isDragging = false

  $(".img-up")
  .on('mousedown', () => { // If was dragging
    $(window).mousemove(() => {
      isDragging = true;
      $(window).unbind("mousemove");
    })
  })
  .on('mouseup', function() {
    let wasDragging = isDragging
    isDragging = false
    $(window).unbind("mousemove")

    if(wasDragging) {
      return
    }

    let img = $(this),
        imgArr = $($(img.parent()).parent()).find('img'),
        srcArr = imgArr.map((i, el) => el.src), 
        nbr = +img.attr('data-nbr')

    $("body").append(`<div class="img-popup">
        <div class="img-popup_bg"></div>
        <div class="prev-up"><div class="before-up"></div><div class="after-up"></div></div>
        <img src="${srcArr[nbr]}" class="img-popup_img" /> 
        <div class="next-up"><div class="before-up"></div><div class="after-up"></div></div>
      </div>`) 

      setTimeout(function() { // Showing img popup
        $(".img-popup").addClass('show-up')  
      }, 0)
      
      $(".img-popup_bg").click(function(){ // Hidiing img popup
        $(".img-popup").removeClass('show-up') 
        setTimeout(function() {
          $(".img-popup").remove(); 
        }, 800) 
      })


      $('.prev-up').on('click', () => { //Prev arrow click
        if(nbr > 0){
          nbr--
        } else {
          nbr = srcArr.length - 1
        }
        $('.img-popup_img').attr('src', srcArr[nbr])
      })
      $('.next-up').on('click', () => { //Next arrow click
        if(nbr < srcArr.length - 1){
          nbr++
        } else {
          nbr = 0
        }
        $('.img-popup_img').attr('src', srcArr[nbr])
      })


      $(window).on('swipeleft', function() {
        if(nbr < srcArr.length - 1){
          nbr++
        } else {
          nbr = 0
        }
        $('.img-popup_img').attr('src', srcArr[nbr])
      })
      $(window).on('swiperight', function() {
        if(nbr > 0){
          nbr--
        } else {
          nbr = srcArr.length - 1
        }
        $('.img-popup_img').attr('src', srcArr[nbr])
      }) 
  })
//











$('.card-group').on('init', function() {
  $('.card-group').animate({'opacity': '1'}, 1000)
}) 

$('.card-group').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  centerMode: false,
  arrows: false,
  autoplay: false,
  variableWidth: true,
  focusOnSelect: true
})

let num = 0
$('.reded.card-group').on('afterChange', function() {
    num = +$(this).find('.slick-current.slick-active .card-body').attr('data-number')
    $('#teachersBlock > div').addClass('hiddenText')
    $(`#teachersBlock > .teacher_${num}`).removeClass('hiddenText') 
}); 
$('.reded.card-group').on('swipe', function(event, slick, direction){
  if(direction) {
    num = +$(this).find('.slick-current.slick-active .card-body').attr('data-number')

    $('#teachersBlock > div').addClass('hiddenText')
    $(`#teachersBlock > .teacher_${num}`).removeClass('hiddenText') 
  }
});



// Grey out not relevant events/webinars 
var selectedData = document.querySelectorAll('.selected-date'),
    selectedBody = document.querySelectorAll('.calendar-body'),
    $fullCalendar = $('.full-calendar'),
    $selectedData = $('.selected-date'),
    d = new Date();

if($('#calendar')[0]) {
    // Cut the ends
    for(let z = 0; z < $fullCalendar.length; z++) { 
      let select = $($fullCalendar[z]).find('.selected-date')
      
      $($(select[0]).children()[0]).removeAttr('data-calendar_month') 
      $($(select[select.length-1]).children()[2]).removeAttr('data-calendar_month') 
    }

    for(let i = 0; i < selectedData.length; i++) {
        var parsedDate = selectedData[i].getAttribute('data-calendar_date').split('_')

        if(+parsedDate[0] < d.getMonth() + 1 || +parsedDate[1] < d.getFullYear()) {
          // let xz = $($('.calendar-body')[i]).find('.calendar__data_date')
        } else if(+parsedDate[0] === d.getMonth() + 1 || +parsedDate[1] === d.getFullYear()) {
          $($('.selected-date')[i]).addClass('active')
          $($('.calendar-body')[i]).addClass('active') 
        }
    }

    for(let i = 0; i < selectedBody.length; i++) { // Gray out past events
        var parsedDate = selectedBody[i].getAttribute('data-calendar_body').split('_')
        if(+parsedDate[0] < d.getMonth() + 1 || +parsedDate[1] < d.getFullYear()) {
          // console.log(selectedBody[i])
          $(selectedBody[i]).find('.calendar__data_date').css('color', 'grey')
        } 
        if(+parsedDate[0] == d.getMonth() + 1 && +parsedDate[1] == d.getFullYear()) {
          for(let x = 0; x < $(selectedBody[i]).children().length; x++) {
            var day = parseInt($($($(selectedBody[i]).children()[x]).children()[0]).text())
            if(day < d.getDate()) { 
              $($($(selectedBody[i]).children()[x]).children()[0]).css('color', 'grey')
            }
          } 
        }
    }
} 
  


$('.opener').on('click', function(e) {
  $(this).parent().parent().parent().parent().toggleClass('open-text')
})
$('.text-cont').on('click', function(e) {
  $(this).parent().parent().parent().parent().toggleClass('open-text')
}) 

  var scrolled = window.pageYOffset || document.scrollTop;
  $(window).on('wheel', function () {});
  $(window).on('scroll', function () {
    // Scrolling event
    if($('#calendar').length) {
      if(scrolled + 90 > $('#calendar').offset().top) { 
        $('.bars').addClass('red'); 
        $('.menu__lang > span').hide();
      } else {
        $('.bars').removeClass('red');
        $('.menu__lang > span').show();
      }
    } else {
      if (scrolled + 90 > $('#numbers').offset().top) {
        $('.bars').addClass('red');
        $('.menu__lang > span').hide();
      } else {
        $('.bars').removeClass('red');
        $('.menu__lang > span').show();
      }
  
      if (scrolled + 90 > $('#everywhere').offset().top) {
        $('.bars').removeClass('red');
      }
      if (scrolled + 90 > $('#everywhere').offset().top) {
        $('.bars').removeClass('red');
      }
      if (scrolled + 90 > $('#educational_services').offset().top) {
        $('.bars').addClass('red');
      }
      if (scrolled + 90 > $('#contacts').offset().top) {
        $('.bars').removeClass('red');
      }
    }
    
    scrolled = window.pageYOffset || document.scrollTop;
  });


  $('#mobile_mentors > div').on('click', function() {
    if(!$(this).hasClass('active')) {
      $(this).parent().find('.active').removeClass('active')
      $(this).addClass('active') 
  
      $('.about_us__tab__description > div').hide('slow')
  
      if(this.id === 'switch_1') {
        $('#mentors_mobile_1').show('slow')
      }
      if(this.id === 'switch_2') {
        $('#mentors_mobile_2').show('slow')
      }
      if(this.id === 'switch_3') {
        $('#mentors_mobile_3').show('slow')
      }
    }
  })



  $('#about_us .about_us__tabs > .flex-column > .nav-item > .nav-link').on('click', function() { // Differences and menthors events switcher
    if($(this).hasClass('forChild')) {
      console.log($(this).parent().find('.flex-column .nav-link.active'))
      $(this).find('.nav-link.active').css('border', '20px solid red')
      $('.flex-column.child').hide()
      $(this).parent().find('.flex-column.child').show()  
      $(this).attr('href', $(this).parent().find('.flex-column .nav-link.active').attr('href'))
    } else {
      $('.flex-column.child').hide()   
    }
  })


  
  $('.calendar__tabs > .flex-column > .nav-item > .nav-link').on('click', function() { // CIty events switcher
    if($(this).hasClass('forChild')) {
      $('.flex-column.child').show()  
      $(this).attr('href', $('.flex-column.child .nav-link.active').attr('href'))
    } else {
      $('.flex-column.child').hide()  
    }
  })
  // $('.nav-item .nav-link').on('click', function() {
  //   $('.flex-column.child').hide() 
  // })



// Video metrika

var param_1 = '', param_2 = '', check_1 = true, check_2 = true;

$.get('https://fluentrussia-metrika.firebaseio.com/profile_1.json', function(data) {
  param_1 = Object.values(data).length
  console.log(`The HR video was viewed ${param_1} times`);  
}); 
$.get('https://fluentrussia-metrika.firebaseio.com/profile_2.json', function(data) {
  param_2 = Object.values(data).length
  console.log(`The Quiz video was viewed ${param_2} times`);  
});



$('#my-video_1').on('click', function () { 
  if(check_1) {
    $.ajax({
      url: 'https://fluentrussia-metrika.firebaseio.com/profile_1.json',
      type: "POST",
      data: JSON.stringify(param_1),   
      success: function (res) {
      },
      error: function(error) {
        console.log(error);  
      }
    });
  
    $.get('https://fluentrussia-metrika.firebaseio.com/profile_1.json', function(data) {
      param_1 = Object.values(data).length
      console.log(`The HR video was viewed ${param_1} times`);  
    }); 
    
    check_1 = false
  }
}).on('touchstart', function () { 
  if(check_1) {
    $.ajax({
      url: 'https://fluentrussia-metrika.firebaseio.com/profile_1.json',
      type: "POST",
      data: JSON.stringify(param_1),   
      success: function (res) {
      },
      error: function(error) {
        console.log(error);  
      }
    });
  
    $.get('https://fluentrussia-metrika.firebaseio.com/profile_1.json', function(data) {
      param_1 = Object.values(data).length
      console.log(`The HR video was viewed ${param_1} times`);  
    }); 
    
    check_1 = false
  }
})


$('#my-video_2').on('click', function () { 
  if(check_2) {
    $.ajax({
      url: 'https://fluentrussia-metrika.firebaseio.com/profile_2.json',
      type: "POST",
      data: JSON.stringify(param_2),   
      success: function (res) {
      },
      error: function(error) {
        console.log(error); 
      }
    });
  
    $.get('https://fluentrussia-metrika.firebaseio.com/profile_2.json', function(data) {
      param_2 = Object.values(data).length
      console.log(`The Quiz video was viewed ${param_2} times`);  
    }); 

    check_2 = false
  }
}).on('touchstart', function () { 
  if(check_2) {
    $.ajax({
      url: 'https://fluentrussia-metrika.firebaseio.com/profile_2.json',
      type: "POST",
      data: JSON.stringify(param_2),   
      success: function (res) {
      },
      error: function(error) {
        console.log(error); 
      }
    });
  
    $.get('https://fluentrussia-metrika.firebaseio.com/profile_2.json', function(data) {
      param_2 = Object.values(data).length
      console.log(`The Quiz video was viewed ${param_2} times`);  
    }); 

    check_2 = false
  }
})





});