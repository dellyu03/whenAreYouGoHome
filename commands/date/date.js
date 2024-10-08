// commands/enlistmentDday.js
const { SlashCommandBuilder } = require('discord.js');
const { classifyRoles } = require('../../utility/roleUtils.js');
const { calculateDday } = require('../../utility/dateUtils.js');
const fetchMember = require('../../utility/fetchMember');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('디데이')
        .setDescription('서버 멤버의 입대일 또는 전역일을 기준으로 D-Day를 계산합니다.')
        .addStringOption(option =>
            option
                .setName('기준')
                .setDescription('입대일 또는 전역일 중 선택')
                .setRequired(true)
                .addChoices(
                    { name: '입대일', value: '입대일' },
                    { name: '전역일', value: '전역일' },
                ))
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('디데이를 확인할 유저')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        const 기준 = interaction.options.getString('기준');
        const target = interaction.options.getUser('target');
        const guild = interaction.guild;

        if (!guild) {
            console.log('Guild not found.');
            await interaction.editReply('서버 정보를 가져올 수 없습니다.');
            return;
        }

        try {
            const member = await fetchMember(guild, target.id);

            if (!member) {
                await interaction.editReply('유저를 찾을 수 없습니다.');
                return;
            }

            // 기준에 따라 역할을 분류하고 해당 역할을 찾습니다.
            const { enlistmentRoles, dischargeRoles } = classifyRoles(member);
            let relevantRoles = 기준 === '입대일' ? enlistmentRoles : dischargeRoles;

            if (relevantRoles.length === 0) {
                await interaction.editReply(`${기준}이 포함된 역할을 찾을 수 없습니다.`);
                return;
            }

            const relevantRole = relevantRoles[0]; // 첫 번째 관련 역할 사용
            const dateMatch = relevantRole.match(/\d{2}-\d{2}-\d{2}/);

            if (!dateMatch) {
                await interaction.editReply(`${기준} 형식을 찾을 수 없습니다.`);
                return;
            }

            const relevantDate = dateMatch[0].replace(/-/g, ''); // 날짜에서 하이픈을 제거하여 YYMMDD 형식으로 변환
            const dDay = calculateDday(relevantDate);

            await interaction.editReply(`${member.nickname || target.username}님의 ${기준}은 ${dDay}입니다.`);
        } catch (error) {
            console.error('Error fetching roles or calculating D-Day:', error);
            await interaction.editReply('역할 정보를 가져오거나 D-Day를 계산하는 중 오류가 발생했습니다.');
        }
    }
};
