var annaTodo = angular.module('annaTodo', [])

function primaryController($scope, $http) {
  $scope.formData = {}

  $.get('/api/todos')
    .then(function(data){
      $scope.todos = data
      $scope.$apply()
    })

  $scope.createItem = function(){
    $http.post('/api/todos', $scope.formData)
      .then(function(data) {
        $scope.formData = {}
        $scope.todos = data
        console.log(data);
        $scope.$apply()
      })
  }

  $scope.deleteItem = function(id){
    $http.delete('/api/todos/' + id)
      .then(function(data){
        $scope.todos = data
        console.log(data);
        $scope.$apply()
      })
  }
}
