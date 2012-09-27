Ext.define('ICD.Ext.chart.Chart', {
    extend: 'Ext.chart.Chart',

    alias: 'widget.L3Chart',

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});