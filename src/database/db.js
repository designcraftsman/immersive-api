const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "designcraftsman",
    host: "localhost",
    port: 5432,
    database: "immersive_learning"
});

module.exports = pool;