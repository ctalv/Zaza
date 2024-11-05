export function pluralize(name, count) {
    if (count === 1) {
        return name;
    }
    return name + 's';
}

export function idbPromise(storeName, method, object) {
    // returns a new Promise that resolves when the IndexedDB operation is completed successfully
    return new Promise((resolve, reject) => {
        // open the 'zaza-shop' database with version 1
        const request = window.indexedDB.open('zaza-shop', 1);
        let db, tx, store;

        // event handler for database uprade (creating object stores)
        request.onupgradeneeded = function (e) {
            const db = request.result;

            // create object stores 
            db.createObjectStore('products', { keyPath: '_id' });
            db.createObjectStore('categories', { keyPath: '_id' });
            db.createObjectStore('cart', { keyPath: '_id' });
        };

        // event handler for error (during database request)
        request.onerror = function (e) {
            console.log('There was an error');
            reject(e); // reject the promise with the error
        };

        // event handler for a successul database request
        request.onsuccess = function (e) {
            db = request.result; // save reference to the opened database
            tx = db.transaction(storeName, 'readwrite'); // create a transaction on the specified object store in 'readwrite' mode
            store = tx.objectStore(storeName); // get the object store instance for the specified store name

            // event handler for any errors during the database transaction
            db.onerror = function (e) {
                console.log('error', e);
            };

            switch (method) {
                case 'put':
                    store.put(object);
                    resolve(object);
                    break;

                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function () {
                        resolve(all.result);
                    };
                    break;

                case 'delete':
                    store.delete(object._id);
                    break;

                case 'deleteAll':
                    store.delete(object);
                    resolve(object)
                    break;

                default:
                    console.log('No valid method');
                    break;
            }

            // event handler for completion of the transaction
            tx.oncomplete = function () {
                // close the database connection when the transaction is complete
                db.close();
            };
        };
    });
}
