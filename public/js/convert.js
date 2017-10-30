// (c)2005-2012 Convertworld.com
var nD = ".";
var nT = ",";
function log10(x){return Math.log(x)/Math.log(10)}

function setTitle(div,arr){var split_array=arr.split("|");setInnerHTML(div,split_array[2]);}

function getCookie(name){var dc=document.cookie;var prefix=name+"=";var begin=dc.indexOf("; "+prefix);if(begin==-1){begin=dc.indexOf(prefix);if(begin!=0)return null;}else{begin+=2;}

var end=document.cookie.indexOf(";",begin);if(end==-1){end=dc.length;}

return unescape(dc.substring(begin+prefix.length,end));}

function setCookie(name,value,nDays,path,domain,secure){if(getCookie(name)==value)return;var today=new Date();var expires=new Date();if(nDays==null||nDays==0)nDays=365;expires.setTime(today.getTime()+86400000*nDays);document.cookie=name+"="+escape(value)+

((expires)?"; expires="+expires.toGMTString():"")+

((path)?"; path="+path:"");}

function externalLinks(){if(!document.getElementsByTagName)return;var anchors=document.getElementsByTagName("a");for(var i=0;i<anchors.length;i++){var anchor=anchors[i];if(anchor.getAttribute("href")&&(anchor.getAttribute("rel")=="nofollow"||anchor.getAttribute("rel")=="external")){anchor.target="_blank";}}}

function LZ(x){return(x>=10||x<0?"":"0")+x;}

function Expo(E){return"e"+(E<0?'-':'+')+LZ(Math.abs(E));}

function Prfx(Q,L,c){var s=Q+"";if(c.length>0)while(s.length<L){s=c+s;}return s;}

function StrU(X,M,N){var T,S=new String(Math.round(X*Number("1e"+N)));if(/\D/.test(S))return''+X;with(new String(Prfx(S,M+N,'0')))return substring(0,T=(length-N))+'.'+substring(T);}

function Sign(X){return X>0?"":X<0?"-":" ";}

function GetSEM(X){var U,Obj={S:Sign(X),E:0,M:X==U?U:Math.abs(X)}

with(Obj){if(M==0||!isFinite(M))return Obj

while(M>=10){E++;M/=10;}

while(M<1.0){E--;M*=10;}}

return Obj;}

function myRoundForced(X,N){if(X==0)return 0;N=Math.round(N)+1;with(GetSEM(X)){var ret=S+StrU(M,1,N-1)+(isFinite(M)?Expo(E):" ");return ret.replace('.e','e');}}

function myRound(number,decimals){if(decimals==0){number=Math.round(number);}else{var p=Math.pow(10,decimals);number=number*p;number=Math.round(number);number=number/p;}

return number;}

function replaceAll(sString,sReplaceThis,sWithThis){if(sReplaceThis!=""&&sReplaceThis!=sWithThis){var counter=0;var start=0;var before="";var after="";while(counter<sString.length){start=sString.indexOf(sReplaceThis,counter);if(start==-1){break;}else{before=sString.substr(0,start);after=sString.substr(start+sReplaceThis.length,sString.length);sString=before+sWithThis+after;counter=before.length+sWithThis.length;}}}

return sString;}

function convertTable(from,to,value){var from_array=from.split(",");var to_array=to.split(",");var dif=0;var pre='';var pos=0;value=value.replace(",",".");var is_num=(value==parseFloat(value));for(var i=0;i<from_array.length;i++){if(value.toUpperCase()==from_array[i].toUpperCase()){pos=i+1;pre='';break;}else if(is_num&&from_array[i]==parseFloat(from_array[i])){if(dif==0){dif=Math.abs(from_array[i]-value);pre='~';pos=i+1;}else if(Math.abs(from_array[i]-value)<=dif){dif=Math.abs(from_array[i]-value);pos=i+1;pre='~';}}}

if(pos>0){return pre+to_array[pos-1]}

return'-';}

function convertPaper(from,to,constant,decimals){if(to=='0')return'-';from=from.replace(",",".");to=to.replace(",",".");var split_array=from.split("x");var from_a=parseFloat(split_array[0]);var from_b=parseFloat(split_array[1]);if(to=='P'){var from_c=from_a*from_b;var split_array=constant.split("x");var to_a=parseFloat(split_array[0]);var to_b=parseFloat(split_array[1]);var to_c=to_a*to_b;var result=to_c/from_c;var tmp=result;result=myRound(result,decimals);tmpStr=''+result;if(result==0||tmpStr.length>12||tmpStr.indexOf('e')>0)result=myRoundForced(tmp,decimals);return'\u00D7'+result;}else{var to_a=parseFloat(to)*constant;var a=from_a*to_a;var b=from_b*to_a;var tmp=a;a=myRound(a,decimals)

tmpStr=''+a;if(a==0||tmpStr.length>12||tmpStr.indexOf('e')>0)a=myRoundForced(tmp,decimals);a=formatResult(a);var tmp=b;b=myRound(b,decimals)

tmpStr=''+b;if(b==0||tmpStr.length>12||tmpStr.indexOf('e')>0)b=myRoundForced(tmp,decimals);b=formatResult(b);return a+' x '+b;}}

function convertCurrency(amount,from,to,div,include_short,decimals){var done=false;var split_array=from.split("|");var from_constant_str=split_array[0];var date_from=split_array[1];var from_unit=split_array[2];var split_array=to.split("|");var to_constant_str=split_array[0];var date_to=split_array[1];var to_unit=split_array[2];var new_str;amount=amount.replace(",",".");to_constant_str=to_constant_str.replace(",",".");from_constant_str=from_constant_str.replace(",",".");var amount=parseFloat(amount);var a1=parseFloat(to_constant_str);var b1=parseFloat(from_constant_str);var result,tmp;result=amount*a1/b1;tmp=result;result=myRound(result,decimals);tmpStr=''+result;if(result==0||tmpStr.length>12||tmpStr.indexOf('e')>0)result=myRoundForced(tmp,decimals);if(isNaN(result))new_str='-';else if(include_short)new_str=formatResult(result)+' '+to_unit;else new_str=formatResult(result);var dateDiv;if(!div){div=replaceAll(to_unit,' ','-');div=replaceAll(div,'/','-');div='value_'+div;document.getElementById('date'+div.substring(5,9)).value=formatDate(date_to,2);}else{new_str="<b>"+new_str+"</b>";dateDiv='date';setInnerHTML('date',formatDate(date_to,2));}

setInnerHTML(div,new_str);}

function convert(amount,from,to,div,include_short,decimals){var done=false;var split_array=from.split("|");var from_constant_str=split_array[0];var from_constant_str_extra=split_array[1];var from_unit=split_array[2];var split_array=to.split("|");var to_constant_str=split_array[0];var to_constant_str_extra=split_array[1];var to_unit=split_array[2];var new_str;if(to_constant_str=='T'){new_str=convertTable(from_constant_str_extra,to_constant_str_extra,amount);}else if(to_constant_str=='P'){new_str=convertPaper(to_constant_str_extra,from_constant_str,from_constant_str_extra,decimals);}else{amount=amount.replace(",",".");to_constant_str=to_constant_str.replace(",",".");from_constant_str=from_constant_str.replace(",",".");var amount=parseFloat(amount);var a1=parseFloat(to_constant_str);var a2=parseFloat(to_constant_str_extra);var b1=parseFloat(from_constant_str);var b2=parseFloat(from_constant_str_extra);var result,tmp;var k;var m;if(a2!=-888&&b2==-888){split_array=from_constant_str.split(":");b1=parseFloat(split_array[0]);b2=parseFloat(split_array[1]);result=Math.pow(10,amount/b1)/b2*a1;}else if(a2==-888&&b2!=-888){if(amount==0){result='\u221e';done=true;}else if(amount>0){split_array=to_constant_str.split(":");a1=parseFloat(split_array[0]);a2=parseFloat(split_array[1]);result=a1*Math.log(a2*amount/b1)*Math.LOG10E;}}else if(a2==-999&&b2==-999){k=a1/b1;result=amount*k;}else if((a2==-999&&b2!=-999)||(a2!=-999&&b2==-999)){k=a1*b1;result=k/amount;}else if((a2==0&&b2==0)||(10+a2+b2-a2-b2!=10)){k=a1/b1;result=amount*k;}else{k=(a1-a2)/(b1-b2);m=(b1*a2-b2*a1)/(b1-b2);result=amount*k+m;}

if(!done){tmp=result;result=myRound(result,decimals);tmpStr=''+result;if(result==0||tmpStr.length>12||tmpStr.indexOf('e')>0)result=myRoundForced(tmp,decimals);if(isNaN(result))new_str='-';else if(include_short)new_str=formatResult(result)+' '+to_unit;else new_str=formatResult(result);}else{new_str=result;}}

if(!div){div=replaceAll(to_unit,' ','-');div=replaceAll(div,'/','-');div='value_'+div;}

else new_str="<b>"+new_str+"</b>";setInnerHTML(div,new_str);}

function addSeparators(number){var parts=Array();number=number+'';var dec=number.indexOf('.');if(dec>0)parts=number.split('.',2);else parts[0]=number;var ret='';var j=0;for(var i=parts[0].length-1;i>=0;i--){if(j>0&&j%3==0)ret=nT+ret;ret=parts[0].charAt(i)+ret;j++;}

if(dec>0)ret=ret+nD+parts[1];return ret;}

function formatResult(str){var parts=Array('','');if(str+0==str){parts[0]=str;}else{parts=str.split(" ",2);}

var ret='';if(parts[0]+0==parts[0]||parts[0].indexOf("e")==-1){ret=addSeparators(str);}else{var split_array=str.split("e");if(parseFloat(split_array[0])!=1){var ret=addSeparators(parseFloat(split_array[0]))+'\u00D7'+'10<sup>'+parseFloat(split_array[1])+'</sup>';}else{var ret='10<sup>'+parseFloat(split_array[1])+'</sup>';}

if(parts[1]!=null)ret=' '+parts[1];}

return ret;}

function initRoman(){for(var i=0;i<initRoman.arguments.length;i++)this[i+1]=initRoman.arguments[i];}

function toRoman(number){if(number<=0||isNaN(number)||number>=4000000)return'-';var roman_unit=new initRoman("","I","II","III","IV","V","VI","VII","VIII","IX");var roman_tens=new initRoman("","X","XX","XXX","XL","L","LX","LXX","LXXX","XC");var roman_hund=new initRoman("","C","CC","CCC","CD","D","DC","DCC","DCCC","CM");var roman_thou=new initRoman("","M","MM","MMM",'M<span class="overbar">V</span>','<span class="overbar">V</span>','<span  class="overbar">V</span>M','<span class="overbar">V</span>MM','<span class="overbar">V</span>MMM','M<span class="overbar">X</span>');var roman_tenthou=new initRoman('','<span class="overbar">X</span>','<span class="overbar">XX</span>','<span class="overbar">XXX</span>','<span class="overbar">XL</span>','<span class="overbar">L</span>','<span class="overbar">LX</span>','<span class="overbar">LXX</span>','<span class="overbar">LXXX</span>','<span class="overbar">XC</span>');var roman_hunthou=new initRoman('','<span class="overbar">C</span>','<span class="overbar">CC</span>','<span class="overbar">CCC</span>','<span class="overbar">CD</span>','<span class="overbar">D</span>','<span class="overbar">DC</span>','<span class="overbar">DCC</span>','<span class="overbar">DCCC</span>','<span class="overbar">CM</span>');var roman_mili=new initRoman('','<span class="overbar">M</span>','<span class="overbar">MM</span>','<span class="overbar">MMM</span>');var s=0;var t=0;var u=0;var v=0;var w=0;var x=0;var y=0;s=((number-(number%1000000))/1000000)+1;number=(number%1000000);t=((number-(number%100000))/100000)+1;number=(number%100000);u=((number-(number%10000))/10000)+1;number=(number%10000);v=((number-(number%1000))/1000)+1;number=(number%1000);w=((number-(number%100))/100)+1;number=(number%100);x=((number-(number%10))/10)+1;y=(number%10)+1;return(roman_mili[s]+roman_hunthou[t]+roman_tenthou[u]+roman_thou[v]+roman_hund[w]+roman_tens[x]+roman_unit[y]);}

function fromRoman(numeral){var array_thousands=new Array("","M","MM","MMM","MMMM","MMMMM");var array_hundreds=new Array("","C","CC","CCC","CD","D","DC","DCC","DCCC","CM");var array_tens=new Array("","X","XX","XXX","XL","L","LX","LXX","LXXX","XC");var array_ones=new Array("","I","II","III","IV","V","VI","VII","VIII","IX");var ones=0;var tens=0;var hundreds=0;var thousands=0;var current=0;var width=0;var number=0;numeral=numeral.toUpperCase();for(number=1;number<6;number++){if(numeral.indexOf(array_thousands[number],current)==0){thousands=number;width=array_thousands[number].length;}}

current=current+width;width=0;for(number=1;number<10;number++){if(numeral.indexOf(array_hundreds[number],current)==current){hundreds=number;width=array_hundreds[number].length;}}

current=current+width;width=0;for(number=1;number<10;number++){if(numeral.indexOf(array_tens[number],current)==current){tens=number;width=array_tens[number].length;}}

current=current+width;width=0;for(number=1;number<10;number++){if(numeral.indexOf(array_ones[number],current)==current){ones=number;width=array_ones[number].length;}}

current=current+width;return thousands*1000+hundreds*100+tens*10+ones;}

function removeLastSpace(str){var result=new String();result=str.toString();if(result.charAt(result.length-1)-1)

result=result.substr(0,result.length-1);return result;}

function toEnglish(amount){if(amount>100000000000000000000)return'-';var _DigitPlace=new Array("-","thousand","million","billion","trilion","zillion","smillion","BIGTHING");var _Digits=new Array("zero","one","two","three","four","five","six","seven","eight","nine");var _FromTenToTwenty=new Array("ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen");var _Tens=new Array("-","ten","twenty","thirty","fourty","fifty","sixty","seventy","eighty","ninety");amount=parseInt(amount);if(isNaN(amount))return"-";var sb=new String();var amountString=new String();amountString=""+amount;var amount_Digits=new Array();var amountDigitValues=new Array();for(var i=0;i<amountString.length;i++){amount_Digits[i]=amountString.charAt(i);amountDigitValues[i]=0;}

if(amount<10&&amount>-10){if(amount<0){sb+="minus ";amount=-amount;}

sb+=(_Digits[amount]);return sb;}

for(var i=0;i<amount_Digits.length;i++){if(amount_Digits[i]!='-')amountDigitValues[i]=parseInt(amount_Digits[i]);var offset=amount_Digits.length-i-1;if(amount_Digits[i]=='-')sb+=("Minus ");else if(amountDigitValues[i]>0){if(offset>2){var nextOffset=offset-(offset%3);var chunk=amountString.substring(i,amount_Digits.length-nextOffset);i=amount_Digits.length-nextOffset-1;var digitOffset=parseInt((offset/3));sb+=(toEnglish(chunk));sb+=(" ");sb+=(_DigitPlace[digitOffset]);sb+=(" ");}else if(offset==2){sb+=(_Digits[amountDigitValues[i]]);sb+=(" ");sb+=("hundred ");}else if(offset==1){if(amountDigitValues[i]==1){amountDigitValues[i+1]=parseInt(amount_Digits[i+1]);sb+=(_FromTenToTwenty[amountDigitValues[i+1]]);sb+=(" ");i++;}else{sb+=(_Tens[amountDigitValues[i]]);sb+=(" ");}}else if(offset==0){sb+=(_Digits[amountDigitValues[i]]);sb+=(" ");}}}

var ret=removeLastSpace(sb);return ret;}

function Num2TextConvertor(){}

function toGerman(number){if(number>1e71)return'-';var einsArray=new Array("","ein","zwei","drei","vier","fÃ¼nf","sechs","sieben","acht","neun");var zehnArray=new Array("zehn","elf","zwÃ¶lf","dreizehn","vierzehn","fÃ¼nfzehn","sechzehn","siebzehn","achtzehn","neunzehn");var zigArray=new Array("","","zwanzig","dreiÃŸig","vierzig","fÃ¼nfzig","sechzig","siebzig","achtzig","neunzig");var spec_unitpref=new Array("M","B","Tr","Quadr","Quint","Sext","Sept","Okt","Non");var unitpref=new Array("Un","Duo","Tre","Quattuor","Quin","Sex","Septen","Okto","Novem");var tenpref=new Array("Dez","Vigint","Trigint","Quadragint","Quinquagint","Sexagint","Septuagint","Oktogint","Nonagint");var hundredpref=new Array("Zen","Duzen","Trezen","Quadringen","Quingen","Sescen","Septingen","Oktingen","Nongen");var bigsArray=new Array();var index=0;var len=spec_unitpref.length;for(var i=0;i<len;i++){bigsArray[index++]=spec_unitpref[i]+"illion";bigsArray[index++]=spec_unitpref[i]+"illiard";}

len=tenpref.length;var len2=unitpref.length;for(i=0;i<len;i++){bigsArray[index++]=tenpref[i]+"illion";bigsArray[index++]=tenpref[i]+"illiard";for(var j=0;j<len2;j++){bigsArray[index++]=unitpref[j]+tenpref[i].toLowerCase()+"illion";bigsArray[index++]=unitpref[j]+tenpref[i].toLowerCase()+"illiard";}}

bigsArray[index]=hundredpref[0]+"tillion";maxNumLength=bigsArray.length*3+6;var numstr=String(number);numstr=numstr.replace(/\s+/g,"");var msg="";if(numstr.charAt(0)=='-'){msg+="minus ";numstr=numstr.substring(1);}else if(numstr.charAt(0)=='+'){numstr=numstr.substring(1);}

var len=numstr.length;for(var i=0;i<len;i++){if(numstr.charAt(i)!='0'){numstr=numstr.substring(i);break;}}

if(!isValidNatNumber(numstr)){return"-";}else if(Number(numstr)==0){return"Null";}else if(numstr.length>maxNumLength){var diff=numstr.length-maxNumLength;return"Support of only "+maxNumLength+" digits. There "+

(diff==1?"is one":"are "+diff)+" more!";}

numstr="0"+numstr;len=numstr.length;var h1="numstr.charAt(len-pos)";var h2="numstr.charAt(len-pos+1)";var h3="Number(numstr.substring(len-pos-2, len-pos+1))";var singEnd,bigsIndex;for(var pos=len;pos>0;pos--){switch(pos%3){case 0:if(eval(h1)=="0"){}else if(eval(h1)=="1"){msg+="hundert";}else{msg+=einsArray[eval(h1)]+"hundert";}

break;case 2:if(eval(h1)=="0"){msg+=einsArray[eval(h2)];}else if(eval(h1)=="1"){msg+=zehnArray[eval(h2)];}else if(eval(h2)=="0"){msg+=zigArray[eval(h1)];}else{msg+=einsArray[eval(h2)]+"und"+zigArray[eval(h1)];}

break;case 1:switch(pos){default:bigsIndex=(pos-7)/3;singEnd=bigsIndex%2==0?" ":"e ";if(eval(h3)==1){msg+="e "+bigsArray[bigsIndex]+singEnd;}else if(eval(h3)!=0){msg+=" "+bigsArray[bigsIndex]+"en ";}

break;case 4:if(eval(h3)!=0){msg+="tausend";}

break;case 1:if(numstr.substring(len-pos-1)=="01"){msg+="s";}

break;}

break;}}

return msg;}

function letras(c,d,u)

{var centenas,decenas,decom

var lc=""

var ld=""

var lu=""

centenas=eval(c);decenas=eval(d);decom=eval(u);switch(centenas)

{case 0:lc="";break;case 1:{if(decenas==0&&decom==0)

lc="Cien"

else

lc="Ciento ";}

break;case 2:lc="Doscientos ";break;case 3:lc="Trescientos ";break;case 4:lc="Cuatrocientos ";break;case 5:lc="Quinientos ";break;case 6:lc="Seiscientos ";break;case 7:lc="Setecientos ";break;case 8:lc="Ochocientos ";break;case 9:lc="Novecientos ";break;}

switch(decenas)

{case 0:ld="";break;case 1:{switch(decom)

{case 0:ld="Diez";break;case 1:ld="Once";break;case 2:ld="Doce";break;case 3:ld="Trece";break;case 4:ld="Catorce";break;case 5:ld="Quince";break;case 6:ld="Dieciseis";break;case 7:ld="Diecisiete";break;case 8:ld="Dieciocho";break;case 9:ld="Diecinueve";break;}}

break;case 2:ld="Veinte";break;case 3:ld="Treinta";break;case 4:ld="Cuarenta";break;case 5:ld="Cincuenta";break;case 6:ld="Sesenta";break;case 7:ld="Setenta";break;case 8:ld="Ochenta";break;case 9:ld="Noventa";break;}

switch(decom)

{case 0:lu="";break;case 1:lu="Uno";break;case 2:lu="Dos";break;case 3:lu="Tres";break;case 4:lu="Cuatro";break;case 5:lu="Cinco";break;case 6:lu="Seis";break;case 7:lu="Siete";break;case 8:lu="Ocho";break;case 9:lu="Nueve";break;}

if(decenas==1)

{return lc+ld;}

if(decenas==0||decom==0)

{return lc+" "+ld+lu;}

else

{if(decenas==2)

{ld="Veinti";return lc+ld+lu.toLowerCase();}

else

{return lc+ld+" y "+lu}}}

function getNumberLiteral(n)

{var m0,cm,dm,um,cmi,dmi,umi,ce,de,un,hlp,decimal;if(isNaN(n)){return'-';}

m0=parseInt(n/1000000000000);rm0=n%1000000000000;m1=parseInt(rm0/100000000000);rm1=rm0%100000000000;m2=parseInt(rm1/10000000000);rm2=rm1%10000000000;m3=parseInt(rm2/1000000000);rm3=rm2%1000000000;cm=parseInt(rm3/100000000);r1=rm3%100000000;dm=parseInt(r1/10000000);r2=r1%10000000;um=parseInt(r2/1000000);r3=r2%1000000;cmi=parseInt(r3/100000);r4=r3%100000;dmi=parseInt(r4/10000);r5=r4%10000;umi=parseInt(r5/1000);r6=r5%1000;ce=parseInt(r6/100);r7=r6%100;de=parseInt(r7/10);r8=r7%10;un=parseInt(r8/1);if(n<1000000000000&&n>=1000000000)

{tmp=n.toString();s=tmp.length;tmp1=tmp.slice(0,s-9)

tmp2=tmp.slice(s-9,s);tmpn1=getNumberLiteral(tmp1);tmpn2=getNumberLiteral(tmp2);if(tmpn1.indexOf("Un")>=0)

pred=" Bill\u00f3n "

else

pred=" Billones "

return tmpn1+pred+tmpn2;}

if(n<10000000000&&n>=1000000)

{mldata=letras(cm,dm,um);hlp=mldata.replace("Un","*");if(hlp.indexOf("*")<0||hlp.indexOf("*")>3)

{mldata=mldata.replace("Uno","un");mldata+=" Millones ";}

else

{mldata="Un Mill\u00f3n";}

mdata=letras(cmi,dmi,umi);cdata=letras(ce,de,un);if(mdata!="     ")

{if(n==1000000){mdata=mdata.replace("Uno","un");}else{mdata=mdata.replace("Uno","un");if(cmi+dmi+umi!=0){mdata=mdata+" mil ";}}}

return(mldata+mdata+cdata);}

if(n<1000000&&n>=1000)

{mdata=letras(cmi,dmi,umi);cdata=letras(ce,de,un);hlp=mdata.replace("Un","*");if(hlp.indexOf("*")<0||hlp.indexOf("*")>3)

{mdata=mdata.replace("Uno","un");return(mdata+" mil "+cdata);}

else

return("Mil "+cdata);}

if(n<1000&&n>=1)

{return(letras(ce,de,un));}

if(n==0)

{return" Cero";}

return"No disponible"};function toSpanish(numero)

{if(numero>=1e9)return'-';var tmp=getNumberLiteral(numero);return tmp.toLowerCase();}

function toSwedish(number){if(number>1e71)return'-';var einsArray=new Array("","ett","tv\u00e5","tre","fyra","fem","sex","sju","\u00e5tta","nio");var zehnArray=new Array("tio","elva","tolv","tretton","fjorton","femton","sexton","sjutton","arton","nitton");var zigArray=new Array("","","tjugo","trettio","fyrtio","femtio","sextio","sjuttio","\u00e5ttio","nittio");var spec_unitpref=new Array("m","b","tr","quadr","quint","sext","sept","okt","non");var unitpref=new Array("un","duo","tre","quattuor","quin","sex","septen","okto","novem");var tenpref=new Array("Dez","Vigint","Trigint","Quadragint","Quinquagint","Sexagint","Septuagint","Oktogint","Nonagint");var hundredpref=new Array("Zen","Duzen","Trezen","Quadringen","Quingen","Sescen","Septingen","Oktingen","Nongen");var bigsArray=new Array();var index=0;var len=spec_unitpref.length;for(var i=0;i<len;i++){bigsArray[index++]=spec_unitpref[i]+"iljon";bigsArray[index++]=spec_unitpref[i]+"iljard";}

len=tenpref.length;var len2=unitpref.length;for(i=0;i<len;i++){bigsArray[index++]=tenpref[i]+"illion";bigsArray[index++]=tenpref[i]+"illiard";for(var j=0;j<len2;j++){bigsArray[index++]=unitpref[j]+tenpref[i].toLowerCase()+"illion";bigsArray[index++]=unitpref[j]+tenpref[i].toLowerCase()+"illiard";}}

bigsArray[index]=hundredpref[0]+"tillion";maxNumLength=bigsArray.length*3+6;var numstr=String(number);numstr=numstr.replace(/\s+/g,"");var msg="";if(numstr.charAt(0)=='-'){msg+="minus ";numstr=numstr.substring(1);}else if(numstr.charAt(0)=='+'){numstr=numstr.substring(1);}

var len=numstr.length;for(var i=0;i<len;i++){if(numstr.charAt(i)!='0'){numstr=numstr.substring(i);break;}}

if(!isValidNatNumber(numstr)){return"-";}else if(Number(numstr)==0){return"noll";}else if(numstr.length>maxNumLength){var diff=numstr.length-maxNumLength;return"Support of only "+maxNumLength+" digits. There "+

(diff==1?"is one":"are "+diff)+" more!";}

numstr="0"+numstr;len=numstr.length;var h1="numstr.charAt(len-pos)";var h2="numstr.charAt(len-pos+1)";var h3="Number(numstr.substring(len-pos-2, len-pos+1))";var singEnd,bigsIndex;for(var pos=len;pos>0;pos--){switch(pos%3){case 0:if(eval(h1)=="0"){}else if(eval(h1)=="1"){msg+="etthundra";}else{msg+=einsArray[eval(h1)]+"hundra";}

break;case 2:if(eval(h1)=="0"){msg+=einsArray[eval(h2)];}else if(eval(h1)=="1"){msg+=zehnArray[eval(h2)];}else if(eval(h2)=="0"){msg+=zigArray[eval(h1)];}else{msg+=zigArray[eval(h1)]+einsArray[eval(h2)];}

break;case 1:switch(pos){default:bigsIndex=(pos-7)/3;singEnd=" ";if(eval(h3)==1){msg=msg.replace('ett','en');msg+=" "+bigsArray[bigsIndex]+singEnd;}else if(eval(h3)!=0){msg+=" "+bigsArray[bigsIndex]+"er ";}

break;case 4:if(eval(h3)!=0){msg+="tusen ";}

break;case 1:break;}

break;}}

msg=msg.replace('ttt','tt');return msg;}

function toFrench(ValNum){var i;var nPosition;var ValNb;var LesZeros;var strResultat;var strTemp;var tmpBuff;var Unites=new Array('zero','un','deux','trois','quatre','cinq','six','sept','huit','neuf');var Dixaines=new Array('dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf');var LesDixaines=new Array('','dix','vingt','trente','quarante','cinquante','soixante','soixante-dix','quatre-vingt','quatre-vingt-dix');var Milliers=new Array('','mille','million','millard','mille');for(var i=ValNum.length;i>=1;i--){}}

function isValidNatNumber(number){if(!isNaN(number)){var str=String(number);var first=str.charAt(0);var hasNoPoint=str.indexOf('.')==-1;if(first!='+'&&first!='-'&&hasNoPoint)

return true;}

return false;}

function populate(){var hex=new Array();hex[1]="0";hex[2]="1";hex[3]="2";hex[4]="3";hex[5]="4";hex[6]="5";hex[7]="6";hex[8]="7";hex[9]="8";hex[10]="9";hex[11]="A";hex[12]="B";hex[13]="C";hex[14]="D";hex[15]="E";hex[16]="F";hex[17]="G";hex[18]="H";hex[19]="I";hex[20]="J";hex[21]="K";hex[22]="L";hex[23]="M";hex[24]="N";hex[25]="O";hex[26]="P";hex[27]="Q";hex[28]="R";hex[29]="S";hex[30]="T";hex[31]="U";hex[32]="V";hex[33]="W";hex[34]="X";hex[35]="Y";hex[36]="Z";return hex;}

function transpose(s){N=s.length;var t="";for(i=0;i<N;i++){t=t+s.substring(N-i-1,N-i);}

s=t;return s;}

function toDecimal(x,base){if(base=='R'){return fromRoman(x);}

if(base==10||base=='A')return x;if(10+parseFloat(base)-parseFloat(base)==10){return parseInt(x,base);}else{return 0;}}

function fromDecimal(x,base){if(x<0||x=='')return'-';if(base=='C')return toChinese(x);if(base=='R')return toRoman(x);if(base=='A')base=10;if(base=='24')return toBase24(x);if(base=="en")return toEnglish(x);if(base=="de")return toGerman(x);if(base=='es')return toSpanish(x);if(base=='sv')return toSwedish(x);var s="";var a=parseFloat(x);var b;var hex=populate();base=parseFloat(base);while(a>=base){b=a%base;a=Math.floor(a/base);s+=hex[b+1];}

s+=hex[a+1];if(s=='undefined')return'-';else return transpose(s);}

function convertNumerals(amount,from,to,div,include_short,decimals){var split_array=from.split("|");var from_constant_str=split_array[0];var from_decimal;var from_unit=split_array[2];var split_array=to.split("|");var to_constant_str=split_array[0];var to_value;var to_unit=split_array[2];from_decimal=toDecimal(amount,from_constant_str);var new_str=fromDecimal(from_decimal,to_constant_str);to_value='<b>'+to_value+'</b>';if(!div){div=replaceAll(to_unit,' ','-');div=replaceAll(div,'/','-');div='value_'+div;}

else new_str="<b>"+new_str+"</b>";setInnerHTML(div,new_str);}

function showDiv(div){document.getElementById(div).style.display='block';}

function hideDiv(div){document.getElementById(div).style.display='none';}

function cityClick(str,from){showHideClock3(true,from);changeUTC(str,true,true,true,true,true,true,from);return false;}

function changeUTC(str,boolMap,boolClock,boolCityDrop,boolZoneDrop,boolUTCDrop,boolCities,from){var split_array=str.split("|");var utc=split_array[0];var city=split_array[1];var dst=split_array[2];var found=false;if(boolMap&&from==1){var flashMap;if(navigator.appName.indexOf("Microsoft")!=-1){flashMap=window.flashObject;}else{flashMap=window.document.flashObject;}

flashMap.goFlash(utc);}

if(boolClock){if(dst!=''){var flashClock;if(navigator.appName.indexOf("Microsoft")!=-1){switch(from){case 3:case 4:flashClock=window.flashObject3;break;default:flashClock=window.flashObject2;break;}}else{switch(from){case 3:case 4:flashClock=window.document.flashObject3;break;default:flashClock=window.document.flashObject2;break;}}

if(from==1){setInnerHTML('city',city);}

else if(from!=4&&from!=5){document.getElementById('cityfield'+from).value=city;}

flashClock.goFlash(utc,dst);}}

if(boolUTCDrop&&from==1){SelectObject=document.getElementById('byutc');found=false;for(index=0;index<SelectObject.length;index++){if(SelectObject[index].value==utc){SelectObject.selectedIndex=index;found=true;}}

if(!found)SelectObject.selectedIndex=0;}

if(boolCities&&from==1){for(index=0;index<cityDiv.length;index++){if(cityDiv[index]==utc)showDiv('cities'+index);else hideDiv('cities'+index);}}}

function cityChange(text,from,idStr,isExtended){if(text.value.length==0){moveIt('citylist',1,1,1,'');showHideClock3(true,from);}else{var bgr=Array('#FFF4B8','#FFD600');var j=0;var displayed=0;var h=0;var h_row=14;var searchStr;var matchStr=stripAccents(text.value.toLowerCase());var displayStr='<ul>';var extra='show';var a_end='</a>';var a_start;for(var i=0;i<city.length;i++){if(city[i]!=null){searchStr=stripAccents(city[i][0].toLowerCase());if(searchStr.match(matchStr)!=null){if(displayed++==20)extra=extra+', scroll';if(displayed<20)h+=h_row;a_start='<a href="/www/convertworld/en/time_zone/'+escape(city[i][0])+'.html" onclick=\"moveIt(\'citylist\', 1, 1, 1, \'\'); return cityClick(\''+city[i][1]+'|'+city[i][0].replace('\'','\\\'')+'|'+city[i][2]+'\','+from+');\">';displayStr=displayStr+'<div class="unit_'+(displayed%2?'even':'odd')+'_color">'+a_start+city[i][0]+a_end+'</div>\n';}}}

if(displayed==0){displayStr=displayStr+'<div style="float: left; width: 100%; white-space: nowrap; padding-left: 10px" class="unit_'+(displayed%2?'even':'odd')+'_color">&nbsp;</div>\n';h=h_row;}

displayStr=displayStr+'</ul>';setInnerHTML('citylist',displayStr);var pos=$('input#'+idStr).offset();if(isExtended){moveIt('citylist',pos.top-92,pos.left-160,h,extra);}else{if(t)moveIt('citylist',pos.top-114,12,h,extra);else moveIt('citylist',pos.top+20,pos.left,h,extra);}

showHideClock3(false,from);}}

function setInnerHTML(id,str){if(document.getElementById)document.getElementById(id).innerHTML=str;}

function findPos(obj){var curleft=curtop=0;if(obj.offsetParent){curleft=obj.offsetLeft

curtop=obj.offsetTop

while(obj=obj.offsetParent){curleft+=obj.offsetLeft

curtop+=obj.offsetTop}}

return[curleft,curtop];}

function moveIt(id,mvTop,mvLeft,h,dowhat){e=document.getElementById(id);e.style.top=mvTop+'px';e.style.left=mvLeft+'px';if(h>0){e.style.height=h+'px';}

if(dowhat.match('show')!=null)e.style.display='block';else e.style.display='none';if(dowhat.match('scroll')!=null)e.style.overflow='scroll';else e.style.overflow='hidden';}

function stripAccents(str){var s=str;var rExps=[/[\xC0-\xC2]/g,/[\xE0-\xE2]/g,/[\xC8-\xCA]/g,/[\xE8-\xEB]/g,/[\xCC-\xCE]/g,/[\xEC-\xEE]/g,/[\xD2-\xD4]/g,/[\xF2-\xF4]/g,/[\xD9-\xDB]/g,/[\xF9-\xFB]/g];var repChar=['A','a','E','e','I','i','O','o','U','u'];for(var i=0;i<rExps.length;i++)

s=s.replace(rExps[i],repChar[i]);return s;}

function showHideClock3(show,from){if(from==1)return;e=document.getElementById('flashObject3');if(show){e.width="150px";e.height="44px";}else if(!show&&from==2){e.width="1px";e.height="1px";}}

window.onload=externalLinks;function formatDate(date,type){var y,m,d;y=date.substring(0,4);m=date.substring(4,6);d=date.substring(6,8);switch(type){case 1:if(d.charAt(0)=='0')d=d.charAt(1);if(m.charAt(0)=='0')m=m.charAt(1);return d+'/'+m;case 2:return y+'-'+m+'-'+d;default:return date;}}

function converterChange(converter){var from=document.forms['conv_'+converter].unit_from.selectedIndex;var to=document.forms['conv_'+converter].unit_to.selectedIndex;document.forms['conv_'+converter].unit_from.selectedIndex=to;document.forms['conv_'+converter].unit_to.selectedIndex=from;}

$(document).ready(function(){$('.tabs a').click(function(){return true;var r=false;var c;var o=$(this);$('#content').hide();$('div#loading').show();$.ajax({type:'POST',url:$(this).attr('href'),data:'ajax=1',async:true,success:function(d){c=d;r=false;$('div#header .tabs a').height(23);o.height(24);$('#header .search :input:visible:enabled:first').focus();if(document.getElementById)document.getElementById('uri').value='http://'+h+o.attr('href');if(o.attr('href')==l){$('#menu img.plus').fadeIn(500);}else{$('#menu img.plus').fadeOut(500);}

$('#content').html(c);$('div#loading').hide();$('#content').show();},error:function(XMLHttpRequest,textStatus,errorThrown){r=true;}});return r;});$('div#menu li').hover(function(){$(this).addClass('hilite');},function(){$(this).removeClass('hilite');});$('div.login a#in').click(function(){if($('#jq_login').is(':visible')){$('#jq_login').fadeOut(500);$('div.register').fadeIn(500);}else{$('div.register').fadeOut(500);$('#jq_login').fadeIn(500);}

return false;});});function addMini(c){var a=$('.groupItem').get();for(var i=0;i<$('.groupItem').length;i++){e=$(a[i]).attr('id');if(e==c){$('#content #'+c).fadeOut(300);$('#content #'+c).fadeIn(300);return;}}

var m=$('#sort1');if(m.children('.groupItem').length>$('#sort2').children('.groupItem').length)m=$('#sort2');if(m.children('.groupItem').length>$('#sort3').children('.groupItem').length)m=$('#sort3');m.prepend('<div id="'+c+'" class="groupItem"><div class="dotted"><img src="'+p+'/static/images/loading.gif" alt="Loading..." style="margin: 102px 0 0 81px" /></div></div>');minisUpdated();loadIt(c,m,true,'on');}

function loadIt(c,m,dots,dyn){$.ajax({type:'GET',url:p+'/ajax/mini.php',data:'c='+c+'&l='+la+'&dyn='+dyn,async:true,success:function(d){if(dots){m.children('#'+c).html('<div class="dotted">'+d+'</div>');}else{m.children('#'+c).html(d);}

animateMinis();}});}

function setInnerHTML(id,str){if(!document.getElementById)return;document.getElementById(id).innerHTML=str;}

function menuArrow(slider,button){if(!document.getElementById)return;if($(slider).is(':visible')){document.getElementById(button).src=aR.src;}else{document.getElementById(button).src=aD.src;}}

function menuToggle(slider,button){$(slider).slideToggle(200,menuArrow(slider,button));}

function debug(txt){$('#debug').append(txt+'<br />');}

function savePos(c1,c2,c3){$.ajax({type:'GET',url:p+'/ajax/settings.php',data:'c1='+c1+'&c2='+c2+'&c3='+c3,async:true,success:function(d){debug(d);}});}

var tim=new Date().getTime();var ti;function minisUpdated(){if((new Date().getTime())<(tim+200))return;tim=new Date().getTime();clearTimeout(ti);ti=setTimeout('savePos(\''+$('#sort1').sortable('toArray')+'\',\''+$('#sort2').sortable('toArray')+'\',\''+$('#sort3').sortable('toArray')+'\')',3000);}

function showPopup(c){window.open(p+'/converters/popup.php?l='+la+'&c='+c+'&t='+t,c,"status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=250,width=200");}

function animateMinis(){var els=['#sort1','#sort2','#sort3'];var $els=$(els.toString());$els.sortable('refresh');$els.sortable('disable');$('div#content .groupItem').hover(function(){$(this).children('div').children('div').children('.tools').children('div').fadeIn(100);},function(){$(this).children('div').children('div').children('.tools').children('div').fadeOut(100);});$('div#content .groupItem .move').hover(function(){$els.sortable('enable');},function(){$els.sortable('disable');});$('div#content .groupItem .close').click(function(){var link=$(this),item=link.parents('.groupItem');item.remove();minisUpdated();});$('div#content .groupItem .new').click(function(){var link=$(this),item=link.parents('.groupItem');showPopup(item.attr('id'));});}

function addfav(url,title,msgNetsc){if(window.sidebar){window.sidebar.addPanel(title,url,"");}else if(window.opera&&window.print){var elem=document.createElement('a');elem.setAttribute('href',url);elem.setAttribute('title',title);elem.setAttribute('rel','sidebar');elem.click();}else if(navigator.appName=="Netscape"){alert(msgNetsc);}else if(document.all){window.external.AddFavorite(url,title);}}

