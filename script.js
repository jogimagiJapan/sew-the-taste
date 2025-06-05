document.getElementById("showButton").addEventListener("click", async function () {
  const nicknameInput = document.getElementById("nickname");
  const nickname = nicknameInput.value || "guest";

  const sweet = document.getElementById("sweet").value;
  const salty = document.getElementById("salty").value;
  const sour = document.getElementById("sour").value;
  const bitter = document.getElementById("bitter").value;
  const umami = document.getElementById("umami").value;

  const imageNames = [
    `sweet_${sweet}.png`,
    `salty_${salty}.png`,
    `sour_${sour}.png`,
    `bitter_${bitter}.png`,
    `umami_${umami}.png`
  ];

  const now = new Date();
  const timestamp = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

  // 入力非表示化
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

  // キャプション表示
  const captionArea = document.getElementById("captionArea");
  captionArea.textContent = "あなたが感じた味のかたち";

  // 画像表示領域初期化
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = "";

  imageNames.forEach((imgName, index) => {
    const img = document.createElement("img");
    img.src = `images/${imgName}`;
    img.className = `spin${index + 1}`;
    displayArea.appendChild(img);
  });

  // フォルダ名確認表示
  const folderName = document.createElement("p");
  folderName.textContent = `${timestamp}_${nickname}`;
  folderName.style.color = "#666";
  folderName.style.marginTop = "10px";
  displayArea.appendChild(folderName);

  // Google Apps Scriptに送信
  fetch("https://script.google.com/macros/s/AKfycbzweIJWFQZBzYg0wzjrnH7PfKQQGPVNDVKtzbK9A2NxX4nCfoiWRfRCLzedsHwjDjwm/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nickname: nickname,
      timestamp: timestamp,
      images: imageNames
    })
  });
});
