Ext.define('Viewer.base.Store', {
    extend: 'ICD.BaseStore',

    getStoreJsonData: function () {
        var data = Ext.pluck(this.data.items, 'data');
        if (!data) {
            this.logError("BaseStore::getStoreJsonData: data is undefined");
        } else if (Ext.isArray(data) && data.length == 1) {
            data = data[0];
        }

        return data;
    }
});