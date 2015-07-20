var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var x1 = "day"+new Date().getDate();
var x2=new Date().getDate();

var d = new Date();
if(d.getDay() == 1){
	var n= new Date(new Date().setDate(new Date().getDate()-3));
	var x=n.getDate();
	var currmonth = month[n.getMonth()]; 
	
}
else{
	var n=new Date(new Date().setDate(new Date().getDate()-1));
	var x=n.getDate();
	var currmonth = month[n.getMonth()];
}
var x3= "day"+x;
var procedure4Statement = WL.Server.createSQLStatement("select un.EMP_NAME,ut.team,ut.emp_id from user_name un,user_team ut where un.intranet_id=? and ut.emp_id=un.id");
function validate(email) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure4Statement,
		parameters : [email]
	});
}
var procedureStatement = WL.Server.createSQLStatement("select * from user_name as na inner join user_team as te on na.id=te.emp_id inner join shift_schedule sh on te.emp_id= sh.emp_id where te.team= ? and sh.shift_month=? and sh.year=?");
function smanager(teamname,currmonth,year) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedureStatement,
		parameters : [teamname,currmonth,year]
	});
}
var procedure3Statement = WL.Server.createSQLStatement("SELECT ut.team, un.emp_name, ss.* FROM shift_schedule ss, user_team ut, user_name un where ss.emp_id = ut.emp_id and ut.emp_id = un.id and ut.team = ? and ss.shift_month = ? and ss.year=?");
function getUserShiftSchedule(team,month,year) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure3Statement,
		parameters : [team,month,year]
	});
}

var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name, st.end_time from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss."+x1+" =st.shift_name and ss.emp_id=? and ss.shift_month=? and ss.year=?");
function getshiftstarttime(emp_id,currmonth,year) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure5Statement,
		parameters : [emp_id,currmonth,year]
	});
}



var procedure6Statement = WL.Server.createSQLStatement("UPDATE shift_actuals SET " + x1 + " = ? , availablity = 'Available' WHERE emp_id= ? and shift_month = ? and year=?");
function updateshiftactuals(shifthold,emp_id,month,year) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure6Statement,
		parameters : [shifthold, emp_id,month,year]
	});
}


var procedure7Statement = WL.Server.createSQLStatement("select * from shift_actuals where emp_id = ? and shift_month = ? and year=?");
function shiftactualsselect(emp_id,currmonth,year) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure7Statement,
		parameters : [emp_id,currmonth,year]
	});
}



var queryhold = "INSERT INTO shift_actuals(availablity, emp_id, shift_month, year,day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31 ) VALUES ('Available', ? ,? ,?, 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc')";

var procedure8Statement = WL.Server.createSQLStatement(queryhold);
function insertshiftactuals(emp_id, currmonth,year) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure8Statement,
		parameters : [emp_id, currmonth,year]
	});
}
var stopudaptequery=WL.Server.createSQLStatement("select "+x1+" from shift_update where emp_id=? and shift_month=?");
function stopupdate(emp_id,currmonth){
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : stopudaptequery,
		parameters : [emp_id,currmonth]
	});
}
var getuserstoptimequery=WL.Server.createSQLStatement("select st.end_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss."+x1+" =st.shift_name and ss.emp_id=? and ss.shift_month=? ss.year=?");
function getuserstoptime(emp_id,currmonth,year){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getuserstoptimequery,
		parameters : [emp_id,currmonth,year]
	});
	
}
var procedure10Statement = WL.Server.createSQLStatement("UPDATE shift_update SET " + x1 + " = ? WHERE emp_id= ? and shift_month = ?");
function updateshiftupdates(shiftupdates,emp_id,month) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure10Statement,
		parameters : [shiftupdates,emp_id,month]
	});
}

var queryhold1 = "INSERT INTO shift_update(emp_id, shift_month, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31 ) VALUES (? ,?, '', '', '', '', '','','','', '', '', '', '', '', '', '', '', '', '', '','','', '', '', '', '', '', '','', '', '', '')";
var procedure11Statement = WL.Server.createSQLStatement(queryhold1);
function insertshiftupdates(emp_id,currmonth) {

	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure11Statement,
		parameters : [emp_id,currmonth]
	});
} 

var getteammembersquery=WL.Server.createSQLStatement("SELECT un.emp_name FROM user_name un, user_team ut WHERE un.id = ut.emp_id AND ut.team = ? AND ut.emp_id != ? ");
function getmyteammembers(team,emp_id){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getteammembersquery,
		parameters : [team,emp_id]
	});
	
}
var queryforswap=WL.Server.createSQLStatement("select "+x1+" from shift_schedule where emp_id=(select id from user_name where emp_name=?) and shift_month = ? and year=?");
function swapingshift(emp_name,currmonth,year){
	return WL.Server.invokeSQLStatement({
		preparedStatement : queryforswap,
		parameters : [emp_name,currmonth,year]
	});
}
var swapupdateuser=WL.Server.createSQLStatement("UPDATE shift_schedule SET " + x1 + " = ? WHERE emp_id= ? and shift_month = ? and year=?");
function updatemyshift(shiftname,emp_id,currmonth,year){
	return WL.Server.invokeSQLStatement({
		preparedStatement : swapupdateuser,
		parameters : [shiftname,emp_id,currmonth,year]
	});
}
updateswapperson=WL.Server.createSQLStatement("UPDATE shift_schedule SET " + x1 + " = ? WHERE emp_id= (select id from user_name where emp_name=?) and shift_month = ? and year=?");
function swapmyshiftupdate(myshift,emp_name,currmonth,year){
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateswapperson,
		parameters : [myshift,emp_name,currmonth,year]
	});	
}
getemailidquery=WL.Server.createSQLStatement("select intranet_id from user_name where emp_name in (?) or id in (select emp_id from user_team where team in ('Manager'))");
function swapingshiftupdate(myshift,emp_name,emp_id,currmonth,year){
	var swapshift=swapingshift(emp_name,currmonth,year);
	var shiftname=swapshift.resultSet[0]['DAY'+x2];
	var updateshift= updatemyshift(shiftname,emp_id,currmonth,year);
		if(updateshift.isSuccessful==true){
		var swapmshift= swapmyshiftupdate(myshift,emp_name,currmonth,year);
		if(swapmshift.isSuccessful==true){
			
		
		return WL.Server.invokeSQLStatement({
			preparedStatement : getemailidquery,
			parameters : [emp_name]
		});
		}
	}
		else{
			return updateshift;
		}
}

var procedure2Statement = WL.Server.createSQLStatement("select * from user_team ut, shift_update su where ut.emp_id= su.emp_id and ut.team= ? and su.shift_month=?");
function procedure2(team,currmonth) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure2Statement,
		parameters : [team,currmonth]
	});
}

var getteamshiftquery = WL.Server.createSQLStatement("select ss.emp_id, ut.team, ss."+x1+", st.start_time from shift_schedule ss, user_team ut, shift_time st where ut.emp_id= ss.emp_id and ss."+x1+"= st.shift_name and ss.emp_id=st.emp_id and ut.team= ? and ss.shift_month=? and ss.year=? ORDER BY st.start_time");
function procedure1(team,currmonth,year) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getteamshiftquery,
		parameters : [team,currmonth,year]
	});
}
var getpreviousupdatequery = WL.Server.createSQLStatement("select "+x1+ " from shift_update where shift_month=?  and emp_id=?");
function getshiftupdate(currmonth,emphold) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getpreviousupdatequery,
		parameters : [currmonth,emphold]
	});
}
var getprevdaylastshiftquery=WL.Server.createSQLStatement("select ss.emp_id, ut.team, ss.shift_month,ss."+x3+", st.start_time from shift_schedule ss, user_team ut, shift_time st where ut.emp_id= ss.emp_id and ss."+x3+"= st.shift_name and ss.emp_id=st.emp_id and ut.team= ? and ss.shift_month='"+currmonth+"' and ss.year=? ORDER BY st.start_time DESC ");
function getprevdaylastshift(team,year){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getprevdaylastshiftquery,
		parameters : [team,year]
	});
	
}
var getshiftupdateprevquery = WL.Server.createSQLStatement("select su."+x3+ " from shift_schedule ss, user_team ut, shift_time st, shift_update su where ut.emp_id= ss.emp_id and ss.emp_id=st.emp_id and ss."+x3+"= st.shift_name and ss.emp_id= su.emp_id and ut.team=? and ss."+x3+"=? and su.shift_month='"+currmonth+"' and ss.year=? ");
function getshiftupdateprev(team,year) {
	var prevdaylastshift=getprevdaylastshift(team,year);
	if(prevdaylastshift.isSuccessful==true){
		var prevshift=prevdaylastshift.resultSet[0]['day'+x];
		return WL.Server.invokeSQLStatement({
			preparedStatement : getshiftupdateprevquery,
			parameters : [team,prevshift,year]
		});
	}
	
}
var checkavailablityquery=WL.Server.createSQLStatement("select sa.availablity,st.start_time, st.shift_name from shift_actuals sa,shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.emp_id=sa.emp_id and ss."+x1+" =st.shift_name and ss.emp_id=? and sa.shift_month=? and sa.year=?");
function checkavailablity(emp_id,currmonth,year){
	return WL.Server.invokeSQLStatement({
		preparedStatement : checkavailablityquery,
		parameters : [emp_id,currmonth,year]
	});
}
var procedurestop =WL.Server.createSQLStatement("UPDATE shift_actuals SET availablity = 'Not Available' WHERE emp_id= ? and shift_month = ? and year=?");
function stopshiftavailablityupdate(emp_id,currmonth,year){
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedurestop,
		parameters : [emp_id,currmonth,year]
	});
}
var procedure12Statement = WL.Server.createSQLStatement("select un.emp_name, ut.team from user_name un inner join user_team ut on un.id =ut.emp_id where un.id in (select emp_id from shift_actuals where availablity='Available') ");
function onshiftupdates(){
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure12Statement,
		parameters : []
	});
}
var selectquery = WL.Server.createSQLStatement("select * from shift_schedule where shift_month=? and year=? and emp_id IN (select emp_id from user_team where team=?)");
function getshifts(month,year,team){
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectquery,
		parameters : [month,year,team]
	});
}
var procedure15Statement = WL.Server.createSQLStatement("select * from user_name ua, shift_actuals sa where ua.id= sa.emp_id and sa.emp_id= ? and sa.shift_month= ? and sa.year=?");
function shiftactuser(emp_id,month,yearpm){
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure15Statement,
		parameters : [emp_id,month,yearpm]
	});
}

var procedure14Statement = WL.Server.createSQLStatement("select * from user_name na inner join shift_actuals sh on na.id= sh.emp_id where sh.emp_id in (select id from user_name where pem=?) and shift_month =? and sh.year=?");
function shiftactualsall(email_id,monthholder,year){
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure14Statement,
		parameters : [email_id,monthholder,year]
	});
} 
//--------------------PM to view Shift Actuals-----------------------------------

//to get all the employees under the logged in PM
var procedurepmStatement = WL.Server.createSQLStatement("select * from shift_actuals sa , user_team ut, user_name un where ut.emp_id = sa.emp_id and un.id = ut.emp_id and ut.team = ? and sa.shift_month = ? and sa.year = ?");
function pmshiftactuals(team,month_t,year_t){
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedurepmStatement,
		parameters : [team,month_t,year_t]
	});
}



//--------------------PM to view Shift Actuals-----------------------------------