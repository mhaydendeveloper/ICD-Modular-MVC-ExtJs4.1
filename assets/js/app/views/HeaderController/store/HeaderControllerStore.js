Ext.define('Views.HeaderController.store.HeaderControllerStore', {
    extend: 'ICD.Ext.data.Store',
    requires: [
        'Views.HeaderController.model.HeaderControllerModel'
    ],
    model: 'Views.HeaderController.model.HeaderControllerModel',

    /**
    * Get store's data
    * 
    * @returns object data
    */
    getHeaderControllerStoreData: function () {
        var data;
        if (this.getAt(0) && this.getAt(0).getData()) {
            data = this.getAt(0).getData();
        } else {
            console.error("HeaderControllerStore::getHeaderControllerStoreData: There is no data in the HeaderControllerStore");
        }
        return data;
    }
});