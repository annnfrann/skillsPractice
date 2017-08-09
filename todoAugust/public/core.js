var annaTodo = angular.module('annaTodo', [])

function primaryController($scope, $http) {
  $scope.formData = {}
  $scope.todos = {}

  $.get('/api/todos')
    .then(function(data){
      console.log(data);
      $scope.todos = data
    })

  $scope.createItem = function(){
    $http.post('/api/todos', $scope.formData)
      .then(function(data) {
        $scope.todos = data
        $scope.formData = {}
      })
  }

  $scope.deleteItem = function(id){
    $http.delete('/api/todos/' + id)
      .then(function(data){
        $scope.todos = data
      })
  }
}
