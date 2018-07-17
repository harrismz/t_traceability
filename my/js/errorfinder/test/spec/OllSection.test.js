
describe('Testing OLL Section ', function (){

	beforeEach(function (){
		ollSection = new my.js.errorfinder.app.view.Oll_section;
	})

	it('should check if oll is instantiate correctly', ()=>{
		expect(ollSection).toBeTruthy();
	})

	it('testing if the component has upload-form & upload-info render correctly',  function(){
		let uploadForm = ollSection.down('upload-form');
		let uploadInfo = ollSection.down('upload-info');

		expect(uploadForm).toBeTruthy();
		expect(uploadInfo).toBeTruthy();
	})

	describe('Testing OLL section Controller', ()=> {
		beforeEach(function(){
			controller = ollSection.getController();
		});

		it('should check if showUploadableFile work as expected', () => {
			
			// setup parameter
			let data = {
				JOBDATE:"2018-07-05",
				JOBMC_PROGRAM:"VA00XJ1212M02MNB"
			};
			textData = JSON.stringify(data)
			/*Run method that'll be run*/
			controller.showUploadableFile(textData)

			// get the view;
			let view = ollSection;
			tanggaltextfield = view.down('textfield[name=tanggal]');
        	program_name = view.down('textfield[name=program_name]');

        	expect(tanggaltextfield.getValue()).toBe(data.JOBDATE);
        	expect(program_name.getValue()).toBe(data.JOBMC_PROGRAM)
		});


		it('should check getPartLocation method', function (){
			part_location = ollSection.down('textfield[name=part_location]')
			testCase = 'test';
			part_location.setValue(testCase);
			expect(controller.getPartLocation()).toBe(testCase);
		})

		it('should check if onUpload called by button click', () => {
			spyOn(controller, 'onUpload')
			button = ollSection.down('button[name=btn-upload]')
			// expect(button).toBeTruthy();
			button.click();
			expect(controller.onUpload).toHaveBeenCalled();

		});

		it('should check if onUpload works properly', () => {
			spyOn(controller, 'onUpload')
			spyOn(Ext.Ajax, 'request')

			button = ollSection.down('button[name=btn-upload]')
			
			button.click();
			
			expect(Ext.Ajax.request).toHaveBeenCalled();

		})

	});




});