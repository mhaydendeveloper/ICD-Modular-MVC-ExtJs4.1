Ext.define('Viewer.base.Controller', {
    extend: "ICD.BaseController",

    requires: [
        "Viewer.AppEvent"
    ],

    constructor: function(config){
        this.callParent(config);
    },
   
    getEventBus: function () {
        var eventBus;
        if (Viewer.AppEvent.eventBus) {
            eventBus = Viewer.AppEvent.eventBus;
        } else {
            this.logError("Dashboards::getEventBus: Viewer.AppEvent.eventBus is undefined");
        }
        return eventBus;
    },

    getStore: function () {
        if (this.store) {
            return this.store;
        } else {
            console.error("Dashboards::getStore: this.store is undefined");
        }
        return false;
    }
});