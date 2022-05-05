import { pool } from "./src/Utils/db.js";

const select = async () => {
  let sql = "SELECT * FROM score ORDER BY high_score DESC LIMIT 10;";
  const result = await pool.query(sql);
  return result.rows;
};

select();
