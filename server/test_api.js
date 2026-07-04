require('dotenv').config();
const axios = require('axios');
const { User, sequelize } = require('./src/models');
const bcrypt = require('bcrypt');

async function testAPI() {
    try {
        await sequelize.authenticate();
        const userPassword = await bcrypt.hash('password123', 10);
        
        await User.findOrCreate({
            where: { email: 'testuser@demo.com' },
            defaults: {
                name: 'Test User',
                password: userPassword,
                role: 'USER',
                address: '123 Test St'
            }
        });

        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'testuser@demo.com',
            password: 'password123'
        });
        const token = loginRes.data.data.token;

        const storesRes = await axios.get('http://localhost:5000/api/stores?limit=1', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(JSON.stringify(storesRes.data, null, 2));
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
    } finally {
        process.exit();
    }
}

testAPI();
