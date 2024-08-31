const { SlashCommandBuilder, GuildMember, RoleManager, Guild, Client, GatewayIntentBits} = require('discord.js');
const { sliceDate } = require('../../utility/getDate.js')
const {guildId} = require('../../config.json')

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
        const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
        const guild = client.guilds.cache.get(guildId);
        
        const target = interaction.options.getUser('target');
        const enlistmentDate = interaction.options.getNumber('enlistmentdate');
        const date = sliceDate(enlistmentDate);
        
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);
        const nickname = member ? member.nickname || user.username : taget.username ;

        await interaction.reply(`입대일이 성공적으로 "${interaction.guild.name}"서버에 기록되었습니다.`);
        await interaction.followUp(`태풍! ${nickname}님의 입대일은 ${date}입니다!`);
    }
};