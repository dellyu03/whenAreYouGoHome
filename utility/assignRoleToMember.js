// utility/assignRoleToMember.js
async function assignRoleToMember(member, role) {
    try {
        await member.roles.add(role);
        console.log(`Role ${role.name} has been added to user ${member.user.tag}.`);
    } catch (error) {
        console.error('Failed to add role to member:', error);
        throw error;
    }
}

module.exports = assignRoleToMember;
