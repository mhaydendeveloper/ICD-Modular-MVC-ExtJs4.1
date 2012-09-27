Ext.define('ICD.Ext.grid.RowNumberer', {
    extend: 'Ext.grid.RowNumberer',
    alias: 'widget.L3RowNumberer',
    requires: [
        'ICD.BaseView'
    ],
    mixins: {
        baseView: 'ICD.BaseView'
    }
});