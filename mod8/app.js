(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com")
    .directive("foundItem", FoundItemsDirective);

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var controller = this;
    controller.getMatchedMenuItems = function (searchTerm) {
      if (searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
        promise.then(function (result) {
          controller.found = result;
        });
      } else {
        controller.found = [];
      }
      controller.done = true;
      controller.removeItem = function (itemIndex) {
        MenuSearchService.removeItem(controller.found, itemIndex);
      };
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      }).then(function (response) {
        return response.data.menu_items.filter((item) =>
          item.description.includes(searchTerm)
        );
      });
    };

    service.removeItem = function (list, itemIndex) {
      list.splice(itemIndex, 1);
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "foundItems.html",
      scope: {
        items: "<foundItem",
        done: "<",
        removeItem: "&onRemove",
      },
      controller: FoundItemsDirectiveController,
      controllerAs: "controller",
      bindToController: true,
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {}
})();
