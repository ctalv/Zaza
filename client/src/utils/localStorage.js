function setStorage(storageKey, value) {
    return localStorage.setItem(storageKey, JSON.stringify(value))
}

function removeItem(storageKey, array, id) {
    let storage;

    if (localStorage.getItem(storageKey) === null) {
        storage = []
    } else {
        // Any id in the list that matches index is taken out of array
        const newItem = array.splice(JSON.parse(1, array.indexOf(id)))
        storage =  localStorage.setItem(storageKey, JSON.stringify(newItem))
    }

    return storage
}

function getStorage(storageKey) {
    let storage;

    if (localStorage.getItem(storageKey) === null) {
        storage = []
    } else {
        storage =  JSON.parse(localStorage.getItem(storageKey))
    }

    return storage
}


module.exports = { setStorage, getStorage, removeItem }
