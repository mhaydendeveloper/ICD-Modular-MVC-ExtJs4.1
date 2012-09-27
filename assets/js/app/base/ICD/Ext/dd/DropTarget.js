Ext.define('ICD.Ext.dd.DropTarget', {
    extend: 'Ext.dd.DropTarget',

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});