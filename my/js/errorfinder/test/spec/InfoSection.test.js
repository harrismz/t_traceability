

describe('Testing Info Section', ()=> {
	beforeEach(function() {
	    infoSection = new my.js.errorfinder.app.view.Info_section;
	    // jasmine.Ajax.install();
	});

	afterEach(function (){
		// jasmine.Ajax.uninstall();
	})

	it('should verify if infoSection exist', function (){
		expect(infoSection).toBeTruthy();
	})

	it('should render the content of info section', () => {
		expect(infoSection.down('textfield[name=JOBMODELNAME]')).toBeTruthy()
		expect(infoSection.down('textfield[name=JOBPWBNO]')).toBeTruthy()
		expect(infoSection.down('textfield[name=process]')).toBeTruthy()
		expect(infoSection.down('textfield[name=JOBSTARTSERIAL]')).toBeTruthy()
		expect(infoSection.down('textfield[name=JOBSTARTSERIAL]')).toBeTruthy()
		
		expect(infoSection.down('button[name=submit-button]')).toBeTruthy()

	})

	it('should check if controller exists', function (){
		let controller = infoSection.getController(); 
		expect(controller).toBeTruthy();
		expect(controller.type ).toBe('info-controller');
	})

	/*it('should check controller on submit called', () => {
		
		// setup
		infoSection.down('textfield[name=JOBMODELNAME]').setValue('KMM-104MN')
		infoSection.down('textfield[name=JOBPWBNO]').setValue('J7J-0352-10')
		infoSection.down('textfield[name=process]').setValue('DM1')
		infoSection.down('textfield[name=JOBSTARTSERIAL]').setValue(15261)
		infoSection.down('textfield[name=part_location]').setValue('C702')

		let button = infoSection.down('button[name=submit-button]')		

		let controller = infoSection.getController(); 
		
		jasmine.Ajax.withMock(() => {
			
			controller.onButtonSubmit = jasmine.createSpy("success");
	      	
			// button.click();
	      	// expect(controller.onButtonSubmit).not.toHaveBeenCalled();
				
			jasmine.Ajax.requests.mostRecent().respondWith({
			    "JOBMC_PROGRAM": "VA00XJ1212M02MNA",
			    "JOBDATE": "2017-10-04"
			});			

			expect(controller.onButtonSubmit).toHaveBeenCalled();
		})
	})*/

	it("allows use in a single spec", function() {
	    var doneFn = jasmine.createSpy('success');
	    jasmine.Ajax.withMock(function() {
	      var xhr = new XMLHttpRequest();
	      xhr.onreadystatechange = function(args) {
	        if (this.readyState == this.DONE) {
	          doneFn(this.responseText);
	        }
	      };

	      xhr.open("GET", "/some/cool/url");
	      xhr.send();

	      expect(doneFn).not.toHaveBeenCalled();

	      jasmine.Ajax.requests.mostRecent().respondWith({
	        "status": 200,
	        "responseText": 'in spec response'
	      });

	      expect(doneFn).toHaveBeenCalledWith('in spec response');
	    });
	});

})