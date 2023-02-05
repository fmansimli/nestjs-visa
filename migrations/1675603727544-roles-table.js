async function up(pool) {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS roles(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      isActive BOOLEAN NOT NULL DEFAULT FALSE
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
    const query = 'DROP TABLE IF EXISTS roles;';
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
