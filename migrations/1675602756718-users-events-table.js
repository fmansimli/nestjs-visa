async function up(pool) {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS users_events(
      userId INT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
      eventId INT NOT NULL REFERENCES events(id) ON DELETE SET NULL,
      PRIMARY KEY(userId,eventId)
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
    const query = 'DROP TABLE IF EXISTS users_events;';
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
