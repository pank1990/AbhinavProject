	var appl=angular.module("myDemo",[]);
appl.controller("myDemoCtrl",function($scope, $http){
	
	$http.get("jsonFile/data.json").then(function(response){
		$scope.joblists=response.data.repairOrder.joblist;
	//console.log(response.data.repairOrder);
	},function(response){
	$scope.content="Error";
	});
	$scope.cdate = new Date();
	$scope.attachmentName="My Photo";
	$scope.attTypes=[{name:'Select Attachment Type' ,type:''},
	                 {name:'Picture of Photo',type:'Picture'},
	                 {name:'Picture of Document', type:'Document'}];
	$scope.attachmentType=$scope.attTypes[1].type;
	$scope.submit=function(){
		this.picInfo=[{name:$scope.attachmentName,type:$scope.attachmentType}];
		console.log(this.picInfo.name);
	};

	});

appl.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowWidth = newValue.w;
            scope.style = function () {
                return {
                        'width': (newValue.w * .45) + 'px'
                };
            };
        }, true);
        w.bind('resize', function () {
            scope.$apply();
        });
    }
});
appl.directive('slideToggle', function() {  
	  return {
	    scope:{
	      isOpen: "=slideToggle"
	    },  
	    link: function(scope, element, attr) {
	      var slideDuration =  400; 
	      if (attr.startShown=="false") {
	                element.hide();
	            }
	      scope.$watch('isOpen', function(newVal,oldVal){
	        if(newVal !== oldVal){ 
	          element.stop().slideToggle(slideDuration);
	        }
	      });
	    }
	  };  
	});
appl.filter('getImage',function(){
	
	return function(type){
		
		var path;
		type=angular.lowercase(type);
		if(type==="appication.pdf" || type==="application.octen"){
			path="pdf.jpg";
		}else if(type==="application/vdn.msexcel" || type==="application/vdn.msexcel.sanbarn"){
			path="excel.jpg";
		}else if(type==="application/msword" || type==="application.docm.estron" || type==="application.docx.ser"){
			path="word.jpg";
		}else if(type=="application.ppt" || type=="application.pptx"){
			path="power.jpg";
		}else{
			path="document.jpg";;
		}
		return path;
	};
});

appl.directive('fdInput', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
                $(".file-name").val(files[0].name);
                //scope.fileName=files[0].name;
                console.log(files[0].name);
                console.log(files[0].size);
            });
        }
    };
});