function generateUUID(){var a=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=(a+16*Math.random())%16|0;return a=Math.floor(a/16),("x"==b?c:3&c|8).toString(16)})}var toolbarDebug=!1,marketList={ali:"ali",jd:"jd"},SETTINGS={sync:{locale:null,uuid:null,token:null},local:{options:{tracking_sites:{"aliexpress.com":{name:"AliExpress.com",track_allowed:!0},"ebay.com":{name:"eBay.com",track_allowed:!0},"jd.com":{name:"JD.com",track_allowed:!0},"litemf.com":{name:"LiteMF.com",track_allowed:!0},"shopotam.ru":{name:"ShopoTam.ru",track_allowed:!0},"gearbest.com":{name:"GearBest.com",track_allowed:!0},"amazon.com":{name:"Amazon.com",track_allowed:!0}},collect_statistics_allowed:!0,show_context_menu:!0,cashback_widget_closed:null,add_trackings_to_profile_allowed:!0},orders:{},stores:{},items:{},userinfo:{id:null,username:null,unread_count:null,tracking_count:null,archive_tracking_count:null},hlTrackingSites:null}},GdeposylkaState={init:function(){this.allowedLocale=["ru","en"],this.locale="ru",GdeposylkaState.transfer(function(){GdeposylkaState.get(function(a,b){GdeposylkaState.locale=a,GdeposylkaState.token=b})})},transfer:function(a){chrome.storage.local.get({locale:null,uuid:null,token:null},function(b){b.uuid||b.token?a():chrome.storage.sync.get({locale:null,uuid:null,token:null},function(b){chrome.storage.local.set({locale:b.locale,uuid:b.uuid,token:b.token},a)})})},get:function(a){chrome.storage.local.get({locale:null,uuid:null,token:null},function(b){var c=b.locale,d=b.token,e=b.uuid,f=!1;c&&d||(c=chrome.i18n.getUILanguage(),f=!0),-1==GdeposylkaState.allowedLocale.indexOf(c)&&(c="en",f=!0),e||(e=generateUUID(),chrome.storage.local.set({uuid:e})),GdeposylkaState.locale=c,GdeposylkaState.token=d,f&&GdeposylkaState.setLocale(c),toolbarDebug&&console.log("User UUID: "+e),a(c,d,e)})},setLocale:function(a){a||(a=chrome.i18n.getUILanguage()),-1==GdeposylkaState.allowedLocale.indexOf(a)&&(a="en"),this.locale=a,chrome.storage.local.set({locale:a}),toolbarDebug&&console.log("Locale: "+a)},setToken:function(a){a?(this.token=a,chrome.storage.local.set({token:a})):(this.token=null,chrome.storage.local.set({token:null}),this.setLocale(null))},getLocaleSync:function(){return this.locale},getTokenSync:function(){return this.token},getHost:function(a){return"en"==a?"https://packageradar.com":"https://gdeposylka.ru"}};GdeposylkaState.init();var chromeVersion=/Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];