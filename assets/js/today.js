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
var fixd;
var monthNames = [
  "يناير", "فبراير", "مارس",
  "أبريل", "مايو", "يونيو", "يوليو",
  "أغسطس", "سبتمبر", "أكتوبر",
  "نوفمبر", "ديسمبر"
];

var st = srvTime();
var date = new Date(st);
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();

console.log(day, monthNames[monthIndex], year);
document.write(day + ' ' + monthNames[monthIndex] + ' ' + year);