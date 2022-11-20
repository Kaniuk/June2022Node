const fs = require("fs/promises");
const path = require("path");

const usersFilePath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {

    reader: async () => {

        const buffer = await fs.readFile(usersFilePath);
        return JSON.parse(buffer.toString());
    },
    writer: async (users) => {
        await fs.writeFile(usersFilePath, JSON.stringify(users));

    },
};