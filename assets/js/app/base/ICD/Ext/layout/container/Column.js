Ext.define('ICD.Ext.layout.container.Column', {
    extend: 'Ext.layout.container.Column',

    alias: "widget.L3Column",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});