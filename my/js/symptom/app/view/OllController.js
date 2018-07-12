Ext.define('my.js.errorfinder.app.view.OllController', {
	extend: 'Ext.app.ViewController',

    alias: 'controller.oll-controller',

    requires : [
    	// 'my.js.errorfinder.app.view.InfoController'
    ],

    // method below is called by InfoController
    showUploadableFile(filename){
    	let view = this.getView()
    	fileinfo = view.down('textfield[name=filename_info]')
    	fileinfo.setValue(filename)
    },

    onUpload(component, events ){
    	let parent = component.up();
    	let filefield = parent.down('filefield[name=filename]')

    	console.log({
    		filefield
    	})

    },

    listen : {
    	controller : {
    		'info-controller' : {
    			runShowUploadableFile : 'showUploadableFile'
    		}
    	}
    },



})