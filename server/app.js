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
    database: "knygos",
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
app.post("/server/book", (req, res) => {
    const sql = `
    INSERT INTO book (cat_id, type, years, image)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.cat_id, req.body.type, req.body.years, req.body.image], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'New book was added.', type: 'success' });
    });
});



app.post("/server/category", (req, res) => {
    const sql = `
    INSERT INTO category (titl, images)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.titl, req.body.images], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'New category was added.', type: 'success' });
    });
});

app.post("/home/orders/:id", (req, res) => {
    const sql = `
    INSERT INTO orders (book_id, comment)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.book_id,  req.body.comment], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Thank you, good choose!', type: 'info' });
    });
});

// READ (all)
app.get("/server/book", (req, res) => {
    const sql = `
     SELECT b.*, c.id AS cid, c.titl, c.images
     FROM book AS b
     LEFT JOIN category AS c
     ON b.cat_id = c.id
     ORDER BY b.type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/book/cc", (req, res) => {
    const sql = `
    SELECT b.*, c.id AS cid, c.titl, c.images
     FROM book AS b
     LEFT JOIN category AS c
     ON b.cat_id = c.id
     ORDER BY b.type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


 app.get("/home/book", (req, res) => {
     const sql = `
     SELECT b.*, o.id AS oid, o.orderis
     FROM book AS r
     LEFT JOIN orders AS o
     ON o.book_id = o.id
     ORDER BY b.type
     `;
     con.query(sql, (err, result) => {
         if (err) throw err;
         res.send(result);
     });
 });

 app.get("/server/category", (req, res) => {
    const sql = `
    SELECT *
    FROM category 
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



 app.get("/book/wc", (req, res) => {
    const sql = `
    SELECT b.*, o.id AS oid, o.orderis, o.comment, o.post
    FROM book AS b
    INNER JOIN orders AS o
    ON o.book_id = b.id
    ORDER BY b.type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.get("/server/book/wc", (req, res) => {
    const sql = `
    SELECT b.*, o.id AS oid, o.orderis
    FROM book AS b
    INNER JOIN orders AS o
    ON o.book_id = b.id
    ORDER BY b.type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



//DELETE
app.delete("/server/book/:id", (req, res) => {
    const sql = `
    DELETE FROM book
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Book was deleted.', type: 'info' });
    });
});

app.delete("/server/category/:id", (req, res) => {
    const sql = `
    DELETE FROM category
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Category was deleted.', type: 'info' });
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

app.put("/home/book/:id", (req, res) => {
    const sql = `
    UPDATE book
    SET 
    orderis = ?, im = ?, tit = ?, dur = ?, duro = ?, durt = ?
    WHERE id = ?
    `;
    con.query(sql, [ req.body.confirmed, req.body.im, req.body.tit, req.body.dur, req.body.duro, req.body.durt, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Thanks, for your choose.', type: 'info' });
    });
});
app.put("/server/book/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE book
        SET type = ?, years = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.type, req.body.years, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE book
        SET type = ?, years = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.type, req.body.years, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE book
        SET type = ?, years = ?
        WHERE id = ?
        `;
        r = [req.body.type, req.body.years, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'The book was edited.', type: 'success' });
    });
});

app.put("/server/category/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE category
        SET titl = ?, images = null
        WHERE id = ?
        `;
        r = [req.body.titl,  req.params.id];
    } else if (req.body.images) {
        sql = `
        UPDATE category
        SET titl = ?, images = ?
        WHERE id = ?
        `;
        r = [req.body.titl, req.body.images, req.params.id];
    } else {
        sql = `
        UPDATE category
        SET titl = ?
        WHERE id = ?
        `;
        r = [req.body.titl, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'The category was edited.', type: 'success' });
    });
});

app.put("/home/book/:id", (req, res) => {
    const sql = `
    UPDATE book
    SET 
    rating_sum = rating_sum + ?, 
    rating_count = rating_count + 1, 
    rating = rating_sum / rating_count
    WHERE id = ?
    `;
    con.query(sql, [req.body.rate, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Thanks, for your vote.', type: 'info' });
    });
});

app.listen(port, () => {
    console.log(`Biblioteka rodoma per ${port} portą!`)
});






