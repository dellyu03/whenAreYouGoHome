// utility/createRole.js
async function createRole(guild, roleName) {
    // 역할이 이미 있는지 확인
    let role = guild.roles.cache.find(r => r.name === roleName);
    if (role) {
        console.log(`Found existing role with name ${role.name}`);
        return role;
    }

    // 역할이 없으면 새로 생성
    try {
        role = await guild.roles.create({
            name: roleName
        });
        console.log(`Created new role with name ${role.name}`);
        return role;
    } catch (error) {
        console.error('Failed to create role:', error);
        throw error;
    }
}

module.exports = createRole;