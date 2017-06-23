function analyzeAliStore(a){chrome.storage.local.get({stores:{}},function(b){var c=marketList.ali;if(b.stores[c]||(b.stores[c]={}),void 0!==b.stores[c][a]&&void 0!==b.stores[c][a].updatedAt){var d=b.stores[c][a].updatedAt,e=Math.round((new Date-d)%864e5%36e5/6e4);if(25e4>e)return void(toolbarDebug&&console.log("Store collected"))}var f="https://ru.aliexpress.com/store/contactinfo/"+a+".html";toolbarDebug&&console.log("Store contact start loading: "+f),$.ajax(f).done(function(b){toolbarDebug&&console.log("Store contact info loaded"),analyzeAliStoreHtml(b,a)})})}function analyzeAliStoreHtml(a,b){var c,d,e,f,g;if(!b){var h=a.match(/storeId:\s+'(\d+)',/);if(!h||void 0===h[1])return toolbarDebug&&console.log("Store id not found"),null;b=h[1]}if(h=a.match(/productEvaluation\.htm\?productId=(\d+)\&ownerMemberId=(\d+)&companyId=(\d+)/),h&&void 0!==h[2]&&void 0!==h[3])d=h[3],c=h[2];else{if(h=a.match(/companyId:\s+'(\d+)',/),!h||void 0===h[1])return toolbarDebug&&console.log("Company id not found"),null;if(d=h[1],h=a.match(/ownerMemberId:\s+'(\d+)',/),!h||void 0===h[1])return toolbarDebug&&console.log("ownerMemberId not found"),null;c=h[1]}var i=$(a);if(!i.find("a.shop-name").length)return toolbarDebug&&console.log("storeName not found"),null;if(e=$.trim(i.find("a.shop-name").html().replace(/<(?:.|\n)*?>/gm,"")),!i.find("span.store-time>em").length)return toolbarDebug&&console.log("Store create time not found"),null;var j=$.trim(i.find("span.store-time>em").html().replace(/<(?:.|\n)*?>/gm,""));return f=new Date(j),i.find(".store-location").length?(g=$.trim(i.find(".store-location").text()),g=$.trim(i.find(".store-location").text()),void parseAliStoreRating(c,d,function(a){var h={storeId:b,storeCompanyId:d,storeOwnerMemberId:c,storeName:e,location:g,workSince:f,sellerRating:a};toolbarDebug&&console.log(h),GdePosylkaExt.saveStore(b,h,marketList.ali)})):(toolbarDebug&&console.log("Store location not found"),null)}function parseAliStoreRating(a,b,c){var d="https://feedback.aliexpress.com/display/evaluationDetail.htm?ownerMemberId="+a+"&companyId="+b+"&memberType=seller&callType=iframe";$.ajax(d).done(function(a){toolbarDebug&&console.log("Feedback page loaded: "+d);var b=$(a).find("table.summary-tb tr").first();if(!b||void 0===b)return null;var e={};if(e.positiveFeedbackPercent=$.trim($("td>span",b.next()).html().replace(/[^\d\.]+/g,"")),e.feedbackScore=$.trim($("td>span",b.next().next()).html().replace(/[^\d]+/g,"")),e.feedbackScoreImage=$("span.l-img>img",b.next().next()).attr("src"),!$(a).find(".feedback-dsr table tr").length)return toolbarDebug&&console.log("Rating data not found"),void c(e);var f=$(a).find(".feedback-dsr table tr").first();e.detailRating={},e.detailRating.itemAsDescribed=$.trim($("td>span.dsr-text>em",f).html()),e.detailRating.itemAsDescribedRatings=$.trim($("td>span.dsr-text>span",f).html().replace(/[^\d]+/g,"")),e.detailRating.itemAsDescribedCompareHighPercent=$.trim($("td>div.compare-info>em",f).html().replace(/[^\d\.]+/g,"")),e.detailRating.communication=$.trim($("td>span.dsr-text>em",f.next()).html()),e.detailRating.communicationRatings=$.trim($("td>span.dsr-text>span",f.next()).html().replace(/[^\d]+/g,"")),e.detailRating.communicationCompareHighPercent=$.trim($("td>div.compare-info>em",f.next()).html().replace(/[^\d\.]+/g,"")),e.detailRating.shippingSpeed=$.trim($("td>span.dsr-text>em",f.next().next()).html()),e.detailRating.shippingSpeedRatings=$.trim($("td>span.dsr-text>span",f.next().next()).html().replace(/[^\d]+/g,"")),e.detailRating.shippingSpeedCompareHighPercent=$.trim($("td>div.compare-info>em",f.next().next()).html().replace(/[^\d\.]+/g,"")),e.feedbackHistory={month:{},quarter:{},halfYear:{},year:{},overall:{}};var g=$(a).find(".history-tb tr").first().next();e.feedbackHistory.month.positive=getIntFromHml($("td",g).html()),e.feedbackHistory.quarter.positive=getIntFromHml($("td",g).next().html()),e.feedbackHistory.halfYear.positive=getIntFromHml($("td",g).next().next().html()),e.feedbackHistory.year.positive=getIntFromHml($("td",g).next().next().next().html()),e.feedbackHistory.overall.positive=getIntFromHml($("td",g).next().next().next().next().html()),g=g.next(),e.feedbackHistory.month.neutral=getIntFromHml($("td",g).html()),e.feedbackHistory.quarter.neutral=getIntFromHml($("td",g).next().html()),e.feedbackHistory.halfYear.neutral=getIntFromHml($("td",g).next().next().html()),e.feedbackHistory.year.neutral=getIntFromHml($("td",g).next().next().next().html()),e.feedbackHistory.overall.neutral=getIntFromHml($("td",g).next().next().next().next().html()),g=g.next(),e.feedbackHistory.month.negative=getIntFromHml($("td",g).html()),e.feedbackHistory.quarter.negative=getIntFromHml($("td",g).next().html()),e.feedbackHistory.halfYear.negative=getIntFromHml($("td",g).next().next().html()),e.feedbackHistory.year.negative=getIntFromHml($("td",g).next().next().next().html()),e.feedbackHistory.overall.negative=getIntFromHml($("td",g).next().next().next().next().html()),g=g.next(),e.feedbackHistory.month.positiveFeedbackRate=getFloatFromHtml($("td",g).html()),e.feedbackHistory.quarter.positiveFeedbackRate=getFloatFromHtml($("td",g).next().html()),e.feedbackHistory.halfYear.positiveFeedbackRate=getFloatFromHtml($("td",g).next().next().html()),e.feedbackHistory.year.positiveFeedbackRate=getFloatFromHtml($("td",g).next().next().next().html()),e.feedbackHistory.overall.positiveFeedbackRate=getFloatFromHtml($("td",g).next().next().next().next().html()),c(e)})}