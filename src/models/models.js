import pool from "../../db/db.js";

const modelLimit = async (limit=10) => {
    const SQLquery={
        text: 'SELECT * FROM inventario LIMIT $1',
        values: [limit]
    };
    const response  = await pool.query(SQLquery);
    return response.rows;
}


export { modelLimit };