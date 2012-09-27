Ext.define('ICD.Ext.form.Label', {
    extend: 'Ext.form.Label',

    alias: "widget.L3Label",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});