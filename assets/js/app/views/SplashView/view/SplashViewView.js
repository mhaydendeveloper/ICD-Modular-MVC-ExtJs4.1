Ext.define('Views.SplashView.view.SplashViewView', {
    extend: 'ICD.Ext.window.Window',
    alias: 'widget.splashViewView',

    requires: [
        'ICD.Ext.layout.container.Accordion',
        'ICD.Ext.panel.Panel'
    ],


    width: 500,
    height: 300,
    layout: {
        type: 'border',
        padding: 5
    },
    title: 'Getting Started :: iCloud Developers Modular MVC Viewer - ExtJS 4.1 Application',
    items: [{
        title: 'Table of Contents',
        itemId: 'toc',
        collapsible: true,
        region: 'west',
        width: 200,
        split: true,
        items: [
            {
                xtype: 'L3Panel',
                itemId: 'tocAccordion',
                title: '',
                layout: 'L3Accordion',
                defaults: {
                    // applied to each contained panel
                    bodyStyle: 'padding:15px'
                },
                layoutConfig: {
                    // layout-specific configs go here
                    titleCollapse: false,
                    animate: true,
                    activeOnTop: true
                },
                items: [{
                    title: 'Introduction',
                    html: 'Getting Started'
                }, {
                    title: 'Panel 2',
                    html: 'Panel content!'
                }, {
                    title: 'Panel 3',
                    html: 'Panel content!'
                }, {
                    title: 'Panel 4',
                    html: 'Panel content!'
                }, {
                    title: 'Panel 5',
                    html: 'Panel content!'
                }, {
                    title: 'Panel 6',
                    html: 'Panel content!'
                }, {
                    title: 'Panel 7',
                    html: 'Panel content!'
                }]
            }
        ]
    }, {
        title: 'Getting Started',
        region: 'center',
        html: 'Welcome to the iCloud Developers Modular MVC Viewer.<br /> An ExtJS 4.1 Application'
    }]
});