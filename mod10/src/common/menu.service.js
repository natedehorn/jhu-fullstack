(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (short_name) {
    var item = short_name.match(/([0-9]+)|([a-zA-Z]+)/g);
    return $http.get(ApiPath + '/menu_items/' + item[0] + '/menu_items/' + (item[1] - 1).toString() + '.json').then(function (response) {
      return response.data;
    });
  }

}
})();
