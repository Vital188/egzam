const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '16mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tailorshop",
});

////////////////////LOGIN/////////////////

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/server')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    console.log(req.headers['authorization'])
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
              
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login') || 0 === req.url.indexOf('/register')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1 }); // user not logged
        } else {
            if ('admin' === req.query.role) {
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2 }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3 }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4 }); // is user
            }
        }
    });
});

app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.status(401).send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key, text: 'Good to see you ' + req.body.user + ' again.', type: 'info' });
        }
    });
});

app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users (name, psw, session)
    VALUES (?, ?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'ok', key, text: 'Welcome!', type: 'info' });
    });
});

///////////////////END////////////////////


//CREATE
app.post("/server/rubs", (req, res) => {
    const sql = `
    INSERT INTO rubs (cat_id, type, size, color, price, image)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.cat_id, req.body.type,  req.body.size, req.body.color, req.body.price, req.body.image], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'New rub was added.', type: 'success' });
    });
});



app.post("/server/country", (req, res) => {
    const sql = `
    INSERT INTO country (titl, images)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.titl, req.body.images], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'New country was added.', type: 'success' });
    });
});

app.post("/home/orders/:id", (req, res) => {
    const sql = `
    INSERT INTO orders (rubs_id, comment)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.rubs_id,  req.body.comment], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Thank you, good choose!', type: 'info' });
    });
});

// READ (all)
app.get("/server/rubs", (req, res) => {
    const sql = `
    SELECT r.*, c.id AS cid, c.titl, c.images
     FROM rubs AS r
     LEFT JOIN country AS c
     ON r.cat_id = c.id
     ORDER BY r.type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/rubs/cc", (req, res) => {
    const sql = `
    SELECT r.*, c.id AS cid, c.titl, c.images
     FROM rubs AS r
     LEFT JOIN country AS c
     ON r.cat_id = c.id
     ORDER BY r.type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


 app.get("/home/rubs", (req, res) => {
     const sql = `
     SELECT r.*, o.id AS oid, o.orderis
     FROM rubs AS r
     LEFT JOIN orders AS o
     ON o.rubs_id = r.id
     ORDER BY r.type
     `;
     con.query(sql, (err, result) => {
         if (err) throw err;
         res.send(result);
     });
 });

 app.get("/server/country", (req, res) => {
    const sql = `
    SELECT *
    FROM country 
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



 app.get("/rubs/wc", (req, res) => {
    const sql = `
    SELECT rub.*, o.id AS oid, o.orderis, o.comment, o.post
    FROM rubs AS rub
    INNER JOIN orders AS o
    ON o.rubs_id = rub.id
    ORDER BY rub.type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.get("/server/rubs/wc", (req, res) => {
    const sql = `
    SELECT r.*, o.id AS oid, o.orderis
    FROM rubs AS r
    INNER JOIN orders AS o
    ON o.rubs_id = r.id
    ORDER BY r.type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



//DELETE
app.delete("/server/rubs/:id", (req, res) => {
    const sql = `
    DELETE FROM rubs
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Rub was deleted.', type: 'info' });
    });
});

app.delete("/server/country/:id", (req, res) => {
    const sql = `
    DELETE FROM country
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Country was deleted.', type: 'info' });
    });
});

app.delete("/server/orders/:id", (req, res) => {
    const sql = `
    DELETE FROM orders
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Order was removed.', type: 'info' });
    });
});


//EDIT

app.put("/server/orders/:id", (req, res) => {
    const sql = `
    UPDATE orders
    SET orderis = ?, post = ?
    WHERE id = ?
    `;
    con.query(sql, [ req.body.confirmed, req.body.post, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'The order was confirmed', type: 'info' });
    });
});

app.put("/home/rubs/:id", (req, res) => {
    const sql = `
    UPDATE rubs
    SET 
    orderis = ?, im = ?, tit = ?
    WHERE id = ?
    `;
    con.query(sql, [ req.body.confirmed, req.body.im, req.body.tit, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Thanks, for your choose.', type: 'info' });
    });
});
app.put("/server/rubs/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE rubs
        SET type = ?, size = ?, color = ?, price = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.type, req.body.size, req.body.color, req.body.price, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE rubs
        SET type = ?, size = ?, color = ?, price = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.type, req.body.size, req.body.color, req.body.price, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE rubs
        SET type = ?, size = ?, color = ?, price = ?
        WHERE id = ?
        `;
        r = [req.body.type, req.body.size, req.body.color, req.body.price, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'The rub was edited.', type: 'success' });
    });
});

app.put("/server/country/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE country
        SET titl = ?, images = null
        WHERE id = ?
        `;
        r = [req.body.titl,  req.params.id];
    } else if (req.body.images) {
        sql = `
        UPDATE country
        SET titl = ?, images = ?
        WHERE id = ?
        `;
        r = [req.body.titl, req.body.images, req.params.id];
    } else {
        sql = `
        UPDATE country
        SET titl = ?
        WHERE id = ?
        `;
        r = [req.body.titl, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'The country was edited.', type: 'success' });
    });
});

app.listen(port, () => {
    console.log(`Parduotuve rodoma per ${port} portą!`)
});






