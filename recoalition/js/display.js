/*---------------печеньки---------------------*/
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

function SetFlag(Value) { //Устанавливает флаги движения, 0 флаг выключен (нет движения), 1 - включён
		if ( event.keyCode == 16 ) MissleFlag=Value;
		if ( event.keyCode == 65 ) RotUpFlag=Value;
		if ( event.keyCode == 68 ) RotDownFlag=Value;
		if ( event.keyCode == 87 ) MoveUpFlag=Value;
		if ( event.keyCode == 83 ) MoveDownFlag=Value;	
}

/*----------Функции движения--------------*/
function moveup(i) {
	var angle=Math.PI/180*players[i].rot;
	players[i].x+=Math.sin(angle)*players[i].speed;		
	players[i].y-=Math.cos(angle)*players[i].speed;			
}
function movedown(i) {
	var angle=Math.PI/180*players[i].rot;
	players[i].x-=Math.sin(angle)*players[i].speed;
	players[i].y+=Math.cos(angle)*players[i].speed;		
}
function rotateDown(i) {
	players[i].rot+=players[i].manevr;
	if( players[i].rot >= 360 ) players[i].rot-=360;
}
function rotateUp(i) {
	players[i].rot-=players[i].manevr;
	if( players[i].rot <= 0 ) players[i].rot+=360;
}
	
function SetShipsStats(num) { //отображает заданный корабль с его параметрами
	document.getElementById('player'+num).style.left=players[num].x+"px";
	document.getElementById('player'+num).style.top=players[num].y+"px";
	document.getElementById('player'+num).style.webkitTransform="rotate("+players[num].rot+"deg)";
}
function FocusOnPlayer() { //фокусирует каммеру на игроке
	window.scrollTo(players[0].x-wwidth/2,players[0].y-wheight/2);
	SetShipsStats(0);
}
function CheckFlags() { //проверяет флаги и в зависимости от них запускает функции
	if ( MoveUpFlag ) moveup(0);
	if ( MoveDownFlag ) movedown(0);
	if ( RotUpFlag ) rotateUp(0);
	if ( RotDownFlag ) rotateDown(0);
	if ( MissleFlag ) AddMissle(0,0);
	if ( MoveUpFlag |  MoveDownFlag | RotUpFlag |  RotDownFlag ) { //Если этот гад пошевелился то отобразить это и переместить фокус на игрока
		SetShipsStats(0);
		FocusOnPlayer();
	}
}
	
function DisplayOtherShips() { //отобразить остальных игроков 
	if(OldPlayersCount!=playersCount) {
		document.getElementById('players').innerHTML=""; //обнуление игроков
		document.getElementById('radpl').innerHTML="";
	}
	var i;
	for(i=1; i<playersCount; i++) {
		if(OldPlayersCount<playersCount) {
			document.getElementById('players').innerHTML+='<img id="player'+i+'" src="img/PeopleR.gif"  width="55px" style="position: absolute; left: -500px; top: -500px; z-index: 2;">';
			if(players[i].type == 1) document.getElementById('player'+i).src=PeopleD.src;
			if(players[i].type == 2) document.getElementById('player'+i).src=PeopleT.src;
			document.getElementById('radpl').innerHTML+='<img id="radpl'+i+'" src="img/rhuman.png" style="position: fixed; left: -50px; top: -50px; z-index: 101;" width=5>';
		}
		SetShipsStats(i);
		if(players[i].type == 0) RangerNPC(i);
		if(players[i].type == 1) DiplomatNPC(i);
		if(players[i].type == 2) TraderNPC(i);		
	}
	OldPlayersCount=playersCount;
}

function DisplayPlanets() {
		var i;
		for(i=0; i<7; i++) {
			planets[i].x=planets[i].dist*Math.cos(Math.PI/180*planets[i].rad)+2000;
			planets[i].y=planets[i].dist*Math.sin(Math.PI/180*planets[i].rad)+2000;
			document.getElementById("planet"+i).style.left=planets[i].x+"px";
			document.getElementById("planet"+i).style.top=planets[i].y+"px";			
			planets[i].rad+=planets[i].speed;
			if(planets[i].rad>360) planets[i].rad-=360;
		}
	}
