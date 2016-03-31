// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://stackoverflow.com/questions/29592068/debug-tampermonkey-script
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

var openlinks = function(){
    $(selectorStr).each(function(){
    
   var unfiltered = true;
    
   for (var J = filterList.length - 1;  J >= 0;  --J) {
        var itemName = filterList[J];
        
        
       if (unfiltered){
           if ($(this)[0].text.search(itemName) !== -1) {
               unfiltered = false;
           }
       }
   }
   
    if (unfiltered){
        //console.log($(this)[0].text);
        GM_openInTab(this.href);
    }
                  
                    
});
};

$("#GM_StartStopBtn").click(openlinks);

var selectorStr     = 'a[id^="a_ajax"]';
var filterList =["AIKA","JULIA","KAORI","かすみ果穂","奥田咲","白木優子","北条麻","波多野","北島玲","白石茉莉奈","部合集","浜崎真緒","倉多まお","初美沙希","朝桐光","長澤あずさ","村上涼子","川上ゆう","沖田杏梨","初音みのり","吹石れな","大場ゆ","大槻ひびき","風間ゆ","古川いおり","谷口優香","高清合集","谷原希美","宮間葵","和泉潤","弘前亮子","浣腸","吉川あいみ","結月せいら","吉沢明","江奈るり","江上しほ","京野結衣","葵つかさ","木南日菜","卯水咲流","花澤アン","美咲ゆう","明日花","湊莉久","内山まい","千乃あずみ","青木玲","仁科百華","若菜奈央","辻本杏","上原亜衣","水野朝陽","松岡ちな","澁谷果歩","松岡千菜","双葉ゆきな","上原花恋","三喜本のぞみ","森沢かな","神ユキ","神咲詩織","水城奈緒","桃瀬友梨奈","藤本紫媛","望月加奈","椎名由奈","桜井彩","羽月希","原ちとせ","西川ゆい","小麦色","星美りか","杏美月","香山美桜","西条沙羅","篠田まお","篠田あゆみ","翔田千里","星野ひびき","折原ほのか","系列合集","小向美奈子","小西みか","小早川怜子","有賀ゆあ","有馬美帆","羽田璃子","澤村レ","佐倉絆","佐倉カオリ","竹内紗里奈","佐山愛","塚田詩織"];



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


 