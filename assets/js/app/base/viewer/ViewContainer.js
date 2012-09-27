Ext.define('Viewer.ViewContainer', {
    extend: 'ICD.BaseController',

    requires: [
        "Viewer.AppEvent",
        "Viewer.managers.ConfigManager",
        "Viewer.managers.DataManager",
        "Viewer.managers.ViewportManager",
        "Viewer.managers.UIManager",
        "Viewer.managers.ViewsManager"
    ],

    VERSION: "ICD Viewer for ExtJs",
    DEFAULT_CONFIG_FILE: "views-default.json",
    

    configDir: 'data/',
    configFile: null,
    viewDir: 'Content/js/app/views/',

    // If minified is true we use Ext.Loader.loadScript instead of Ext.require
    minified: false,

    /**
    * Instantiate Application managers, passing in reference to application level eventBus, main config file location, and View Directory as needed.
    * Get main configuration file location from url parameters
    * Connect listener o application wide CONFIG_LOADED event.
    * Fire appliaction level CONTAINER_INITIALIZED event.
    */
    constructor: function (config) {
        console.log("ViewContainer::constructor");
        
        if (config) {
            if (config.eventBus) {
                this.eventBus = config.eventBus;

                // get main configuration file location from url parameters
                this.setViewDir();
                this.setUrlConfigParams();
                this.setConfigFile();
                

                this.configFile = (this.configFile) ? this.configFile : this.DEFAULT_CONFIG_FILE;
                
                this.configManager = Ext.create("Viewer.managers.ConfigManager", {
                    configFile: this.configFile,
                    eventBus: this.eventBus
                });
                this.dataManager = Ext.create("Viewer.managers.DataManager", {
                    eventBus: this.eventBus
                });
                this.viewportManager = Ext.create("Viewer.managers.ViewportManager", {
                    eventBus: this.eventBus
                });
                this.uiManager = Ext.create("Viewer.managers.UIManager", {
                    eventBus: this.eventBus
                });
                this.viewsManager = Ext.create("Viewer.managers.ViewsManager", {
                    eventBus: this.eventBus,
                    viewDir: this.viewDir
                });

                this.eventBus.on(Viewer.AppEvent.CONFIG_LOADED, this.onConfigLoad, this);

                // Let the ViewsManager know it's time to do work
                this.eventBus.fireEvent(Viewer.AppEvent.CONTAINER_INITIALIZED);
            } else {
                console.error("ViewContainer::constructor config.eventBus is undefined.");
            }
        } else {
            console.error("ViewContainer::constructor config is undefined.");
        }
    },

    /**
    * Set variable to hold views directory location
    */
    setViewDir: function () {
        // TODO: get this to work so we can set the directory dynamically
        this.viewDir = 'assets/js/app/views/';
    },

    /**
    * Get this.viewDir
    * @returns string viewdir
    */
    getViewDir: function(){
        var viewDir = this.viewDir;
        if (!viewDir) {
            console.error("ViewContainer::getViewDir: viewDir is undefined");
        }
        return viewDir;
    },

    /**
    * Seperate GET parameters from current URL into a Dictionary
    */
    setUrlConfigParams: function(){
        // separating the GET parameters from the current URL
        var getParams = document.URL.split("?");
        if(getParams.length > 1){
            // transforming the GET parameters into a dictionnary
            this.urlConfigParams = Ext.urlDecode(getParams[getParams.length - 1]);
        }
    },

    /**
    * Set variable to hold main config files location. If config file is not set in the url parameter, the default
    * config file will be used.
    */
    setConfigFile: function () {
        var configFileName = (this.urlConfigParams && this.urlConfigParams.config) ? this.urlConfigParams.config : this.DEFAULT_CONFIG_FILE;
        if (configFileName) {
            if (this.configDir) {
                this.configFile = this.configDir + configFileName;
            } else {
                console.error("ViewContainer::setConfigFile: this.configDir is undefined.");
            }
        } else {
            console.error("ViewContainer::setConfigFile: configFileName is undefined.");
        }
    },

    

    /**
    * Share the ConfigManager's store which hold the main appliaction configuration.
    * Load the splash page.
    * @params object data
    * @params object store
    */
    onConfigLoad: function (data, store) {
        console.log("ViewContainer::onConfigLoad");
        if (store) {
            this.store = store;
            if (data) {
                // check for minified version parameter
                if (data.minified != undefined && data.minified) {
                    this.minified = true;
                }
                if (data.splashView) {
                    var splashConfig = data.splashView;
                    this.loadSplashView(splashConfig);
                } else {
                    console.warn("ViewContainer::onConfigLoad: data.splashView is undefined");
                }
            } else {
                console.error('ViewContainer::onConfigLoad: data is undefined');
            }
        } else {
            console.error('ViewContainer::onConfigLoad: store is undefined');
        }
    },

    /**
    * Dynamically load the splash page using the passed in configuration object for the Splash page view.
    * NOTE: pass config in callbacks for dynamic instantiation and robust error message.
    * @params object config
    */
    loadSplashView: function (config) {
        var endpoint = (this.minified) ? config.url : config.namespace;
        var viewDir = this.getViewDir();
        if (endpoint) {
            if (this.minified) {
                //Ext.Loader.loadScript({
                //    url: viewDir + endpoint,
                //    onLoad: Ext.Function.bind(this.onLoadSplashView, this, [config]),
                //    onError: Ext.Function.bind(this.onLoadSplashViewError, this, [config]),
                //    scope: this
                //});
                Ext.require(endpoint, Ext.Function.bind(this.onLoadSplashView, this, [config]));
            } else {
                Ext.require(endpoint);
                if (viewDir) {
                    config.viewDir = viewDir;
                    Ext.create(config.namespace, config);
                } else {
                    this.logError("ViewContainer::loadSplashView: this.viewDir is undefined");
                }
            }
            

        } else {
            this.logError("ViewContainer::loadSplashView: endpoint is undefined");
        }

    },

    /**
    * Handler: After Splash page Javascript bits load, take the config data and instantiate the class referenced by 
    * namespace passing config object into class' constructor.
    * 
    * @params object config
    */
    onLoadSplashView: function (config) {
        if (config) {
            if (this.viewDir) {
                config.viewDir = this.viewDir;
                if (config.namespace) {
                    debugger;
                    Ext.create(config.namespace, config);
                }else{
                    console.error("ViewContainer::onLoadSplashView: config.namespace is undefined");
                }
            }
        } else {
            console.error("ViewContainer::onLoadSplashView: config is undefined.");
        }
    },

    /**
    * Handler: If splash page has issue loading, show robust error.
    * 
    * @params object config
    */
    onLoadSplashViewError: function (config) {
        console.error("ViewContainer::onLoadSplashViewError: " + config.label + " had a problem loading");
    }
});