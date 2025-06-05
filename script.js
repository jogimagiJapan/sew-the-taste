// 「表示」ボタンがクリックされたときに実行する処理を定義
document.getElementById("showButton").addEventListener("click", async function () {

  // ▼ 入力されたユーザーネームを取得（空欄なら "guest" とする）
  const nicknameInput = document.getElementById("nickname");
  const nickname = nicknameInput.value || "guest";

  // ▼ 各味覚のスライダーの値を取得（1〜10の整数）
  const sweet = document.getElementById("sweet").value;
  const salty = document.getElementById("salty").value;
  const sour = document.getElementById("sour").value;
  const bitter = document.getElementById("bitter").value;
  const umami = document.getElementById("umami").value;

  // ▼ それぞれの味覚に応じた画像ファイル名を作成
  // 例: "sweet_7.png", "sour_3.png" など
  const imageNames = [
    `sweet_${sweet}.png`,
    `salty_${salty}.png`,
    `sour_${sour}.png`,
    `bitter_${bitter}.png`,
    `umami_${umami}.png`
  ];

  // ▼ タイムスタンプの生成（例：20250605_213745）
  // 日付＋時刻をユニークな文字列として保存用に使用
  const now = new Date();
  const timestamp = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

//入力非表示化
  nicknameInput.disabled = true;
  nicknameInput.style.display = "none";
  document.getElementById("sweet").disabled = true;
  document.getElementById("salty").disabled = true;
  document.getElementById("sour").disabled = true;
  document.getElementById("bitter").disabled = true;
  document.getElementById("umami").disabled = true;
  document.getElementById("showButton").style.display = "none";
  document.getElementById("nicknameLabel").style.display = "none";
  const guideText = document.getElementById("guideText");
  if (guideText) guideText.style.display = "none";

  // 画像表示領域初期化
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = "";

  imageNames.forEach((imgName, index) => {
    const img = document.createElement("img");
    img.src = `images/${imgName}`;
    img.className = `spin${index + 1}`;
    displayArea.appendChild(img);
  });

  // キャプションとタイムスタンプを更新
  document.getElementById("captionText").textContent = "あなたが感じた味のかたち";
  document.getElementById("timestampText").textContent = `${timestamp}_${nickname}`;

  // Google Apps Script に送信
  fetch("https://script.google.com/macros/s/AKfycbzZocx7DjujD9pwrvqUovN1gh45By1vEMecvLhmyLp-wFvglCtyKs1ZY-chgkNi5CzV/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname: nickname,
      timestamp: timestamp,
      images: imageNames
    })
  });
});
