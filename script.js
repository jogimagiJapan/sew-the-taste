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

  // ▼ 入力欄やスライダー、ボタンなどを無効化＆非表示にする（変更防止）
  nicknameInput.disabled = true;
  nicknameInput.style.display = "none";
  document.getElementById("sweet").disabled = true;
  document.getElementById("salty").disabled = true;
  document.getElementById("sour").disabled = true;
  document.getElementById("bitter").disabled = true;
  document.getElementById("umami").disabled = true;
  document.getElementById("showButton").style.display = "none";
  document.getElementById("nicknameLabel").style.display = "none";

  // ▼ 上部の説明文も非表示にする
  const guideText = document.getElementById("guideText");
  if (guideText) guideText.style.display = "none";

  // ▼ 画像を表示するエリア（displayArea）を初期化（以前の画像を消去）
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = "";

  // ▼ 画像を5枚重ねて表示（各味覚に応じた画像ファイルを読み込み）
  imageNames.forEach((imgName, index) => {
    const img = document.createElement("img");
    img.src = `images/${imgName}`; // 画像ファイルのパス
    img.className = `spin${index + 1}`; // 回転アニメーション用のクラス（spin1〜spin5）
    displayArea.appendChild(img);
  });

  // ▼ キャプション（説明文）を表示
  const caption = document.createElement("p");
  caption.textContent = "あなたが感じた味のかたち";
  caption.style.marginTop = "20px"; // 上に空白を追加
  caption.style.fontWeight = "bold";
  displayArea.appendChild(caption);

  // ▼ フォルダ名（timestamp + nickname）を画面に表示（確認用）
  const folderName = document.createElement("p");
  folderName.textContent = `${timestamp}_${nickname}`;
  folderName.style.color = "#666"; // グレー表示
  displayArea.appendChild(folderName);

  // ▼ Google Apps Script にデータを送信（画像ファイル名などをサーバーに渡す）
  fetch("https://script.google.com/macros/s/AKfycbzweIJWFQZBzYg0wzjrnH7PfKQQGPVNDVKtzbK9A2NxX4nCfoiWRfRCLzedsHwjDjwm/exec", {
    method: "POST",         // POST メソッドで送信
    mode: "no-cors",        // クロスオリジン制限を緩和（※レスポンスは取得不可）
    headers: {
      "Content-Type": "application/json", // JSON形式で送信
    },
    body: JSON.stringify({               // サーバーに送るデータ内容
      nickname: nickname,
      timestamp: timestamp,
      images: imageNames                // 選ばれた画像名リスト
    })
  });

});
