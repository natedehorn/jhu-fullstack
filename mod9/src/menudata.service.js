(function () {
    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com');

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;
        service.getAllCategories = function () {
            return $http.get(ApiBasePath + '/categories.json')
                .then(function (response) {
                    return response.data;
                });
        };

        service.getItemsForCategory = function (categoryShortName) {
            return $http.get(ApiBasePath + '/menu_items/' + categoryShortName + '.json')
                .then(function (response) {
                    return response.data.menu_items;
                });
        };
    }
})();