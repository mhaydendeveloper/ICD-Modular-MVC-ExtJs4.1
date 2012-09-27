Ext.define('ICD.Ext.form.FieldContainer', {
    extend: 'Ext.form.FieldContainer',

    alias: "widget.L3FieldContainer",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});