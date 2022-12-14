(function () {
  "use strict";
  
  angular.module('public')
  .controller('MyInfoController', MyInfoController);
  
  MyInfoController.$inject = ["myInfo", "MenuService"];
  function MyInfoController(myInfo, MenuService) {
    var myInfoController = this;
    myInfoController.myInfo = myInfo;
    myInfoController.isRegistered = false;
    
    if(angular.equals({}, myInfo)){
      myInfoController.isRegistered = false;
    } else {
      myInfoController.isRegistered = true;
    }

    if (myInfoController.isRegistered) {
      var data = MenuService.getMenuItem(myInfo.dish);
      data.then(function(response) {
        console.log('response: ', response)
        myInfoController.dishInfo = response;
        myInfoController.dishInfo.category = myInfoController.dishInfo.short_name.replace(/[0-9]/g, '');
      });
    }
  }
  
  })();
  