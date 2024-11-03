const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Ścieżka dla Linux
const scoresPath = path.join(process.cwd(), 'public', 'scores');

app.get('/api/scores', (req, res) => {
    fs.readdir(scoresPath, (err, files) => {
        if (err) {
            console.error('Błąd odczytu katalogu:', err);
            return res.status(500).json({ error: 'Nie udało się odczytać listy plików' });
        }
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        res.json(pdfFiles);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
