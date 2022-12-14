(function () {
  "use strict";

  angular.module("public").controller("SignUpController", SignUpController);

  SignUpController.$inject = ["MenuService", "MyInfoService"];

  function SignUpController(MenuService, MyInfoService) {
    var signUpController = this;

    signUpController.submitted = false;
    signUpController.invalidDish = false;

    signUpController.submit = function () {
      MenuService.getMenuItem(signUpController.dish)
        .then(function (response) {
          if (response) {
            signUpController.invalidDish = false;
            MyInfoService.setInfo(
              signUpController.firstname,
              signUpController.lastname,
              signUpController.email,
              signUpController.phone,
              signUpController.dish
            );
            signUpController.submitted = true;
          }
          else {
            signUpController.invalidDish = true;
          }
        })
        .catch(function () {
          signUpController.invalidDish = true;
        });
    };
  }
})();
