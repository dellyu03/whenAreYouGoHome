const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('전역일등록')
        .setDescription('전역일을 입력하세요')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('등록할 유저')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('dischargedate')
                .setDescription('전역일 입력 ex) 240813')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const dischargeDate = interaction.options.getNumber('dischargedate');

        await interaction.reply(`전역일이 성공적으로 "${interaction.guild.name}"서버에 기록되었습니다.`);
        await interaction.followUp(`태풍! ${target.username}의 전역일은 ${dischargeDate}입니다!`);
    }
};