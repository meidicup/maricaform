const candidateGrid = document.getElementById('candidateGrid');

// 最初にグループAを読み込む（初期表示が必要な場合はコメントを外す）
// loadCandidates('A');

// グループごとに候補者データを読み込み
function loadCandidates(group) {
  candidateGrid.innerHTML = ''; // 候補者リストをクリア
  fetch(`data/candidates${group}.json`)  // グループごとのデータファイルを読み込む
    .then(res => res.json())
    .then(candidates => {
      candidates.forEach(candidate => {
        const div = document.createElement('div');
        div.className = 'candidate';
        div.dataset.id = candidate.id;

        const img = document.createElement('img');
        img.src = `img/thumb/${group}/${candidate.id}.jpg`; // サムネイル画像
        img.alt = candidate.name;

        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = candidate.name;
        
        const bio = document.createElement('div');
        bio.className = 'bio';
        bio.textContent = candidate.bio;

        div.appendChild(img);
        div.appendChild(name);

        // 画像クリックでモーダル表示
        div.addEventListener('click', () => {
          // モーダルにデータ挿入
          document.getElementById('modalImg').src = `img/mainvisual/${group}/${candidate.id}.png`; // 拡大画像
          document.getElementById('modalName').textContent = candidate.name;
          document.getElementById('modalBio').textContent = candidate.bio;

          // フォームの hidden input に値を設定
          const groupInput = document.getElementById('entryGroup');
          const candidateInput = document.getElementById('entryCandidate');
          if (groupInput && candidateInput) {
            groupInput.value = group;
            candidateInput.value = candidate.name;
          } else {
            console.error('フォームの hidden input が見つかりません。idを確認してください。');
          }

          // モーダル表示
          document.getElementById('modal').style.display = 'block';
        });

        candidateGrid.appendChild(div);
      });
    })
    .catch(err => {
      console.error('候補者データの読み込みに失敗しました:', err);
    });
}

// モーダルを閉じる処理
document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

// 背景クリックでモーダルを閉じる
window.addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
