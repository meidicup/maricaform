const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static('public'));  // public フォルダを静的ファイル用に提供

// 各グループの候補者データを読み込む
function loadCandidates(group) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'data', `candidates${group}.json`);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

// admin.htmlに候補者データを送信
app.get('/getCandidates/:group', async (req, res) => {
  const group = req.params.group.toUpperCase();
  try {
    const candidates = await loadCandidates(group);
    res.json(candidates);
  } catch (error) {
    res.status(500).send('Error loading candidates data');
  }
});

// サーバー起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
