module.exports = {
    PORT: process.env.PORT,
    DB: {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DBNAME,
      host: process.env.DB_HOST,
      dialect: "mysql"
    },
    SECRET: process.env.KEYSECRECT,
    PUBLICSITE : process.env.PUBLICSITE
  };
