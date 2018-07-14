
Ext.define('my.js.errorfinder.app.view.InfoController', {

	requires : [
		'Ext.app.ViewController',
		'my.js.errorfinder.app.util.Config',
        'my.js.errorfinder.app.view.OllController',
	],

	extend: 'Ext.app.ViewController',

    alias: 'controller.info-controller',

    onButtonSubmit(component, event){
    	let self = this;
    	// component is this method caller, at this points. it is button
    	let form = component.up('form')
    	let data = form.getValues()

    	let host = window.location.origin; // '/t_traceability/index.php'
    	let subdomain = window.location.pathname.split('/') // ['', 't_traceability', 'index.php']
    	subdomain.splice(0,1) //['t_traceability', 'index.php']
    	subdomain = subdomain[0]; // t_traceability
    	// console.log({form, data, host })
    	// return
    	let apiurl = host +'/'+ subdomain + '/api/oll';
    	let view = this.getView()
    	
    	if (typeof loadMask == 'undefined' ) {
	    	loadMask = new Ext.LoadMask({
	    		msg : 'Please Wait ...',
	    		target : view
	    	})
    	}

    	loadMask.show()
    	// send ajax 
    	Ext.Ajax.request({
    		url: apiurl,
    		method: 'GET',
    		params: data,
    		loadMask: {msg: 'please wait...'},
    		success(response, opts){
    			let datas = JSON.parse(response.responseText)
    			console.log({datas})
    			if (datas.length == 0) {
    				Ext.MessageBox.alert('INFO', 'No Data found!')
    				return;
    			}
                // this method below is define on ollController
                // fire event of listener controller with 1 argument is event name, and second is parameter to send to that argument
                self.fireEvent('runShowUploadableFile', response.responseText );
    			self.showNext()
    		},
    		failure(){
    			Ext.MessageBox.alert('failure','something went wrong')
    		},
    		callback(){
    			loadMask.hide()
    		}
    	})

    },

    showNext(){
    	let view = this.getView();
    	let parent = view.up();
    	parent.showNext();
    },

    showPrevious(){
    	let view = this.getView();
    	let parent = view.up();
    	parent.showPrevious();
    },

    getPartLocationValue(result){
        let view = this.getView();
        part_location =  view.down('textfield[name=part_location]')
        // console.log(part_location)
        result = part_location.getValue();
        return result;
    },

    listen : {
        controller : {
            'oll-controller' : {
                showNext : 'showNext',
                showPrevious : 'showPrevious',

            }
        }
    },

});