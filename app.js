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
});