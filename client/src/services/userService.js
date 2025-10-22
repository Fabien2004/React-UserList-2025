const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAll() {
        const response = await fetch(baseUrl);
        const result = await response.json();
        const users = Object.values(result);
        return users;
    },

    async getOne(userId) {
        const response = await fetch(`${baseUrl}/${userId}`);
        const user = await response.json();
        return user;
    },

    async create(userData) {
        const postData = transformedUserData(userData);

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        return await response.json();
    },
    async delete(userId) {
        const response = await fetch(`${baseUrl}/${userId}`, {
            method: 'DELETE'
        });
        return await response.json();
    },
    async update(userId, userData) {
        const postData = transformedUserData(userData);
        postData._id = userId;
        const response = await fetch(`${baseUrl}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const result = await response.json();
        return result;
    }
};
function transformedUserData(userData) {
    const { country, city, street, streetNumber, ...transformedData } = userData;

    transformedData.address = { country, city, street, streetNumber };
    transformedData.createdAt = new Date().toISOString(),
    transformedData.updatedAt = new Date().toISOString()
    return transformedData;

}