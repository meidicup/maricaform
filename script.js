function showGroup(group) {
  document.querySelectorAll(".group-section").forEach(section => {
    section.classList.add("hidden");
  });
  document.getElementById(`group${group}`).classList.remove("hidden");
}

document.getElementById("predictionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const groupA = document.querySelector('input[name="groupA"]:checked')?.value || '';
  const groupB = document.querySelector('input[name="groupB"]:checked')?.value || '';
  const groupC = document.querySelector('input[name="groupC"]:checked')?.value || '';
  const nickname = document.getElementById("nickname").value || '名無しのドライバー';

  const result = `🎮 ${nickname} の予想 🎯\n\n🟥 A: ${groupA}\n🟨 B: ${groupB}\n🟩 C: ${groupC}\n\n🗣️ 理由: ${reason}`;

  document.getElementById("resultMessage").innerText = "送信完了！ 予想ありがとう！";

  // Xでシェア（テキストエンコードして）
  const tweet = encodeURIComponent(result + "\n#マリカ予想大会");
  window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
});
  const reason = document.getElementById("reason").value || "理由はヒミツ！";
div.addEventListener('click', () => {
  // モーダルにデータ挿入
  document.getElementById('modalImg').src = `img/mainvisual/${group}/${candidate.id}.png`;
  document.getElementById('modalName').textContent = candidate.name;
  document.getElementById('modalBio').textContent = candidate.bio;

  // Googleフォーム用hidden inputに値をセット
  document.getElementById('entryGroup').value = group;
  document.getElementById('entryCandidate').value = candidate.name;

  // モーダル表示
  document.getElementById('modal').style.display = 'block';
});
