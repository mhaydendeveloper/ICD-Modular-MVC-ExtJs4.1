Ext.define('ICD.Ext.layout.container.VBox', {
    extend: 'Ext.layout.container.VBox',

    alias: "widget.L3VBox",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});