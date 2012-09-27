Ext.define('ICD.mixins.BaseMixin', {
    mixins: {
        consoleMixin: 'ICD.mixins.ConsoleMixin',
        eventMixin: 'ICD.mixins.EventMixin'
    },

    initConstructors: function () {
        if (this.mixins.consoleMixin.constructor) {
            this.mixins.consoleMixin.constructor();
        }

        if (this.mixins.eventMixin.constructor) {
            this.mixins.eventMixin.constructor();
        }
    }
});