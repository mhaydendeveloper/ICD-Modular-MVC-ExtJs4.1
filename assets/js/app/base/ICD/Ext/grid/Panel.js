Ext.define('ICD.Ext.grid.Panel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.L3GridPanel',
    requires: [
        'ICD.BaseView'
    ],
    mixins: {
        baseView: 'ICD.BaseView'
    }
});