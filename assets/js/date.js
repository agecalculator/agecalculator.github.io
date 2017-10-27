function intPart(floatNum){

if (floatNum< -0.0000001){

	 return Math.ceil(floatNum-0.0000001)

	}

return Math.floor(floatNum+0.0000001)	

}

function weekDay(wdn){

		if(wdn==0){

return "الأثنين"

}

		if(wdn==1){

return "الثلاثاء"

}

		if(wdn==2){

return "الأربعاء"

}

		if(wdn==3){

return "الخميس"

}

		if(wdn==4){

return "الجمعة"

}

		if(wdn==5){

return "السبت"

}

		if(wdn==6){

return "الأحد"

}

	return ""



}



function islToChr() {

var e = document.getElementById("hday");

var ee = document.getElementById("hmonth");

var eee = document.getElementById("hyear");

var d = parseInt(e.options[e.selectedIndex].value);

var m = parseInt(ee.options[ee.selectedIndex].value);

var y = parseInt(eee.options[eee.selectedIndex].value);

jd=intPart((11*y+3)/30)+354*y+30*m-intPart((m-1)/2)+d+1948440-386;

	

		if (jd> 2299160 )

{

 l=jd+68569;

 n=intPart((4*l)/146097);

l=l-intPart((146097*n+3)/4);

 i=intPart((4000*(l+1))/1461001);

l=l-intPart((1461*i)/4)+31;

 j=intPart((80*l)/2447);

d=l-intPart((2447*j)/80);

l=intPart(j/11);

m=j+2-12*l;

y=100*(n-49)+i+l;

}	

		else	

{

 j=jd+1402;

 k=intPart((j-1)/1461);

 l=j-1461*k;

 n=intPart((l-1)/365)-intPart(l/1461);

 i=l-365*n+30;

j=intPart((80*i)/2447);

d=i-intPart((2447*j)/80);

i=intPart(j/11);

m=j+2-12*i;

y=4*k+n+i-4716;
}
calage1(d,m,y)
}