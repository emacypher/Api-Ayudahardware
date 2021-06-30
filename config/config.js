require('dotenv').config()

module.exports = {
    "development": {
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database":  process.env.DATABASE,
        "host": process.env.DATABASE_HOST,
        "port": process.env.DATABSE_PORT,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.DATABASE_HOST,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.DATABASE_HOST,
        "dialect": "mysql"
    }
}