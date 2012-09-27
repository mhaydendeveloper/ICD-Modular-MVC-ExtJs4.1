Ext.define('Views.SplashView.model.SplashViewModel', {
    extend: 'ICD.Ext.data.Model',
    fields: [
        'width',
        'height',
        { name: 'modal', type: 'boolean' },
        'contentTemplate'
    ]
});