const { SlashCommandBuilder } = require('discord.js');
const { sliceDate } = require('../../utility/getDate.js');
const { guildId } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('입대일등록')
        .setDescription('입대일을 입력하세요')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('등록할 유저')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('enlistmentdate')
                .setDescription('입대일 입력 ex) 230214')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const enlistmentDate = interaction.options.getNumber('enlistmentdate');
        const date = sliceDate(enlistmentDate);

        // interaction.guild를 사용하여 서버 정보 가져오기
        const guild = interaction.guild;

        if (!guild) {
            console.log('Guild not found.');
            await interaction.reply('서버 정보를 가져올 수 없습니다.');
            return;
        }

        try {
            // 멤버 정보를 가져옵니다.
            const member = await guild.members.fetch(target.id);

            if (member) {
                // 새로운 역할 생성
                const role = await guild.roles.create({
                    name: `입대일 : ${date}`,  // 역할 이름
                });

                console.log(`Created new role with name ${role.name}`);

                // 생성된 역할을 멤버에게 추가
                await member.roles.add(role);
                console.log(`Role ${role.name} has been added to user ${member.user.tag}.`);

                const nickname = member.nickname || target.username;
                await interaction.reply(`입대일이 성공적으로 "${guild.name}" 서버에 기록되었습니다.`);
                await interaction.followUp(`태풍! ${nickname}님의 입대일은 ${date}입니다!`);
            } else {
                console.log('User not found.');
                await interaction.reply('유저를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('Failed to fetch member or add role:', error);
            await interaction.reply('멤버 정보를 가져오거나 역할을 추가하는 중 오류가 발생했습니다.');
        }
    }
};