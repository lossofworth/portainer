const express = require('express');
require('dotenv').config();

const pool = require('./db');

const app = express();


app.get('/api/entry/user/:userid/date/:date', async (req, res) => {
    const user = Number(req.params[userid])
    const date = req.params[date]
    const queryText = "SELECT mood, anxrate, irtrate, sleephr, took_meds, notes FROM mh_recs WHERE id = ${user} AND date = ${date}";
    try {
        const { entry } = await pool.query(queryText);
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching entry' });
    }
})

app.put('/api/entry/user/:userid/date/:date', async (req, res) => {
    const client = await pool.connect();
    const user = req.params[userid]
    const date = req.params[date]

    client.release()
    
});


const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});