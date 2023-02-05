async function up(pool) {
  try {
    const query = `
    CREATE TYPE PROJECT_STATUS AS ENUM('active','deactive','pending','completed');

    CREATE TABLE IF NOT EXISTS projects(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      requirements TEXT NOT NULL,
      doc VARCHAR(500),
      status PROJECT_STATUS NOT NULL DEFAULT 'pending',
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      teamId INT NOT NULL REFERENCES teams(id) ON DELETE SET NULL
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
    const query = 'DROP TABLE IF EXISTS projects;';
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
