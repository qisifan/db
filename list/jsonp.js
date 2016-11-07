/**
 * Created by Administrator on 2016/9/29.
 */
(function () {
    var serviceModel = angular.module('serviceModel',[]);
    serviceModel.service('jsonpService',['$window',function ($window) {
         this.jsonp=function(url,params,fn) {
            var script = document.createElement('script');
            var parameter = '?';
            for (k in params){
                parameter+=k+'='+params[k]+"&&";
            }
            var funName = 'my_callback'+new Date().getTime();
            window[funName] = function(rel){
                fn(rel);
                document.body.removeChild(script);
            };
            script.src = url+parameter+'callback='+funName;
            document.body.appendChild(script);
            //console.log(script.src);
        }
    }])
})();
// jsonp("https://api.douban.com/v2/movie/in_theaters",{count:5,start:5},function (rel) {
//    console.log(rel);
//});