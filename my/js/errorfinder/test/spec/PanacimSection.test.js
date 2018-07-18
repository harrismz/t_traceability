/*
**
	Testing for Panacim section

**
*/

describe('Testing Panacim Section', () => {

	describe('Testing Panacim Section View', () => {
		beforeEach(() => {
			panacim = new my.js.errorfinder.app.view.Panacim_section
		})

		it('should check if panacim already instantiate', () =>{
			expect(panacim).toBeTruthy();
		})

		it('should check if panacim section has form-info', () =>{
			expect(panacim.down('upload-info')).toBeTruthy();
		})

		it('should check if panacim section has form-load', () =>{
			expect(panacim.down('upload-form')).toBeTruthy();
		})

		it('should check if panacim section has grid', () =>{
			expect(panacim.down('panacim-list')).toBeTruthy();
		})
		
	})

	describe('Testing Panacim Controller', () => {
		beforeEach(()=> {
			panacim = new my.js.errorfinder.app.view.Panacim_section
			controller = panacim.getController()
		})

		it('check if controller exists', () => {
			expect(controller).toBeTruthy();
		})

		it('testing fillUploadInfo method working as expected', () => {
			let testingData = {
				feeder_number : 'feeder_number',
				part_no : 'part_no',
				tanggal : 'tanggal',
				program_name : 'program_name',
			}

			spyOn(controller, 'fillUploadInfo').and.callThrough();

			controller.fillUploadInfo(testingData);

			let values = controller.getElementValue()
			for(i in values ){
				expect(values[i]).toBe(testingData[i]);
			}
		})

		it('testing getElement method working as expected', () => {
			spyOn(controller, 'getElement').and.callThrough();

			const component = controller.getElement();

			expect(component.feeder_number).toBeTruthy();
			expect(component.part_no).toBeTruthy();
			expect(component.tanggal).toBeTruthy();
			expect(component.program_name).toBeTruthy();
		})

		it('testing getElementValue method working as expected', () => {
			spyOn(controller, 'getElement').and.callThrough();
			spyOn(controller, 'getElementValue').and.callThrough();

			let extComponents = controller.getElement();
			for(i in extComponents ){
				extComponents[i].setValue('im value')
			}
			
			const component = controller.getElementValue();
			expect(controller.getElement).toHaveBeenCalled();

			for(i in component){
				expect(component[i]).toBeTruthy();
				expect(component[i]).toBe('im value');
			}
		})

		it('testing onUpload method working as expected', () => {
			let form = panacim.getForm();
			let params = controller.getElementValue();
			spyOn(form, 'submit'); //.and.callThrough();
			button = panacim.down('button[name=btn-upload]')
			button.click();
            let api = 'http://'+ window.location.hostname +'/t_traceability/api/panacim/';

            expect(form.submit).toHaveBeenCalled();
            expect(form.submit).toHaveBeenCalledWith({
                url: api,
                waitMsg: 'Processing...',
                params : params,
                success: jasmine.any(Function),
                failure: jasmine.any(Function)
            });

		})

	})



})