var tnames=new Array(
			"Торговец Дайнис",
			"Торговец Авелий",
			"Торговец Бен",
			"Торговец Виталя",
			"Торговец Генацвали",
			"Торговец Дарий",
			"Торговец Евдоким",
			"Торговец Жанна",
			"Торговец Залётный",
			"Торговец Икая",
			"Торговец Ярмола",
			"Торговец Тиккирей",
			"Торговец Лопух"
		);
		var dnames=new Array(
			"Дипломат Августин",
			"Дипломат Борда",
			"Дипломат Вселенной",
			"Дипломат Грибоедов",
			"Дипломат Данайцев",
			"Дипломат Европа",
			"Дипломат Союз",
			"Дипломат Будущего",
			"Дипломат Пришельцев",
			"Дипломат Хомо",
			"Дипломат Якиман"
		);
		var bnames=new Array(
			"Форпост",
			"Мир 31",
			"Вавилон",
			"Глубокий Космос 1",
			"Победа"
		);
		var base_texts={
			"gov":[
			"Ты %player% находишься на космической базе %base%. Отсюда мы координируем как флотские операции, так и следим за рейнджерами. Что тебя сюда привело?",
			"База %base% важнейший рубеж обороны на пути ТравелОров %player%! Чем мы можем тебе помочь?",
			"Эх %player% ты пока зелёный новичок, но буду откровенен, ситуация та ещё. Если такие как ты не переломят ход войны то ветеранами вам не быть."
			],
			"task":[
			"К сожалению %player% пока не установлены правила по поручению рейнджерам заданий. Но не волнуйтесь, совсем скоро мы с этим разберёмся и завалим вас заданиями."
			]
		};
		var base_answ={
			"gov":[
			"<a href='#' onclick='GetTask();'>Для меня есть задание?</a><br><a href='#' onclick='Esc();'>Мне нужен ремонт</a><br><a href='#' onclick='Esc();'>Пока</a>"
			],
			"task":[
			"<a href='#' onclick='Esc();'>Мне нужен ремонт</a><br><a href='#' onclick='Esc();'>Пока</a>"
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