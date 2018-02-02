	/*-----Настройка интерфейса-------------*/
	function Iface(type) {
		var hpanel=parseInt(document.getElementById("panel0").height);
		document.getElementById("panel0").style.top=(wheight-hpanel)+"px";
		
		document.getElementById("menubutton").width=wwidth*(83/1024);
		document.getElementById("menubutton").style.top=(wheight-hpanel*(40/82))+"px";
		document.getElementById("menubutton").style.left=(0)+"px";
		
		document.getElementById("giperbutton").width=wwidth*(125/1024);
		document.getElementById("giperbutton").style.top=(wheight-hpanel*(40/67))+"px";
		document.getElementById("giperbutton").style.left=(wwidth-wwidth*(125/1024))+"px";
		
		document.getElementById("shipbutton").width=wwidth*(46/1024);
		document.getElementById("shipbutton").style.top=(wheight-hpanel*(40/46))+"px";
		document.getElementById("shipbutton").style.left=(wwidth-wwidth*(269/1024))+"px";
		
		document.getElementById("rankbutton").width=wwidth*(46/1024);
		document.getElementById("rankbutton").style.top=(wheight-hpanel*(40/46))+"px";
		document.getElementById("rankbutton").style.left=(wwidth-wwidth*(225/1024))+"px";
		
		document.getElementById("galbutton").width=wwidth*(46/1024);
		document.getElementById("galbutton").style.top=(wheight-hpanel*(40/46))+"px";
		document.getElementById("galbutton").style.left=(wwidth-wwidth*(180/1024))+"px";
		
		if(type == 0) {
			document.getElementById("rad0").style.left=(wwidth-160)+"px";
			document.getElementById("rad1").style.left=(wwidth-150-7)+"px";
			document.getElementById("radsol").style.left=(wwidth-90)+"px";
		}
		if(type == 1) {
			document.getElementById("PlanetPanel").width=wwidth*(280/1024);
			document.getElementById("PlanetPanel").style.left=(wwidth-wwidth*(22.23/40))+"px";
			document.getElementById("PlanetPanel").style.top=(wheight-wheight*(4.03/40))+"px";
			
			document.getElementById("govbutton").width=wwidth*(39/1024);
			document.getElementById("govbutton").style.top=(wheight-hpanel*(39.5/46))+"px";
			document.getElementById("govbutton").style.left=(wwidth-wwidth*(507.5/1024))+"px";
			
			document.getElementById("goodsbutton").width=wwidth*(39/1024);
			document.getElementById("goodsbutton").style.top=(wheight-hpanel*(39.5/46))+"px";
			document.getElementById("goodsbutton").style.left=(wwidth-wwidth*(464/1024))+"px";
			
			document.getElementById("shopbutton").width=wwidth*(39/1024);
			document.getElementById("shopbutton").style.top=(wheight-hpanel*(39.5/46))+"px";
			document.getElementById("shopbutton").style.left=(wwidth-wwidth*(422.5/1024))+"px";
			
			document.getElementById("infobutton").width=wwidth*(41/1024);
			document.getElementById("infobutton").style.top=(wheight-hpanel*(39.5/46))+"px";
			document.getElementById("infobutton").style.left=(wwidth-wwidth*(381/1024))+"px";
			
			document.getElementById("hangarbutton").width=wwidth*(41/1024);
			document.getElementById("hangarbutton").style.top=(wheight-hpanel*(39.5/46))+"px";
			document.getElementById("hangarbutton").style.left=(wwidth-wwidth*(340/1024))+"px";
			
		}
				
	}
	function ChangeHangarClose(type) {
		if(type == 0) {
			document.getElementById("HangarClose").src=HangarCloseD.src;
		} else if(type == 1) {
			document.getElementById("HangarClose").src=HangarCloseA.src;
		}
	}
	function ChangeHangarFuel(type) {
		if(type == 0) {
			document.getElementById("HangarFuel").src=HangarFuelD.src;
		} else if(type == 1) {
			document.getElementById("HangarFuel").src=HangarFuelA.src;
		}
	}
	function ChangeHangarRepair(type) {
		if(type == 0) {
			document.getElementById("HangarRepair").src=HangarRepairD.src;
		} else if(type == 1) {
			document.getElementById("HangarRepair").src=HangarRepairA.src;
		}
	}
	function ChangeHangarOut(type) {
		if(type == 0) {
			document.getElementById("HangarOut").src=HangarOutD.src;
		} else if(type == 1) {
			document.getElementById("HangarOut").src=HangarOutA.src;
		}
	}
	
	function ChangeMenuButton(type) {
		if(type == 0) {
			document.getElementById("menubutton").src=MenuD.src;
		} else if(type == 1) {
			document.getElementById("menubutton").src=MenuA.src;
		}
	}
	function ChangeGiperButton(type) {
		if(type == 0) {
			document.getElementById("giperbutton").src=GiperD.src;
		} else if(type == 1) {
			document.getElementById("giperbutton").src=GiperA.src;
		}
	}
	function ChangeShipButton(type) {
		if(type == 0) {
			document.getElementById("shipbutton").src=ShipD.src;
		} else if(type == 1) {
			document.getElementById("shipbutton").src=ShipA.src;
		}
	}
	function ChangeRankButton(type) {
		if(type == 0) {
			document.getElementById("rankbutton").src=RankD.src;
		} else if(type == 1) {
			document.getElementById("rankbutton").src=RankA.src;
		}
	}
	function ChangeGalButton(type) {
		if(type == 0) {
			document.getElementById("galbutton").src=GalD.src;
		} else if(type == 1) {
			document.getElementById("galbutton").src=GalA.src;
		}
	}	
	function ChangeGoodsButton(type) {
		if(type == 0) {
			document.getElementById("goodsbutton").src=GoodsD.src;
		} else if(type == 1) {
			document.getElementById("goodsbutton").src=GoodsA.src;
		}
	}
	function ChangeGovButton(type) {
		if(type == 0) {
			document.getElementById("govbutton").src=GovD.src;
		} else if(type == 1) {
			document.getElementById("govbutton").src=GovA.src;
		}
	}
	function ChangeShopButton(type) {
		if(type == 0) {
			document.getElementById("shopbutton").src=ShopD.src;
		} else if(type == 1) {
			document.getElementById("shopbutton").src=ShopA.src;
		}
	}
	function ChangeInfoButton(type) {
		if(type == 0) {
			document.getElementById("infobutton").src=InfoD.src;
		} else if(type == 1) {
			document.getElementById("infobutton").src=InfoA.src;
		}
	}
	function ChangeHangarButton(type) {
		if(type == 0) {
			document.getElementById("hangarbutton").src=HangarD.src;
		} else if(type == 1) {
			document.getElementById("hangarbutton").src=HangarA.src;
		}
	}
	
	
	
	function UpdateRadar() {
		var i;
		for(i=0; i<7; i++) {
			document.getElementById("radp"+i).style.left=planets[i].x/28.57+wwidth-150-7;
			document.getElementById("radp"+i).style.top=planets[i].y/28.57+9;
		}
		for(i=0; i<playersCount; i++) {
			document.getElementById("radpl"+i).style.left=players[i].x/28.57+wwidth-150-7;
			document.getElementById("radpl"+i).style.top=players[i].y/28.57+9;
		}
	}
	
	/*-------------карта галактики-------------*/
	function ShowGalaxyMap() {
		if(parseInt(document.getElementById('GalaxyMap').style.left) == -1000) {
			document.getElementById('GalaxyMap').style.left=wwidth/2-405;
			document.getElementById('GalaxyMap').style.top=0;
			document.getElementById('GalaxyMapBG').style.left=wwidth/2-382;
			document.getElementById('GalaxyMapBG').style.top=30;
			
			document.getElementById('MapStar0').style.left=wwidth/2-405+50;
			document.getElementById('MapStar0').style.top=70;
			
			document.getElementById('MapStar1').style.left=wwidth/2-405+150;
			document.getElementById('MapStar1').style.top=50;
			
			document.getElementById('MapStar2').style.left=wwidth/2-405+60;
			document.getElementById('MapStar2').style.top=150;
			
			document.getElementById('Sector0').style.left=wwidth/2-405+100;
			document.getElementById('Sector0').style.top=100;
			
			document.getElementById('System0').style.left=wwidth/2-405+30;
			document.getElementById('System0').style.top=85;
			
			document.getElementById('System1').style.left=wwidth/2-405+135;
			document.getElementById('System1').style.top=70;
			
			document.getElementById('System2').style.left=wwidth/2-405+40;
			document.getElementById('System2').style.top=170;
			
			
			
		} else {
			document.getElementById('GalaxyMap').style.left=-1000;
			document.getElementById('GalaxyMap').style.top=-1000;
			document.getElementById('GalaxyMapBG').style.left=-1000;
			document.getElementById('GalaxyMapBG').style.top=-1000;
			
			document.getElementById('MapStar0').style.left=-1000;
			document.getElementById('MapStar0').style.top=-1000;
			document.getElementById('MapStar1').style.left=-1000;
			document.getElementById('MapStar1').style.top=-1000;
			document.getElementById('MapStar2').style.left=-1000;
			document.getElementById('MapStar2').style.top=-1000;
			
			document.getElementById('Sector0').style.left=-1000;
			document.getElementById('Sector0').style.top=-1000;
			
			document.getElementById('System0').style.left=-1000;
			document.getElementById('System0').style.top=-1000;
			document.getElementById('System1').style.left=-1000;
			document.getElementById('System1').style.top=-1000;
			document.getElementById('System2').style.left=-1000;
			document.getElementById('System2').style.top=-1000;
		}
	}
