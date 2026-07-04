require('dotenv').config();
const { Store, User, sequelize } = require('./src/models');
const bcrypt = require('bcrypt');

async function seed() {
    try {
        await sequelize.authenticate();
        console.log("Connected to database.");

        // Check if there are any stores already
        const count = await Store.count();
        if (count > 0) {
            console.log("Database already has stores.");
            process.exit(0);
        }

        // Create an owner
        const ownerPassword = await bcrypt.hash('password123', 10);
        const [owner] = await User.findOrCreate({
            where: { email: 'owner@demo.com' },
            defaults: {
                name: 'Demo Owner',
                password: ownerPassword,
                role: 'STORE_OWNER',
                address: '123 Owner St'
            }
        });

        console.log("Created Store Owner.");

        // Create some stores
        const storesToCreate = [
            { name: 'Apple Store', email: 'apple@example.com', address: '123 Infinite Loop', ownerId: owner.id },
            { name: 'Google Store', email: 'google@example.com', address: '1600 Amphitheatre Pkwy', ownerId: owner.id },
            { name: 'Microsoft Store', email: 'microsoft@example.com', address: '1 Microsoft Way', ownerId: owner.id },
            { name: 'Sony Center', email: 'sony@example.com', address: 'Tokyo, Japan', ownerId: owner.id },
            { name: 'Samsung Experience', email: 'samsung@example.com', address: 'Seoul, South Korea', ownerId: owner.id },
            { name: 'Best Buy', email: 'bestbuy@example.com', address: '7601 Penn Ave S', ownerId: owner.id },
            { name: 'Target', email: 'target@example.com', address: '1000 Nicollet Mall', ownerId: owner.id },
            { name: 'Walmart', email: 'walmart@example.com', address: '702 SW 8th St', ownerId: owner.id },
            { name: 'Costco', email: 'costco@example.com', address: '999 Lake Drive', ownerId: owner.id },
            { name: 'IKEA', email: 'ikea@example.com', address: 'Älmhult, Sweden', ownerId: owner.id }
        ];

        await Store.bulkCreate(storesToCreate);
        console.log(`Created ${storesToCreate.length} stores.`);

    } catch (e) {
        console.error("Seeding failed:", e);
    } finally {
        process.exit();
    }
}

seed();
