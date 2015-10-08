var honeyqa = angular.module("honeyqa", [
    'ngRoute',
    'angular-loading-bar',
    'ngAnimate',
    'easypiechart'
]);


honeyqa.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.latencyThreshold = 100;
}]);

/**
 * Route Binding
 */
honeyqa.config(['$routeProvider', function($routeProvider) {

    //honeyqa.registerCtrl = $controllerProvider.register;

    //function resolve_js(name){
    //    return {
    //        load: function(){
    //            $.getScript('js/integrated/' + name + '.js');
    //        }
    //    }
    //}


    $routeProvider
        .when("/", {
            templateUrl: "views/overview.html",
            controller : "mainCtrl",
            title : "overview",
            //resolve : resolve_js('endless_dashboard')
        })
        .when("/overview", {
            templateUrl: "views/overview.html",
            controller : "mainCtrl",
            title : "overview",
            //resolve : resolve_js('endless_dashboard')
        })
        .when("/insight", {
            templateUrl: "views/insight.html",
            controller : "mainCtrl",
            title : "insight"
        })
        .when("/appver", {
            templateUrl: "views/appver.html",
            controller : "mainCtrl",
            title : "appver"
        })
        .when("/device", {
            templateUrl: "views/device.html",
            controller : "mainCtrl",
            title : "device"
        })
        .when("/sdk", {
            templateUrl: "views/sdk.html",
            controller : "mainCtrl",
            title : "sdk"
        })
        .when("/country", {
            templateUrl: "views/country.html",
            controller : "mainCtrl",
            title : "country"
        })
        .when("/class", {
            templateUrl: "views/class.html",
            controller : "mainCtrl",
            title : "class"
        })
        .when("/new_project", {
            templateUrl: "views/new_project_part.html",
            controller : "mainCtrl",
            title : "new_project"
        })
        .otherwise({
            rediretTo:'/error-404'
        });
}]);




honeyqa.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
