Ext.define('ICD.Ext.layout.container.Accordion', {
    extend: 'Ext.layout.container.Accordion',

    alias: "layout.L3Accordion",

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    }
});