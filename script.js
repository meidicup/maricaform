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

  const result = `🎮 ${nickname} の予想 🎯\n\n🟥 A: ${groupA}\n🟨 B: ${groupB}\n🟩 C: ${groupC}`;

  document.getElementById("resultMessage").innerText = "送信完了！ 予想ありがとう！";

  // Xでシェア（テキストエンコードして）
  const tweet = encodeURIComponent(result + "\n#マリカ予想大会");
  window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
});
