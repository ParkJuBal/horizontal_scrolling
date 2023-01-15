$(document).ready(function(){
  const container = $('.container');
  let winW = $(window).width();
  let winH = $(window).height();
  let contWidth = container.children().outerWidth(true);
  let contHeight = contWidth - winH; // container width + 윈도우 높이값을 변수로 지정
  container.css("height",contHeight); // 위 변수를 container 높이값으로 지정(리사이징하면 높이값이 부족함.. <-???)

  $(window).scroll(function(){
    let containerOffTop = container.offset().top; // 횡스크롤 시작점
    let winTop = $(document).scrollTop();

    if(winTop >= containerOffTop && winTop <= (container.next().offset().top) - winH){
      // 윈도우탑이 container 영역에 왔을 때부터 윈도우 하단에서 container 다음 컨텐츠가 시작될 때까지 실행
      container.children().addClass('fixed');

      let winScY = window.scrollY; // 스크롤휠 값
      let scrollValue = winScY - containerOffTop; // container 영역내에서의 스크롤휠 값(0부터 시작함)
      container.children().css({'transform':'translateX('+(-scrollValue)+'px)'});
      
    } else if(winTop >= (container.next().offset().top) - winH){
      // 윈도우 하단에서 container 다음 컨텐츠가 시작될 때
      container.children().removeClass('fixed').addClass('fixed_off');

      // 화면이 container 영역 아래로 갔을 때 translateX값을 컨테이너 최우측값으로 맞춤
      let contScDownInit = contWidth - winW;
      container.children().css({'transform':'translateX('+(-contScDownInit)+'px)'});

    }else{
      // container 영역 위로 올랐을 때
      container.children().removeClass('fixed fixed_off').css({'transform':'translateX('+0+'px)'})// 화면이 container 영역 위로 갔을 때 translateX값을 컨테이너 좌측값으로 맞춤

    }
  })
})