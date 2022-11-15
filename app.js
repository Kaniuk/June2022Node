/*
const fs = require('node:fs');


fs.readdir('./girls', {withFileTypes: true}, (err, files) => {
    console.log(err);
    for (const file of files) {
        fs.readFile(`./girls/${file.name}`, (err, data) => {
            console.log(err);
            const person = JSON.parse(data.toString());
            if (person.gender === 'male') {
                fs.rename(`./girls/${file.name}`, `./boys/${file.name}`, (err) => {
                    console.log(err);
                });
            }
        });
    }
});

fs.readdir('./boys', {withFileTypes: true}, (err, files) => {
    console.log(err);
    for (const file of files) {
        fs.readFile(`./boys/${file.name}`, (err, data) => {
            console.log(err);
            if (JSON.parse(data.toString()).gender === 'female') {
                fs.rename(`./boys/${file.name}`, `./girls/${file.name}`, (err) => {
                    console.log(err);
                });
            }
        });
    }
});*/
const fs = require('fs/promises');
const path = require('path');

const sorter = async (readFolder, writeFolder, gender) => {
    try {
        const folderPath = path.join(__dirname, readFolder);

        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const data = await fs.readFile(filePath);
            const user = JSON.parse(data);

            if (user.gender === gender) {
                await fs.rename(filePath, path.join(__dirname, writeFolder, file));
            }
        }
    } catch (e) {
        console.error(e);
    }
};

sorter('boys', 'girls', 'female');
sorter('girls', 'boys', 'male');