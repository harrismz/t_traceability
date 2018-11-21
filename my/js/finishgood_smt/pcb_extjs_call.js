Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.ux', '../framework/extjs-6.2.0/packages/ux/classic/src');
Ext.Loader.setPath('Ext.ajax', '../framework/extjs-6.2.0/packages/ux/src');

Ext.override(Ext.form.TextField, {
	enableKeyEvents: true,
	onKeyUp: function(e, o) {
		var value = this.getValue().toUpperCase();
		this.setValue(value);
		this.fireEvent('keyup', this, e);
	}
});