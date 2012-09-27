Ext.define('ICD.mixins.ConsoleMixin', {
    /**
    * Log Log
    * @params String message
    */
    logMessage: function (message) {
        Ext.log({ msg: message, level: 'log' });
    },
    /**
    * Log Error
    * @param string message
    */
    logError: function (message) {
        Ext.log({ msg: message, level: 'error' });
    },

    /**
    * Log info
    * @param string message
    */
    logInfo: function (message) {
        Ext.log({ msg: message, level: 'info' });
    },

    /**
    * Log warning
    * @param string message
    */
    logWarning: function (message) {
        Ext.log({ msg: message, level: 'warn' });
    },

    /**
    * Log the object as a string. Message is optional
    * @param object object
    * @param string message nullable
    */
    logDump: function (object, message) {
        message = (message) ? message : '';
        Ext.log({ dump: object, msg: message, level: 'log' });
    }
});