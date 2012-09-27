Ext.define('Views.SplashView.store.SplashViewStore', {
    extend: 'ICD.Ext.data.Store',
    requires: [
        'Views.SplashView.model.SplashViewModel'
    ],
    model: 'Views.SplashView.model.SplashViewModel'
});