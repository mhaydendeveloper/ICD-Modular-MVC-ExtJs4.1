Ext.define('ICD.Ext.tab.Panel', {
    extend: 'Ext.tab.Panel',

    alias: "widget.L3TabPanel",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});