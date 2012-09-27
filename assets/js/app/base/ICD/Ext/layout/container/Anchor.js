Ext.define('ICD.Ext.layout.container.Anchor', {
    extend: 'Ext.layout.container.Anchor',

    alias: "widget.L3Anchor",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});