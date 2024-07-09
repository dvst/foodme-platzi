'use strict';

foodMeApp.controller('CheckoutController',
    function CheckoutController($scope, cart, customer, $location) {

  $scope.cart = cart;
  $scope.restaurantId = cart.restaurant.id;
  $scope.customer = customer;
  $scope.submitting = false;


  $scope.purchase = function() {
    if ($scope.submitting) return;

    // Check if the expiration date is valid before proceeding
    if (!$scope.isExpirationDateValid()) {
      alert('The expiration date of your credit card is in the past. Please update your payment information.');
      return; // Prevent the purchase from proceeding
    }

    $scope.submitting = true;
    cart.submitOrder().then(function(orderId) {
      $location.path('thank-you').search({orderId: orderId});
    });
  };

  $scope.isExpirationDateValid = function() {
    var expirationDate = $scope.cart.payment.expire; // Expected format: "mm/yyyy"
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day for comparison

    var parts = expirationDate.split('/');
    if (parts.length !== 2) {
      return false; // Invalid format
    }

    var expMonth = parseInt(parts[0], 10) - 1; // Month is 0-indexed in JavaScript Date
    var expYear = parseInt(parts[1], 10);

    if (isNaN(expMonth) || isNaN(expYear)) {
      return false; // Invalid month or year
    }

    var expiration = new Date(expYear, expMonth + 1, 0); // Set to the last day of the expiration month

    return expiration >= today;
  };

 

});

// add validation for credit card expiration date to be in the future
// add validation for credit card number to be a valid credit card number
// add validation for credit card security code to be a valid security code

// 