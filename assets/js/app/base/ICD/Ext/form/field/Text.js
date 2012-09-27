Ext.define('ICD.Ext.form.field.Text', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.L3TextField',

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});