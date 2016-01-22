var app = angular.module('kmentry', ['ionic','$selectBox'])

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/')

	$stateProvider

	.state('login',{
		url:'/',
		templateUrl:'login.html'
	})
	.state('home',{
		url:'/home',
		templateUrl:'register.html'
	})
    .state('submit',{
        url:'/submit',
        templateUrl:'submit.html'

    })
})

app.factory('Authorization', function(){
    authorization = {};
    authorization.regNum = "";
    authorization.refNum = "";
    authorization.vinNum = "";
    return authorization;

});

app.controller('loginCtrl', function($scope, $location, Authorization){
    $scope.input = Authorization;
	$scope.login = function(){
		if (authorization.firstName == "admin" && authorization.lastName == "admin") {
            $location.path("/home");
            authorization.regNum = "";
            authorization.refNum = "";
            authorization.vinNum = "";            
        }
        else if (authorization.firstName == "member" && authorization.lastName == "member") {
            $location.path("/home");
            authorization.regNum = "1234-5678";
            authorization.refNum = "909090";
            authorization.vinNum = "456-654-101-ABC";
        };

			
	};
})

app.controller('submitCtrl', function($scope, $location){
	$scope.submitVehicle = function(){
		$location.path("/submit");
	}
})


app.controller('MainCtrl', function($scope, Authorization) {
  $scope.input = Authorization;
  $scope.selectedValue = "Belgium";
  $scope.devList =[
    {name: "Belgium"},
    {name: "France"},
    {name: "India"},
    {name: "USA"},
    {name: "UK"},
    {name: "Pakistan"},
    {name: "Srilanka"},
    {name: "Germany"},
    {name: "Italy"},
    {name: "Canada"},
    {name: "Australia"},
    {name: "Austria"},
    {name: "Bulgaria"},
    {name: "New Zealand"},
    {name: "Iceland"},
];
});
angular.module('$selectBox', []).directive('selectBox', function () {
    return {
        restrict: 'E',
        require: ['ngModel', 'ngData', 'ngSelectedId', 'ngSelectedValue', '?ngTitle', 'ngiItemName', 'ngItemId'],
        template: '<input id="showed" type="text" ng-click="showSelectModal()" style="cursor:inherit;" readonly />' + '<span id="hidden" type="text" style="display: none;"></span>',
        controller: function ($scope, $element, $attrs, $ionicModal, $parse) {
            $scope.modal = {};

            $scope.showSelectModal = function () {
                var val = $parse($attrs.ngData);
                $scope.data = val($scope);

                $scope.modal.show();
            };

            $scope.closeSelectModal = function () {
                $scope.modal.hide();
            };

            $scope.$on('$destroy', function (id) {
                $scope.modal.remove();
            });

            $scope.modal = $ionicModal.fromTemplate('<ion-modal-view id="select">' + '<ion-header-bar>' + '<h1 class="title">' + $attrs.ngTitle + '</h1>' + ' <a ng-click="closeSelectModal()" class="button button-icon icon ion-close"></a>' + '</ion-header-bar>' + '<ion-content>' + '<ion-list>' + '<ion-item  ng-click="clickItem(item)" ng-repeat="item in data" ng-bind-html="item[\'' + $attrs.ngItemName + '\']"></ion-item>' + '</ion-list>' + ' </ion-content>' + '</ion-modal-view>', {
                scope: $scope,
                animation: 'slide-in-up'
            });

            $scope.clickItem = function (item) {
                var index = $parse($attrs.ngSelectedId);
                index.assign($scope, item[$attrs.ngItemId]);

                var value = $parse($attrs.ngSelectedValue);
                value.assign($scope, item[$attrs.ngItemName]);

                $scope.closeSelectModal();
            };
        },
        compile: function ($element, $attrs) {
            var input = $element.find('input');
            angular.forEach({
                'name': $attrs.name,
                'placeholder': $attrs.ngPlaceholder,
                'ng-model': $attrs.ngSelectedValue
            }, function (value, name) {
                if (angular.isDefined(value)) {
                    input.attr(name, value);
                }
            });

            var span = $element.find('span');
            if (angular.isDefined($attrs.ngSelectedId)) {
                span.attr('ng-model', $attrs.ngSelectedId);
            }
        }
    };
});

