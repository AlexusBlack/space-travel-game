
<?php
//Test server
mysql_connect(null, "ranger", "qazwsx");
mysql_select_db("rangers") or die(mysql_error());
function KikDeadUsers() {
	$lasttime	= microtime (true)-30;
	$res=mysql_query("DELETE FROM solar WHERE lasttime < $lasttime") or die(mysql_error()) ;
}
KikDeadUsers();
if($_POST['req'] == "login") {
	
	$res=mysql_query("SELECT id FROM solar") or die(mysql_error()) ;
	$number=mysql_num_rows($res);
	if($number >= 5) {
		print "1";
	} else {
		$lasttime	= microtime (true);
		$name		= $_POST['name'];
		$x			= rand(10, 300);
		$y			= rand(10, 3500);
		$rot		= 0;
		$res=mysql_query("INSERT INTO solar (name, password, x, y, rot, lasttime) VALUES ('$name', '0000', '$x', '$y', '$rot', '$lasttime')") or die(mysql_error());
		$res=mysql_query("SELECT id FROM solar WHERE name='$name'") or die(mysql_error());
		$row=mysql_fetch_array($res);
		$id=$row['id'];
		print $id."+".$x."+".$y."\n";
	}
} else if($_POST['req'] == "players") {
	$res=mysql_query("SELECT id, name, x, y, rot FROM solar") or die(mysql_error()) ;
	$number=mysql_num_rows($res);
	$answer=$number." ";
	while($row=mysql_fetch_array($res)) {
		$answer=$answer.$row['name']."+".$row['id']."+".$row['x']."+".$row['y']."+".$row['rot']." ";
	}
	print $answer;
} else if($_POST['req'] == "move") {
	$id=$_POST['id'];
	$x=$_POST['x'];
	$y=$_POST['y'];
	$rot=$_POST['rot'];
	$res=mysql_query("UPDATE solar SET x = '$x', y = '$y', rot = '$rot' WHERE id = '$id'") or die(mysql_error());
	/*---------------------------*/
	$lasttime	= microtime (true);
	$res=mysql_query("UPDATE solar SET lasttime = '$lasttime' WHERE id = '$id'") or die(mysql_error());
	/*---------------------------*/
	$res=mysql_query("SELECT id, name, x, y, rot FROM solar WHERE id <> '$id'") or die(mysql_error()) ;
	$number=mysql_num_rows($res);
	$answer=$number." ";
	while($row=mysql_fetch_array($res)) {
		$answer=$answer.$row['name']."+".$row['id']."+".$row['x']."+".$row['y']."+".$row['rot']." ";
	}
	print $answer;
	
} else if($_GET['req'] == "exit") {
	$id=$_GET['id'];
	$res=mysql_query("DELETE FROM solar WHERE id = '$id'") or die(mysql_error()) ;
} else if($_POST['req'] == "planets") {
	$res=mysql_query("SELECT id, rot, speed, orbit, rase FROM asolar") or die(mysql_error()) ;
	while($row=mysql_fetch_array($res)) {
		$answer=$answer.$row['id']."+".$row['rot']."+".$row['speed']."+".$row['orbit']."+".$row['rase']." ";
	}
	print $answer;
} else if($_POST['req'] == "pupdate" ) {
	$id=$_POST['id'];
	$rot=$_POST['rot'];
	$res=mysql_query("UPDATE asolar SET rot = '$rot' WHERE id = '$id'") or die(mysql_error());
} else {
	print "wrong request: ".$_POST['req'];
}
mysql_close();
?>
