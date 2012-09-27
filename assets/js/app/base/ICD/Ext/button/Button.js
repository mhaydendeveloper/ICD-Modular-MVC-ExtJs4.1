Ext.define('ICD.Ext.button.Button', {
    extend: 'Ext.button.Button',

    alias: 'widget.L3Button',

    requires: [
        "ICD.BaseView"
    ],

    mixins: {
        baseView: 'ICD.BaseView'
    },

    fireHandler: function (e) {
        var me = this,
        handler = me.handler;
        if (me.fireEvent('click', me, e) !== false) {
            if (handler) {
                if (typeof handler == 'string') {
                    handler = eval('(' + handler + ')');
                }
                handler.call(me.scope || me, me, e);
            }
            me.blur();
        }
    }
});