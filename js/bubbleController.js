var app = angular.module('bubbleApp', []);
app.controller('bubbleCtrl', function($scope, bubbleService) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";
});


app.service('bubbleService', function() {
    this.getData = function (x) {
        return x.toString(16);
    }

    this.saveData = function (x) {
        return x.toString(16);
    }
});