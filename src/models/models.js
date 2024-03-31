import pool from "../../db/db.js";

//inicialmente pensé hacerlo asi, pero debe ser con pg format
/* const modelLimit = async (limits=10, page=1, order_by=ASC) => {
    const SQLquery={
        text: 'SELECT * FROM inventario ORDER BY stock $3 LIMIT $1',
        values: [limits, page, order_by]
    };
    const response  = await pool.query(SQLquery);
    return response.rows;
} */

//usando pgformat
import format from 'pg-format';

const modelLimit = async (
    limits = 10, 
    page = 1, 
    order_by = 'stock_ASC',
    ) =>
    {
        const [atribute, order] = order_by.split('_');
        const offset= page*limits;
        const formatedQuery = format(
        'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', 
        atribute, 
        order, 
        limits, 
        offset
        );
            console.log(formatedQuery);
    const response = await pool.query(formatedQuery);
    return response.rows;
}

/* const modelFilter = async (
    precio_max, 
    precio_min, 
    categoria, 
    metal
    ) => {
        let filtros = [];
        if (precio_max) filtros.push(`precio <= ${precio_max}`);
        if (precio_min) filtros.push(`precio >= ${precio_min}`);
        if (categoria) filtros.push(`categoria = ${categoria}`);
        if (metal) filtros.push(`metal = ${metal}`);
        let consulta= "SELECT * FROM inventario";
        if (filtros.length>0) {
            filtros=filtros.join(' AND ');
            consulta+= ` WHERE ${filtros}`;
        }
        const {rows: joyasFiltradas} = await pool.query(consulta);
        return joyasFiltradas;
} */


const modelFilter = async (
    precio_max, 
    precio_min, 
    categoria, 
    metal,
    limits = 10, 
    page = 1
) => {
    let filtros = [];
    let params = [];
    if (precio_max) {
        filtros.push(`precio <= $${params.length + 1}`);
        params.push(precio_max);
    }
    if (precio_min) {
        filtros.push(`precio >= $${params.length + 1}`);
        params.push(precio_min);
    }
    if (categoria) {
        filtros.push(`categoria = $${params.length + 1}`);
        params.push(categoria);
    }
    if (metal) {
        filtros.push(`metal = $${params.length + 1}`);
        params.push(metal);
    }
    let consulta= "SELECT * FROM inventario";
    if (filtros.length>0) {
        filtros=filtros.join(' AND ');
        consulta+= ` WHERE ${filtros}`;
    }

    // Add pagination
    const offset = (page - 1) * limits;
    consulta += format(' ORDER BY id LIMIT %L OFFSET %L', limits, offset);

    const {rows: joyasFiltradas} = await pool.query(consulta, params);
    return joyasFiltradas;
};

export { modelLimit, modelFilter };