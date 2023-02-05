async function up(pool) {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS roles_permissions(
      roleId INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
      permissionId INT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
      PRIMARY KEY(roleId,permissionId)
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
    const query = 'DROP TABLE IF EXISTS roles_permissions;';
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
