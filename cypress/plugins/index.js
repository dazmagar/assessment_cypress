const fs = require('fs');
let globalStore = {};

module.exports = (on, config) => {
    const productFilePath = config.env.productFilePath;

    on('task', {
        setData({ key, value }) {
            globalStore[key] = value;
            return null;
        },
        getData(key) {
            return globalStore[key] || null;
        },
        getAllData() {
            return globalStore;
        },
        saveToFile(data) {
            if (fs.existsSync(productFilePath)) {
                const currentData = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));
                currentData.push(data);
                fs.writeFileSync(productFilePath, JSON.stringify(currentData, null, 2));
            } else {
                fs.writeFileSync(productFilePath, JSON.stringify([data], null, 2));
            }
            return null;
        },
        clearData() {
            globalStore = {};
            return null;
        },
        clearFile() {
            if (fs.existsSync(productFilePath)) {
                fs.writeFileSync(productFilePath, JSON.stringify([], null, 2));
            }
            return null;
        }
    });
};
