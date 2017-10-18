angular.module('routerApp', ['ui.router']);.controller('listController', ['$scope', '$http', '$state', '$location', function($scope, $http, $state, $location) {
    $http.get('/api/playlist').success(function(data){
      $scope.thisAlbum = $state.params.id;
      $scope.albums = data;
    });
}]);