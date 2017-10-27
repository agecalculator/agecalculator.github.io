var xmlHttp;

function srvTime() {
    try {
        xmlHttp = new XMLHttpRequest()
    } catch (err1) {
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP')
        } catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
            } catch (eerr3) {
                alert("AJAX not supported")
            }
        }
    }
    xmlHttp.open('HEAD', window.location.href.toString(), !1);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    return xmlHttp.getResponseHeader("Date")
}
var st = srvTime();

var dat = new Date(st);

var curday = dat.getDate();

var curmon = dat.getMonth()+1;

var curyear = dat.getFullYear();

function checkleapyear(datea)

{

	if(datea.getYear()%4 == 0)

	{

		if(datea.getYear()% 100 != 0)

		{

return true;

		}

		else

		{

if(datea.getYear()% 400 == 0)

	return true;

else

	return false;

		}

	}

return false;

}

function DaysInMonth(Y, M) {

with (new Date(Y, M, 1, 12)) {

setDate(0);

return getDate();

}

}

function datediff(date1, date2) {

var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),

	 y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();



if (d1 < d2) {

m1--;

d1 += DaysInMonth(y2, m2);

}

if (m1 < m2) {

y1--;

m1 += 12;

}

return [y1 - y2, m1 - m2, d1 - d2];

}



function calage()

{

var calday = document.ageShow.mday.options[document.ageShow.mday.selectedIndex].value;

var calmon = document.ageShow.mmonth.options[document.ageShow.mmonth.selectedIndex].value;

var calyear = document.ageShow.myear.options[document.ageShow.myear.selectedIndex].value;

	if(curday == "" || curmon=="" || curyear=="" || calday=="" || calmon=="" || calyear=="")

	{

		alert("please fill all the values and click go -");

	}	



	else

	{

		var curd = new Date(curyear,curmon-1,curday);

		var cald = new Date(calyear,calmon-1,calday);

		var diff = Date.UTC(curyear,curmon-1,curday,0,0,0) - Date.UTC(calyear,calmon-1,calday,0,0,0);

		var dife = datediff(curd,cald);

		document.ageShow.age.value=dife[0]+" سنة , "+dife[1]+" شهر , و "+dife[2]+" يوم";

		var monleft = (dife[0]*12)+dife[1];

		var secleft = diff/1000/60;

		var hrsleft = secleft/60;

		var daysleft = hrsleft/24;

var seconds=secleft*60;

		document.ageShow.months.value=monleft+" شهر";	

		document.ageShow.days.value=daysleft+" يوم";	

		document.ageShow.hours.value=hrsleft+" ساعة";

		document.ageShow.min.value=secleft+" دقيقة";

document.ageShow.sec.value=seconds+" ثانية";

		var as = parseInt(calyear)+dife[0]+1;

		var diff =  Date.UTC(as,calmon,calday,0,0,0) - Date.UTC(curyear,curmon,curday,0,0,0);

		var datee = diff/1000/60/60/24;

		document.ageShow.nbday.value=datee+" يوم باقي لميلادك القادم";	

	}

}



function calage1(calday,calmon,calyear)

{



	if(curday == "" || curmon=="" || curyear=="" || calday=="" || calmon=="" || calyear=="")

	{

		alert("يرجى ملء كل القيم -");

	}	



	else

	{

		var curd = new Date(curyear,curmon-1,curday);

		var cald = new Date(calyear,calmon-1,calday);

		var diff =  Date.UTC(curyear,curmon-1,curday,0,0,0) - Date.UTC(calyear,calmon-1,calday,0,0,0);

		var dife = datediff(curd,cald);

		document.ageShow.age.value=dife[0]+" سنة , "+dife[1]+" شهر , و "+dife[2]+" يوم";

		var monleft = (dife[0]*12)+dife[1];

		var secleft = diff/1000/60;

		var hrsleft = secleft/60;

		var daysleft = hrsleft/24;

var seconds=secleft*60;

		document.ageShow.months.value=monleft+" شهر ";	

		document.ageShow.days.value=daysleft+" يوم ";	

		document.ageShow.hours.value=hrsleft+" ساعة ";

		document.ageShow.min.value=secleft+" دقيقة ";

document.ageShow.sec.value=seconds+" ثانية";

		var as = parseInt(calyear)+dife[0]+1;

		var diff =  Date.UTC(as,calmon-1,calday,0,0,0) - Date.UTC(curyear,curmon-1,curday,0,0,0);

		var datee = diff/1000/60/60/24;

		document.ageShow.nbday.value=datee+" يوم باقي لميلادك القادم";	

	}

}