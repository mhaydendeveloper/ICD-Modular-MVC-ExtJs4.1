Ext.define('ICD.Ext.grid.column.Action', {
    extend: 'Ext.grid.column.Action',
    alias: 'widget.L3ActionColumn',
    requires: [
        'ICD.BaseView'
    ],
    mixins: {
        baseView: 'ICD.BaseView'
    }
});