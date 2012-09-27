Ext.define('Viewer.managers.ViewsManager', {
    extend: 'ICD.BaseController',
    requires: [
        "Viewer.AppEvent",
        "ICD.Ext.data.Store"
    ],

    viewList: [],
    controllerList: [],

    /**
    * Set member variables passed in from config.
    * Connect to CONFIG_LOAD event.
    * @params object config { eventBus:'application event bus', viewDir: 'directory location of application views' }
    */
    constructor: function (config) {
        console.log("ViewsManager::constructor");
        this.callParent();

        if (config) {
            if (config.eventBus) {
                this.appEvent = Viewer.AppEvent;
                this.eventBus = config.eventBus;
                this.eventBus.addListener(this.appEvent.CONFIG_LOADED, this.onConfigLoaded, this);
            } else {
                console.error("ViewsManager::constructor config.viewDir is undefined");
            }
        } else {
            console.error("ViewsManager::constructor config is undefined");
        }
    },

    /**
    * Handler: CONFIG_LOADED event.
    * Take passed in store and hold on to it as a configStore
    * @params object data
    * @params object store
    */
    onConfigLoaded: function (data, store) {
        console.log("ViewsManager::onConfigLoaded");
        if (store) {
            this.configStore = store;
            this.init();
        } else {
            console.error("ViewsManager::onConfigLoaded: store is undefined");
        }

    },

    /**
    * Start loading the views.
    */
    init: function () {
        console.log("ViewsManager::init");
        this.startLoadControllers();
        this.startLoadViews();
    },

    startLoadControllers: function () {
        var data = this.getConfigStoreData();
        if (data) {
            if (data.controls) {
                this.store = Ext.create("ICD.Ext.data.Store", {
                    model: 'Viewer.managers.ControlsManagerModel',
                    data: data.controls
                });
                Ext.Array.forEach(data.controls, function (control, index, allItems) {
                    this.controllerList.push(control);
                }, this);
                this.loadNextControl();
            } else {
                console.error("ViewsManager::startLoadControllers: data.controls is undefined");
            }
        } else {
            console.error("ViewsManager::startLoadControllers: data is undefined");
        }
    },
    loadNextControl: function () {
        if (this.controllerList.length > 0) {
            var controlConfig = this.controllerList[0];
            this.controllerList.splice(0, 1);
            this.loadControl(controlConfig);
        } else {
            console.log("ViewsManager::loadNextControl: All Controls are loaded");
        }
    },
    loadControl: function (controlConfig) {
        if (controlConfig) {
            var viewDir = this.getViewDir();
            if (viewDir) {
                if (controlConfig.namespace) {
                    controlConfig.viewDir = this.getViewDir();
                    controlConfig.eventBus = this.getEventBus();
                    // load class dynamically
                    Ext.require(controlConfig.namespace);
                    // instantiate class
                    Ext.create(controlConfig.namespace, controlConfig);

                    this.loadNextControl();
                } else {
                    console.error("ViewsManager::loadControl: controlConfig.namespace is undefined");
                }
            }
        } else {
            console.error("ViewsManager::loadControl: controlConfig is undefined");
        }
    },
    /**
    * Get viewContainer array from configStore data and create this classes store.
    * Go through the views in the viewContainer, push them to a temporary array and start the loading of the views.
    */
    startLoadViews: function () {
        var data = this.getConfigStoreData();
        if (data) {
            if (data.viewContainer) {
                this.store = Ext.create("ICD.Ext.data.Store", {
                    model: 'Viewer.managers.ViewsManagerModel',
                    data: data.viewContainer
                });
                Ext.Array.forEach(data.viewContainer.views, function (view, index, allItems) {
                    this.viewList.push(view);
                }, this);
                this.loadNextView();
            } else {
                console.error("ViewsManager::startLoadViewContainers: data.viewContainer is undefined");
            }
        } else {
            console.error("ViewsManager::startLoadViewContainers: data is undefined");
        }
    },

    /**
    * Process each viewList (array of views config objects) object, splicing it from the viewList, and sending it to get loaded.
    */
    loadNextView: function () {
        if (this.viewList.length > 0) {
            var viewConfig = this.viewList[0];
            this.viewList.splice(0, 1);
            this.loadView(viewConfig);
        } else {
            console.log("ViewsManager::loadNextView: All Views are loaded");
        }
    },

    /**
    * Take view's configuration and load it dynamically, passing in viewConfig to the callbacks for further parsing and processing.
    * @params object viewConfig
    */
    loadView: function (viewConfig) {
        if (viewConfig) {
            var viewDir = this.getViewDir();
            if (viewDir) {
                if (viewConfig.namespace) {
                    viewConfig.viewDir = this.getViewDir();
                    viewConfig.eventBus = this.getEventBus();
                    // load class dynamically
                    Ext.require(viewConfig.namespace);
                    // instantiate class
                    Ext.create(viewConfig.namespace, viewConfig);

                    this.loadNextView();
                } else {
                    console.error("ViewsManager::loadViewComtainer: viewConfig.namespace is undefined");
                }
            }
        } else {
            console.error("ViewsManager::loadViewComtainer: viewConfig is undefined");
        }
    },


    getAppConfigData: function () {
        var data;
        if (this.configStore) {
            data = Ext.pluck(this.configStore.data.items, 'data');
            if (data && data[0]) {
                data = data[0];
            } else {
                this.logError("ViewsManager::getAppConfigData: data is undefined or missing values.");
            }
        } else {
            this.logError("ViewsManager::getAppConfigData: this.configStore is undefined");
        }
        return data;
    },

    getVersion: function () {
        var version;
        if (this.version) {
            version = this.version;
        } else {
            var data = this.getAppConfigData();
            if (data && data.version) {
                this.version = version = data.version;
            } else {
                this.logWarning("ViewsManager::getVersion: data or data.version is undefined");
            }
        }
        return version;
    },

    getConfigDir: function () {
        var dir;
        if (this.configDir) {
            dir = this.configDir;
        } else {
            var data = this.getAppConfigData();
            if (data && data.configDir) {
                this.configDir = dir = data.configDir;
            } else {
                this.logWarning("ViewsManager::getConfigDir: data or data.configDir is undefined");
            }
        }
        return dir;
    },

    getViewDir: function () {
        var dir;
        if (this.viewDir) {
            dir = this.viewDir;
        } else {
            var data = this.getAppConfigData();
            if (data && data.viewDir) {
                this.viewDir = dir = data.viewDir;
            } else {
                this.logWarning("ViewsManager::getViewDir: data or data.viewDir is undefined");
            }
        }
        return dir;
    },

    getEventBus: function () {
        if (this.eventBus) {
            return this.eventBus;
        } else {
            console.error("ViewsManager::getEventBus: this.eventBus is undefined");
        }
        return false;
    },

    getConfigStoreData: function () {
        var data;
        if (this.configStore) {
            if (this.configStore.getAt(0) && this.configStore.getAt(0).getData()) {
                data = this.configStore.getAt(0).getData();
            } else {
                console.error("ViewsManager::getConfigStoreData: this.configStore is missing data");
            }
        } else {
            console.error("ViewsManager::getConfigStoreData: this.configStore is undefined");
        }
        return data;
    }
});

Ext.define("Viewer.managers.ControlsManagerModel", {
    extend: 'ICD.Ext.data.Model',
    fields: [
        { name: "config", type: 'string' },
        { name: "url", type: 'string' },
        { name: 'namespace', type: 'String' },
        { name: 'top', type: 'String' },
        { name: 'left', type: 'String' }
    ]
});

Ext.define("Viewer.managers.ViewsManagerModel", {
    extend: 'ICD.Ext.data.Model',
    fields: [
        { name: "layout", type: 'string' },
        { name: "views", type: 'array' }
    ]
});