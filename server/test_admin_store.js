require('dotenv').config();
const axios = require('axios');

async function testAdminCreateStore() {
    try {
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@demo.com',
            password: 'admin123'
        });
        const token = loginRes.data.data.token;

        const storeRes = await axios.post('http://localhost:5000/api/admin/stores', {
            name: 'New Admin Store',
            email: 'newadminstore@demo.com',
            address: '456 Admin St',
            ownerId: 2 // Assuming the owner we created in seed.js has ID 2, or wait, we need a valid ownerId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Success:", storeRes.data);
    } catch (e) {
        console.error("Error:", e.response ? JSON.stringify(e.response.data, null, 2) : e.message);
    }
}

testAdminCreateStore();
