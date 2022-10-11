(function () {
  "use strict";
  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", function ($scope) {
      $scope.input = "";
      $scope.message = "";
      $scope.style = {color: "black"};

      $scope.check = function () {
        getMessage($scope.input);
      };

      function getMessage(input) {
        // Split elements on comma, trim each element and filter out blanks
        var items = input
          .split(",")
          .map(removeWhitespace)
          .filter(removeWhitespace);

        if (items.length == 0) {
          $scope.message = "Please enter data first";
          $scope.style = {color: "red", border: "2px solid red"};
        } else if (items.length <= 3) {
          $scope.message = "Enjoy!";
          $scope.style = {color: "green", border: "2px solid green"};
        } else {
          $scope.message = "Too much!";
          $scope.style = {color: "green", border: "2px solid green"};
        }
      }

      function removeWhitespace(item) {
        return item.trim();
      }
    });
})();
