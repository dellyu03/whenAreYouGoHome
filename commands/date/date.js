const { SlashCommandBuilder } = require('discord.js');
const { guildId } = require('../../config.json');
const {formatDate, calculateDateDifferences, sliceDate} = require('../../utility/dateUtils.js');

const today = new Date();

// 날짜 형식 설정
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}년 ${month}월 ${day}일`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('날짜')
        .setDescription('유저의 입대일, 전역일이 언제인지 알려주거나 오늘 날짜와 비교합니다. (개발중)')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('등록할 유저')
                .setRequired(true))
        .addStringOption(option =>
		option.setName('choice')
			.setDescription('알림 혹은 오늘 날짜와 비교')
			.setRequired(true)
			.addChoices(
				{ name: '알림', value: 'notice' },
				{ name: '비교', value: 'compare' },
			))
        .addStringOption(option =>
		option.setName('day')
			.setDescription('입대일 혹은 전역일')
			.setRequired(true)
			.addChoices(
				{ name: '입대일', value: 'enlistmentDate' },
				{ name: '전역일', value: 'dischargeDate' },
			)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const enlistmentDate = interaction.options.getNumber('enlistmentdate');
        const date = sliceDate(enlistmentDate);
        const guild = interaction.guild;
        const choice = interaction.options.getString('choice');
        var day = interaction.options.getString('day');
        
        if (day == "enlistmentDate") {
            day = "입대일"
        }else if (day == "dischargeDate") {
            day = "전역일"
        }

        if (choice == "notice") {
            await interaction.reply(`개발중입니다!`)
        }else if (choice == "compare") {
            var today = '2024-09-01';
            const dday = '2023-02-14';
            res = calculateDateDifferences(today, dday)
            await interaction.reply(`${day}까지 ${res}!`)
        }
    }
};