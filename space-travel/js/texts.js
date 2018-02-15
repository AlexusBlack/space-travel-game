var tnames=new Array(
			"Trader Dionis",
			"Trader Avely",
			"Trader Ben",
			"Trader Vitaly",
			"Trader Gene",
			"Trader Dary",
			"Trader Evdokim",
			"Trader Janna",
			"Trader Zaletny",
			"Trader Ikaya",
			"Trader Yarmola",
			"Trader Tikkery",
			"Trader Lol"
		);
		var dnames=new Array(
			"Diplomat Augustin",
			"Diplomat Borda",
			"Diplomat Universe",
			"Diplomat Griboedov",
			"Diplomat Troyan",
			"Diplomat Europe",
			"Diplomat Union",
			"Diplomat Future",
			"Diplomat Alien",
			"Diplomat Homo",
			"Diplomat Yakiman"
		);
		var bnames=new Array(
			"Outpost",
			"MIR 31",
			"Babylon",
			"Deep Space 1",
			"Victory"
		);
		var base_texts={
			"gov":[
			"You %player% are at starbase %base%. From here we coordinate our fleet ops and track activities of rangers. How can I help uou?",
			"The base %base% in our major defence line against TravelOrs %player%! How can we assist you?",
			"You %player% just a new recrut, but let me be honest, this is a shitty situation. If guys like you won't change course of the war you'd never be a veteran."
			],
			"task":[
				"Sorry %player% but we don't have any missions for rangers yet. But don't worry we will overload you really soon."
			]
		};
		var base_answ={
			"gov":[
			"<a href='#' onclick='GetTask();'>Do you have a mission for me?</a><br><a href='#' onclick='Esc();'>I need to repair my ship</a><br><a href='#' onclick='Esc();'>Buy</a>"
			],
			"task":[
			"<a href='#' onclick='Esc();'>I need to repair my ship</a><br><a href='#' onclick='Esc();'>Buy</a>"
			]
		}
		var pl_names=new Array(
			"Katus Darkbreaker",
			"Bolas Singrove",
			"Saithikelv",
			"Nighthammer",
			"Flamecaster",
			"Delarius",
			"Mari",
			"Moraundefined",
			"Kathrigamand",
			"Ariswyn"
		);
