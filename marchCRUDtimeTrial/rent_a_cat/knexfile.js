require('dotenv').config();
module.exports = {
     development: {
       client: 'pg',
       connection: 'postgres://localhost/rental_cats'
     },
     production:{
       client: 'pg',
       connection: process.env.DATABASE_URL + '?ssl=true'
     }
};
