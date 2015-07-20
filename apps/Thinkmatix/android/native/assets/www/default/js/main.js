
/* JavaScript content from js/main.js in folder common */
var busyIndicator;
var busy;
var busy1;
var summ=[];
var starttime;
var connectstatus;
var shifthold;
var d = new Date();
var month = new Array();
var teamname1;
var useremp_id;
var n;
var m;
var flag=0;
if(d.getDay() == 1){
var prevday= new Date(new Date().setDate(new Date().getDate()-3));
var prev=prevday.getDate();
}
else{
	var prevday= new Date(new Date().setDate(new Date().getDate()-1));
	var prev=prevday.getDate();
}
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
var prevmonth= new Date(new Date().setDate(new Date().getDate()-60));
var prevmonday= prevmonth.getDate();
var getprevmonth= month[prevmonth.getMonth()]; 
var currmonth = month[d.getMonth()]; 
var month1=d.getMonth();
var currday=d.getDate();
var curryear = d.getFullYear(); 
var monthStart = new Date(curryear, month1, 1);
var monthEnd = new Date(curryear, month1 + 1, 1);
var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
var allthedates = new Array();	
var currentDate= new Date();
var endDate = new Date(new Date().setDate(new Date().getDate()-60));


for (var i=0;endDate <= currentDate;i++){
	var monthname=month[endDate.getMonth()]; 
	allthedates[i]= monthname + ", " + endDate.getFullYear();
		endDate.setDate(endDate.getDate() + 1);
}


var allmonths = [];
for (var i = 0; i < allthedates.length; i++)
{
	if ((jQuery.inArray(allthedates[i], allmonths)) == -1)
	{
		allmonths.push(allthedates[i]);
	}
}
allmonths.unshift("Select a Month");
//for pm

var prevmonth1= new Date(new Date().setDate(new Date().getDate()-90));
var prevmonday1= prevmonth1.getDate();
var getprevmonth1= month[prevmonth1.getMonth()];
var monthStart1 = new Date(curryear, month1, 1);
var monthEnd1 = new Date(curryear, month1 + 1, 1);
var monthLength1 = (monthEnd1 - monthStart1) / (1000 * 60 * 60 * 24);
var allthedates1 = new Array();	
var currentDate1= new Date();
var endDate1 = new Date(new Date().setDate(new Date().getDate()-90));


for (var i=0;endDate1 <= currentDate1;i++){
	var monthname1 =month[endDate1.getMonth()]; 
	allthedates1[i]= monthname1 + ", " + endDate1.getFullYear();
		endDate1.setDate(endDate1.getDate() + 1);
}


var allmonths1 = [];
for (var i = 0; i < allthedates1.length; i++)
{
	if ((jQuery.inArray(allthedates1[i], allmonths1)) == -1)
	{
		allmonths1.push(allthedates1[i]);
	}
}
allmonths1.unshift("Select a Month");

function wlCommonInit(){
	WL.Client.setHeartBeatInterval(5);
	document.addEventListener(WL.Events.WORKLIGHT_IS_CONNECTED, connectDetected, false); 
	document.addEventListener(WL.Events.WORKLIGHT_IS_DISCONNECTED, disconnectDetected , false);
//	if(localStorage.getItem('userid') != null){
//		cookies();
//	}
//	else{
	
	getSecretData();
	WL.ClientMessages.loading = "Authenticating";
	busyIndicator = new WL.BusyIndicator ();
	//}
	
    
}
function connectionFailure(){
	alert("Could not connect to the MobileFirst Server.");
	
}

function disconnectDetected(){
	connectstatus="disconnected";
	
}

function connectDetected(){
	connectstatus="connected";
}
//storing cookies
//function cookies(){
//	if(localStorage.getItem('userteam')=='Pem'){
//		$('#AppBody').show();
//		$('#AuthBody').hide();
//		$('#smanager').hide();
//		$('#leavewfh').hide();
//		$('#start').hide();
//		$('#wikiupdates').hide();
//	}
//	else if((localStorage.getItem('userteam')=='Manager') || (localStorage.getItem('userteam')=='PL'))
//	{
//		$('#AppBody').show();
//		$('#AuthBody').hide();
//		$('#start').hide();
//		$('#onshift').show();	
//	}
//	else{
//		$('#AppBody').show();
//		$('#AuthBody').hide();
//	}
//
//}
//login module start
function getSecretData(){
	
	//busyIndicator = new WL.BusyIndicator ("", {text: "Please wait..."});
	
	var invocationData = {
			adapter: "LoginAdapter",
			procedure: "getSecretData",
			parameters: []
	};
	var options ={
			onSuccess: getSecretData_Callback,
			onFailure: getSecretData_Callback
		  };
	WL.Client.invokeProcedure(invocationData,options );
	
}

function getSecretData_Callback(response){
	busyIndicator.hide();
	//alert("getSecretData_Callback response :: " + JSON.stringify(response));
}
//login module end
//shift schedule start
function shift(){
	var tablesize1=$('#emp_name tr').length;
	if(tablesize1 == 0){
		$('#AppBody').hide();
		$.mobile.changePage( "#shiftmanager",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
	}
	else{
		$('#emp_name tr').remove();
		$('#emp_data tr').remove();
		var myselect = $("select#select-custom-20");
		var optionsAsString = "<option value='select'>Select a Team</option>";
		$("#select-custom-20 option:first").before($(optionsAsString));
		myselect[0].selectedIndex = 0;
		myselect.selectmenu("refresh");
		$('#AppBody').hide();
		$.mobile.changePage( "#shiftmanager",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
	}
	
	}
	
function home()
{
	$.mobile.changePage( "#AppBody",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});
	$('#AppBody').show();
	}

function wiki(){
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
	var ullength=$("#recentupdates li").length;
	if(ullength == 0)
		{
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var lusername=$('#usernameInputField').val();
	var lpassword=$('#passwordInputField').val();
	var invocationData = {
			adapter: "WikiUpdates",
			procedure: "getfeeds",
			parameters: [lusername,lpassword]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : feedsSuccess,
        onFailure : feedsFailure,
    });
		}
	else{
		$('#recentupdates').remove();
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
		var lusername=$('#usernameInputField').val();
		var lpassword=$('#passwordInputField').val();
		var invocationData = {
				adapter: "WikiUpdates",
				procedure: "getfeeds",
				parameters: [lusername,lpassword]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : feedsSuccess,
	        onFailure : feedsFailure,
	    });
	}
	}
}
function feedsSuccess(response){
	
var invocationResult = response.invocationResult;

var feeds = invocationResult.feed;
var entry= feeds.entry;
var length=entry.length;
var div=document.getElementById('wikiContent');
var ul = document.createElement('ul');
ul.setAttribute('data-role','listview');
ul.setAttribute('data-inset','true');
ul.setAttribute('id','recentupdates');
ul.setAttribute('class','ui-listview ui-listview-inset ui-corner-all ui-shadow');

for(var i=0;i<length;i++)
	{
	if(!entry[i].summary.CDATA){
		
	}
	else{
//var content = entry[i].content;
//var activityentry=entry[i].contentModifiedBy;
var name=entry[i].author.name;
var title=entry[i].title;
//var publisheddate =entry[i].updated;
//var newdate= new Date(publisheddate);
//var finaldate=newdate.toLocaleString();
var summary =entry[i].summary.CDATA;
summ[i]=summary;
var finalsummary=summary.substring(0,100)+'....';
var li = document.createElement("li");
var a =document.createElement("a");
var h2=document.createElement("h2");
var p=document.createElement("p");
var p1=document.createElement("p");
//var p3=document.createElement("p");
li.appendChild(document.createTextNode(""));
a.setAttribute('href', "#");
a.setAttribute('id', i);
a.setAttribute('onclick', 'wikidetail(id);');
a.setAttribute('class', 'wikia ui-btn ui-btn-icon-right ui-icon-carat-r');
h2.setAttribute("id","wihead"+i);
h2.innerHTML=title;
p.innerHTML="<strong>"+name+"<strong>";
p.setAttribute("id","wiauth"+i);
p1.innerHTML="<b>Description<b>:<br>"+finalsummary;
//p3.setAttribute("class","ui-li-aside");
//p3.innerHTML="<strong>Last update:"+finaldate+"<strong>";
//p3.setAttribute("id","widate"+i);
a.appendChild(h2);
a.appendChild(p);
a.appendChild(p1);
//a.appendChild(p3);
li.appendChild(a);
ul.appendChild(li);
	}
	}
div.appendChild(ul);
	busy.hide();
	$('#AppBody').hide();
	$.mobile.changePage( "#wikiBody",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});
	
}
function feedsFailure(response){
	busy.hide();
	alert("failure");
}
function wikidetail(par){
	var wikidesc = document.getElementById('wikidesc');
	var header=$("#wihead"+par).text();
	var author=$("#wiauth"+par).text();
	var sum=summ[par];
	$('#wikiheader').text(header);
	$('#wikiauthor').text(author);
	wikidesc.innerHTML='<b>Summary:</b><br>'+sum;
	
	$.mobile.changePage( "#wikiBody1",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});
	
}
function back(){
	$.mobile.changePage( "#wikiBody",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});
	}
function wfhleave(){
	
}
function logout(){
	var options={
			onSuccess : WL.Client.reloadApp,
	};
	WL.Client.logout('CustomAuthenticatorRealm',options);
	localStorage.removeItem('userid');
	localStorage.removeItem('username');
	localStorage.removeItem('password');
}
function getleavewfh()
{
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
	var ullength=$("#fragment-2ul li").length;
	var ullength1=$("#fragment-1ul li").length;
	if((ullength == 0) ){
		if((ullength1 == 0)){
			n=$('#usernameInputField').val();
			m=$('#passwordInputField').val();		
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
		var invocationData = {
				adapter: "Leavewfh",
				procedure: "getleavewfh",
				parameters: [n,m]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : leaveSuccess,
	        onFailure : leaveFailure,
	    });
		}
		else{
			$('#fragment-1ul li').remove();
			WL.ClientMessages.loading = "Loading!Please wait...";
			n=$('#usernameInputField').val();
			m=$('#passwordInputField').val();
			busy = new WL.BusyIndicator ();
			busy.show();
			var invocationData = {
					adapter: "Leavewfh",
					procedure: "getleavewfh",
					parameters: [n,m]
			};
			WL.Client.invokeProcedure(invocationData,{
		        onSuccess : leaveSuccess,
		        onFailure : leaveFailure,
		    });
		}
	}
	else{
		$('#fragment-2ul li').remove();
		$('#fragment-1ul li').remove();
		
		n=$('#usernameInputField').val();
		m=$('#passwordInputField').val();
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
		var invocationData = {
				adapter: "Leavewfh",
				procedure: "getleavewfh",
				parameters: [n,m]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : leaveSuccess,
	        onFailure : leaveFailure,
	    });
	}
	}
	}
function leaveSuccess(response){
	
	var invocationResult = response.invocationResult;
	var feeds = invocationResult.feed;
	var entry= feeds.entry;
	var length=entry.length;
	var i= length-1;
	var content = entry[i].content;
	var cdata=content.CDATA;
	cdata=$(cdata);
	var ul=document.getElementById('fragment-2ul');
	var ul1=document.getElementById('fragment-1ul');
	cdata.find("tbody tr").slice(1).each(function(){
        var Name =$(this).find("td:eq(0)").text();
        var Date =$(this).find("td:eq(1)").text();
        var RequestType =($(this).find("td:eq(2)").text()).trim();
            if (RequestType == 'PL'){
        	var li = document.createElement("li");	
        	var p=document.createElement("p");
        	var p1=document.createElement("p");
        	li.style.background='#3DC8F3';
        	p.innerHTML="<strong>"+Name+"</strong>";
        	p1.innerHTML=Date;
        	li.appendChild(p);
        	li.appendChild(p1);
        	ul.appendChild(li);
        }  
        else{
        	var li1 = document.createElement("li");	
        	var p2=document.createElement("p");
        	var p3=document.createElement("p");
        	li1.style.background='#3DC8F3';
        	p2.innerHTML="<strong>"+Name+"</strong>";
        	p3.innerHTML=Date;
        	li1.appendChild(p2);
        	li1.appendChild(p3);
        	ul1.appendChild(li1);
        	
        }
});
	busy.hide();
	$('#AppBody').hide();
	$.mobile.changePage( "#wfhleave",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});	
}
function leaveFailure(response){
	busy.hide();
	alert("Faliure");
}
function teamchange(){
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
	
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var teamname = document.getElementById("select-custom-20").value;
	var tablesize=$('#emp_name tr').length;
	if(tablesize == 0){
		teamname1=teamname;
		$('#select-custom-20 option[value="select"]').remove();	   
	var invocationData = {
			adapter: "Validate",
			procedure: "smanager",
			parameters: [teamname,currmonth,curryear]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : teamchangeSuccess,
        onFailure : teamchangeFailure,
    });
	}
	else{
		if(teamname == teamname1){
			$.mobile.changePage( "#shiftmanager",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});	
		}
		else{
		teamname1=teamname;
		$('#emp_name tr').remove();
		$('#emp_data tr').remove();
		var invocationData1 = {
				adapter: "Validate",
				procedure: "smanager",
				parameters: [teamname,currmonth,curryear]
		};
		WL.Client.invokeProcedure(invocationData1,{
	        onSuccess : teamchangeSuccess,
	        onFailure : teamchangeFailure,
	    });
		}
	}
}
}
function teamchangeSuccess(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	var tableName =document.getElementById("emp_name");
	var cell1;
	for(var k=0;k<length+1;k++){
		if(k==0){
			var nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML='Name';
			cell1.setAttribute("style", "background-color: #0E74BC;");
			var name = resultset[k].EMP_NAME;
			}
		else{
			 name = resultset[k-1].EMP_NAME;
			nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML = name;
			cell1.setAttribute("style", "background-color: #0E74BC;");
		}

	}
	var tableData =document.getElementById("emp_data");
	var currentdate1=currday;
	var currentdate2=currday;
	for(var i=0;i<=length;i++){
		var dataRow = tableData.insertRow(i);
		if (i==0){
			for(var j=0;j<=(monthLength-currday);j++)
				{
				var dateCell = dataRow.insertCell(j);
				dateCell.innerHTML = currmonth+ ' '+currentdate1;
				dateCell.setAttribute("style", "background-color: #0E74BC;");
				currentdate1++;
				}
		}else{
			for(j=0;j<(32-currday);j++){
				var shiftCell = dataRow.insertCell(j);
				//alert(resultset[i]['day'+currentdate1]);
				if(resultset[i-1]['DAY'+currentdate2] =='First' ){
					shiftCell.setAttribute("style", "background-color: #BDBDBD;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Second' )
				{
					shiftCell.setAttribute("style", "background-color:#848484  ;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Third' || resultset[i-1]['DAY'+currentdate2] =='Third1' || resultset[i-1]['DAY'+currentdate2] =='Third2' )
				{
					shiftCell.setAttribute("style", "background-color: #151515;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='General' )
				{
					shiftCell.setAttribute("style", "background-color: #F7D358;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Week Off' )
				{
					shiftCell.setAttribute("style", "background-color: #F78181;");
				}
				else if(resultset[i-1]['DAY'+currentdate2] =='PL' || resultset[i-1]['day'+currentdate2] =='Comp off' || resultset[i-1]['day'+currentdate2] =='Comp-Off' || resultset[i-1]['day'+currentdate2] =='Location Holiday'|| resultset[i-1]['day'+currentdate2] =='Sick Leave')
				{
					shiftCell.setAttribute("style", "background-color: #FE642E;");
				}
				shiftCell.innerHTML=resultset[i-1]['DAY'+currentdate2];
				currentdate2++;
			}
		}
		currentdate2=currday;
	}
busy.hide();
$.mobile.changePage( "#shiftmanager",{ changeHash: false,
	allowSamePageTransition : true,
    transition              : 'none',
    showLoadMsg             : false,
    reloadPage              : false});
}

function teamchangeFailure(response)
{
	busy.hide();
	alert('falure');
	}




function sp1() {
	$('#sp2').removeClass("ui-state-persist");
	$('#sp1').addClass("ui-state-persist");
	
}
function sp2() {
	$('#sp1').removeClass("ui-state-persist");
	$('#sp2').addClass("ui-state-persist");
	
}
function startshift(){
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
		
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
		var emp_id=localStorage.getItem('userid');
		var invocationData = {
				adapter: "Validate",
				procedure: "checkavailablity",
				parameters: [emp_id,currmonth,curryear]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : availablitySuccess,
	        onFailure : availablityFailure,
	    });
		
	}
	
}
function availablitySuccess(response){
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length=resultset.length;
	
	if(length == 0 || (resultset[0].AVAILABLITY=='Not Available')){
		$('#AppBody').hide();
		$.mobile.changePage( "#startshift",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
		busy.hide();
	}
	else{
		
		$('#AppBody').hide();
		$.mobile.changePage( "#startshift",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
		flag=1;
		starttime=resultset[0].START_TIME;
		$('#flip-min').val('on').slider("refresh");
		$('#shiftupdate').show();
		$('#prevupdate').show();
		var team= localStorage.getItem('userteam');
		var invocationData = {
		        adapter : 'Validate',
		        procedure : 'procedure2',
		        parameters : [team,currmonth]
		    
		    };
		    
		    WL.Client.invokeProcedure(invocationData,{
		        onSuccess : shiftupdateemptySuccess,
		        onFailure : shiftupdateemptyFailure,
		    });

	}
}
function availablityFailure(response){
	busy.hide();
	alert("couldnot start shift");
}
function startshiftprocess(){	
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
	var buttonclicked = document.getElementById("flip-min").value;
	if (buttonclicked == "off" && flag==2){
		flag=0;
	}
	else if (buttonclicked == "on" && (flag==0 || flag==2)){
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
	var emp_id=localStorage.getItem('userid');
	
	var invocationData = {
			adapter: "Validate",
			procedure: "getshiftstarttime",
			parameters: [emp_id,currmonth,curryear]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : startshiftSuccess,
        onFailure : startshiftFailure,
    });
	
	}

	else{
		
		//When stop button is clicked
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
		var emp_id=localStorage.getItem('userid');
		
		var invocationData = {
				adapter: "Validate",
				procedure: "getuserstoptime",
				parameters: [emp_id,currmonth,curryear]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : stopshiftSuccess,
	        onFailure : stopshiftFailure,
	    });
	}
	}
	}


function startshiftSuccess(response){
		var invocationResult = response.invocationResult;
		var resultset = invocationResult.resultSet;
		if (resultset.length > 0) {
		var timehold = resultset[0].START_TIME;
		starttime=resultset[0].START_TIME;
		shifthold = resultset[0].SHIFT_NAME;
		var timestophold = resultset[0].END_TIME;
		
		
		d = new Date();
		var endHour = d.getUTCHours();
		var endMinute = d.getUTCMinutes();
		var endSecond =  d.getUTCSeconds();	
		var endyear = d.getUTCFullYear();
		
    	var dbHour = timehold.substring(0,2);
		var dbMinute = timehold.substring(3,5);
		var dbSecond = timehold.substring(6,8); 		
		
		 
			
		var currmonth1=d.getMonth();		
		var olddate = new Date(endyear,currmonth1,currday, dbHour,dbMinute,dbSecond, 0); 
		var subbed = new Date(olddate - 30*60*1000);
	
		
		var startHour=subbed.getHours();
		var startMinute=subbed.getMinutes();
		var startSecond=subbed.getSeconds();
				
		 
		 //Create date object and set the time to that
		 var startTimeObject = new Date();
		 startTimeObject.setHours(startHour, startMinute, startSecond);

		 //Create date object and set the time to that
		 var endTimeObject = new Date(startTimeObject);
		 endTimeObject.setHours(endHour, endMinute, endSecond);
		 
		 
		 var difference = (((endTimeObject.setHours(endHour, endMinute, endSecond)) - (startTimeObject.setHours(startHour, startMinute, startSecond))) / 1000)/60;
		
		 
		
		 if ((difference > 0 && difference < 61) || difference == 0){
			 var emp_id=localStorage.getItem('userid');
			 
				var invocationData = {
						adapter: "Validate",
						procedure: "shiftactualsselect",
						parameters: [emp_id,currmonth,curryear]
				};
				WL.Client.invokeProcedure(invocationData,{
			        onSuccess : selectshiftactualsSuccess,
			        onFailure : selectshiftactualsFailure,
			    });
			 	
		 }
		 
		 
		 else if(difference < 0){
			 // condition for shift swap 
			 var emp_id=localStorage.getItem('userid');
			 var team = localStorage.getItem('userteam');
			 var invocationData = {
						adapter: "Validate",
						procedure: "getmyteammembers",
						parameters: [team,emp_id]
				};
				WL.Client.invokeProcedure(invocationData,{
			        onSuccess : swapshiftSuccess,
			        onFailure : swapshiftFailure,
			    });
			 
		 }
		 else {
			//conditions where they dint log in on time
			
			    d1 = new Date();
				var endHour1= d1.getUTCHours();
				var endMinute1 = d1.getUTCMinutes();
				var endSecond1 =  d1.getUTCSeconds();
				
		    	var startHour1 = timestophold.substring(0,2);
				var startMinute1 = timestophold.substring(3,5);
				var startSecond1 = timestophold.substring(6,8); 		 
				
				
		        var difference1 = (((endTimeObject.setHours(endHour1, endMinute1, endSecond1)) - (startTimeObject.setHours(startHour1, startMinute1, startSecond1))) / 1000)/60;
								
				if(difference1 < 0 ){
				//log in to shift before end of shift.
			 alert("Please come on time to shift.");
			 var emp_id=localStorage.getItem('userid');
			 
				var invocationData = {
						adapter: "Validate",
						procedure: "shiftactualsselect",
						parameters: [emp_id,currmonth,curryear]
				};
				WL.Client.invokeProcedure(invocationData,{
			        onSuccess : selectshiftactualsSuccess,
			        onFailure : selectshiftactualsFailure,
			    });
				}
				else{
					//log into shift after end of shift
					busy.hide();
					alert("You cannot log into your shift now!!");
					$('#flip-min').val('off').slider("refresh");
				}			 
		    }
		}
		else{
			//PL or SL or Weekoff or Location Holiday
			busy.hide();
			alert("You are not scheduled to work today!!");
			$('#flip-min').val('off').slider("refresh");
		}
}


function selectshiftactualsSuccess(response){
	
	var invocationResult = response.invocationResult;
	var results = invocationResult.resultSet;
	if (results.length > 0) {
		var emp_id=localStorage.getItem('userid');
		 
		var invocationData = {
				adapter: "Validate",
				procedure: "updateshiftactuals",
				parameters: [shifthold, emp_id,currmonth,curryear]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : completeStartSuccess,
	        onFailure : UpdateshiftactualsFailure,
	    });
	 
		
	}
	
	else {
		var emp_id=localStorage.getItem('userid');
		 
		var invocationData = {
				adapter: "Validate",
				procedure: "insertshiftactuals",
				parameters: [emp_id,currmonth,curryear]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : insertshiftactualsSuccess,
	        onFailure : insertshiftactualsFailure,
	    });
	 
				
	}

}

function selectshiftactualsFailure(response){
	busy.hide();
	alert("Failure in selectshiftactuals");

}

function insertshiftactualsSuccess(response){
	var emp_id=localStorage.getItem('userid');
	 
	var invocationData = {
			adapter: "Validate",
			procedure: "updateshiftactuals",
			parameters: [shifthold, emp_id,currmonth,curryear]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : completeStartSuccess,
        onFailure : completeStartFailure,
    });

}

function insertshiftactualsFailure(response){
	busy.hide();	
alert ("Insert query has failed");
}



function startshiftFailure(response){
	busy.hide();
		alert("Failure in startshift ");
	}


function UpdateshiftactualsSuccess(response){
	alert("Update Shift is a Success");
	var team =localStorage.getItem('userteam');
	 var invocationData = {
			        adapter : 'Validate',
			        procedure : 'procedure2',
			        parameters : [team,currmonth]
			    
			    };
			    
			    WL.Client.invokeProcedure(invocationData,{
			        onSuccess : shiftupdateemptySuccess,
			        onFailure : shiftupdateemptyFailure,
			    });
	
	$('#shiftupdate').show();
	$('#prevupdate').show();
}
function shiftupdateemptySuccess(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	
	
	if (resultset.length <= 0) {
		busy.hide();
		$('#updatecontent').text("You are the first person from your team. No updates to show");
	}
	
	
	else
		{
		var empid=resultset[0].EMP_ID;
		if((length==1) && (empid == (localStorage.getItem('userid')))){
			
			busy.hide();
			$('#updatecontent').text("You are the first person from your team. No updates to show");
				
		}
		else{
		var team =localStorage.getItem('userteam');
		var invocationData = {
				adapter: "Validate",
				procedure: "procedure1",
				parameters: [team,currmonth,curryear]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : Procedure1Success,
	        onFailure : Procedure1Failure,
	    });
		}
		}
}
function Procedure1Success(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	
	
	
	
	for (var r=0; r<resultset.length; r++)
		{
		
		var index;
		
		  if (resultset[r].START_TIME == starttime) {
		    index = r;
		    if (index>0)
		    	{
		    	
			    var emphold= resultset[r-1].EMP_ID;
		    	
		    	var invocationData = {
						adapter: "Validate",
						procedure: "getshiftupdate",
						parameters: [currmonth,emphold]
				};
				WL.Client.invokeProcedure(invocationData,{
			        onSuccess : getshiftupdateSuccess,
			        onFailure : getshiftupdateFailure,
			    });
		    	
		    	}
		    else 
		    {	
		    var team =localStorage.getItem('userteam');
		    	var invocationData = {
						adapter: "Validate",
						procedure: "getshiftupdateprev",
						parameters: [team,curryear]
				};
				WL.Client.invokeProcedure(invocationData,{
			        onSuccess : getshiftupdateprevSuccess,
			        onFailure : getshiftupdateprevFailure,
			    });
		    }
		  
		}
		}
	
		
	}
function getshiftupdateSuccess(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	
	
	var update1= resultset[0]['DAY'+currday];
	var update=update1.nl2br();
	var updatecont=document.getElementById('updatecontent');
	updatecont.innerHTML=update;
	busy.hide();
}
function getshiftupdateprevSuccess(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var updateprev1= resultset[0]['DAY'+prev];
	var updateprev=updateprev1.nl2br();
	updatecont=document.getElementById('updatecontent');
	updatecont.innerHTML=updateprev;
	busy.hide();
}
function getshiftupdateprevFailure(response)
{
	busy.hide();
	alert ("getshiftupdateprevFailure");
}
function getshiftupdateFailure(response)
{
	busy.hide();
	alert ("getshiftupdateFailure");
}
function Procedure1Failure(response)
{
	busy.hide();
alert ("Procedure1 failure");	
}
function shiftupdateemptyFailure(response)
{
	busy.hide();
	alert ("Failure in getting the shift update");
}
function UpdateshiftactualsFailure(response){
	busy.hide();
	alert("UpdateShift is a failure");

}

function completeStartSuccess(response){
	alert("Updated the shift! Now get to Work ");
	var team =localStorage.getItem('userteam');
	 var invocationData = {
			        adapter : 'Validate',
			        procedure : 'procedure2',
			        parameters : [team,currmonth]
			    
			    };
			    
			    WL.Client.invokeProcedure(invocationData,{
			        onSuccess : shiftupdateemptySuccess,
			        onFailure : shiftupdateemptyFailure,
			    });
	$('#shiftupdate').show();
	$('#prevupdate').show();
	
}

function completeStartFailure(response){
	busy.hide();
	alert("completefailure");
	
}
document.addEventListener("backbutton", function(e){
    if(($.mobile.activePage.is('#AppBody')) || ($.mobile.activePage.is('#AuthBody'))){
       
        navigator.app.exitApp();
    }
    else if($.mobile.activePage.is('#wikiBody1')){
    	$.mobile.changePage( "#wikiBody",{ changeHash: false,
    		allowSamePageTransition : true,
  	      transition              : 'none',
  	      showLoadMsg             : false,
  	      reloadPage              : false});
    }
    else {
    	$.mobile.changePage( "#AppBody",{ changeHash: false,
    		allowSamePageTransition : true,
  	      transition              : 'none',
  	      showLoadMsg             : false,
  	      reloadPage              : false});
    	$('#AppBody').show();
    }
}, false);

function stopshiftSuccess(response){
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var timehold = resultset[0].END_TIME;
	shifthold = resultset[0].SHIFT_NAME;
	
	d = new Date();
	var endHour = d.getUTCHours();
	var endMinute = d.getUTCMinutes();
	var endSecond =  d.getUTCSeconds();	
	
	var currdate =d.getDate();
	var currmonth1=d.getMonth();
	var curryear =d.getFullYear();
	
	var startHour = timehold.substring(0,2);
	var startMinute = timehold.substring(3,5);
	var startSecond = timehold.substring(6,8); 		
	
	 
//	var startHour = 12;
//	var startMinute = 45;
//	var startSecond = 00;
//			
	var subHour = 00;
	var subMinute = 30;
	var subSecond = 00;
			
	var olddate = new Date(curryear,currmonth1,currdate, startHour,startMinute,startSecond, 0); 
	var subbed = new Date(olddate - 30*60*1000);
	var stophour=subbed.getHours();
	var stopminute=subbed.getMinutes();
	var stopseconds=subbed.getSeconds();
	
	//Create date object and set the time to that
	 var startTimeObject = new Date();
	 startTimeObject.setHours(stophour, stopminute, stopseconds);

	 //Create date object and set the time to that
	 var endTimeObject = new Date(startTimeObject);
	 endTimeObject.setHours(endHour, endMinute, endSecond);
 
	             
	var difference = (((endTimeObject.setHours(endHour, endMinute, endSecond)) - (startTimeObject.setHours(stophour, stopminute, stopseconds))) / 1000)/60;
	if(difference>0){
		$('#shiftupdate').hide();
		$('#prevupdate').hide();
		var emp_id=localStorage.getItem('userid');
		//At stop of shift, availability flag in shift actuals tables has to be set to "Not Available"
		var invocationData = {
				adapter: "Validate",
				procedure: "stopshiftavailablityupdate",
				parameters: [emp_id,currmonth,curryear]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : stopshiftavailablityupdateSuccess,
	        onFailure : stopshiftavailablityupdateFailure,
	    }); 
		
	}
	else{
busy.hide();
		alert("you are not allowed to end you shift before your end time");
		flag =1;
		$('#flip-min').val('on').slider("refresh");
		
	}
}
function stopshiftFailure(response){
	busy.hide();
	alert("Failure in stopshift ");
}
function doshiftupdate(){
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();	
	var emp_id=localStorage.getItem('userid');
	var invocationData = {
			adapter: "Validate",
			procedure: "stopupdate",
			parameters: [emp_id,currmonth]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : StopupdateSuccess,
        onFailure : StopupdateFailure,
    });
	}
}
function StopupdateSuccess(response){
	var resultset =response.invocationResult.resultSet;
	var length=resultset.length;
	if(length==0){
		$.mobile.changePage( "#shiftdialog",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
		busy.hide();
	}
	else{
		var currentday=new Date().getDate();
		var update= resultset[0]['DAY'+currentday];
	    $("#updateshift").val(update);
		$.mobile.changePage( "#shiftdialog",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
		busy.hide();
	}

}
function StopupdateFailure(response){
	busy.hide();
	alert("in failure");
	
	
}
function updatecancel(){
	$.mobile.changePage( "#startshift",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});
	flag =1;
	$('#shiftupdate').show();
	$('#prevupdate').show();
	$('#flip-min').val('on').slider("refresh");
	
}
//Start of Activity Handover - User Story 924135
function updactivityhandover(){       

	emp_id = localStorage.getItem('userid');
	//shiftupdates = prompt("Enter your Updates Please");
	shiftupdates= $("#updateshift").val();
	if(shiftupdates==''){
		alert("Please enter an update");
	}
	else{
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
		var invocationData = {
				adapter: "Validate",
				procedure: "stopupdate",
				parameters: [emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : shiftupdateSuccess,
	        onFailure : shiftupdateFailure,
	    });  
	}
}






function shiftupdateSuccess(response){
	var invocationResult = response.invocationResult;
	var allres = invocationResult.resultSet;
	

	if (allres.length > 0) {
		
		var invocationData = {
				adapter: "Validate",
				procedure: "updateshiftupdates",
				parameters: [shiftupdates,emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : completeShiftUpdatesSuccess,
	        onFailure : UpdateshiftPopupFailure,
	    });


	}

	else {	
		
		var invocationData = {

				adapter: "Validate",
				procedure: "insertshiftupdates",
				parameters: [emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : insertshiftUpdatesSuccess,
	        onFailure : insertshiftUpdatesFailure,
	    });	

		

	}

}

function insertshiftUpdatesSuccess(response){
	
	   emp_id =localStorage.getItem('userid');

		var invocationData = {
				adapter: "Validate",
				procedure: "updateshiftupdates",
				parameters: [shiftupdates, emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : completeShiftUpdatesSuccess,
	        onFailure : completeShiftUpdatesFailure,
	    });
}




function shiftupdateFailure(response){
	busy.hide();
   alert("Failure in shift update");
}


function UpdateshiftPopupFailure(response){
	busy.hide();
   alert("Failure in UpdateshiftPopup");
}

function insertshiftUpdatesFailure(response){
	busy.hide();
   alert("Failure in InsertShift");
   }




function completeShiftUpdatesSuccess(response){
	busy.hide();
	$.mobile.changePage( "#startshift",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});
   alert("Shift Updated Successfully");
}

function completeShiftUpdatesFailure(response){
	busy.hide();
   alert("Failure in complete Shift Updates Failure");
}

//End of Activity Handover - User Story 924135
function swapshiftSuccess(response){
	    $('#swapmembershift').hide();
	    $('#swapreason1').hide();
		$('#swapreason').hide();
	    busy.hide();
	    var selectlength=$('#swapselect').has('option').length;
	    if(selectlength > 0){
	    	$('#swapselect').find('option').remove();
	    	$('#swapmembertext').hide();
	    	var optionsAsString = "<option value='0'>Select Team Member</option>";
			var invocationresult=response.invocationResult;
			var resultset=invocationresult.resultSet;
			var length =resultset.length;
			for(var i=0; i<length;i++){
		  optionsAsString += "<option value='" + resultset[i].EMP_NAME + "'>" + resultset[i].EMP_NAME + "</option>";
				
			}
			$("select[name='swapselect']").find('option').remove().end().append($(optionsAsString));
			$.mobile.changePage( "#swapdialog",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});
	    	var myselect = $("#swapselect");
	    	myselect[0].selectedIndex =0;
	    	$('#swapselect').selectmenu('refresh', true);
	    }
	    else{
		var optionsAsString = "<option value='0'>Select Team Member</option>";
		var invocationresult=response.invocationResult;
		var resultset=invocationresult.resultSet;
		var length =resultset.length;
		for(var i=0; i<length;i++){
	  optionsAsString += "<option value='" + resultset[i].EMP_NAME + "'>" + resultset[i].EMP_NAME + "</option>";
			
		}
		$("select[name='swapselect']").find('option').remove().end().append($(optionsAsString));
		$.mobile.changePage( "#swapdialog",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
	    }
	    }
function swapshiftFailure(response){
	busy.hide();
	alert("in swap failure");
}
function swapselect(){
	$('#swapmembershift').hide();
	$('#swapreason1').hide();
	$('#swapreason').hide();
	$('#swapmembertext').show();
	$('#swapselect option[value="0"]').remove();
	var teammembername = document.getElementById("swapselect").value;
	$('#swapmembertext').text("Please select the shift for "+teammembername);
	var optionsAsString = "<option value='0'>Select </option>";
	$("#swapmembershift1 option:first").before($(optionsAsString));
	var myselect = $("#swapmembershift1");
	myselect[0].selectedIndex =0;
		$("#swapmembershift1").selectmenu('refresh', true);
	
	
	$('#swapmembershift').show();
}
function swapcancel(){
	$.mobile.changePage( "#startshift",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});
	
	flag =2;
	$('#flip-min').val('off').slider("refresh");
	
}
function swapmembershift(){
	var teammebername=document.getElementById("swapselect").value;
	var mailtextarea=document.getElementById("swapreason");
	var myname=localStorage.getItem('user');
	$('#swapmembershift1 option[value="0"]').remove();
	$('#swapreason1').show();
	$('#swapreason').show();
	mailtextarea.value='Hi,\n'+myname+' is swaping shift with '+teammebername+',because '+teammebername+' is on '+document.getElementById('swapmembershift1').value+'\n\nThanks&Regards\nEPSMLADMIN';
}
function swapmyshift(){
	if($('#swapreason').val()==''){
		alert("Reason for swap is mandatory..!");
	}
	else{
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var myshift=document.getElementById("swapmembershift1").value;
	var emp_name=document.getElementById("swapselect").value;
	var emp_id=localStorage.getItem('userid');
	
	var invocationData = {
			adapter: "Validate",
			procedure: "swapingshiftupdate",
			parameters: [myshift,emp_name,emp_id,currmonth,curryear]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : swapmyshiftSuccess,
        onFailure : swapmyshiftFailure,
    });
	}	
}
function swapmyshiftSuccess(response){
	alert("Swaped Successfully");
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length=resultset.length;
	var toid='';
	var j=1;
	for (var i=0;i<length;i++){
		toid +=resultset[i].intranet_id;
		if(j<length){
			toid +=',';
			j++;
		}
	}
	var emailid=localStorage.getItem('username');
	var subject="Shift Swap Notification";
	var content=$('#swapreason').val();
	var invocationData = {
			adapter: "Mailer",
			procedure: "sendMail",
			parameters: [toid,emailid,subject,content]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : swapmailSuccess,
        onFailure : swapmailFailure,
    });
	
}
function swapmailSuccess(response){
	$.mobile.changePage( "#startshift",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});	
	
	
var emp_id=localStorage.getItem('userid');
	
	var invocationData = {
			adapter: "Validate",
			procedure: "getshiftstarttime",
			parameters: [emp_id,currmonth,curryear]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : startshiftSuccess,
        onFailure : startshiftFailure,
    });
}
function swapmailFailure(response){
	busy.hide();
	alert("swap mail notification failure");
}
function swapmyshiftFailure(response){
	alert("Swap Failure");
	busy.hide();
}

function stopshiftavailablityupdateSuccess(response){
	flag=0;
	var emp_id=localStorage.getItem('userid');
	var invocationData = {
			adapter: "Validate",
			procedure: "stopupdate",
			parameters: [emp_id,currmonth]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : StopupdateSuccess,
        onFailure : StopupdateFailure,
    });
}


function stopshiftavailablityupdateFailure(response){
	alert("Failure in stopshiftavailablityupdateFailure ");
	busy.hide();
}
function StopSuccess(response){
	busy.hide();
	alert("Stopped Shift Successfully");

}


function StopFailure(response){
	busy.hide();
	alert("Stopped Shift Failure");
}
String.prototype.nl2br = function()
{
    return this.replace(/\n/g, "<br />");
};
function onshift(){
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}

	else{
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	
	//var childcount=$('#SAPSM').children().length;
	if(($('#SAPSM').children().length > 0) || ($('#SAPACCESS').children().length > 0) || ($('#CSA').children().length > 0) || ($('#WOI').children().length > 0) || ($('#SAPBI').children().length > 0) || ($('#PESSYSTMAINT').children().length > 0) || ($('#PESACCESSADMIN').children().length > 0)|| ($('#PESTRANSPORT').children().length > 0|| ($('#EMTORIES').children().length > 0)|| ($('#PESINFRA').children().length > 0)|| ($('#BOND').children().length > 0)))	
	{
		$( "#smcollapse" ).collapsible( "collapse" );
		$( "#accesscollapse" ).collapsible( "collapse" );
		$( "#systcollapse" ).collapsible( "collapse" );
		$( "#bicollapse" ).collapsible( "collapse" );
		$( "#csacollapse" ).collapsible( "collapse" );
		$( "#woicollapse" ).collapsible( "collapse" );
		$( "#pesadmincollapse" ).collapsible( "collapse" );
		$( "#bondcollapse" ).collapsible( "collapse" );
		$( "#transportcollapse" ).collapsible( "collapse" );
		$( "#emtoriescollapse" ).collapsible( "collapse" );
		$( "#infracollapse" ).collapsible( "collapse" );
		$('#SAPSM').children().remove();
		$('#SAPACCESS').children().remove();
		$('#CSA').children().remove();
		$('#WOI').children().remove();
		$('#SAPBI').children().remove();
		$('#PESSYSTMAINT').children().remove();
		$('#PESACCESSADMIN').children().remove();
		$('#PESTRANSPORT').children().remove();
		$('#PESINFRA').children().remove();
		$('#EMTORIES').children().remove();
		$('#BOND').children().remove();
		document.getElementById("sapsmCount").innerHTML=0;
		document.getElementById("SAPACCESScount").innerHTML=0;
		document.getElementById("PESSYSTMAINTcount").innerHTML=0;
		document.getElementById("SAPBIcount").innerHTML=0;
		document.getElementById("WOIcount").innerHTML=0;
		document.getElementById("CSAcount").innerHTML=0;
		document.getElementById("PESACCESSADMINcount").innerHTML=0;
		document.getElementById("BONDcount").innerHTML=0;
		document.getElementById("PESTRANSPORTcount").innerHTML=0;
		document.getElementById("EMTORIEScount").innerHTML=0;
		document.getElementById("PESINFRAcount").innerHTML=0;
	var invocationData = {
				adapter: "Validate",
				procedure: "onshiftupdates",
				parameters: []
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : onShiftSuccess,
	        onFailure : onShiftFailure,
	    });
	}
	else{
  

	var invocationData = {
			adapter: "Validate",
			procedure: "onshiftupdates",
			parameters: []
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : onShiftSuccess,
        onFailure : onShiftFailure,
    });
	}
	}
}
function onShiftSuccess(response){
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var sapsm = document.getElementById("SAPSM").value;
	var length =resultset.length;
	var tablelength=length;
	if(tablelength==0){
		sapsm1=sapsm;

	}
	var countHolder;
	var span;
	var p=null;
	var sapCount = 0;
	var sapaccesscount=0;
	var pessycount=0;
	var sapbicount=0;
	var csacount=0;
	var woicount=0;
	var pesaccessadmincount=0;
	var Bondcount=0;
	var pestransportcount=0;
	var emtoriescount=0;
	var pesinfracount=0;

	//document.getElementById("SAPACCESS").innerHTML='';

	for (var i=0;i<length;i++){
	 if(resultset[i].TEAM=="SAPSM"){
			sapCount++;
		span = document.getElementById("SAPSM");
		p = document.createElement("p");
		p.innerHTML = resultset[i].EMP_NAME;
		span.appendChild(p);
		countHolder = document.getElementById("sapsmCount");
		countHolder.innerHTML = sapCount;

		}else if(resultset[i].TEAM=="SAPACCESS"){
		sapaccesscount++;
		span = document.getElementById("SAPACCESS");
		p = document.createElement("p");
		p.innerHTML = resultset[i].EMP_NAME;
		span.appendChild(p);
		countHolder = document.getElementById("SAPACCESScount");
		countHolder.innerHTML = sapaccesscount;
		}
		else if(resultset[i].TEAM=="PESSYSTMAINT"){
			pessycount++;
			span = document.getElementById("PESSYSTMAINT");
			p = document.createElement("p");
			p.innerHTML = resultset[i].EMP_NAME;
			span.appendChild(p);
			countHolder = document.getElementById("PESSYSTMAINTcount");
			countHolder.innerHTML = pessycount;
			}
			else if(resultset[i].TEAM=="SAPBI"){
			sapbicount++;
			span = document.getElementById("SAPBI");
			p = document.createElement("p");
			p.innerHTML = resultset[i].EMP_NAME;
			span.appendChild(p);
			countHolder = document.getElementById("SAPBIcount");
			countHolder.innerHTML = sapbicount;
			}
			else
			if(resultset[i].TEAM=="CSA"){
			csacount++;
			span = document.getElementById("CSA");
			p = document.createElement("p");
			p.innerHTML = resultset[i].EMP_NAME;
			span.appendChild(p);
			countHolder = document.getElementById("CSAcount");
			countHolder.innerHTML = csacount;
			}
		    else if(resultset[i].TEAM=="WOI"){
		    woicount++;
			span = document.getElementById("WOI");
			p = document.createElement("p");
			p.innerHTML = resultset[i].EMP_NAME;
			span.appendChild(p);
			countHolder = document.getElementById("WOIcount");
			countHolder.innerHTML = woicount;
			}
			else if(resultset[i].TEAM=="PESACCESSADMIN"){
			pesaccessadmincount++;
			span = document.getElementById("PESACCESSADMIN");
			p = document.createElement("p");
			p.innerHTML = resultset[i].EMP_NAME;
			span.appendChild(p);
			countHolder = document.getElementById("PESACCESSADMINcount");
			countHolder.innerHTML = pesaccessadmincount;
			}
			else if(resultset[i].TEAM=="BOND"){
			 Bondcount++;
			 span = document.getElementById("BOND");
			 p = document.createElement("p");
			 p.innerHTML = resultset[i].EMP_NAME;
			 span.appendChild(p);
			 countHolder = document.getElementById("BONDcount");
			 countHolder.innerHTML = Bondcount;
			 }
			else if(resultset[i].TEAM=="PESTRANSPORT"){
			pestransportcount++;
			span = document.getElementById("PESTRANSPORT");
			p = document.createElement("p");
			p.innerHTML = resultset[i].EMP_NAME;
			span.appendChild(p);
			countHolder = document.getElementById("PESTRANSPORTcount");
			countHolder.innerHTML = pestransportcount;
			}
			else if(resultset[i].TEAM=="EMTORIES"){
			emtoriescount++;
			span = document.getElementById("EMTORIES");
			p = document.createElement("p");
			p.innerHTML = resultset[i].EMP_NAME;
			span.appendChild(p);
			countHolder = document.getElementById("EMTORIEScount");
			countHolder.innerHTML = emtoriescount;
			}
			else if(resultset[i].TEAM=="PESINFRA"){
			pesinfracount++;
			span = document.getElementById("PESINFRA");
			p = document.createElement("p");
			p.innerHTML = resultset[i].EMP_NAME;
			span.appendChild(p);
			countHolder = document.getElementById("PESINFRAcount");
			countHolder.innerHTML = pesinfracount;
			}

	}
	$('#AppBody').hide();
	$.mobile.changePage( "#onshiftmanager",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false
});
	busy.hide();
}
function onShiftFailure(response)
{
	busy.hide();
	alert('falure');
	}
// Function for quater end support starts here
function qend(){
	if((currmonth=='June') ||(currmonth=='March') || (currmonth=='September') || (currmonth=='December') ){
		var tablesize1=$('#emp_name1 tr').length;
		if(tablesize1 == 0){
			$('#AppBody').hide();
			$.mobile.changePage( "#qendmain",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});
		}
		else{
			$('#emp_name1 tr').remove();
			$('#emp_data1 tr').remove();
			var myselect = $("select#qendselect");
			var optionsAsString = "<option value='select'>Select a Team</option>";
			$("#qendselect option:first").before($(optionsAsString));
			myselect[0].selectedIndex = 0;
			myselect.selectmenu("refresh");
			$('#AppBody').hide();
			$.mobile.changePage( "#qendmain",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});
		}
	}
		else{
			alert("It is not a Q-end!Please check again during a Q-end");
		}
	}

function qteamchange(){
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
	
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var teamname = document.getElementById("qendselect").value;
	var tablesize=$('#emp_name1 tr').length;
	if(tablesize == 0){
		teamname1=teamname;
		$('#qendselect option[value="select"]').remove();	   
	var invocationData = {
			adapter: "Validate",
			procedure: "smanager",
			parameters: [teamname,currmonth,curryear]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : qteamchangeSuccess,
        onFailure : qteamchangeFailure,
    });
	}
	else{
		if(teamname == teamname1){
			$.mobile.changePage( "#qendmain",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});	
		}
		else{
		teamname1=teamname;
		$('#emp_name1 tr').remove();
		$('#emp_data1 tr').remove();
		var invocationData1 = {
				adapter: "Validate",
				procedure: "smanager",
				parameters: [teamname,currmonth,curryear]
		};
		WL.Client.invokeProcedure(invocationData1,{
	        onSuccess : qteamchangeSuccess,
	        onFailure : qteamchangeFailure,
	    });
		}
	}
}
}
function qteamchangeSuccess(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	var tableName =document.getElementById("emp_name1");
	var cell1;
	for(var k=0;k<length+1;k++){
		if(k==0){
			var nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML='Name';
			cell1.setAttribute("style", "background-color: #0E74BC;");
			var name = resultset[k].EMP_NAME;
			}
		else{
			 name = resultset[k-1].EMP_NAME;
			nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML = name;
			cell1.setAttribute("style", "background-color: #0E74BC;");
		}

	}
	var tableData =document.getElementById("emp_data1");
	var currentdate1=currday;
	var currentdate2=currday;
	for(var i=0;i<=length;i++){
		var dataRow = tableData.insertRow(i);
		if (i==0){
			for(var j=0;j<=((monthLength-currday)+2);j++)
				{
				if(j==0){
					var dateCell = dataRow.insertCell(j);
					dateCell.innerHTML = 'Email';
					dateCell.setAttribute("style", "background-color: #0E74BC;");
				}
				else if (j==1){
					var dateCell = dataRow.insertCell(j);
					dateCell.innerHTML = 'Contact';
					dateCell.setAttribute("style", "background-color: #0E74BC;");
				}
				else{
					var dateCell = dataRow.insertCell(j);
					dateCell.innerHTML = currmonth+ ' '+currentdate1;
					dateCell.setAttribute("style", "background-color: #0E74BC;");
					currentdate1++;
				}
				
				}
		}else{
			for(j=0;j<=((monthLength-currday)+2);j++){
				var shiftCell = dataRow.insertCell(j);
				if(j==0){
					shiftCell.setAttribute("style", "background-color: #F7D358;");
					shiftCell.innerHTML=resultset[i-1].INTRANET_ID;
					
				}
				else if(j==1){
					shiftCell.setAttribute("style", "background-color: #F7D358;");
					shiftCell.innerHTML=resultset[i-1].CONTACTS;
					}
				//alert(resultset[i]['day'+currentdate1]);
				else{
					if(resultset[i-1]['DAY'+currentdate2] =='First' ){
						shiftCell.setAttribute("style", "background-color: #BDBDBD;");
					}
					if(resultset[i-1]['DAY'+currentdate2] =='Second' )
					{
						shiftCell.setAttribute("style", "background-color:#848484  ;");
					}
					if(resultset[i-1]['DAY'+currentdate2] =='Third' || resultset[i-1]['DAY'+currentdate2] =='Third1' || resultset[i-1]['DAY'+currentdate2] =='Third2' )
					{
						shiftCell.setAttribute("style", "background-color: #151515;");
					}
					if(resultset[i-1]['DAY'+currentdate2] =='General' )
					{
						shiftCell.setAttribute("style", "background-color: #F7D358;");
					}
					if(resultset[i-1]['DAY'+currentdate2] =='Week Off' )
					{
						shiftCell.setAttribute("style", "background-color: #F78181;");
					}
					else if(resultset[i-1]['DAY'+currentdate2] =='PL' || resultset[i-1]['day'+currentdate2] =='Comp off' || resultset[i-1]['day'+currentdate2] =='Comp-Off')
					{
						shiftCell.setAttribute("style", "background-color: #FE642E;");
					}
					shiftCell.innerHTML=resultset[i-1]['DAY'+currentdate2];
					currentdate2++;
				}	
				}
				
		}
		currentdate2=currday;
	}
busy.hide();
$.mobile.changePage( "#qendmain",{ changeHash: false,
	allowSamePageTransition : true,
    transition              : 'none',
    showLoadMsg             : false,
    reloadPage              : false});
}

function qteamchangeFailure(response)
{
	busy.hide();
	alert('falure');
	}
//shift actuals for user starts here
function shiftactual()
{

var tablesize1=$('#emp_act tr').length;
if(tablesize1 == 0){
	var teamsSelect = document.getElementById("select-month");
	var teamlength=teamsSelect.options.length;
	if(teamlength ==0){
		 // Get a reference to the teams select.This code is to populate the months drop down
		 
		  teamsSelect.options.length = 0; 
		      // Populate the drop down
		      for (var i = 0 ; i < allmonths.length ; i++) {     	  
		         teamsSelect.options[teamsSelect.options.length] = new Option(allmonths[i], allmonths[i]);  
		    	  }
		     
			$('#AppBody').hide();
			$.mobile.changePage( "#shiftactupg",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});
	}
	else{
		var optionsAsString = "<option value='Select a Month'>Select a Month</option>";
		$("#select-month option:first").before($(optionsAsString));
		var myselect = $("select#select-month");
		myselect[0].selectedIndex = 0;
		myselect.selectmenu("refresh");
		$('#AppBody').hide();
		$.mobile.changePage( "#shiftactupg",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
		
	}  
 
}
else{
	$('#emp_act tr').remove();
	$('#emp_act1 tr').remove();
	var optionsAsString = "<option value='Select a Month'>Select a Month</option>";
	$("#select-month option:first").before($(optionsAsString));
	var myselect = $("select#select-month");
	myselect[0].selectedIndex = 0;
	myselect.selectmenu("refresh");
	$('#AppBody').hide();
	$.mobile.changePage( "#shiftactupg",{ changeHash: false,
		allowSamePageTransition : true,
	      transition              : 'none',
	      showLoadMsg             : false,
	      reloadPage              : false});
}
}
function monthchange()
{
if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
	$('#select-month option[value="Select a Month"]').remove();
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var monthname2 = document.getElementById("select-month").value;
	var n = monthname2.indexOf(","); 
    var monthname = monthname2.substr(0,n).trim();
    var yearpm =monthname2.substr(n+1,monthname2.length).trim();
	var emp_id=localStorage.getItem('userid');
	
	var tablesize=$('#emp_act tr').length;
	if(tablesize == 0){
		monthname1=monthname;
		$('#select-month option[value="select"]').remove();	   
	var invocationData = {
			adapter: "Validate",
			procedure: "shiftactuser",
			parameters: [emp_id,monthname,yearpm]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : monthchangeSuccess,
        onFailure : monthchangeFailure,
    });
	}
	else{
		if(monthname == monthname1){
			$.mobile.changePage( "#shiftactupg",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});	
		}
		else{
		monthname1=monthname;
		$('#emp_act tr').remove();
		$('#emp_act1 tr').remove();
		
		var invocationData1 = {
				adapter: "Validate",
				procedure: "shiftactuser",
				parameters: [emp_id,monthname,yearpm]
		};
		WL.Client.invokeProcedure(invocationData1,{
	        onSuccess : monthchangeSuccess,
	        onFailure : monthchangeFailure,
	    });
		}
	}
}
	
}



function monthchangeSuccess(response)
{
	
	var t;
	var b;
	var j;
	var currentdate1="1";
	var currentdate2= "1";
	
	var monthname2 = document.getElementById("select-month").value;
	var n = monthname2.indexOf(","); 
    var monthname = monthname2.substr(0,n).trim();
    var yearpm =monthname2.substr(n+1,monthname2.length).trim();
    
	if (monthname==currmonth)
	{
	t=currday;
	b=1;
	}
else if (monthname==getprevmonth)
	{
	for(var i=0;i<11;i++){
		if(month[i]==monthname){
			 month2=i;
		}
	}
	var monthStart = new Date(yearpm, month2, 1);
	var monthEnd = new Date(yearpm, month2 + 1, 1);
	 t = ((monthEnd - monthStart) / (1000 * 60 * 60 * 24))+1;
	
	currentdate1= prevmonday;
	currentdate2= prevmonday;
	b= prevmonday;
	}
else
	{
	
	for(var i=0;i<11;i++){
		if(month[i]==monthname){
			 month2=i;
		}
	}
	var monthStart = new Date(yearpm, month2, 1);
	var monthEnd = new Date(yearpm, month2 + 1, 1);
	 t = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
	
	b=0;
	}
	
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	if(length==0){
		alert("No data to show for current selection.Please select a different month");
		busy.hide();
	}
	else{
		
	
	var tableName =document.getElementById("emp_act");
	var cell1;
	for(var k=0;k<length+1;k++){
		if(k==0){
			var nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML='Name';
			cell1.setAttribute("style", "background-color: #0E74BC;");
			var name = resultset[k].EMP_NAME;
			}
		else{
			 name = resultset[k-1].EMP_NAME;
			nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML = name;
			cell1.setAttribute("style", "background-color: #0E74BC;");
		}

	}
	var tableData =document.getElementById("emp_act1");
	
	
	for(var i=0;i<=length;i++){
		var dataRow = tableData.insertRow(i);
		if (i==0){
			for(j=0;j<(t-b);j++)
				{
				var dateCell = dataRow.insertCell(j);
				dateCell.innerHTML = monthname+ ' '+currentdate1;
				dateCell.setAttribute("style", "background-color: #0E74BC;");
				currentdate1++;
				}
		}else{
			
			for(j=0;j<(t-b);j++){
				
				var shiftCell = dataRow.insertCell(j);
				
				//alert(resultset[i]['day'+currentdate1]);
				if(resultset[i-1]['DAY'+currentdate2] =='First' ){
					
					shiftCell.setAttribute("style", "background-color: #BDBDBD;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Second' )
				{
					shiftCell.setAttribute("style", "background-color:#848484  ;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Third' )
				{
					shiftCell.setAttribute("style", "background-color: #151515;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='General' )
				{
					shiftCell.setAttribute("style", "background-color: #F7D358;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Week Off' )
				{
					shiftCell.setAttribute("style", "background-color: #F78181;");
				}
				else if(resultset[i-1]['DAY'+currentdate2] =='PL' || resultset[i-1]['DAY'+currentdate2] =='Comp off' || resultset[i-1]['DAY'+currentdate2] =='Comp-Off' || resultset[i-1]['DAY'+currentdate2] =='Location Holiday'|| resultset[i-1]['DAY'+currentdate2] =='Sick Leave')
				{
					shiftCell.setAttribute("style", "background-color: #FE642E;");
				}
				shiftCell.innerHTML=resultset[i-1]['DAY'+currentdate2];
				currentdate2++;
			}
		}
		
	}
busy.hide();
$.mobile.changePage( "#shiftactupg",{ changeHash: false,
	allowSamePageTransition : true,
    transition              : 'none',
    showLoadMsg             : false,
    reloadPage              : false});
}
}
function monthchangeFailure(response)
{
	alert("falure");
	}
//shift actuals of user ends here
//shift actuals of Pem starts here
function shiftactualspem(){
	var tablesize1=$('#emp_name_pr tr').length;
	if(tablesize1 == 0){
		var teamsSelect = document.getElementById("select-custom-23");
		var teamlength=teamsSelect.options.length;
		if(teamlength ==0){
			 // Get a reference to the teams select.This code is to populate the months drop down
			 
			  teamsSelect.options.length = 0; 
			      // Populate the drop down
			      for (var i = 0 ; i < allmonths.length ; i++) {     	  
			         teamsSelect.options[teamsSelect.options.length] = new Option(allmonths[i], allmonths[i]);  
			    	  }
			     
				$('#AppBody').hide();
				$.mobile.changePage( "#shiftactualsmanager",{ changeHash: false,
					allowSamePageTransition : true,
				      transition              : 'none',
				      showLoadMsg             : false,
				      reloadPage              : false});
		}
		else{
			var optionsAsString = "<option value='Select a Month'>Select a Month</option>";
			$("#select-custom-23 option:first").before($(optionsAsString));
			var myselect = $("select#select-custom-23");
			myselect[0].selectedIndex = 0;
			myselect.selectmenu("refresh");
			$('#AppBody').hide();
			$.mobile.changePage( "#shiftactualsmanager",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});
			
		}  
	 
	}
	else{
		$('#emp_name_pr tr').remove();
		$('#emp_data_pr tr').remove();
		var optionsAsString = "<option value='Select a Month'>Select a Month</option>";
		$("#select-custom-23 option:first").before($(optionsAsString));
		var myselect = $("select#select-custom-23");
		myselect[0].selectedIndex = 0;
		myselect.selectmenu("refresh");
		$('#AppBody').hide();
		$.mobile.changePage( "#shiftactualsmanager",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});
	}

}
function monthchange1(){
	//$('select-custom-23').find('option:selected').removeAttr('selected');
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
		$('#select-custom-23 option[value="Select a Month"]').remove();
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
		var monthname2 = document.getElementById("select-custom-23").value;
		var n = monthname2.indexOf(","); 
	    var monthname = monthname2.substr(0,n).trim();
	    var yearpm =monthname2.substr(n+1,monthname2.length).trim();
		var emp_id=localStorage.getItem('username');
		var tablesize=$('#emp_name_pr tr').length;
		if(tablesize == 0){
			monthname1=monthname;
			$('#select-custom-23 option[value="select"]').remove();	   
		var invocationData = {
				adapter: "Validate",
				procedure: "shiftactualsall",
				parameters: [emp_id,monthname,yearpm]
		};
		WL.Client.invokeProcedure(invocationData,{
			onSuccess : monthchangeSuccess1,
	        onFailure : monthchangeFailure1,
	    });
		}
		else{
			if(monthname == monthname1){
				$.mobile.changePage( "#shiftactupg",{ changeHash: false,
					allowSamePageTransition : true,
				      transition              : 'none',
				      showLoadMsg             : false,
				      reloadPage              : false});	
			}
			else{
			monthname1=monthname;
			$('#emp_name_pr tr').remove();
			$('#emp_data_pr tr').remove();
			
			var invocationData1 = {
					adapter: "Validate",
					procedure: "shiftactualsall",
					parameters: [emp_id,monthname,yearpm]
			};
			WL.Client.invokeProcedure(invocationData1,{
		        onSuccess : monthchangeSuccess1,
		        onFailure : monthchangeFailure1,
		    });
			}
		}
	}
		
	}
function monthchangeSuccess1(response){
	var t;
	var b;
	var j;
	var currentdate1="1";
	var currentdate2= "1";
	var currentdate3="1";
	var monthname2 = document.getElementById("select-custom-23").value;
	var n = monthname2.indexOf(","); 
    var monthname = monthname2.substr(0,n).trim();
    var yearpm =monthname2.substr(n+1,monthname2.length).trim();
    
	if (monthname==currmonth)
	{
	t=currday;
	b=1;
	}
else if (monthname==getprevmonth)
	{
	for(var i=0;i<11;i++){
		if(month[i]==monthname){
			 month2=i;
		}
	}
	var monthStart = new Date(yearpm, month2, 1);
	var monthEnd = new Date(yearpm, month2 + 1, 1);
	 t = ((monthEnd - monthStart) / (1000 * 60 * 60 * 24))+1;
	
	currentdate1= prevmonday;
	currentdate2= prevmonday;
	currentdate3=prevmonday;
	b= prevmonday;
	}
else
	{
	
	for(var i=0;i<11;i++){
		if(month[i]==monthname){
			 month2=i;
		}
	}
	var monthStart = new Date(yearpm, month2, 1);
	var monthEnd = new Date(yearpm, month2 + 1, 1);
	 t = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
	
	b=0;
	}
	
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	if(length==0){
		alert("No data to show for current selection.Please select a different month");
		busy.hide();
	}
	else{
		
	
	var tableName =document.getElementById("emp_name_pr");
	var cell1;
	for(var k=0;k<length+1;k++){
		if(k==0){
			var nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML='Name';
			cell1.setAttribute("style", "background-color: #0E74BC;");
			var name = resultset[k].EMP_NAME;
			}
		else{
			 name = resultset[k-1].EMP_NAME;
			nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML = name;
			cell1.setAttribute("style", "background-color: #0E74BC;");
		}

	}
	var tableData =document.getElementById("emp_data_pr");
	
	
	for(var i=0;i<=length;i++){
		var dataRow = tableData.insertRow(i);
		if (i==0){
			for(j=0;j<(t-b);j++)
				{
				var dateCell = dataRow.insertCell(j);
				dateCell.innerHTML = monthname+ ' '+currentdate1;
				dateCell.setAttribute("style", "background-color: #0E74BC;");
				currentdate1++;
				}
		}else{
			currentdate2=currentdate3;
			for(j=0;j<(t-b);j++){
				
				var shiftCell = dataRow.insertCell(j);
				
				//alert(resultset[i]['day'+currentdate1]);
				if(resultset[i-1]['DAY'+currentdate2] =='First' ){
					
					shiftCell.setAttribute("style", "background-color: #BDBDBD;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Second' )
				{
					shiftCell.setAttribute("style", "background-color:#848484  ;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Third' )
				{
					shiftCell.setAttribute("style", "background-color: #151515;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='General' )
				{
					shiftCell.setAttribute("style", "background-color: #F7D358;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Week Off' )
				{
					shiftCell.setAttribute("style", "background-color: #F78181;");
				}
				else if(resultset[i-1]['DAY'+currentdate2] =='PL' || resultset[i-1]['DAY'+currentdate2] =='Comp off' || resultset[i-1]['DAY'+currentdate2] =='Comp-Off' || resultset[i-1]['DAY'+currentdate2] =='Location Holiday' || resultset[i-1]['DAY'+currentdate2] =='Sick Leave')
				{
					shiftCell.setAttribute("style", "background-color: #FE642E;");
				}
				shiftCell.innerHTML=resultset[i-1]['DAY'+currentdate2];
				currentdate2++;
			}
		}
		
	}
busy.hide();
$.mobile.changePage( "#shiftactualsmanager",{ changeHash: false,
	allowSamePageTransition : true,
    transition              : 'none',
    showLoadMsg             : false,
    reloadPage              : false});
}
	
}
function monthchangeFailure1(response){
	busy.hide();
	alert("falure");
}
//PM to view Shift actuals
function callpmviewshiftactuals(){
	var tablesize1=$('#emp_namesa tr').length;
	if(tablesize1 == 0){
		var teamsSelect = document.getElementById("monthsselect");
		var teamlength=teamsSelect.options.length;
		if(teamlength ==0){
			$('#AppBody').hide();
			$.mobile.changePage( "#pmviewshiftact",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});
			var myselect = $("select#teamsgroups");
			myselect[0].selectedIndex = 0;
			myselect.selectmenu("refresh");
			document.getElementById('month-select3').style.display = "none";
		}
		else{
			var optionsAsString = "<option value='0'>Select a Team</option>";
			$("#teamsgroups option:first").before($(optionsAsString));
			$('#AppBody').hide();
			$.mobile.changePage( "#pmviewshiftact",{ changeHash: false,
				allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : false});
			var myselect = $("select#teamsgroups");
			myselect[0].selectedIndex = 0;
			myselect.selectmenu("refresh");
			document.getElementById('month-select3').style.display = "none";

		}		
		}

	else{
		$('#emp_namesa tr').remove();
		$('#emp_datasa tr').remove();
		var optionsAsString = "<option value='0'>Select a Team</option>";
		$("#teamsgroups option:first").before($(optionsAsString));
		var myselect = $("select#teamsgroups");
		myselect[0].selectedIndex = 0;
		myselect.selectmenu("refresh");
		$('#AppBody').hide();
		$.mobile.changePage( "#pmviewshiftact",{ changeHash: false,
			allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : false});

		document.getElementById('month-select3').style.display = "none";
	}


}
function selectteams() {
	var tablesize1=$('#emp_namesa tr').length;
	$('#teamsgroups option[value="0"]').remove();
	if(tablesize1 == 0){
		var teamsSelect = document.getElementById("monthsselect");
		var teamlength=teamsSelect.options.length;
		if(teamlength ==0){
			 // Get a reference to the teams select.This code is to populate the months drop down

			  teamsSelect.options.length = 0; 
			      // Populate the drop down
			      for (var i = 0 ; i < allmonths1.length ; i++) {  
			    	  teamsSelect.options[teamsSelect.options.length] = new Option(allmonths1[i], allmonths1[i]);  
			    	  }
			      $("#monthsselect").selectmenu('refresh', true);
			      $('#month-select3').show();       

		}
		else{
			var myselect = $("select#monthsselect");
			if($("#monthsselect option[value='Select a Month']").length > 0){
				myselect[0].selectedIndex = 0;
				myselect.selectmenu("refresh");
				$('#month-select3').show(); 
			}
			else{
				var optionsAsString = "<option value='Select a Month'>Select a Month</option>";
				$("#monthsselect option:first").before($(optionsAsString));
				myselect[0].selectedIndex = 0;
				myselect.selectmenu("refresh");
				$('#month-select3').show(); 
			}


		}  

	}
	else{
		$('#emp_namesa tr').remove();
		$('#emp_datasa tr').remove();
		if($('#monthsselect option[value="Select a Month"]').length > 0){
			var myselect = $("select#monthsselect");
			myselect[0].selectedIndex = 0;
			myselect.selectmenu("refresh");
			$('#month-select3').show(); 
		}
		else{
			var optionsAsString = "<option value='Select a Month'>Select a Month</option>";
			$("#monthsselect option:first").before($(optionsAsString));
			var myselect = $("select#monthsselect");
			myselect[0].selectedIndex = 0;
			myselect.selectmenu("refresh");
			$('#month-select3').show();
		}

	}


}
function chselectmonth(){
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var tablesize1=$('#emp_namesa tr').length;
	if(tablesize1==0){
		$('#monthsselect option[value="Select a Month"]').remove();
		var selectedteam = document.getElementById("teamsgroups").value;
		var selectedmonth = document.getElementById("monthsselect").value;

		var n = selectedmonth.indexOf(","); 
	    var month_t = selectedmonth.substr(0,n).trim();
	    var year_t =selectedmonth.substr(n+1,selectedmonth.length).trim();




		var invocationData = {
				adapter: "Validate",
				procedure: "pmshiftactuals",
				parameters: [selectedteam,month_t,year_t]
		};
		WL.Client.invokeProcedure(invocationData,{
	      onSuccess : pmviewshiftactualsSuccess,
	      onFailure : pmviewshiftactualsFailure,
	  });
	}
	else{
		$('#emp_namesa tr').remove();
		$('#emp_datasa tr').remove();
		$('#monthsselect option[value="Select a Month"]').remove();
		var selectedteam = document.getElementById("teamsgroups").value;
		var selectedmonth = document.getElementById("monthsselect").value;

		var n = selectedmonth.indexOf(","); 
	    var month_t = selectedmonth.substr(0,n).trim();
	    var year_t =selectedmonth.substr(n+1,selectedmonth.length).trim();




		var invocationData = {
				adapter: "Validate",
				procedure: "pmshiftactuals",
				parameters: [selectedteam,month_t,year_t]
		};
		WL.Client.invokeProcedure(invocationData,{
	      onSuccess : pmviewshiftactualsSuccess,
	      onFailure : pmviewshiftactualsFailure,
	  });
	}

}


function pmviewshiftactualsSuccess(response){	

	var t;
	var b;
	var j;
	var currentdate1="1";
	var currentdate2= "1";
	var currentdate3="1";
	var monthname2 = document.getElementById("monthsselect").value;
	var n = monthname2.indexOf(","); 
    var monthname = monthname2.substr(0,n).trim();
    var yearpm =monthname2.substr(n+1,monthname2.length).trim();

	if (monthname==currmonth)
	{
	t=currday;
	b=1;
	}
else if (monthname==getprevmonth1)
	{
	for(var i=0;i<11;i++){
		if(month[i]==monthname){
			 month2=i;
		}
	}
	var monthStart = new Date(yearpm, month2, 1);
	var monthEnd = new Date(yearpm, month2 + 1, 1);
	 t = ((monthEnd - monthStart) / (1000 * 60 * 60 * 24))+1;

	currentdate1= prevmonday1;
	currentdate2= prevmonday1;
	currentdate3=prevmonday1;
	b= prevmonday1;
	}
else
	{

	for(var i=0;i<11;i++){
		if(month[i]==monthname){
			 month2=i;
		}
	}
	var monthStart = new Date(yearpm, month2, 1);
	var monthEnd = new Date(yearpm, month2 + 1, 1);
	 t = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);

	b=0;
	}

	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	if(length==0){
		alert("No data to show for current selection.Please select a different month");
		busy.hide();
	}
	else{


	var tableName =document.getElementById("emp_namesa");
	var cell1;
	for(var k=0;k<length+1;k++){
		if(k==0){
			var nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML='Name';
			cell1.setAttribute("style", "background-color: #0E74BC;");
			var name = resultset[k].EMP_NAME;
			}
		else{
			 name = resultset[k-1].EMP_NAME;
			nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML = name;
			cell1.setAttribute("style", "background-color: #0E74BC;");
		}

	}
	var tableData =document.getElementById("emp_datasa");


	for(var i=0;i<=length;i++){
		var dataRow = tableData.insertRow(i);
		if (i==0){
			for(j=0;j<(t-b);j++)
				{
				var dateCell = dataRow.insertCell(j);
				dateCell.innerHTML = monthname+ ' '+currentdate1;
				dateCell.setAttribute("style", "background-color: #0E74BC;");
				currentdate1++;
				}
		}else{
			currentdate2=currentdate3;
			for(j=0;j<(t-b);j++){

				var shiftCell = dataRow.insertCell(j);

				//alert(resultset[i]['day'+currentdate1]);
				if((resultset[i-1]['DAY'+currentdate2] =='First') ||resultset[i-1]['DAY'+currentdate2] =='first'){

					shiftCell.setAttribute("style", "background-color: #BDBDBD;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Second' )
				{
					shiftCell.setAttribute("style", "background-color:#848484  ;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Third' )
				{
					shiftCell.setAttribute("style", "background-color: #151515;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='General' )
				{
					shiftCell.setAttribute("style", "background-color: #F7D358;");
				}
				if(resultset[i-1]['DAY'+currentdate2] =='Week Off' )
				{
					shiftCell.setAttribute("style", "background-color: #F78181;");
				}
				else if(resultset[i-1]['DAY'+currentdate2] =='PL' || resultset[i-1]['DAY'+currentdate2] =='Comp off' || resultset[i-1]['DAY'+currentdate2] =='Comp-Off' || resultset[i-1]['DAY'+currentdate2] =='Location Holiday' || resultset[i-1]['DAY'+currentdate2] =='Sick Leave')
				{
					shiftCell.setAttribute("style", "background-color: #FE642E;");
				}
				shiftCell.innerHTML=resultset[i-1]['DAY'+currentdate2];
				currentdate2++;
			}
		}

	}
busy.hide();

}


}

function pmviewshiftactualsFailure(response){
	alert("Failed in PM Viewing Shift Actuals");
}
//PM to view Shift actuals
//--------------------------------------------------------------------------------------------------

/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}