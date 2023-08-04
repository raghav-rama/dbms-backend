import mysql from 'mysql2/promise';

export async function connect() {
    const connection = await mysql.createConnection({
        user: 'root',
        host: 'localhost',
        port: 3306,
        database: 'shop',
        password: '123',
    });
    return connection;
}

