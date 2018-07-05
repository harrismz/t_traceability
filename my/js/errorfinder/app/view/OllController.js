Ext.define('my.js.errorfinder.app.view.OllController', {
	extend: 'Ext.app.ViewController',

    alias: 'controller.oll-controller',

    showUploadableFile(filename){
    	console.log(filename)
    	alert(filename)
    }

})