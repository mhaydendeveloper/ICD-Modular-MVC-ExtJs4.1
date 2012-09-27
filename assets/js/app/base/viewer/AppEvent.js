Ext.define('Viewer.AppEvent', {
    extend: 'ICD.BaseController',
    singleton: true,

    requires: [
        'Viewer.ErrorMessage'
    ],


    constructor: function () {
        console.log("AppEvent::constructor");
        this.callParent();
    },

    APP_ERROR: "appError",
    CONFIG_LOADED: "configLoaded",
    CONFIG_CHANGED: "configChanged",
    SET_STATUS: "setStatus",
    VIEW_RUN_REQUEST: "viewRunRequest",
    VIEW_CHANGE_STATE: "viewChangeState",
    VIEW_STATE_CHANGED: "viewStateChanged",
    VIEW_FOCUS: "viewFocus",
    VIEW_ADD: "viewAdd",
    VIEW_ADDED: "viewAdded",
    VIEW_CLOSE: "viewClose",
    CONTAINER_INITIALIZED: 'containerInitialized',
    HIDE_LOADER: 'hideLoader',
    SHOW_LOADER: 'showLoader',
    // views events constants
    DASHBOARDS_LIST_LOADED: "view:DashboardsListLoaded",
    DASHBOARD_CHANGED: "view:DashboardChanged", // temporary to test system
    RESET_BUTTON_CLICKED: "view:resetButtomClicked", // temporary to test system
    SUBMIT_BUTTON_CLICKED: "view:submitButtonClicked", // temporary to test system

    DASHBOARD_SELECTLIST_COMPONENT_LOADED: 'dashboardSelectListComponentLoaded',

    dispatch: function (name, config) {
        var eventBus = this.getEventBus();
        if (eventBus) {
            eventBus.fireEvent(name, config);
        }
    },

    addLnr: function (name, fn, scope, config) {
        var eventBus = this.getEventBus();
        if (eventBus) {
            eventBus.on(name, fn, scope, config);
        }
    },

    removeLnr: function (name, config) {
        var app = this.getApp();
        if (app) {
            app.un(name, config);
        }
    },

    /**
    * @params string status
    */
    setStatus: function (status) {
        this.dispatch(this.SET_STATUS, status)
    },


    showError: function (content, title) {
        var errorMsg = Ext.create("Viewer.ErrorMessage", {
            content: content,
            title: title
        });
        this.fireEvent(this.APP_ERROR, errorMsg);
    },

    getEventBus: function () {
        if(this.eventBus){
            return eventBus;
        }else{
            console.error("AppEvent:getEventBus this.eventBus is undefined.");
            return this;
        }
        return false;
    }
});