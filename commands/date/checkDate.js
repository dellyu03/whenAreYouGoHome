// commands/checkRoleDate.js
const { SlashCommandBuilder } = require('discord.js');
const { classifyRoles } = require('../../utility/roleUtils');
const fetchMember = require('../../utility/fetchMember');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('조회')
        .setDescription('서버 멤버의 입대일 또는 전역일을 조회합니다.')
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
                .setDescription('조회할 유저')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply(); // 비동기 작업을 처리하기 위해 응답을 연기합니다.

        const 기준 = interaction.options.getString('기준');
        const target = interaction.options.getUser('target');
        const guild = interaction.guild;

        if (!guild) {
            console.log('Guild not found.');
            await interaction.editReply('서버 정보를 가져올 수 없습니다.');
            return;
        }

        try {
            // fetchMember 함수를 사용하여 멤버 객체를 가져옵니다.
            const member = await fetchMember(guild, target.id);

            if (!member) {
                await interaction.editReply('유저를 찾을 수 없습니다.');
                return;
            }

            // classifyRoles 함수를 사용하여 역할을 구분합니다.
            const { enlistmentRoles, dischargeRoles } = classifyRoles(member);
            let relevantRoles = 기준 === '입대일' ? enlistmentRoles : dischargeRoles;

            if (relevantRoles.length === 0) {
                await interaction.editReply(`${기준}이 포함된 역할을 찾을 수 없습니다.`);
                return;
            }

            const relevantRole = relevantRoles[0]; // 첫 번째 관련 역할 사용
            const dateMatch = relevantRole.match(/\d{2}-\d{2}-\d{2}/);

            if (!dateMatch) {
                await interaction.editReply(`${기준} 날짜 형식을 찾을 수 없습니다.`);
                return;
            }

            const relevantDate = dateMatch[0]; // YY-MM-DD 형식의 날짜 추출
            const displayName = member.nickname || target.username;
            const response = `${displayName}님의 ${기준}은 ${relevantDate}입니다.`;

            await interaction.editReply(response);
        } catch (error) {
            console.error('Error fetching roles or calculating date:', error);
            await interaction.editReply('역할 정보를 가져오거나 날짜를 계산하는 중 오류가 발생했습니다.');
        }
    }
};
