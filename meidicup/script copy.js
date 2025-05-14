  const candidateGrid = document.getElementById('candidateGrid');
  const selectedCandidateInput = document.getElementById('modalSelectedCandidate');
  const selectedGroupInput = document.getElementById('selectedGroup');

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
          img.src = `img/thumb/${group}/${candidate.id}.png`; // サムネイル画像
          img.alt = candidate.name;

          const name = document.createElement('div');
          name.className = 'name';
          name.textContent = candidate.name;

          const bio = document.createElement('div');
          bio.className = 'bio';
          bio.textContent = candidate.bio;

          div.appendChild(img);
          div.appendChild(name);
          div.appendChild(bio);

          // 画像クリックでモーダル表示
          div.addEventListener('click', () => {
            // モーダルにデータ挿入
            document.getElementById('modalImg').src = `img/mainvisual/${group}/${candidate.id}.png`; // 拡大画像
            document.getElementById('modalName').textContent = candidate.name;
            document.getElementById('modalBio').textContent = candidate.bio;
            selectedCandidateInput.value = candidate.id;
            selectedGroupInput.value = group;

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

  // 最初にグループAを読み込む
  //loadCandidates('A');