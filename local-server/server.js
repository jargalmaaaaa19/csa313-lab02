const express = require('express');
const app = express();
const PORT = 3000;

// Энгийн хэвийн endpoint
app.get('/', (req, res) => {
    res.send('Hello from local server!');
});

// Удаашруулдаг endpoint (Зориудаар 100ms хүлээлт үүсгэх)
app.get('/slow', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    res.send('Response with 100ms delay');
});

app.listen(PORT, () => {
    console.log(`Local server running at http://localhost:${PORT}`);
});