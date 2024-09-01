// commands/registerDischargeDate.js
const { SlashCommandBuilder } = require('discord.js');
const { sliceDate } = require('../../utility/dateUtils.js');
const fetchMember = require('../../utility/fetchMember');
const createRole = require('../../utility/createRole');
const assignRoleToMember = require('../../utility/assignRoleToMember');

async function handleInteraction(interaction) {
    await interaction.deferReply(); // 초기 응답을 지연시킵니다.

    const target = interaction.options.getUser('target');
    const enlistmentDate = interaction.options.getNumber('enlistmentdate'); // 입대일 관련 변수명으로 수정
    const date = sliceDate(enlistmentDate);

    const guild = interaction.guild;
    if (!guild) {
        console.log('Guild not found.');
        await interaction.editReply('서버 정보를 가져올 수 없습니다.'); // 변경된 응답
        return;
    }

    const member = await fetchMember(guild, target.id);
    if (!member) {
        await interaction.editReply('유저를 찾을 수 없습니다.'); // 변경된 응답
        return;
    }

    try {
        const roleName = `입대일 : ${date}`; // 역할 이름 수정
        const role = await createRole(guild, roleName);
        await assignRoleToMember(member, role);

        const nickname = member.nickname || target.username;
        await interaction.editReply(`입대일이 성공적으로 "${guild.name}" 서버에 기록되었습니다.`); // 변경된 응답
    } catch (error) {
        await interaction.editReply('멤버 정보를 가져오거나 역할을 추가하는 중 오류가 발생했습니다.'); // 변경된 응답
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('입대일등록') // 명령어 이름 수정
        .setDescription('입대일을 역할에 등록합니다.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('등록할 유저')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('enlistmentdate') // 옵션 이름 수정
                .setDescription('입대일 입력 ex) 240813')
                .setRequired(true)),
    async execute(interaction) {
        await handleInteraction(interaction);
    }
};
