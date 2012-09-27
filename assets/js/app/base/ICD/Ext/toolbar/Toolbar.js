Ext.define('ICD.Ext.toolbar.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: "widget.L3Toolbar",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});