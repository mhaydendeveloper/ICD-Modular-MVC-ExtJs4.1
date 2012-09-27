Ext.define('Viewer.managers.ConfigManager', {
    extend: 'ICD.BaseController',
    name: 'configManager',
    requires: [
        "Viewer.AppEvent",
        "ICD.Ext.data.Store"
    ],

    /**
    * 
    * @params object config
    */
    constructor: function (config) {
        console.log("ConfigManager::constructor");
        this.callParent();
        
        if (config) {
            if (config.eventBus) {
                this.appEvent = Viewer.AppEvent;
                this.eventBus = config.eventBus;
                if (config.configFile) {
                    this.configFile = config.configFile;
                    this.eventBus.on(Viewer.AppEvent.CONTAINER_INITIALIZED, this.onContainerInitialized, this);
                } else {
                    console.error("ConfigManager::constructor config.configFile is undefined");
                }
            }else{
                console.error("ConfigManager::constructor config.eventBus is undefined");
            }
        } else {
            console.error("ConfigManager::constructor config is undefined");
        }

        
    },

    onContainerInitialized: function(){
        this.initStore();
    },

    initStore: function(){
        if (this.configFile) {
            this.store = Ext.create("ICD.Ext.data.Store", {
                model: 'Viewer.managers.ConfigManagerModel',
                proxy: {
                    type: 'ajax',
                    url: this.configFile,
                    reader: {
                        type: 'json',
                        root: 'configuration'
                    }
                },
                autoLoad: true
            });
            this.store.on("load", this.onload, this);
            this.store.on("datachanged", this.onDataChanged, this);
        }
    },

    onload: function (store, recods, successful, eOpts) {
        if (this.store && this.store.getAt(0) && this.store.getAt(0).getData()) {
            var data = this.store.getAt(0).getData();
            console.log(data);
            this.eventBus.fireEvent(this.appEvent.CONFIG_LOADED, data, this.store);

        } else {
            console.error("ConfigManager::onDataChanged cannot access data");
        }
        
    },

    onDataChanged: function (store, eOpts) {
        console.log("ConfigManager::onDataChanged");
        if (this.store && this.store.getAt(0) && this.store.getAt(0).getData()) {
            var data = this.store.getAt(0).getData();
            this.eventBus.fireEvent(this.appEvent.CONFIG_CHANGED, data);
        } else {
            console.error("ConfigManager::onDataChanged cannot access data");
        }
        
    }
});

Ext.define("Viewer.managers.ConfigManagerModel", {
    extend: 'ICD.Ext.data.Model',
    fields: [
        { name: "minified", type: "boolean" },
        { name: "version", type: 'string' },
        { name: "configDir", type: 'string' },
        { name: "viewDir", type: 'string' },
        { name: "title", type: 'string' },
        { name: "subTitle", type: 'string' },
        { name: "style", type: 'array' },
        { name: 'splashView', type: 'object' },
        { name: 'controls', type: 'object' },
        { name: 'viewContainer', type: 'object' }
    ]
});