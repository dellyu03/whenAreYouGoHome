const { SlashCommandBuilder } = require('discord.js');
const fetchMember = require('../../utility/fetchMember'); // 멤버를 가져오는 커스텀 함수

// 인터랙션 핸들링 함수
async function handleInteraction(interaction) {
    await interaction.deferReply(); // 비동기 작업을 처리하기 위해 응답을 연기합니다.

    const target = interaction.options.getUser('target');
    const guild = interaction.guild;

    if (!guild) {
        console.log('Guild not found.');
        await interaction.editReply('서버 정보를 가져올 수 없습니다.');
        return;
    }

    // fetchMember 함수를 사용하여 멤버 정보를 가져옵니다.
    const member = await fetchMember(guild, target.id);
    if (!member) {
        await interaction.editReply('유저를 찾을 수 없습니다.');
        return;
    }

    try {
        // 모든 역할을 가져오고, 이름을 통해 필터링합니다.
        const roles = member.roles.cache.map(role => role.name);
        const enlistmentRoles = roles.filter(role => role.includes('입대일'));
        const dischargeRoles = roles.filter(role => role.includes('전역일'));

        // 필요에 따라 이곳에서 enlistmentRoles와 dischargeRoles를 저장하거나 처리할 수 있습니다.
        console.log('입대일이 포함된 역할:', enlistmentRoles);
        console.log('전역일이 포함된 역할:', dischargeRoles);

        // 처리 결과를 사용자에게 알립니다.
        await interaction.editReply('역할 정보가 성공적으로 처리되었습니다.');
    } catch (error) {
        console.error(error);
        await interaction.editReply('역할 정보를 가져오는 중 오류가 발생했습니다.');
    }
}

// 명령어 정의 및 모듈 내보내기
module.exports = {
    data: new SlashCommandBuilder()
        .setName('역할조회')
        .setDescription('서버 멤버의 역할을 조회합니다.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('조회할 유저')
                .setRequired(true)),
    async execute(interaction) {
        await handleInteraction(interaction); // 인터랙션 처리 함수 호출
    }
};
