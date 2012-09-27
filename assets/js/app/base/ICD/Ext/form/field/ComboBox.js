Ext.define('ICD.Ext.form.field.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.L3ComboBox',

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});