(function () {
  "use strict";

  angular.module("common").service("MyInfoService", MyInfoService);

  function MyInfoService() {
    var service = this;
    service.user = {};

    service.setInfo = function (firstname, lastname, email, phone, dish) {
      service.user.firstname = firstname;
      service.user.lastname = lastname;
      service.user.email = email;
      service.user.phone = phone;
      service.user.dish = dish;
    };

    service.getInfo = function () {
      return service.user;
    };
  }
})();
