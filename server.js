const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
app.use(cors());

// Automatyczne wykrywanie systemu i ustawienie ścieżki
const platform = os.platform();
console.log('Wykryty system operacyjny:', platform);

let scoresPath;
if (platform === 'win32') {
    // Ścieżka dla Windows
    scoresPath = path.join(process.cwd(), 'scores');
} else {
    // Ścieżka dla Linux/Unix
    scoresPath = path.join(process.cwd(), 'public', 'scores');
}

console.log('Używana ścieżka:', scoresPath);

app.get('/api/scores', (req, res) => {
    fs.readdir(scoresPath, (err, files) => {
        if (err) {
            console.error('Błąd odczytu katalogu:', err);
            console.error('Szczegóły błędu:', err.message);
            return res.status(500).json({ 
                error: 'Nie udało się odczytać listy plików',
                details: err.message,
                path: scoresPath
            });
        }
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        console.log('Znalezione pliki PDF:', pdfFiles);
        res.json(pdfFiles);
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
    console.log(`Ścieżka do plików PDF: ${scoresPath}`);
});
