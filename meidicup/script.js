document.addEventListener('DOMContentLoaded', () => {
  const candidateGrid = document.getElementById('candidateGrid');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalName = document.getElementById('modalName');
  const modalBio = document.getElementById('modalBio');
  const groupInput = document.getElementById('entryGroup');
  const candidateInput = document.getElementById('entryCandidate');

  // モーダル閉じる処理
  document.getElementById('modalClose').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  window.loadCandidates = function (group) {
    candidateGrid.innerHTML = '';

    fetch(`data/candidates${group}.json`)
      .then(res => res.json())
      .then(candidates => {
        candidates.forEach(candidate => {
          const div = document.createElement('div');
          div.className = 'candidate';
          div.dataset.id = candidate.id;

          const img = document.createElement('img');
          img.src = `img/thumb/${group}/${candidate.id}.jpg`;
          img.alt = candidate.name;

          const name = document.createElement('div');
          name.className = 'name';
          name.textContent = candidate.name;

          div.appendChild(img);
          div.appendChild(name);

          div.addEventListener('click', () => {
            modalImg.src = `img/mainvisual/${group}/${candidate.id}.png`;
            modalName.textContent = candidate.name;
            modalBio.textContent = candidate.bio;

            groupInput.value = group;
            candidateInput.value = candidate.name;

            modal.style.display = 'block';
          });

          candidateGrid.appendChild(div);
        });
      })
      .catch(err => {
        console.error('候補者データの読み込みに失敗しました:', err);
      });
  };
});

  function submitted() {
    // 送信後に何か表示したいならここに処理を書く
    console.log("フォームが送信されました");
  }

