var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {


    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**'
    ]);

    $urlRouterProvider.when("", "/videos/list");
    $urlRouterProvider.when("/", "/videos/list");

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/videos/list");

    $stateProvider
        .state('videos', {
            abstract: true,
            url: '/videos',
            templateUrl: 'head.html'
        })
        .state('videos.list', {
            url: '/list',
            // loaded into ui-view of parent's template
            templateUrl: 'list.html',
            controller: 'listController'
        })
        .state('videos.detail', {
            url: '/:id',
            // loaded into ui-view of parent's template
            templateUrl: 'detail.html',
            controller: 'listController'
        })
})

routerApp.controller('listController', ['$scope', '$http', '$state', '$location', function($scope, $http, $state, $location) {
    $http.get('/api/playlist').success(function(data) {
        $scope.thisVideo = $state.params.id;
        $scope.videos = data.items;

    });
    $scope.getIframeSrc = function(src) {
        return 'https://www.youtube.com/embed/' + src;
    };

}]);