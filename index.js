const readline = require('readline');
const fs = require('fs');
const loadConfig = require('./laba5');
const getDataFromApi = require('./api'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    try {

        const config = await loadConfig('config.json');
        const apiKey = config.api_key;

       
        rl.question('Введіть параметр пошуку: ', async (query) => {
        
            const data = await getDataFromApi(`https://jsonplaceholder.typicode.com/posts`, apiKey);

            console.log('Перші 3 результати:');
            data.slice(0, 5).forEach(item => {
                console.log(`Заголовок: ${item.title}`);
                console.log(`Опис: ${item.body}\n`);
            });

          
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
