Ext.define('ICD.BaseStore', {
    extend: 'ICD.Ext.data.Store',
    requires: [
        'ICD.mixins.BaseMixin'
    ],
    mixins: {
        baseMixin: 'ICD.mixins.BaseMixin'
    }


});
