Ext.define('ICD.Ext.window.Window', {
    extend: 'Ext.window.Window',

    alias: "widget.L3Window",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});