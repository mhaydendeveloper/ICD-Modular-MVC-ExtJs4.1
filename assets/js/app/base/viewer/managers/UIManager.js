Ext.define('Viewer.managers.UIManager', {
    extend: 'ICD.BaseController',

    constructor: function (config) {
        console.log("UIManager::constructor");
        this.callParent();
        
        if (config) {
            if (config.eventBus) {
                this.appEvent = Viewer.AppEvent;
                this.eventBus = config.eventBus;
                this.eventBus.addListener(this.appEvent.CONFIG_LOADED, this.onConfigLoaded, this);
            } else {
                console.error("UIManager::constructor config.eventBus is undefined");
            }
        } else {
            console.error("UIManager::constructor config is undefined");
        }
    },

    onConfigLoaded: function (data) {
        console.log("UIManager::onConfigLoaded");
        this.init();
    },

    init: function () {
        console.log("UIManager::init");
    }
});