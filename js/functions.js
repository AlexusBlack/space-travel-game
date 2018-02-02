		function Move(id,x,y) { //Передвинуть объект(ы)
			$(id).css({"left": x,"top": y});
		}
		function FocusOn(x,y) { //Переместить камеру в точку
			window.scrollTo(x-$(window).width()/2,y-$(window).height()/2);
		}
		function AddExpl(x,y) {
			var tid=Math.floor(Math.random()*sys_size);
			$("#content").append("<div id='expl-"+tid+"' model='models/expl-opt.png' size='150' side='88'></div>");
			
			$("#expl-"+tid).css({"position": "absolute",
								"left": x+"px",
								"top": y+"px",
								"z-index": "0",
			
								"background":"url("+$("#expl-"+tid).attr("model")+") no-repeat 0 0",
								"width":$("#expl-"+tid).attr("size"),
								"height":$("#expl-"+tid).attr("size"),
								"backgroundPosition":"0px 0px"});
			anim_coord["expl-"+tid+"-x"]=0;
			anim_coord["expl-"+tid+"-d"]=$("#expl-"+tid).attr("size");		anim_coord["expl-"+tid+"-s"]=$("#expl-"+tid).attr("side");
			
			explos['expl-'+tid]=setInterval(function() {
				ex=parseInt(anim_coord["expl-"+tid+"-x"]);
				ed=parseInt(anim_coord["expl-"+tid+"-d"]);	es=parseInt(anim_coord["expl-"+tid+"-s"])-1;		
				ex+=ed; 
				if(ex>=ed*es) {
					$("#expl-"+tid).remove();
					clearInterval(explos['expl-'+tid]);
				}
				$("#expl-"+tid).css("backgroundPosition","-"+ex+"px 0px");
				anim_coord["expl-"+tid+"-x"]=ex;					
			}, 100);
		}
		function Rotate(id,fi) { //Повернуть указанный объект(ы) на указанный угол
			$(id).css({	"-moz-transform":"rotate("+fi+"deg)",
						"-o-transform":"rotate("+fi+"deg)",
						"-webkit-transform":"rotate("+fi+"deg)",
						"-ms-transform":"rotate("+fi+"deg)",
						"transform":"rotate("+fi+"deg)"});
		}
		function Set(id,x,y,fi) {
			$(id).css({//Rotation
				"-moz-transform":"rotate("+fi+"deg)",
				"-o-transform":"rotate("+fi+"deg)",
				"-webkit-transform":"rotate("+fi+"deg)",
				"-ms-transform":"rotate("+fi+"deg)",
				"transform":"rotate("+fi+"deg)",
				//Movement
				"left": x,"top": y
			});
		}
		function Forward(i) {
			angle=Math.PI/180*ships[i].r;
			ships[i].x+=Math.sin(angle)*ships[i].speed;		
			ships[i].y-=Math.cos(angle)*ships[i].speed;			
		}
		function Back(i) {
			angle=Math.PI/180*ships[i].r;
			ships[i].x-=Math.sin(angle)*ships[i].speed;		
			ships[i].y+=Math.cos(angle)*ships[i].speed;
		}
		function Draw() { //Изменение DOM
			//Отрисовываем корабли в системе
			for ( i in ships ) {
				//if(ships[i].x>player.x+$(window).width()+draw_zone || ships[i].x<player.x-draw_zone ||
					//ships[i].y>player.y+$(window).height()+draw_zone || ships[i].y<player.y-draw_zone) continue;
				Move("#"+ships[i].id,ships[i].x,ships[i].y); //Передвигаем
				Rotate("#"+ships[i].id,ships[i].r); //Поворачиваем
			}
			//Отрисовываем планеты
			for ( name in orbits ) {
				$("#"+name).css({"left": orbits[name].X+"px",
				"top": orbits[name].Y+"px"});
			}
			//Отрисовываем игрока
			//Set("#player",player.x,player.y,player.r);
			Move("#player",player.x,player.y);
			Move("#range",player.x+64/2-350/2,player.y+64/2-350/2);
			Rotate("#player",player.r);
			FocusOn(player.x,player.y);
		}
		function GetAngle(x1,y1,x2,y2) { //откуда, куда
		x=Math.abs(x1-x2);
		y=Math.abs(y1-y2);
		if(x2>x1 && y2<y1 && x<=y) {
			return 180/Math.PI*Math.atan(x/y);
		} else if(x2>x1 && y2<y1 && x>y) {
			return 90-180/Math.PI*Math.atan(y/x);
		} else if(x2>x1 && y2>y1 && x>=y) {
			return 180/Math.PI*Math.atan(y/x)+90;
		} else if(x2>x1 && y2>y1 && x<y) {
			return 180-180/Math.PI*Math.atan(x/y);
		} else if(x1>x2 && y2>y1 && x<=y) {
			return 180/Math.PI*Math.atan(x/y)+180;
		} else if(x1>x2 && y2>y1 && x>y) {
			return 270-180/Math.PI*Math.atan(y/x);
		} else if(x1>x2 && y2<y1 && x>=y) {
			return 180/Math.PI*Math.atan(y/x)+270;
		} else if(x1>x2 && y2<y1 && x<y) {
			return 360-180/Math.PI*Math.atan(x/y);
		}
		if( x1 == x2 && y1>y2) return 0;
		if( x1 == x2 && y1<y2) return 180;
		if( y1 == y2 && x1>x2) return 270;
		if( y1 == y2 && x1>x2) return 90;		
	}
	function RotateTo(i, x, y) { //кто, куда
		TargetAngle=GetAngle(ships[i].x, ships[i].y, x, y);
		if(TargetAngle>ships[i].r && TargetAngle-ships[i].r<=180) rotateDown(i);
		if(TargetAngle>ships[i].r && TargetAngle-ships[i].r>180) rotateUp(i);
		
		if(TargetAngle<ships[i].r  && ships[i].r-TargetAngle<=180) rotateUp(i);
		if(TargetAngle<ships[i].r  && ships[i].r-TargetAngle>180) rotateDown(i);
	}
	function rotateDown(i) {
		ships[i].r+=manevr;
		if( ships[i].r >= 360 ) ships[i].r-=360;
	}
	function rotateUp(i) {
		ships[i].r-=manevr;
		if( ships[i].r <= 0 ) ships[i].r+=360;
	}
	function tic(name) { //Анимационная функция , периодическая 
			x=parseInt(anim_coord[name+"-x"]);
			d=parseInt(anim_coord[name+"-d"]);	s=parseInt(anim_coord[name+"-s"])-1;		
			x+=d; if(x>=d*s) x=0;
			$("."+name).css("backgroundPosition","-"+x+"px 0px");
			anim_coord[name+"-x"]=x;
		}
		function STanim(name) { //Инициализации анимации, проигрывание через tic
			$("."+name).css("background","url("+$("."+name).attr("model")+") no-repeat 0 0");
			$("."+name).css("width",$("."+name).attr("size"));
			$("."+name).css("height",$("."+name).attr("size"));
			$("."+name).css("backgroundPosition","0px 0px");
			anim_coord[name+"-x"]=0;
			anim_coord[name+"-d"]=$("."+name).attr("size");		anim_coord[name+"-s"]=$("."+name).attr("side");		
		}
		function IbyID(id) {
			for(i in ships) {
				if(ships[i].id==id) return i;
			}
		}
		function init() {
			loader();
			AutoLoad();
		}
function PlayAnim() {
	for(i in anim) {
		var width=anim[i].width*anim[i].size;
		var height=anim[i].height*anim[i].size;
		anim[i].ctx.clearRect(0,0,width,height);
		anim[i].ctx.drawImage(anim[i].model,anim[i].width*anim[i].i,0,anim[i].width,anim[i].height,0,0,width,height);
		anim[i].i++;		
		if(anim[i].i==anim[i].side) anim[i].i=0;
	}
}
function InitAnim(id,model,w,h,side,x,y,size,eve,zi) {
	$("#animation").append("<canvas id='"+id+"' width='"+w*size+"px' height='"+h*size+"px' onclick='"+eve+"(\""+id+"\");'></canvas>");
	$("#"+id).css("position", "absolute");
	$("#"+id).css("left", x+"px");
	$("#"+id).css("top", y+"px");
	$("#"+id).css("z-index", zi);
	var canvas = $("#"+id)[0]; 
	anim["a-"+id]={
		"id":id,
		"model":model,
		"width":w,
		"height":h,
		"side":side,
		"i":0,
		"fi":0,
		"size":size,
		"ctx":canvas.getContext('2d')
	};
	return "a-"+id;
}
function iface() {
			$( "#weapon_status" ).progressbar({
				value: 100
			});
			$( "#ship_status" ).progressbar({
				value: 100
			});
		}
