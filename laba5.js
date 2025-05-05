const fs = require('fs').promises;

async function loadConfig(filename) {
    try {
        const data = await fs.readFile(filename, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Помилка при завантаженні конфігурації:", error);
        throw error;
    }
}

module.exports = loadConfig;