Ext.Loader.setConfig({
    enabled: true,
    paths: {
        "ICD": 'assets/js/app/base/ICD',
        "ICDD": 'assets/js/app/base/ICDD',
        'Viewer': 'assets/js/app/base/viewer',
        'Views': 'assets/js/app/views'
    }
});
Ext.application({
    name:'ICDV',
    appFolder: 'assets/js/app',

    autoCreateViewport: false,

    requires: [
        'Viewer.ViewContainer'        
    ],
    
    /**
    * Initialize ViewContainer, passing in application eventbus.
    * Add application eventbus to AppEvent singleton
    */
    init: function () {
        console.log("app::init");
        
        this.viewContainer = Ext.create('Viewer.ViewContainer', {
            eventBus: this.eventbus
        });
        Viewer.AppEvent.eventBus = this.eventbus;
    },

    launch: function () {
        
        
    }
});
/**
* version 1.0.0
* This is modular MVC application using the ExtJs 4.1.1 framework.
*
*/