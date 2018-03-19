myapp.filter('startFrom', function() {
    return function(input, start) {
       if (input != undefined) {
            start = +start; //parse to int
            return input.slice(start);
       }
    }
});
