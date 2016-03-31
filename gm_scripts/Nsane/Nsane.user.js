// ==UserScript==
// @name         Nsaneforum
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.nsaneforums.com/forum/48-software-updates/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js 
// @grant        GM_openInTab
// @grant        GM_addStyle
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...


$("body")  .append (  '<div id="GM_StartStopBtn" class="GM_ControlWrap">'
                    + '<button>Start checking for new links.</button></div>'
            )
           .append (  '<div id="GM_ClearVisitListBtn" class="GM_ControlWrap">'
                    + '<button>Clear the list of visited links.</button></div>'
            );
$('div.GM_ControlWrap').hover (
    function () { $(this).stop (true, false).fadeTo ( 50, 1); },
    function () { $(this).stop (true, false).fadeTo (900, 0.8); }// Coordinate with CSS.
);

/*实现1======================================================
* 集合中的每个元素都会附加一个定时器，定时器们触发对应的操作。
* 如果5000*k写成5000，那么所有的定时器都设定为5秒触发，因此，
* 结果好像是所有的元素都在同一时间触发操作，而不是按给定的时
* 间间隔依次操作。因此，需要对每个元素的定时器进行时间间隔配
* 置5000*k。
* ===========================================================

var openlinks = function(){
   $(selectorStr).each(function(k,v){
    
       var str = this.innerText;
       var current = this;
       if (str !== " "){
           setTimeout(function(){
                          console.log(current.nextElementSibling.firstElementChild.firstElementChild.href);
                      },5000*k);
           //GM_openInTab(this.href);
       };
   });
};
end of  实现1*/


// 实现2======================================================
// 集合中的每个元素都会附加一个定时器，定时器们触发对应的操作。
// 如果5000*k写成5000，那么所有的定时器都设定为5秒触发，因此，
// 结果好像是所有的元素都在同一时间触发操作，而不是按给定的时
// 间间隔依次操作。因此，需要对每个元素的定时器进行时间间隔配
// 置5000*k。
// ===========================================================

var index = 0;
//var selectorStr     = 'div.ipsDataItem_icon.ipsPos_top';
var elements =  $('div.ipsDataItem_icon.ipsPos_top');
var length = elements.length;
var LinksList = [];

function FilterArticles(currentArticle){
  
   for (var J = filterList.length - 1;  J >= 0;  --J) {
              
       var itemName = filterList[J];
              
       if (currentArticle.innerText.search(itemName) !== -1) {
                 return true;
       }
  }
  
  return false;
};
   
function openLinks() {
         
        var currentIndex = elements.get(index);
     
        if (currentIndex.innerText !== " "){
            
            var currentMain = currentIndex.nextElementSibling;
            
           if (!FilterArticles(currentMain.childNodes[1].querySelector("a:first-of-type"))){
              
               if (currentMain.childNodes[3].nodeName === "DIV") {  // check if paged, if equal then the article is not paged.
                   if (currentMain.childNodes[1].querySelector("a:first-of-type").href.search("tags") !== -1) { //check if with tag
                       //console.log(currentMain.childNodes[1].childNodes[3].href);  // with tag
                       LinksList.push(currentMain.childNodes[1].childNodes[3].href);  // with tag
                   } else { 
                       //console.log(currentMain.childNodes[1].querySelector("a:first-of-type").href); // without tag
                       LinksList.push(currentMain.childNodes[1].querySelector("a:first-of-type").href); // without tag
                   }
               } else {// check if paged, if not equal then the article is paged.
                
                   if (currentMain.firstElementChild.querySelector("a:first-of-type").href.search("tag") !== -1) { //check if with tag
                       //console.log(currentMain.querySelector("ul li:last-of-type a").href);  // with tag
                       LinksList.push(currentMain.querySelector("ul li:last-of-type a").href);  // with tag
                   } else { 
                       //console.log(currentMain.querySelector("ul li:last-of-type a").href); // without tag
                       LinksList.push(currentMain.querySelector("ul li:last-of-type a").href); // without tag
                   }
              }
           }
        }
        
        index++;
        
        if (index<length){
            openLinks();
        } else {
         
          for (var J = 0 ;  J < LinksList.length;  ++J) {
       
               (function(){
                   var index = J;
                   setTimeout(function(){
                       //console.log("# ",index," === ",LinksList[index]);
                       GM_openInTab(LinksList[index]);
                   },5000*index);
               })();
          }
            
          
        }
};


var filterList =["Advanced Renamer","Advanced SystemCare Ultimate","AdwCleaner","AirDroid","AnyDesk","Avira System Speedup",
                 "Baidu Spark Browser","Bandizip",
                 "Calendarscope","Cent Browser","Chromodo","Classic Shell","Comodo Cloud Antivirus","ComboFix",
                 "Directory Opus","DLL Analyzer","DriverPack Solution Online","DUMo","DVDFab Passkey","DVDVideoSoft Free Studio",
                 "eBook Converter Bundle","Emurasoft EmEditor Professional","Foxit PhantomPDF Business","GetFLV Pro","IP Filter Downloader",
                 "Glarysoft Malware Hunter","HitmanPro.Alert",
                 "Intel Solid State Drive","IObit Advanced System Care Pro","IObit Driver Booster Pro",
                 "JRiver Media Center",
                 "madVR","Malwarebytes Anti-Ransomware","Maxthon Browser","MKVToolnix",
                 "Norton 2015","PassMark BurnInTest Professional",
                 "oCam Screen Recorder",
                 "PC Diagnostic Suite","PhotoInstrument","PowerArchiver",
                 "ReviverSoft PC Reviver","RogueKiller",
                 "SlySoft AnyDVD HD","Snappy Driver Installer","Spotify","Steganos Privacy Suite","SUMo","SweetScape 010 Editor","Syncovery","System Restore Point Creator",
                 "Tencent PC Manager","Tweaking.com - Windows Repair","Universal Maps Downloader","VueScan Pro",
                 "WebcamMax","WinUtilities Professional Edition","Wise Care 365","Wise Disk Cleaner","Wise Game Booster","Wise Registry Cleaner","Wise System Monitor",
                 "Yandex Browser","YoWindow",
                 "Xilisoft iPod Rip","XMedia Recode"];

$("#GM_StartStopBtn").click(openLinks);

//var selectorStr     = 'h4.ipsDataItem_title.ipsType_break>a:first-of-type';


GM_addStyle ( "                                                             \
    .GM_ControlWrap {                                                       \
        opacity:            0.8;    /*Coordinate with hover func. */        \
        background:         pink;                                           \
        position:           fixed;                                          \
        padding:            0.6ex;                                          \
        z-index:            666666;                                         \
    }                                                                       \
    .GM_ControlWrap button {                                                \
        padding:            0.2ex 0.5ex;                                    \
        border-radius:      1em;                                            \
        box-shadow:         3px 3px 3px gray;                               \
        cursor:             pointer;                                        \
    }                                                                       \
    .GM_ControlWrap button:hover {                                          \
        color:              red;                                            \
    }                                                                       \
    #GM_StartStopBtn {                                                      \
        top:                0;                                              \
        left:               0;                                              \
    }                                                                       \
    #GM_ClearVisitListBtn {                                                 \
        bottom:             0;                                              \
        right:              0;                                              \
    }                                                                       \
" );
