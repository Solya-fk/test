const readline = require('readline');
const fs = require('fs');
const loadConfig = require('./laba5'); // Імпортуємо функцію для завантаження конфігурації
const getDataFromApi = require('./api'); // Імпортуємо функцію для отримання даних з API

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    try {
        // Завантажуємо конфігурацію
        const config = await loadConfig('config.json');
        const apiKey = config.api_key;

        // Запитуємо користувача
        rl.question('Введіть параметр пошуку: ', async (query) => {
            // Отримуємо дані з API
            const data = await getDataFromApi(`https://jsonplaceholder.typicode.com/posts`, apiKey);

            // Виводимо перші 3 результати
            console.log('Перші 3 результати:');
            data.slice(0, 5).forEach(item => {
                console.log(`Заголовок: ${item.title}`);
                console.log(`Опис: ${item.body}\n`);
            });

            // Зберігаємо результат у output.json
            fs.writeFile('output.json', JSON.stringify(data, null, 2), (err) => {
                if (err) throw err;
                console.log('Дані збережено у output.json');
            });

            rl.close();
        });
    } catch (error) {
        console.error('Помилка:', error);
    }
}

main();
