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
        // console.log(tanggaltextfield)
        tanggaltextfield.setValue(response.JOBDATE );

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
                    console.log({
                        fp, o, status
                    })
                    Ext.Msg.alert('Success', o.result.data );

                    o.result.data.tanggal = tanggalValue;

                    console.log(o.result.data)
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
        let view = this.getView();
        parent = view.up();
        part_location = parent.down('textfield[name=part_location]')
        return part_location.getValue();
    },

    // triggered by onUpload method after success ajax call
    showData(data){

        let newData = this.extractData(data)
        console.log(newData)
        let parent = this.getView().up(); 

        let components = {
            machine_name : parent.down('textfield[name=machine_name]'),
            feeder_number : parent.down('textfield[name=feeder_number]'),
            part_no : parent.down('textfield[name=part_no]')
        }

        components.machine_name.setValue(newData.machine_name);
        components.feeder_number.setValue(newData.feeder_number);
        components.part_no.setValue(newData.part_no)

        // fireEvent on InfoController.showNext
        this.fireEvent('showNext');
        // fire Event on PanacimController.fillUploadInfo dengan parameter newData
        this.fireEvent('fillUploadInfo', newData );

    },

    extractData(data){
        return newData = {
            part_no : data.NAME,
            nozzle : data.NP,
            machine_name : '',
            feeder_number : data.PU,
            tanggal : data.tanggal
        }

        // console.log(newData)
    },

    listen : {
    	controller : {
    		'info-controller' : {
    			runShowUploadableFile : 'showUploadableFile'
    		}
    	}
    },



})