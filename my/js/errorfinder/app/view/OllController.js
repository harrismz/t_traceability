Ext.define('my.js.errorfinder.app.view.OllController', {
	extend: 'Ext.app.ViewController',

    alias: 'controller.oll-controller',

    requires : [
    	// 'my.js.errorfinder.app.view.InfoController'

    ],

    // method below is called by InfoController
    showUploadableFile(responsetext){
    	let view = this.getView()
        response = JSON.parse(responsetext);

        fileinfo = view.down('textfield[name=filename_info]')
        fileinfo.setValue(response.JOBMC_PROGRAM)

        tanggaltextfield = view.down('textfield[name=tanggal]');
        program_name = view.down('textfield[name=program_name]');


        tanggaltextfield.setValue(response.JOBDATE );
        program_name.setValue(response.JOBMC_PROGRAM);

    },

    onUpload(component, events ){
    	let parent = component.up();
    	let part_location =  this.getPartLocation();
    	let form = component.up('form').getForm();
        let tanggalValue = this.getView().down('textfield[name=tanggal]').value;
        self = this;

        if (form.isValid) {
            let api = window.location.hostname +'/t_traceability/api/crb/';
            
            form.submit({
                url: 'http://'+ api,
                waitMsg: 'Processing...',
                params : {
                    part_location
                },
                success: function(fp, o) {
                    status = 'success',
                    // console.log({
                    //     fp, o, status
                    // })
                    Ext.Msg.alert('Success', o.result.data );

                    o.result.data.tanggal = tanggalValue;

                    // console.log(o.result.data)
                    self.showData(o.result.data)
                    
                },
                failure: function(fp, o){
                    status = 'failure';
                    console.log({
                        fp, o, status
                    })

                    if (o.result.error) {
                        var message = o.result.error.message 
                        + '.<br> please screenshot & Call IT Team if you need help';
                        Ext.Msg.alert('failure', message );
                    }

                }
            })
        }
    },

    // triggered by onUpload method to know part location value
    getPartLocation(){
        let view = this.getView(); //oll section
        part_location = view.down('textfield[name=part_location]')
        return part_location.getValue();
    },

    getElementInfo(parent){
        return {
            // machine_name : parent.down('textfield[name=machine_name]'),
            feeder_number : parent.down('textfield[name=feeder_number]'),
            part_no : parent.down('textfield[name=part_no]'),
            program_name : parent.down('textfield[name=program_name]')
        }
    },

    // triggered by onUpload method after success ajax call
    showData(data){

        let newData = this.extractData(data)
        // console.log(newData)
        let parent = this.getView().up(); 

        let components = this.getElementInfo(parent);
        
        // add program name to new data
        newData['program_name'] = components.program_name.value;


        // components.program_name.setValue(newData.program_name);
        components.feeder_number.setValue(newData.feeder_number);
        components.part_no.setValue(newData.part_no)


        // fireEvent on InfoController.showNext
        this.fireEvent('showNext');
        // fire Event on PanacimController.fillUploadInfo dengan parameter newData
        this.fireEvent('fillUploadInfo', newData );

    },

    // parameter 1 adalah hasil dari file crb,
    extractData(data){
        return {
            part_no : data.NAME,
            nozzle : data.NP,
            feeder_number : data.PU,
            tanggal : data.tanggal,
        }

        // console.log(newData)
    },

    setPartLocationValue(value){
        const view = this.getView();
        partLocation = view.down('textfield[name=part_location]')
        partLocation.setValue(value)
    },

    listen : {
    	controller : {
    		'info-controller' : {
    			runShowUploadableFile : 'showUploadableFile',
                setPartLocationValue: 'setPartLocationValue'
    		}
    	}
    },



})