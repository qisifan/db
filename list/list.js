(function() {

    /**
     * hotModule Module
     *
     * Description
     */

    var listModule = angular.module('doubanApp.listModule', ['serviceModel']);
    function fun(res) {
        console.log(res);
    }
    window.fun = fun;
    listModule.controller('ListController', ['$scope', '$http','jsonpService','$route','$routeParams','$rootScope',
        function($scope, $http,jsonpService,$route,$routeParams,$rootScope) {
        $scope.count = 5;
        $scope.currentPage = parseInt($routeParams.page || 1);
        $scope.start  = ($scope.currentPage-1) * 5;
        $rootScope.category = $routeParams.category;
        //console.log($routeParams.category);
        jsonpService.jsonp("https://api.douban.com/v2/movie/"+$routeParams.category,{count:$scope.count,start:$scope.start,q:$routeParams.q},function (rel)
            {
                $scope.subjects = rel.subjects;//获得电影数组
                $scope.title = rel.title; //获得标题
                $scope.total = rel.total; //获得总电影条数
                $scope.totalPage = Math.ceil($scope.total / $scope.count);//获得总页数;
               // console.log( $scope.subjects);
                $scope.pageInformation = {total:$scope.totalPage,current:$scope.currentPage,show:7};
                $scope.$apply();//重新加载
                $scope.hundlePage = function (pageNumber) {
                    var page = Math.min(Math.max(pageNumber,1),$scope.totalPage);
                    $route.updateParams({page:page});
                }
            });
        //$rootScope.serach = function(){

        //    };

        //else{
        //    jsonpService.jsonp("https://api.douban.com/v2/movie/"+$routeParams.category+'/'+$routeParams.page,{}, function (res) {
        //        console.log(res);
        //    })
        //}
            //跨域请求
        // $http.jsonp('https://api.douban.com/v2/movie/in_theaters?count=5&&callback=fun')
    }]);

})()
	// 此种方式污染了全局环境
    // function fun(data) {
    // 	console.log(data)
    // }

