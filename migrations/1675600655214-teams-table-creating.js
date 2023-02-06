async function up(pool) {
  try {
    const query = `
    CREATE TYPE TEAM_STATUS as ENUM('active','deactive','blocked','pending');

    CREATE TABLE IF NOT EXISTS teams(
      id SERIAL PRIMARY KEY,
      "leaderId" INT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
      name VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      status TEAM_STATUS NOT NULL DEFAULT 'pending',
      "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
    const query = 'DROP TABLE IF EXISTS teams;';
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
