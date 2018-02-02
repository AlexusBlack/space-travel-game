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
		TargetAngle=GetAngle(players[i].x, players[i].y, x, y);
		if(TargetAngle>players[i].rot && TargetAngle-players[i].rot<=180) rotateDown(i);
		if(TargetAngle>players[i].rot && TargetAngle-players[i].rot>180) rotateUp(i);
		
		if(TargetAngle<players[i].rot  && players[i].rot-TargetAngle<=180) rotateUp(i);
		if(TargetAngle<players[i].rot  && players[i].rot-TargetAngle>180) rotateDown(i);
	}
	function RangerNPC(i) {
		RotateTo(i, players[players[i].target].x, players[players[i].target].y);			
		moveup(i);
	}
	function TraderNPC(i) {
		if(players[i].stage == 0) {
			players[i].target=parseInt(Math.random()*3+1);
			players[i].stage=1;
			return;
		}
		if(players[i].stage == 1) {
			RotateTo(i, planets[players[i].target].x,  planets[players[i].target].y);			
			moveup(i);
			if(players[i].x>planets[players[i].target].x && players[i].x<planets[players[i].target].x+50 && players[i].y>planets[players[i].target].y && players[i].y<planets[players[i].target].y+50) {
				players[i].stage=2;
				return;
			}
			return;
		}
		if(players[i].stage == 2) {
			players[i].counter=250;
			document.getElementById('player'+i).style.visibility="hidden";
			document.getElementById('radpl'+i).style.visibility="hidden";
			players[i].stage=3;
			return;
		}
		if(players[i].stage == 3) {
			players[i].counter--;
			if(players[i].counter == 0) {
				players[i].x=planets[players[i].target].x;
				players[i].y=planets[players[i].target].y;
				document.getElementById('player'+i).style.visibility="visible";
				document.getElementById('radpl'+i).style.visibility="visible";
				players[i].stage=0;
				return;
			}
			return;
		}
	}
	function DiplomatNPC(i) {
		if(players[i].stage == 0) {
			players[i].target=parseInt(Math.random()*3+1);
			players[i].stage=1;
			return;
		}
		if(players[i].stage == 1) {
			RotateTo(i, planets[players[i].target].x,  planets[players[i].target].y);			
			moveup(i);
			if(players[i].x>planets[players[i].target].x && players[i].x<planets[players[i].target].x+50 && players[i].y>planets[players[i].target].y && players[i].y<planets[players[i].target].y+50) {
				players[i].stage=2;
				return;
			}
			return;
		}
		if(players[i].stage == 2) {
			players[i].counter=250;
			document.getElementById('player'+i).style.visibility="hidden";
			document.getElementById('radpl'+i).style.visibility="hidden";
			players[i].stage=3;
			return;
		}
		if(players[i].stage == 3) {
			players[i].counter--;
			if(players[i].counter == 0) {
				players[i].x=planets[players[i].target].x;
				players[i].y=planets[players[i].target].y;
				document.getElementById('player'+i).style.visibility="visible";
				document.getElementById('radpl'+i).style.visibility="visible";
				players[i].stage=0;
				return;
			}
			return;
		}
	}
