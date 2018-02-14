	//Базовый класс звёздной системы
		var System = $.Class.create({
			init: function(size,name) {
				this.size=size; //Размер свёздной системы
				this.name=name; //Название звёздной системы
				this.Ships=new Array();
				this.Bases=new Array();
				this.Planets=new Array();
			},
			AddShip: function(ship) {
				this.Ships.push(ship);
			},
			AddBase: function(base) {
				this.Bases.push(base);
			},
			AddPlanet: function(planet) {
				this.Planets.push(planet);
			},
			//Двигаем планеты
			MovePlanets: function() {
				for(i in this.Planets) {
					this.Planets[i].move(this.size);
				}
			}
		});
	//Базовый класс планеты
		var Planet = $.Class.create({
			init: function(	name, //Название планеты
							type, //тип планеты 0-9 , см лист 0
							orbit,//орбита планеты
						   speed){//Скорость вращения планеты	
					this.name=name;
					this.type=type;
					this.orbit=orbit;
					this.speed=speed;
					this.relations=new Array();
					
					this.x=-500;
					this.y=-500;
					this.fi=0;
			},
			//Двигаем планету по орбите
			move: function(system_size) {
				var delta=system_size/2;
				var radian=Math.PI/180*this.fi;
				this.x=this.orbit*Math.cos(radian)+delta;
				this.y=this.orbit*Math.sin(radian)+delta;
				this.fi+=this.speed;
			},
			//Меняем взаимоотношение 0 - враждебно, 1 - плохо, 2 - средне, 3 - хорошо, 4 - отлично, 5 - почитание
			upRelations: function(with_who) {
				if(this.relations[with_who]<5) this.relations[with_who]++;
			},
			downRelations: function(with_who) {
				if(this.relations[with_who]>0) this.relations[with_who]--;
			},
						
		});
	//Базовый класс космического корабля
		var Ship = $.Class.create({
			init: function(ship_position, 	//Позиция корабля и его угол x,y,fi
							ship_speed, 	//Скорость и манёвренность корабля speed,manevr
							ship_info, 		//Имя,крепкость корпуса name,maxhp,hp
							gadjet			//Оборудование корабля: двигатель,топливный бак,радар,пушка,корпус engine,fuel,radar,gun,type
			){//x,y,fi,speed,manevr,name){
					this.x=ship_position.x;//Координаты коробля
					this.y=ship_position.y;//-------------
					this.fi=ship_position.fi;//Угол поворота корабля
					
					this.speed=ship_speed.speed;//Скорость корабля
					this.manevr=ship_speed.manevr;//Манёвренность корабля
					
					this.name=ship_info.name;//Название корабля
					this.hp=ship_info.hp;//Количество хп
					this.maxhp=ship_info.maxhp;//Максимальное количество хп
					
					this.engine=gadjet.engine;//Тип двигателя
					this.fuel=gadjet.fuel;//Тип топливного бака
					this.radar=gadjet.radar;//Тип радара
					this.gun=gadjet.gun;//Тип оружия
					this.type=gadjet.type;//Тип корпуса
			},
			//Сдвинуть корабль вперёд
			Forward: function() {
				var angle=Math.PI/180*this.fi;
				this.x+=Math.sin(angle)*this.speed;		
				this.y-=Math.cos(angle)*this.speed;
			},
			//Сдвинуть назад
			Back: function() {
				var angle=Math.PI/180*this.fi;
				this.x-=Math.sin(angle)*this.speed;		
				this.y+=Math.cos(angle)*this.speed;
			},
			//Задать угол
			Rotate:function(fi) {
				this.fi=fi;
			},
			//Повернуть против часовой стрелки
			rUp: function() {
				this.fi-=this.manevr;
				if( this.fi <= 0 ) this.fi+=360;
			},
			//Повернуть по часовой стрелке
			rDown: function() {
				this.fi+=this.manevr;
				if( this.fi >= 360 ) this.fi-=360;
			}
		});
	//Класс визуализации
		var Drawing=$.Class.create({
			init: function(player,system) {
				this.ctx=$("#content");
				
				this.player=player;
				this.system=system;
				
				this.ReSetDrawingSize(); //Устанавливаем размер системы видимым
				
				this.anim=new Array(); //массив анимации
				this.model=new Array(); //массив моделей
				this.ModelsPreLoad();	//Подгружаем модели			
				this.ctx.append("<div id='animation'></div>"); //Создаём контейнер анимации
				this.animation=$("#animation");
				this.DrawSystem(); //Рисуем систему
				
				this.timer;
				this.timer2;
			},
			ModelsPreLoad: function() {
				this.LoadModel("models/ran2-mini.png",64,134);
			},
			//Загрузчик моделей
			LoadModel: function(model,size,side) {
				this.model.push({
					"image":new Image(),
					"size":size,
					"side":side
				});
				this.model[this.model.length-1].image.src=model;				
			},
			ReSetDrawingSize: function() {
				this.ctx.css({"width":this.system.size+"px", "height":this.system.size+"px"});
			},
			//Запуск отрисовки
			Start: function(obj) {
				this.timer=window.setInterval(function(){obj.Anim();}, 100);
				this.timer2=window.setInterval(function(){obj.ReDraw();}, 30);				
			},
			//Остановка отрисовки
			Stop: function() {
				
			},
			//Отрисовать текущую позицию и поместить фокус на игрока
			Anim: function() {
				this.PlayAnim();
			},
			ReDraw: function() {
				this.Move();				
				var size=this.model[this.player.type].size/2;
				this.FocusOn(this.player.x+size,this.player.y+size);
				this.MoveBG();
			},
			//Переместить фокус на точку
			FocusOn: function(x,y) {
				if(x==x-$(window).width()/2 && y==y-$(window).height()/2) return;
				window.scrollTo(x-$(window).width()/2,y-$(window).height()/2);
			},
			//Отрисовать систему
			DrawSystem: function() {
				for(i in this.system.Ships) {
					this.DrawShip(this.system.Ships[i]);
				}
			},
			//Отрисовать корабль
			DrawShip: function(ship) {
				this.CreateAnim({
					"name": ship.name,
					"width": this.model[ship.type].size,
					"height": this.model[ship.type].size,
					"size": 1,
					"x":ship.x,
					"y":ship.y,
					"zindex":1,
					"model":this.model[ship.type].image,
					"width":this.model[ship.type].size,
					"height":this.model[ship.type].size,
					"side":this.model[ship.type].side,
					"object":ship,
					"NotVisible":false
				});
			},
			Move: function() {
				for(i in this.anim) {
					//alert(this.anim[i].object.x);
					//Сдвигаем если надо
					if(this.anim[i].x!=this.anim[i].object.x || this.anim[i].y!=this.anim[i].object.y) {
						this.anim[i].obj.css({
							"left":this.anim[i].object.x+"px",
							"top":this.anim[i].object.y+"px"
						});
						this.anim[i].x=this.anim[i].object.x;
						this.anim[i].y=this.anim[i].object.y;
					}
					//Вращаем если надо
					if(this.anim[i].fi!=this.anim[i].object.fi) {
						this.anim[i].obj.css({	"-moz-transform":"rotate("+this.anim[i].object.fi+"deg)",
							"-o-transform":"rotate("+this.anim[i].object.fi+"deg)",
							"-webkit-transform":"rotate("+this.anim[i].object.fi+"deg)",
							"-ms-transform":"rotate("+this.anim[i].object.fi+"deg)",
							"transform":"rotate("+this.anim[i].object.fi+"deg)"
						});
						this.anim[i].fi=this.anim[i].object.fi;
					}
				}
			},
			//Сдвигает фон вокруг объекта для создания эффекта объёмности
			MoveBG: function() {
				this.ctx.css("backgroundPosition",this.player.x/2+"px "+this.player.y/3+"px");
			},
			//Проверка находится ли объект в области видимости
			InDrawArea: function(target,object) { //({x,y} , {x,y})
				if( object.x>target.x-$(window).width()/2 && object.x<target.x+$(window).width()/2 &&
					object.y>target.y-$(window).height()/2 && object.y<target.y+$(window).height()/2 ) {
						return true;
				}
				return false;
			},
			//Прячет указанный объект
			Hide: function(object) {
				object.css("visibility","hidden");
			},
			//Показывает указанный объект
			Show: function(object) {
				object.css("visibility","visible");
			},
			//Проиграть следующий шаг анимации
			PlayAnim: function() {
				for(i in this.anim) {
					//Если невидимый объект попал в зону отрисовки то делаем его видимым
					var target={x:this.player.x,y:this.player.y}; var object={x:this.anim[i].x,y:this.anim[i].y};
					if( this.anim[i].NotVisible && this.InDrawArea(target,object) ) {
							this.anim[i].NotVisible=false;
							this.Show(this.anim[i].obj);
					}
					//Если не видим то не отрисовываем
					if( this.anim[i].NotVisible ) continue;
					//Если далеко от игрока то делаем невидимым
					if( !this.InDrawArea(target,object)) {
							this.anim[i].NotVisible=true;
							this.Hide(this.anim[i].obj);
							continue;
					}
					 
					var width=this.anim[i].width*this.anim[i].size;
					var height=this.anim[i].height*this.anim[i].size;
					this.anim[i].ctx.clearRect(0,0,width,height);
					this.anim[i].ctx.drawImage(this.anim[i].model,this.anim[i].width*this.anim[i].i,0,this.anim[i].width,this.anim[i].height,0,0,width,height);					
									
					this.anim[i].i++;		
					if(this.anim[i].i==this.anim[i].side) this.anim[i].i=0;		
					
					this.Move(i);		
				}
			},
			//Создать новую анимацию
			CreateAnim: function(e) {
				var id="anim-"+e.name;
				this.animation.append("<canvas id='"+id+"' width='"+e.width*e.size+"px' height='"+e.height*e.size+"px'></canvas>");
				var obj=$("#"+id);
				obj.css({
					"position":"absolute",
					"left":e.x+"px",
					"top":e.y+"px",
					"z-index":e.zindex
				});
				this.anim.push({
					"id":id,
					"model":e.model,
					"width":e.width,
					"height":e.height,
					"side":e.side,
					"i":0,
					"fi":0,
					"size":e.size,
					"ctx":obj[0].getContext('2d'),
					"obj":obj,
					"object":e.object,
					"x":e.x,
					"y":e.y
				});
			}
		});
	//Корневой класс игры
		var Game=$.Class.create({
			init: function() {
				this.Systems=new Array();
				this.timer;
			},
			//Запуск текущей игры
			Start:function(obj) {
				this.timer=window.setInterval(function(){obj.Time();}, 100);
			},
			//Остановка текущей игры
			Stop:function() {
				
			},
			//Вступительный экран
			Intro:function() {
				
			},
			//Вселенская функция времени, "Замри мгновенье , ты прекрасно"
			Time:function() {
				for(i in this.Systems) {
					this.Systems[i].MovePlanets();
				}
			},
			//Добавить систему в игру
			AddSystem:function(system) {
				this.Systems.push(system);
			}
		});
	//Класс управления
		var Control=$.Class.create({
			init: function(ship,surface) {
				this.ship=ship;
				this.surface=surface;
				this.buttons={
					"W":0,
					"A":0,
					"S":0,
					"D":0
				};		
				this.timer;		
			},
			Start: function(obj){
				$(window).keydown(function(event){obj.key(event,1);});
				$(window).keyup(function(event){obj.key(event,0);});
				this.timer=window.setInterval(function(){obj.DoIt();}, 30);
			},
			DoIt: function() {
				this.Move();
			},
			Move: function() {
				if(this.buttons.W) {
					this.ship.Forward();
					this.surface.ReDraw();
				}
				if(this.buttons.S) {
					this.ship.Back();
					this.surface.ReDraw();
				}
				if(this.buttons.A) {
					this.ship.rUp();
				}
				if(this.buttons.D) {
					this.ship.rDown();
				}
			},
			key: function(event,type){
				switch(event.keyCode) {
				case 87:
					this.buttons.W=type;
				break;
				case 65:
					this.buttons.A=type;
				break;
				case 83:
					this.buttons.S=type;
				break;
				case 68:
					this.buttons.D=type;
				break;
				case 1062:
					this.buttons.W=type;
				break;
				case 1060:
					this.buttons.A=type;
				break;
				case 1067:
					this.buttons.S=type;
				break;
				case 1042:
					this.buttons.D=type;
				break;
				}
			}
		});
	//Класс интерфейса
		var Iface=$.Class.create({
			init:function(player,Drawing) {
				this.player=player;
				this.surface=Drawing;
			},
			//Отрисовывае основы интерфейса
			Draw:function() {
				this.surface.ctx.append('<table border=0 id=\'menu_bottom\'>'+
					'<tr><td id="bleft"> </td><td class=\'button\'><img src="iface/laser.png"'+
					' width="40px"></td><td class="bspace"><div id="weapon_status" style="width:100%;">'+
					'</div></td><td class=\'button\'><img src="iface/ship.png" width="60px"></td><td class="bspace">'+
					'<div id="ship_status" style="width:100%;"></div></td><td class=\'button\'><img src="iface/logo.png"'+
					' width="66px"></td><td id="bright"></td></tr></table>'+
					'<div id="radar"><div id="player_money"></div></div>');
					
			}
		});
	
	$(document).ready(function(){	
		var StarTravel=new Game();
		var Solar=new System(6000,"Solar");
		StarTravel.AddSystem(Solar);
		Solar.AddPlanet(new Planet("Mercury",0,150,0.15));
		Solar.AddPlanet(new Planet("Venus",1,250,0.2));
		Solar.AddPlanet(new Planet("Earth",9,400,0.12));
		Solar.AddPlanet(new Planet("Mars",5,500,0.1));
		Solar.AddPlanet(new Planet("Jupiter",0,700,0.03));
		Solar.AddPlanet(new Planet("Saturn",0,900,0.012));
		Solar.AddPlanet(new Planet("Neptune",0,1050,0.008));
		
		
		var player=new Ship(
		{"x":3000,"y":3000,"fi":0},
		{"speed":3,"manevr":2},
		{"name":"Player","hp":150,"maxhp":150},
		{"engine":0,"fuel":0,"radar":0,"gun":0,"type":0}
		);
		Solar.AddShip(player);
		
		Solar.AddShip(new Ship(
		{"x":3200,"y":3200,"fi":0},
		{"speed":3,"manevr":2},
		{"name":"test","hp":150,"maxhp":150},
		{"engine":0,"fuel":0,"radar":0,"gun":0,"type":0}
		));
		
		var Draw=new Drawing(player,Solar);
		var GameControl=new Control(player,Draw);
		
		StarTravel.Start(StarTravel);	
		Draw.Start(Draw);
		
		var STFace=new Iface(player,Draw);
		STFace.Draw();
		
		GameControl.Start(GameControl);
	});
			
