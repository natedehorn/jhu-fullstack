(function () {

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home if no other URL matches
        $urlRouterProvider.otherwise('/');

        // Set up UI states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.template.html'
            })

            .state('categoryList', {
                url: '/categories',
                templateUrl: 'templates/categoryList.template.html',
                controller: 'CategoryListController as categoryList',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories()
                            .then(function (categories) {
                                return categories;
                            })
                    }]
                }
            })

            .state('itemList', {
                url: '/categories/{categoryShortName}/items',
                templateUrl: 'templates/itemList.template.html',
                controller: 'ItemListController as itemList',
                resolve: {
                    items: ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                                .then(function (items) {
                                    return items;
                                });
                        }]
                }
            });
    }
})();