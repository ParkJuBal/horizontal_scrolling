$(document).ready(function(){

  $(window).on('load resize',function(){
    horizontalScrolling();
    // let timer;
    // $(window).on('resize',function(){
    //   clearTimeout(timer);
    //   timer = setTimeout(function(){
    //     horizontalScrolling();
    //   },200)
    // });
  });
  
});

function horizontalScrolling(){
  const container = document.querySelector('.container');
  let winW = document.body.offsetWidth; // 실제 사용하는 브라우저의 안쪽 너비
  let winH = window.innerHeight; // 브라우저 두께를 제외한 높이
  let contWidth = container.scrollWidth; // 컨테이너의 보이지않는 범위까지의 너비
  
  let contHeight = contWidth - winW + winH; // container width - 윈도우 너비 + 윈도우 높이값을 변수로 지정
  container.style.height = contHeight + 'px'; // 위 변수를 container 높이값으로 지정

  document.addEventListener('scroll', function() {
    let containerOffTop = container.offsetTop; // 횡스크롤 시작점
    let winTop = window.scrollY || document.documentElement.scrollTop; // 전자는 IE에서 작동하지 않음
  
    if(winTop >= containerOffTop && winTop <= (container.nextElementSibling.offsetTop) - winH){
      // 윈도우탑이 container 영역에 왔을 때부터 윈도우 하단에서 container 다음 컨텐츠가 시작될 때까지 실행
      container.firstElementChild.classList.add('fixed');
  
      let scrollValue = winTop - containerOffTop; // container 영역내에서의 스크롤휠 값(0부터 시작함)
      container.firstElementChild.style.transform = 'translateX(' + (-scrollValue) + 'px)';
      
    } else if(winTop >= (container.nextElementSibling.offsetTop) - winH){
      // 윈도우 하단에서 container 다음 컨텐츠가 시작될 때
      container.firstElementChild.classList.remove('fixed');
      container.firstElementChild.classList.add('fixed_off');
  
      // 화면이 container 영역 아래로 갔을 때 translateX값을 컨테이너 최우측값으로 맞춤
      let contScDownInit = contWidth - winW;
      container.firstElementChild.style.transform = 'translateX(' + (-contScDownInit) + 'px)';
  
    }else{
      // container 영역 위로 올랐을 때
      container.firstElementChild.classList.remove('fixed','fixed_off');
      container.firstElementChild.style.transform = 'translateX(' + 0 + 'px)'; // 화면이 container 영역 위로 갔을 때 translateX값을 컨테이너 좌측값으로 맞춤
    }

  });
}

// 제이쿼리 코드
// $(document).ready(function(){
//   const container = $('.container');
//   let winW = $(window).width();
//   let winH = $(window).height();
//   let contWidth = container.children().outerWidth(true);
//   let contHeight = contWidth - winH; // container width + 윈도우 높이값을 변수로 지정
//   container.css("height",contHeight); // 위 변수를 container 높이값으로 지정(리사이징하면 높이값이 부족함.. <-???)

//   $(window).scroll(function(){
//     let containerOffTop = container.offset().top; // 횡스크롤 시작점
//     let winTop = $(document).scrollTop();

//     if(winTop >= containerOffTop && winTop <= (container.next().offset().top) - winH){
//       // 윈도우탑이 container 영역에 왔을 때부터 윈도우 하단에서 container 다음 컨텐츠가 시작될 때까지 실행
//       container.children().addClass('fixed');

//       let winScY = window.scrollY; // 스크롤휠 값
//       let scrollValue = winScY - containerOffTop; // container 영역내에서의 스크롤휠 값(0부터 시작함)
//       container.children().css({'transform':'translateX('+(-scrollValue)+'px)'});
      
//     } else if(winTop >= (container.next().offset().top) - winH){
//       // 윈도우 하단에서 container 다음 컨텐츠가 시작될 때
//       container.children().removeClass('fixed').addClass('fixed_off');

//       // 화면이 container 영역 아래로 갔을 때 translateX값을 컨테이너 최우측값으로 맞춤
//       let contScDownInit = contWidth - winW;
//       container.children().css({'transform':'translateX('+(-contScDownInit)+'px)'});

//     }else{
//       // container 영역 위로 올랐을 때
//       container.children().removeClass('fixed fixed_off').css({'transform':'translateX('+0+'px)'})// 화면이 container 영역 위로 갔을 때 translateX값을 컨테이너 좌측값으로 맞춤

//     }
//   })
// })