
Ext.define('my.js.errorfinder.app.view.PanacimController',{
	extend: 'Ext.app.ViewController',

    alias: 'controller.panacim-controller',

    requires :[
    	'my.js.errorfinder.app.view.OllController'
    ],

    fillUploadInfo(data){
    	// get component
    	components = this.getElement();
    	
    	components.machine_name.setValue(data.machine_name);
        components.feeder_number.setValue(data.feeder_number);
        components.part_no.setValue(data.part_no);
        components.tanggal.setValue(data.tanggal);

        console.log({components, data})

    },

    getElement(){
    	let parent = this.getView(); 
        
        return  {
            machine_name : parent.down('textfield[name=machine_name]'),
            feeder_number : parent.down('textfield[name=feeder_number]'),
            part_no : parent.down('textfield[name=part_no]'),
            tanggal : parent.down('textfield[name=tanggal]')
        }
    },

    getElementValue(){
        elements = this.getElement();
        result = [];
        for (i in elements ){
            result[i] = elements[i].value;
        }
        return result;
    },

    listen : {
    	controller : {
    		'oll-controller' : {
    			fillUploadInfo : 'fillUploadInfo'
    		}
    	}
    },

    onUpload(component){
        form = component.up('form').getForm();
        let params = this.getElementValue();
        var self = this;
        // console.log(params)
        // return;

        if (form.isValid) {
            let api = window.location.hostname +'/t_traceability/api/panacim/';
            form.submit({
                url: 'http://'+ api,
                waitMsg: 'Processing...',
                params : params,
                success: function(fp, o) {
                    status = 'success',
                    
                    console.log({
                        fp, o, status
                    })

                    // Ext.Msg.alert('Success', o.result.data );
                    
                    // do something with the store
                    var store = self.getViewModel().getStore('panacims');
                    data = o.result.data;
                    store.loadData(data, false)
                    console.log({store, data});

                },
                failure: function(fp, o){
                    status = 'failure';
                    console.log({
                        fp, o, status
                    })

                    if (o.response.responseText) {
                        var message = o.response.responseText; 
                        + '.<br> please screenshot & Call IT Team if you need help';
                        Ext.Msg.alert('failure', message );
                    }

                }
            })
        }

        // console.log(form)
    },

    


});