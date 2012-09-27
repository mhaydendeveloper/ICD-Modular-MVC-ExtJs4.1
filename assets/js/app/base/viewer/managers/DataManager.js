Ext.define('Viewer.managers.DataManager', {
    extend: 'ICD.BaseController',

    constructor: function (config) {
        console.log("DataManager::constructor");
        this.callParent();
        
        if (config) {
            if (config.eventBus) {
                this.appEvent = Viewer.AppEvent;
                this.eventBus = config.eventBus;
                this.eventBus.addListener(this.appEvent.CONFIG_LOADED, this.onConfigLoaded, this);
            } else {
                console.error("DataManager::constructor config.eventBus is undefined");
            }
        } else {
            console.error("DataManager::constructor config is undefined");
        }
    },

    onConfigLoaded: function (data) {
        console.log("DataManager::onConfigLoaded");
        this.init();
    },

    init: function () {
        console.log("DataManager::init");
    }
});