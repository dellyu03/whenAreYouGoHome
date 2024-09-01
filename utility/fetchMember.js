// utility/fetchMember.js
async function fetchMember(guild, userId) {
    try {
        const member = await guild.members.fetch(userId);
        return member;
    } catch (error) {
        console.error('Failed to fetch member:', error);
        return null;
    }
}

module.exports = fetchMember;
