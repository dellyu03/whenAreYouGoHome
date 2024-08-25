const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('입대일등록')
        .setDescription('당신의 입대일과 전역일을 입력하세요'),
    async execute(interaction) {
        await interaction.reply(`입대일과 전역일 성공적으로 "${interaction.guild.name}"서버에 기록되었습니다.`)
    }
};