/*

1. Deferred, promise, then, wait, resolve
2. Prototypes
3. MVC architecture
4. Cordova

*/
(function($) {
    
    deferred();

    prototypes();

})(jQuery);


function deferred() {

    var timer;

    var section = $('#deferred .output1');
    section.html('waiting...');

    var promise = process();


    promise.always(function(){
    	section.append('always.');
    });
    promise.done(function(){
    	section.append('done.');
    });
    promise.fail(function(){
    	section.append('fail.');
    });
    promise.progress(function(){
    	section.append(".");
    });
    promise.state(function(){
    	section.append('state.');
    });
    promise.then(function(){
    	section.append('then.');
    });
    

    function process() {
    	
    	var deferred = $.Deferred();

    	//console.log(deferred.state());

    	timer = setInterval(function(){
    		deferred.notify();
    	}, 1000);

    	setTimeout(function(){
    		clearInterval(timer);
    		deferred.resolve();
    	}, 3000);


    	return deferred;
    };

    var section2 = $('#deferred .output2');
	var promise2 = initApp();

    function initApp(){

    	var loggedIn = $.Deferred();
		var databaseReady = $.Deferred(); //deferred

		loggedIn.fail(function(){
			section2.append('Couldn\'t log in <br />');
		});
		databaseReady.fail(function(){
			section2.append('Couldn\'t init DB <br />');
		});

		setTimeout(function(){
    		section2.append('Logging in... <br />');
    		loggedIn.resolve();
    	}, 2000);

		setTimeout(function(){
    		section2.append('DB initialising... <br />');
    		databaseReady.resolve();
    	}, 5000);

		$.when(loggedIn, databaseReady).then(function() {
			section2.append('Logged in and database ready. <br />');
		}).always(function(){
			section2.append('Clear app cache <br />');
		}).fail(function(){
			section2.append('Problem logging in and/or setting up database. <br />')
		});
    }

};

function prototypes() {

	var section = $('#prototypes .output');

	Car.prototype.speed = 50;
	Car.prototype.drive = function(){
		section.append(this.name+" is driving at "+this.speed+" miles an hour <br />");
	};
	function Car(name){
		this.name = name;
	};

	SuperCar.prototype.speed = 200;	
	SuperCar.prototype = new Car();
	function SuperCar(name){
		Car.call(this, name);
	}


	var car1 = new Car('car');
	var car2 = new SuperCar('supercar');

	car1.drive();
	car2.drive();

}
