
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

    listen : {
    	controller : {
    		'oll-controller' : {
    			fillUploadInfo : 'fillUploadInfo'
    		}
    	}
    },

    onUpload(){
        console.log('hai')
    }

});