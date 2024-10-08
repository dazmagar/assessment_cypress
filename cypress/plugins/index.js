const fs = require('fs');
const path = require('path');
let globalStore = {};

module.exports = (on, config) => {
    const testResDir = config.env.testResDir;

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
            const filePath = path.join(testResDir, 'productInfo.json');
            if (fs.existsSync(filePath)) {
                const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                currentData.push(data);
                fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
            } else {
                fs.writeFileSync(filePath, JSON.stringify([data], null, 2));
            }
            return null;
        },
        clearData() {
            globalStore = {};
            return null;
        },
        clearTestResDir() {
            if (fs.existsSync(testResDir)) {
                fs.readdirSync(testResDir).forEach(file => {
                    const filePath = path.join(testResDir, file);
                    if (fs.lstatSync(filePath).isDirectory()) {
                        fs.rmdirSync(filePath, { recursive: true });
                    } else {
                        fs.unlinkSync(filePath);
                    }
                });
            }
            return null;
        }
    });
};
