Ext.define('Views.SplashView.SplashView', {
    extend: 'Viewer.base.Controller',

    requires: [
        'Views.SplashView.store.SplashViewStore',
        'Views.SplashView.view.SplashViewView'
    ],

    constructor: function (config) {
        console.log("SplashView::constructor");
        
        if (config) {
            if (config.config && config.viewDir) {
                this.configUrl = config.viewDir + config.config;
                this.initStore();
            } else {
                console.error("SplashView::constructor: config is missing needed parameters");
            }
        } else {
            console.error("SplashView::constructor: config is undefined");
        }

        this.callParent(config);
    },

    initStore: function(){
        // setup store
        this.store = Ext.create('Views.SplashView.store.SplashViewStore', {
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
        this.store.on('load', this.onStoreLoad, this);
    },

    onStoreLoad: function () {
        this.initView();
    },

    initView: function () {
        console.log("SplashView::initView");
        
        if (this.store) {
            if (this.store.getAt(0) && this.store.getAt(0).getData()) {
                var data = this.store.getAt(0).getData();
                this.splashViewView = Ext.create("Views.SplashView.view.SplashViewView", data);
                this.splashViewView.show();
            } else {
                console.log("SplashView::init: this.store is missing data");
            }
        } else {
            console.log("SplashView::init: this.store is undefined");
        }
    }


});