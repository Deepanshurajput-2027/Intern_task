require('dotenv').config();
const { User, sequelize } = require('./src/models');
const bcrypt = require('bcrypt');

async function createAdmin() {
    try {
        await sequelize.authenticate();
        const adminPassword = await bcrypt.hash('admin123', 10);
        
        await User.findOrCreate({
            where: { email: 'admin@demo.com' },
            defaults: {
                name: 'System Admin',
                password: adminPassword,
                role: 'ADMIN',
                address: 'HQ'
            }
        });
        console.log("Admin account created: admin@demo.com / admin123");
    } catch (e) {
        console.error("Failed to create admin:", e);
    } finally {
        process.exit();
    }
}

createAdmin();
