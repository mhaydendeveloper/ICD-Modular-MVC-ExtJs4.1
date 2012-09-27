Ext.define('ICD.Ext.container.Container', {
    extend: 'Ext.container.Container',

    alias: 'widget.L3Container',

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});