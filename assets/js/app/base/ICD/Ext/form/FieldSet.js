Ext.define('ICD.Ext.form.FieldSet', {
    extend: 'Ext.form.FieldSet',

    alias: "widget.L3FieldSet",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});