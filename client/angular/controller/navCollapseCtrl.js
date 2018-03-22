myapp.controller('navCollapseCtrl', [function () {        // controller for navbar collapse according to teh screen size
     var self = this;

     self.isNavCollapsed = true;
     self.isCollapsed = false;
     self.isCollapsedHorizontal = false;

     self.status = {
          isopen: false
     };
}]);
