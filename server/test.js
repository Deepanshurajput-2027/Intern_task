const { Store, Rating, sequelize } = require('./server/src/models');
const { Op } = require('sequelize');

async function test() {
    const where = {};
    const sort = { field: 'overallRating', order: 'DESC' };
    let order = [];
    if (sort.field === 'overallRating') {
        order.push([sequelize.literal('overallRating'), sort.order || 'DESC']);
    } else if (sort.field) {
        order.push([sort.field, sort.order || 'ASC']);
    } else {
        order.push(['name', 'ASC']);
    }

    try {
        const { count, rows } = await Store.findAndCountAll({
            where,
            order,
            limit: 12,
            offset: 0,
            attributes: [
                'id',
                'name',
                'address',
                [sequelize.fn('AVG', sequelize.col('ratings.rating')), 'overallRating']
            ],
            include: [
                {
                    model: Rating,
                    as: 'ratings',
                    attributes: []
                }
            ],
            group: ['Store.id'],
            subQuery: false
        });
        
        console.log("Count:", count);
        console.log("Rows length:", rows.length);
    } catch (e) {
        console.error("ERROR:", e);
    } finally {
        process.exit();
    }
}

test();
