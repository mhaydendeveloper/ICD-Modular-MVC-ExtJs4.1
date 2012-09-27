Ext.define('ICD.Ext.panel.Panel', {
    extend: 'Ext.panel.Panel',

    alias: "widget.L3Panel",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});