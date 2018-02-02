function createRequestObject() {
    var request = null;
    try {
        request=new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e){}
    if(!request) try {
        request=new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e){}
    if(!request) try {
        request=new XMLHttpRequest();
    } catch (e){}
    return request;
}
function urlEncodeData(data) {
    var query = [];
    if (data instanceof Object) {
        for (var k in data) {
            query.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
        }
        return query.join('&');
    } else {
        return encodeURIComponent(data);
    }
}
function serverRequest(url, data, callback) {
    var request = createRequestObject();
    if(!request) return false;
    request.onreadystatechange  = function() { 
            if(request.readyState == 4 && callback) callback(request);
        };
    request.open('POST', url, true);
    if (request.setRequestHeader)
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send(urlEncodeData(data));
    return true;
}

/*-----------Игроки-------------------------------*/
	var playersCount=1;	//Число игроков , включая обладателя клиента
	var players = new Array();
	players[0] = {id: 0, name: "none", x: 300, y: 300, rot: 0, speed: 5, manevr: 3};

function Login(name) {
	serverRequest("../server.php", {req: "login", name: name}, function(request) {
		var Stats=request.responseText.split("+");
		players[0] = {id: Stats[0]*1, name: name, x: Stats[1]*1, y: Stats[2]*1, rot: 0, speed: 5, manevr: 3};
		postMessage({ans: "login", data: players[0]});
	});
}
function Move(id, x, y, rot) {
	serverRequest("../server.php", {req: "move", id: id, x: x, y: y, rot: rot}, function(request) {
		players[0].x=x; players[0].y=y; players[0].rot=rot;
		var Ples= request.responseText.split(" ");
		var i;
		for( i=1; i < Ples[0]*1; i++) {
			var Stats=Ples[i].split("+");
			players[i] = {id: Stats[1]*1, name: Stats[0], x: Stats[2]*1, y: Stats[3]*1, rot: Stats[4]*1, speed: 5, manevr: 3};
		}
		postMessage({ans: "move", num: (Ples[0]*1+1), data: players});
	});
}
onmessage = function(e) {
	if( e.data.req == "login" ) {
		Login( e.data.name );
	} else if( e.data.req == "move" ) {
		Move( e.data.play.id , e.data.play.x , e.data.play.y,  e.data.play.rot);
	}
}
