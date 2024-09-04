// utility/roleUtils.js

/**
 * 멤버의 역할 중 '입대일' 또는 '전역일'이 포함된 역할을 구분하는 함수
 * @param {GuildMember} member - 역할을 확인할 서버 멤버 객체
 * @returns {Object} - '입대일'과 '전역일'이 포함된 역할을 각각 배열로 반환
 */
function classifyRoles(member) {
    // 멤버의 모든 역할을 가져옵니다.
    const roles = member.roles.cache.map(role => role.name);

    // 역할 이름에 '입대일'이 포함된 역할들을 필터링합니다.
    const enlistmentRoles = roles.filter(role => role.includes('입대일'));

    // 역할 이름에 '전역일'이 포함된 역할들을 필터링합니다.
    const dischargeRoles = roles.filter(role => role.includes('전역일'));

    // 구분된 역할들을 객체 형태로 반환합니다.
    return {
        enlistmentRoles,
        dischargeRoles,
    };
}

module.exports = {
    classifyRoles,
};
