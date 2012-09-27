Ext.define('ICD.mixins.EventMixin', {

    bindings: [],

    constructor: function (config) {
        var that = this;
        Ext.EventManager.on(window, 'beforeunload', this.onWindowBeforeUnload, this);

        Ext.EventManager.on(window, 'unload', this.onWindowUnload, this);
    },

    onWindowBeforeUnload: function () {
        this.dispose();
    },

    onWindowUnload: function () {
        this.dispose();
    },

    /**
    * Method to bind to an event triggered by an Object
    * @params object object (i.e component, class instance, etc.)
    * @params object config ( example:
    {
    cellClick: {fn: this.onCellClick, scope: this, single: true},
    mouseover: {fn: panel.onMouseOver, scope: panel},
    mouseout: this.onMouseOut,
    scope: this // Important. Ensure "this" is correct during handler execution
    }
    )
    * @params function callback
    */
    bindTo: function (object, config) {
        object.on(config);
        this.bindings.push({ object: object, config: config });
    },

    /**
    * Method to unbind to an event triggered by an object
    *
    */
    unbind: function (object, eventName) {
        for (var i = 0; i < this.bindings.length; i++) {
            if (object == this.bindings[i].object && this.bindings[i].config[eventName] != undefined) {
                object.un(this.bindings[i].config);
                break;
            }
        }
    },
    /**
    * General way to unbind all events bound to by the bindTo() method
    */
    unbindFromAll: function () {
        Ext.Array.forEach(this.bindings, function (binding) {
            binding.object.un(binding.config);
        });
        this.bindings = [];
    },
    /**
    * Unbind all events this view is bound to.
    * Unbind all listeners to events from this view
    * Remove view using backbone view.remove() method to remove this.el from DOM and remove DOM events
    */
    dispose: function () {
        this.unbindFromAll(); // this will unbind all events that this view has bound to 
        if (this.clearListeners) {
            this.clearListeners(); // this will unbind all listeners to events from this view. This is probably not necessary because this view will be garbage collected.
        }
        if (this.destroy) {
            this.destroy(); // uses the default Backbone.View.remove() method which removes this.el from the DOM and removes DOM events.
        }
    },

    /**
    * Check if an HTML Element exists
    * @params string locator example: '.className' || '#elementId'
    */
    exists: function (locator) {
        //        if ($(locator).length > 0) {
        //            return true;
        //        }
        //        return false;
    }
});

