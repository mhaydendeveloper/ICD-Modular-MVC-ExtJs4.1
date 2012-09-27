Ext.define('Views.HeaderController.HeaderController', {
    extend: 'Viewer.base.Controller',

    requires: [
        'Views.HeaderController.store.HeaderControllerStore',
        'Views.HeaderController.view.HeaderControllerView'
    ],

    constructor: function (config) {
        console.log("HeaderController::constructor");
        if (config) {
            if (config.config && config.viewDir) {
                this.configUrl = config.viewDir + config.config;
                // setup store
                this.initStore();
            } else {
                console.error("HeaderController::constructor: config is missing needed parameters");
            }
        } else {
            console.error("HeaderController::constructor: config is undefined");
        }
        // call super
        this.callParent(config);
    },

    /**
    * Create the main store. Connect to the store's 'load' event 
    *
    */
    initStore: function () {
        this.store = Ext.create('Views.HeaderController.store.HeaderControllerStore', {
            proxy: {
                type: 'ajax',
                url: this.configUrl,
                reader: {
                    type: 'json',
                    root: 'configuration'
                }
            },
            autoLoad: true
        });
        // connect to load event
        this.store.on('load', this.onStoreLoad, this);
    },

    /**
    * Handler: On this.store 'load' event
    */
    onStoreLoad: function () {
        this.init();
    },

    /**
    * Initialize the view(s).
    */
    init: function () {
        console.log("HeaderController::init");
        this.initHeaderControllerView();
    },

    initHeaderControllerView: function () {
        console.log("HeaderController::initHeaderControllerView");
        var data = this.getStoreData();
        if (data) {
            data.eventBus = this.getEventBus();
            if (data.eventBus) {
                this.headerControllerView = Ext.create("Views.HeaderController.view.HeaderControllerView", data);
                this.headerControllerView.on("show", this.onViewShow, this);
                this.headerControllerView.show();
            }
        }
    },

    onViewShow: function(){

    },

    /**
    * Get data from this.store 
    */
    getStoreData: function () {
        var store = this.getStore();
        if (store) {
            return store.getHeaderControllerStoreData();
        }
        return false;
    }
});
