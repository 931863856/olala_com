function changeNavItem(){
	var url = location.href;
	var res = url.match(/(^|#)p=([^#]*)(#|$)/);
	var p = res? res[2]: null;

	$('.nav .nv-list .nv-item').each(function(){
		if(p === null) {
			$('.nav .nv-list .nv-item').eq(0).addClass('on').siblings().removeClass('on');
			return false;
		}else if($(this).attr('data') === p){
			$(this).addClass('on');
			$(this).siblings().removeClass('on');
			return false;
		}
	})
}
changeNavItem();

function scroll(){
	var bh = $('.banner').height()
	var _nav = $('.nav')

	$(document).scroll(function(){
		$(this).scrollTop() > bh ? _nav.addClass('on') :  _nav.removeClass('on')
	})
}
scroll();


;(function(){

	var showbox = function(){
		var it , idx , flag = false;

		var init = function(){
			scResize();
			autoPlay(idx);
			changeWrap();
			_hover();
		};
		
		var dom = {
			box  : $('.showbox'),
			wrap : $('.showbox .wrap'),
			simg : $('.showbox .wrap .sm-img'),
			limg : $('.showbox .lg-img img'),
			page : $('.olala .showcnt')
		};

		function autoPlay(i){
			idx = i||0;
			console.log("之后"+idx)
			it = setInterval(function(){
				if(idx > 3){
					idx = 0
				}
				console.log(idx)
				toAnimateWrap(dom.simg.eq(idx).prevAll(),dom.simg.eq(idx).attr('idx'));
				dom.simg.eq(idx).appendTo(dom.wrap);
				idx++
			},2000)
		}

		function _hover(){
			dom.box.hover(function(){
				clearInterval(it);
			},function(){
				autoPlay(idx);
			})
		}

		function scResize(){
			dom.simg.width(dom.box.width()/3);
			dom.wrap.width((dom.simg.size()+1) * dom.simg.width());
		}

		function changeWrap(){
			dom.simg.click(function(){
				toAnimateWrap($(this).prevAll(), $(this).attr('idx'));
				idx = parseInt($(this).attr('idx')) + 1
				$(this).appendTo(dom.wrap);
			})
		}

		function toAnimateWrap(d , i){
			var  offsetX = d.size() * dom.simg.width();
			dom.wrap.css({
				'transform': 'translateX(' +offsetX +'px)' 
			})
			setTimeout(function(){
				dom.wrap.css({
					'transform': 'translateX(0px)' 
				})
			},300)

			showBigImg(i);
			changePage(i)
		}

		function showBigImg(i){
			if(i == 4){
				i = 0;
				dom.limg.eq(i).addClass('on').siblings().removeClass('on');
			}
			dom.limg.eq(i).addClass('on').siblings().removeClass('on');
		}

		function changePage(i){
			if(i == 4){
				i = 0;
				dom.page.eq(i).addClass('on').siblings().removeClass('on')
			}
			dom.page.eq(i).addClass('on').siblings().removeClass('on')
		}

		return init();
	}

	showbox();



})()