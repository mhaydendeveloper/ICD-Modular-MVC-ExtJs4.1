/**
*
* This class is entended to be used as a mixin, not as an extendable super class.
* The call back function is used to "construct" this class by calling "prepareClass" method.
*/
Ext.define('ICD.BaseView', {
    requires: [
        'ICD.mixins.BaseMixin'
    ],
    mixins: {
        baseMixin: 'ICD.mixins.BaseMixin'
    },

    statics: {
        prepareClass: function () {
            if (this.prototype.mixins.baseMixin && this.prototype.mixins.baseMixin.constructor) {
                this.prototype.mixins.baseMixin.constructor();
            }
        }
    }
}, function () { // fyi: callback function
    var baseView = this;
    var prepareMixin = function (T) {
        var proto = T.prototype;

        // Classes that use us as a mixin (best practice) need to be prepared.
        baseView.prepareClass(T, this);

        // Now that we are mixed in to class T, we need to watch T for derivations
        // and prepare them also.
        T.onExtended(function (U) {
            baseView.prepareClass(U);
        });

        // Also, if a class uses us as a mixin and that class is then used as
        // a mixin, we need to be notified of that as well.
        if (proto.onClassMixedIn) {
            // play nice with other potential overrides...
            Ext.override(T, {
                onClassMixedIn: function (U) {
                    prepareMixin.call(this, U);
                    this.callParent(arguments);
                }
            });
        } else {
            // just us chickens, so add the method...
            proto.onClassMixedIn = function (U) {
                prepareMixin.call(this, U);
            };
        }
    };
    Ext.apply(ICD.BaseView.prototype, {
        onClassMixedIn: prepareMixin
    });
});