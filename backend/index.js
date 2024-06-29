//imported the required packages
import express from 'express'
import cors from 'cors'
import pg from 'pg'

const app = express()
const port = 3000;

app.use(express.json());
app.use(cors()); // cors is a mechanism by which a front-end client can make requests for resources to an external back-end server.

//initializing our database
const db = new pg.Client({
    user: "postgres",
    host:"localhost",
    database:"blogapp",
    password: "1234",
    port:5432,
});
db.connect();

//Home route
app.get('/', (req, res) => {
  res.json({"message":'Hello World 123!'})
});

//get blog with particular category
app.get('/blog/:cat',async (req, res) => {
    const result = await db.query(
      req.params.cat != 'all' ? `SELECT * from blogs where category = '${req.params.cat}'` : 'SELECT * from blogs'
    );
    res.json({"data":result.rows})
});

//get blog with particular parameter id
app.get('/blogbyid/:id',async (req, res) => {
  const result = await db.query(`SELECT * from blogs where id = ${req.params.id}`);
  res.json({"data":result.rows})
});

//submitting the new blog with post request
app.post('/blog',async (req, res) => {
    const result = await db.query('INSERT INTO blogs (title,post,category) VALUES ($1,$2,$3)',[
        req.body.title,req.body.post,req.body.category
    ]);
    res.json({"message":"Added new blog","desc":result.rowCount});
});

//Server 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})