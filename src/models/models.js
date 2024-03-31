import pool from "../../db/db.js";

import format from 'pg-format';

const modelLimit = async (
    limits = null, 
    page = 1, 
    order_by = 'id_ASC',
    ) =>
    {
        const [atribute, order] = order_by.split('_');
        const offset= (page-1)*limits;
        console.log(offset);
        
        const formatedQuery = format(
        'SELECT * FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L', 
        atribute, 
        order, 
        limits, 
        offset
        );
    /* const response = await pool.query(query); */
    const response = await pool.query(formatedQuery);
    console.log(response);
    return response.rows;
}



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