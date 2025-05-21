
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

  const finalists = [
    { id: 'A5', name: '塩', group: 'A', bio: 'Aグループ一位通過' },
    { id: 'A12', name: '^-^', group: 'A', bio: 'Aグループ二位通過' },
    { id: 'A11', name: 'ピヨ', group: 'A', bio: 'Aグループ三位通過' },
    { id: 'A10', name: 'はるあき', group: 'A', bio: 'Aグループ四位通過' },
    { id: 'B1', name: '候補者B1', group: 'B', bio: 'Bグループ一位通過' },
    { id: 'B2', name: '候補者B2', group: 'B', bio: 'Bグループ二位通過' },
    { id: 'B3', name: '候補者B3', group: 'B', bio: 'Bグループ三位通過' },
    { id: 'B4', name: '候補者B4', group: 'B', bio: 'Bグループ四位通過' },
    { id: 'C1', name: '候補者C1', group: 'C', bio: 'Cグループ一位通過' },
    { id: 'C2', name: '候補者C2', group: 'C', bio: 'Cグループ二位通過' },
    { id: 'C3', name: '候補者C3', group: 'C', bio: 'Cグループ三位通過' },
    { id: 'C4', name: '候補者C4', group: 'C', bio: 'Cグループ四位通過' },
  ];

  finalists.forEach(candidate => {
    const div = document.createElement('div');
    div.className = 'candidate';
    div.dataset.id = candidate.id;

    const img = document.createElement('img');
    img.src = `img/thumb/${candidate.group}/${candidate.id}.jpg`; // 例: img/thumb/A/A1.jpg
    img.alt = candidate.name;

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = candidate.name;

    div.appendChild(img);
    div.appendChild(name);

    div.addEventListener('click', () => {
      modalImg.src = `img/mainvisual/${candidate.group}/${candidate.id}.png`; // 例: img/mainvisual/A/A1.png
      modalName.textContent = candidate.name;
      modalBio.textContent = candidate.bio;

      groupInput.value = "決勝";
      candidateInput.value = candidate.name;

      modal.style.display = 'block';
    });

    candidateGrid.appendChild(div);
  });
});
