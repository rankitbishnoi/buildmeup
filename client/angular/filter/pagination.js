myapp.filter('startFrom', function() {           // this filter is used with ng-repeat for pagination 
    return function(input, start) {
       if (input != undefined) {
            start = +start; //parse to int
            return input.slice(start);
       }
    }
});
