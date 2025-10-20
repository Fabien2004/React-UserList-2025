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
        const { country, city, street, streetNumber } = userData;

        const postData = {
            ...userData,
            address: { country, city, street, streetNumber },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

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
        const response = await fetch(`${baseUrl}/${userId}`,{
            method: 'DELETE'
        });
        return await response.json();
    },
};