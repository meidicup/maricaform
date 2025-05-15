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
  document.getElementById('voteForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const data = {
      group: document.getElementById('selectedGroup').value,
      candidateName: document.getElementById('modalName').textContent,
      name: document.getElementById('userName').value,
      reason: document.getElementById('reason').value
    };
  
    fetch("https://script.google.com/macros/s/AKfycbwz6VlRr-xDp3Zuzp1dPa3tmomgU6iW2moOensLoSUvJaKLh4_MbwIazrhqUWWSido/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(response => {
    if (confirm("投票が成功しました！結果を共有しましょうか？")) {
      // YES のとき → X の投稿画面に遷移
      const name = document.getElementById('modalName').textContent;
      const user = document.getElementById('userName').value;
      const reason = document.getElementById('reason').value;
      const hashtag = "めいぢカップ";
  
      const tweetText = encodeURIComponent(
        `『${name}』に投票しました！\n#${hashtag}`
      );
  
      const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
      window.open(tweetUrl, '_blank');
    }
  
    document.getElementById('voteForm').reset();
    document.getElementById('modal').style.display = 'none';
  })
      .catch(err => {
      alert("送信に失敗しました。もう一度お試しください。");
      console.error(err);
    });
  });


  // 最初にグループAを読み込む
  //loadCandidates('A');
