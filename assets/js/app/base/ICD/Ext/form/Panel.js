Ext.define('ICD.Ext.form.Panel', {
    extend: 'Ext.form.Panel',

    alias: "widget.L3Form",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});