Ext.define('ICD.BaseModel', {
    extend: 'ICD.Ext.data.Model',
    requires: [
        'ICD.mixins.BaseMixin'
    ],
    mixins: {
        baseMixin: 'ICD.mixins.BaseMixin'
    }
});
