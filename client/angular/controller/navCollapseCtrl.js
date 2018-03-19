myapp.controller('navCollapseCtrl', [function () {
     var self = this;

     self.isNavCollapsed = true;
     self.isCollapsed = false;
     self.isCollapsedHorizontal = false;

     self.status = {
          isopen: false
     };
}]);
