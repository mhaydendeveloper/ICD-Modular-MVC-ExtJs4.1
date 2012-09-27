Ext.define('ICD.BaseController', {
    extend: 'ICD.Ext.app.Controller',
    requires: [
        'ICD.mixins.BaseMixin'
    ],
    mixins: {
        baseMixin: 'ICD.mixins.BaseMixin'
    },

    constructor: function (config) {
        this.logMessage("BaseController::constructor");
        this.initConstructors();

        this.callParent(config);
    }
});
