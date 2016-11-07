(function(){
    var detailedModel = angular.module('detailedModel',['serviceModel']);
    detailedModel.controller('DetailedController',['$scope','jsonpService','$routeParams',
    function($scope,jsonpService,$routeParams){
        $scope.id = 19944106;
        jsonpService.jsonp('https://api.douban.com/v2/movie/subject/'+$routeParams.page,{},function (res) {
            $scope.movie = res;
            //$scope.movieName = res.title;
          //  console.log(res);
            $scope.$apply();//重新加载
        })
       // alert(1);
    }]);

})();