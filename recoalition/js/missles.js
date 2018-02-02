function SetMissleStats(num) { //установить парамметры ракете
	document.getElementById('missle'+num).style.left=missles[num].x+"px";
	document.getElementById('missle'+num).style.top=missles[num].y+"px";
	document.getElementById('missle'+num).style.webkitTransform="rotate("+missles[num].rot+"deg)";
}

function AddMissle(i,type) { //игрок, тип снаряда
		var angle=Math.PI/180*players[i].rot;
		missles[MissleCount] = {type: type, x: players[i].x, y: players[i].y, rot: players[i].rot, ouner: i, suc: 0, counter: 0};
		MissleFlag=0;
		MissleCount++;
	}
	function MoveMissle(i) {
		var angle=Math.PI/180*missles[i].rot;
		missles[i].x+=Math.sin(angle)*10;		
		missles[i].y-=Math.cos(angle)*10;
	}
	function RemoveMissle(i) {
		var j;
		for(j=i; j<MissleCount; j++) {
			missles[j]=missles[j+1];
		}
		document.getElementById('missle'+i).style.left=-500+"px";
		MissleCount--;
	}
	function DisplayMissles() {
		if( OldMissleCount != MissleCount ) {
			document.getElementById('missles').innerHTML=""; //убрать ракеты
		} 
		var i;
		for(i=0; i<MissleCount; i++) {
			if( missles[i].x<-50 || missles[i].x>4050 || missles[i].y<-50 || missles[i].y>4050 ) {
				RemoveMissle(i);
				if( MissleCount == 0 ) break;
			}
			if( OldMissleCount != MissleCount ) {
				document.getElementById('missles').innerHTML+='<img id="missle'+i+'"  width=35 src="img/missle.gif" style="position: absolute; left: -500px; top: -500px; z-index: 3;">';
				if(missles[i].type == 0 && missles[i].suc==0) document.getElementById('missle'+i).src=RocketS.src;
				if(missles[i].suc==1) document.getElementById('missle'+i).src="img/expl.gif";
			}
			SetMissleStats(i);
			//Проверка попадания
			var j;
			for(j=0; j<playersCount && missles[i].suc == 0; j++) {
				if(missles[i].x>=players[j].x && missles[i].x<players[j].x+55 && missles[i].y>=players[j].y && missles[i].y<players[j].y+55 && j!=missles[i].ouner) {
					document.getElementById('missle'+i).width=55;
					document.getElementById('missle'+i).src="img/expl.gif";
					missles[i].suc=1;
					missles[i].counter=33;
				}
			}
			if(missles[i].suc==0) MoveMissle(i);
			if(missles[i].suc==1) {
				missles[i].counter--;
				if(missles[i].counter == 0) RemoveMissle(i);
			}
		}
		OldMissleCount=MissleCount;
	}
