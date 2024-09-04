const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started deleting all guild commands.');

        // 빈 배열을 body에 전달하여 모든 명령어를 삭제
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });

        console.log('Successfully deleted all guild commands.');
    } catch (error) {
        console.error('Failed to delete guild commands:', error);
    }
})();

(async () => {
    try {
        console.log('Started deleting all global commands.');

        // 빈 배열을 body에 전달하여 모든 전역 명령어를 삭제
        await rest.put(Routes.applicationCommands(clientId), { body: [] });

        console.log('Successfully deleted all global commands.');
    } catch (error) {
        console.error('Failed to delete global commands:', error);
    }
})();