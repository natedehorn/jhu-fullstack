(function () {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var tobuycontroller = this;
    tobuycontroller.items = ShoppingListCheckOffService.getToBuy();
    tobuycontroller.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyboughtcontroller = this;
    alreadyboughtcontroller.items = ShoppingListCheckOffService.getAlreadyBought();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuy = [
      { name: "cookies", quantity: 10, pricePerItem: 2 },
      { name: "apples", quantity: 5, pricePerItem: 1 },
      { name: "shrimp", quantity: 50, pricePerItem: 1 },
      { name: "pineapple", quantity: 2, pricePerItem: 5 },
      { name: "bread", quantity: 30, pricePerItem: 2 }
    ];

    var alreadyBought = [];

    service.buyItem = function (itemIndex) {
      var item = toBuy[itemIndex];
      this.getTotal(item);
      toBuy.splice(itemIndex, 1);
      alreadyBought.push(item);
    };

    service.getTotal = function (item){
      const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
      item.total = formatter.format(item.quantity * item.pricePerItem)
    }

    service.getToBuy = function () {
      return toBuy;
    };

    service.getAlreadyBought = function () {
      return alreadyBought;
    };
  }
})();
