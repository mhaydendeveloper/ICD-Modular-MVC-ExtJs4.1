Ext.define('Viewer.managers.ViewportManager', {
    extend: 'ICD.BaseController',

    constructor: function (config) {
        console.log("ViewportManager::constructor");
        this.callParent();
        
        if (config) {
            if (config.eventBus) {
                this.appEvent = Viewer.AppEvent;
                this.eventBus = config.eventBus;
                this.eventBus.addListener(this.appEvent.CONFIG_LOADED, this.onConfigLoaded, this);
            } else {
                console.error("ViewportManager::constructor config.eventBus is undefined");
            }
        } else {
            console.error("ViewportManager::constructor config is undefined");
        }
    },

    onConfigLoaded: function (data) {
        console.log("ViewportManager::onConfigLoaded");
        this.init();
    },

    init: function () {
        console.log("ViewportManager::init");
    }
});