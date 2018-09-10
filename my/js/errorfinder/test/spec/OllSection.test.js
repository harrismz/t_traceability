
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
			form = ollSection.getForm()
			// spy the form.submit
			spyOn(form, 'submit');

			button = ollSection.down('button[name=btn-upload]')
			
			expect(form).toBeTruthy();
			
			// click the button
			button.click();
			// console.log(form.submit)
            let api = 'http://'+ window.location.hostname +'/t_traceability/api/crb/';

			expect(form.submit).toHaveBeenCalled()

			expect(form.submit).toHaveBeenCalledWith({
                url: api,
                waitMsg: 'Processing...',
                params : {
                    part_location: ''
                },
                success: jasmine.any(Function),
                failure: jasmine.any(Function)
            })
			
		});

		it('should check if showData works as expected', () => {
			spyOn(controller, 'showData');
			
			let data = {
				JOBDATE:"2018-07-05",
				JOBMC_PROGRAM:"VA00XJ1212M02MNB"
			}

			controller.showData();
			expect(controller.showData).toHaveBeenCalled();
		});

		it('should check if getElementInfo is work as expected', () => {
			//and.callThrough()  keep the function going to the actual function and return it's value
			spyOn(controller, 'getElementInfo' ).and.callThrough() ; 
	        let components = controller.getElementInfo(ollSection);
	        
	        // expect the function invoked
	        expect(controller.getElementInfo).toHaveBeenCalled();
	        //expect the function return the value
	        expect(components).toBeTruthy();
	        // expect the components exists
	        expect(components.feeder_number).toBeTruthy();
	        expect(components.part_no).toBeTruthy();
	        expect(components.program_name).toBeTruthy();
			
		});

		it('should check if extractData method work as expected', () => {
			spyOn(controller, 'extractData').and.callThrough();
			let data = {
				A:["90000", "0000"],
				ApcCtrl:"141",
				B:"5",
				BRM:"0",
				C: ["C702", "C1005"],
				C2:"",
				CADID:"143",
				CHIP:"645",
				ChkFlag:"0",
				CoverSize:"0",
				DCOND:"0",
				DCOND2:"0",
				DHEAD:"0",
				DNP:"0",
				DPU:"0",
				DS:"0",
				DTURN:"0",
				Depend:"0",
				ESTOP:"3",ESTOPCOUNT:"3",EX:"0",ExChk:"0",F:"0",FA:"302161",FB:"302481",FC:"337561",
				FD:"338361",
				FE:"350961",
				FF:"0",
				FG:"0",
				FH:"0",
				FI:"0",
				FJ:"0",
				Grand:"0",
				HEAD:"1",
				HPICOND:"0",
				HRMCOND:"0",
				ICOND:"0",
				IDNUM: ["143", "651"],
				IHEAD:"0",
				"InCOND":"0",
				LAND:"0",
				LNAME:"JEIN",
				LandA:"0",
				LandB:"0",
				LandC:"0",
				LandD:"0",
				M:"0",
				MArea:"1",
				MB:"0",
				MCOND:"651",
				MS:"14",
				NAME:"CK73HXR1A104K-9",
				NP:"2",
				NoArrange:"0",
				OHL:"0000",
				OHR:"0000",
				P:"0",
				PACK:"-90",
				PACKB:"0",
				PAD:"0",
				PARTS:"651",
				PG:"1",
				PR:"1000",
				PRISEQ:"0",
				PU:"10013",
				PreSend:"0",
				Proved:"0",
				REELS:"2",
				RETRY:"3",
				RETRYCOUNT:"0",
				RETRYCOUNT2:"1",
				RID:"0",
				RMSet:"0",
				S:"141",
				SH:"1500",
				SICOND:"0",
				SIDE:"2",
				SKIP:"0",
				SL:"",
				SSIZE:"0",
				ScanDir1:"0",
				ScanDir2:"0",
				Shape:"651",
				"SkipNumber":"0",
				StdPos:"0",
				TS:"2",
				TURN:"1",
				Teach:"2",
				ThrowAway:"0",
				UsePeriod:"0",
				VW:"0",
				WG:"0",
				X:"62750",
				Y:"53900",
				tanggal:"2018-07-05"
			}

			const result = controller.extractData(data);

			expect(result).toBeTruthy();
			expect(result.part_no).toBe(data.NAME);
			expect(result.nozzle).toBe(data.NP);
			expect(result.feeder_number).toBe(data.PU);
			expect(result.tanggal).toBe(data.tanggal);
		})



	});

});