async function up(pool) {
  try {
    const query = `
      CREATE TYPE USER_STATUS as ENUM('active','deactive','blocked','pending');

      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        lastname VARCHAR(50),
        firstname VARCHAR(50),
        username VARCHAR(50),
        bio TEXT,
        password VARCHAR(256) NOT NULL,
        "managerId" INT REFERENCES users(id) ON DELETE SET NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        status USER_STATUS NOT NULL DEFAULT 'pending'
      );
    `;
    const result = await pool.query(query, []);

    console.log(`________ ${__filename} ____________`);
    console.log(result);

    //
  } catch (error) {
    console.error(`________ ${__filename} ____________`);
    console.error(error);
    console.error(`__________________________________`);
    throw error;
  }
}

async function down(pool) {
  try {
    const query = 'DROP TABLE IF EXISTS users;';
    const result = await pool.query(query, []);

    console.log(`________ ${__filename} ____________`);
    console.log(result);

    //
  } catch (error) {
    console.error(`________ ${__filename} ____________`);
    console.error(error);
    console.error(`__________________________________`);
    throw error;
  }
}

module.exports.up = up;
module.exports.down = down;
