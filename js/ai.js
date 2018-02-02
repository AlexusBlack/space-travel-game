function AI() {
			for ( i in ships ) {
				if(ships[i].type=="transport") 	TraAI(i); else
				if(ships[i].type=="diplomat") 	TraAI(i);				
			}
		}
function TraAI(i) {
	//Проверка на уровень здоровья
	if(ships[i].hp<=0) {
		//Плавно превращаем корабль в труп
		$("#"+ships[i].id).remove();
		$("#r"+ships[i].id).remove();
		AddExpl(ships[i].x, ships[i].y);
		if(ships[i].target.type=="player") {
			player.target=-1;
			$("#target").css("visibility","hidden");		
		}
		ships.splice(i,1);
		return;
	}
			var target={"x":0,"y":0};
			var IsMoving=0;
			//Select target			
			if(ships[i].ai==0) {
				new_id=Math.floor(Math.random()*3);
				if(new_id==ships[i].target.id) return;
				ships[i].target.id=new_id;
				ships[i].target.type="planet";
				ships[i].ai=1;
			//Go to target
			} else if(ships[i].ai==1) {
				if(ships[i].target.type=="planet") {
					IsMoving=1;
					target.x=orbits[planets_names[ships[i].target.id]].X;
					target.y=orbits[planets_names[ships[i].target.id]].Y;
										
					if(	ships[i].x > target.x && ships[i].x < target.x+50 && ships[i].y > target.y && ships[i].y < target.y+50) {
						ships[i].ai=2;
						ships[i].timer=0;
					}				
				}
			//Target found Приземление
			} else if(ships[i].ai==2) {
				if(ships[i].timer==0) {
					//$("#"+ships[i].id).css("visibility","hidden");
					$("#"+ships[i].id).fadeOut("slow");
					$("#r"+ships[i].id).css("visibility","hidden");
					
					ships[i].timer=500; //Устаналиваем время до взлёта
				} else	if(ships[i].timer==1) { //Таймер закончился? взлетаем
					ships[i].x=orbits[planets_names[ships[i].target.id]].X;
					ships[i].y=orbits[planets_names[ships[i].target.id]].Y;
					Move("#"+ships[i].id, ships[i].x, ships[i].y)
					//$("#"+ships[i].id).css("visibility","visible");
					$("#"+ships[i].id).fadeIn("slow");
					$("#r"+ships[i].id).css("visibility","visible");
					
					ships[i].ai=0;
					ships[i].timer=0;
					//А в вдруг я цель, надо обновить счётчик hp
					if(player.target!=-1) $("#target_hp").text(ships[player.target].hp+"/"+ships[player.target].maxhp);
				} else { //Сидим на планете если надо лечимся
					if(ships[i].hp<ships[i].maxhp) {
						ships[i].hp++;
						ships[i].timer+=4;
					} else {
						ships[i].timer--;
					}
				}
			//Караул! нас атакуют
			} else if(ships[i].ai==3) {
				IsMoving=1;
				//Если мы полны сил (более 3ти ХП) то самое время надрать жопу засранцу
				if(ships[i].hp>ships[i].maxhp/3) {
					//Если нас атаковал игрок
					if(ships[i].target.type=="player") {
						target.x=player.x;
						target.y=player.y;
					//Если обычный корабль
					} else if(ships[i].target.type=="ship") {
						target.x=ships[ships[i].target.id].x;
						target.y=ships[ships[i].target.id].x;
					//Или не дай бог вражина страшная (надо убегать, точно вам говорю)
					} else if(ships[i].target.type=="enemy") {
					
					}
					//Если в зоне видимости враг, то обязательно по нему стреляем, когда ещё шанс выпадет?
					if(ships[i].war.f.stat>50 && shoot(ships[i].x+32,ships[i].y+32,target.x+32,target.y+32)) {
						ships[i].war.f.stat-=50;
						if(ships[i].target.type=="player") {
							player.hp-=3;
							$("#ship_status" ).progressbar( "option", "value", player.hp/(player.maxhp/100));
						} else if(ships[i].target.type=="ship") {
							shipd[ships[i].target.id].hp-=3;
							//Передадим на корабль сообщение что его атаковали
							/*if(ships[player.target].ai!=3) {
								ships[player.target].ai=3;
								ships[player.target].target.type="player";
							}*/
						} else if(ships[i].target.type=="enemy") {
							
						}											
					} else {
						if(ships[i].war.f.stat<ships[i].war.f.max) {
							ships[i].war.f.stat+=1;
						}
					}
				//Ну если мы уже еле летим
				} else {
					//То выберем какую-нибудь планетку
					if(ships[i].target.type!="planet") {
						new_id=Math.floor(Math.random()*3);
						ships[i].target.id=new_id;
						ships[i].target.type="planet";
					//И сядем на неё =)
					} else {
						target.x=orbits[planets_names[ships[i].target.id]].X;
						target.y=orbits[planets_names[ships[i].target.id]].Y;
						if(	ships[i].x > target.x && ships[i].x < target.x+50 && ships[i].y > target.y && ships[i].y < target.y+50) ships[i].ai=2;
					}
				}
			}
			if(IsMoving) {
				RotateTo(i, target.x, target.y);
				//SUN
					if( ships[i].x > sun.x-120 && ships[i].x < sun.x+120 && ships[i].y > sun.y-120 && ships[i].y < sun.y+120) 
					{rotateDown(i);rotateDown(i);rotateDown(i);}
				Rotate("#"+ships[i].id, ships[i].r);			
				Forward(i);
			}
		}
