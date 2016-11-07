(function(){
    var directiveModel = angular.module('dirctiveModel',[]);
    directiveModel.directive('serach',['$routeParams','$route','$timeout','$location',
        function($routeParams,$route,$timeout,$location){
            return{
                templateUrl : 'serach.html',
                link : function($scope,Ele,Attr){
                    $scope.serach = function () {
                        if($routeParams.category){
                            $route.updateParams({category:'search',q:$scope.input});
                            $scope.input = '';
                        }else{
                            $location.path('serach');
                            $timeout(function () {
                                $route.updateParams({category:'search',q:$scope.input});
                                $scope.input = '';
                            },0)
                        }
                    }
                }
            };
        }]);
    directiveModel.directive('page',[function(){
        return{
            templateUrl : 'page.html',
            replace : true,
            link : function($scope,Ele,Attr){
                $scope.$watch('pageInformation', function (pages) {
                    if(pages){
                        $scope.array = [];
                        var total = pages.total;
                        var show = pages.show;
                        var current = pages.current;
                        var region = Math.floor(show / 2);
                        var begin = current-region;
                        begin = Math.max(begin,1);
                        var end = begin + show;
                        if (end>total){
                            end = total+1;
                            begin = end-show;
                            begin = Math.max(begin,1);
                        }
                        for (var i = begin; i <end ; i++){
                            $scope.array.push(i);
                        };
                        //console.log($scope.array);
                    }
                })
            }
        };
    }]);
})()