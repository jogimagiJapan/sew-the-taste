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

  // 入力操作を無効化＆非表示
  nicknameInput.disabled = true;
  nicknameInput.style.display = "none";
  document.getElementById("sweet").disabled = true;
  document.getElementById("salty").disabled = true;
  document.getElementById("sour").disabled = true;
  document.getElementById("bitter").disabled = true;
  document.getElementById("umami").disabled = true;
  document.getElementById("showButton").style.display = "none";
  document.getElementById("nicknameLabel").style.display = "none";


  // 説明文を非表示
  const guideText = document.getElementById("guideText");
  if (guideText) guideText.style.display = "none";

  // 表示領域クリア
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = "";

  // 画像表示
  imageNames.forEach((imgName, index) => {
    const img = document.createElement("img");
    img.src = `images/${imgName}`;
    img.className = `spin${index + 1}`;
    displayArea.appendChild(img);
  });

  // キャプションとフォルダ名表示
  const caption = document.createElement("p");
  caption.textContent = "あなたが感じた味のかたち";
  caption.style.marginTop = "20px";
  caption.style.fontWeight = "bold";
  displayArea.appendChild(caption);

  const folderName = document.createElement("p");
  folderName.textContent = `${timestamp}_${nickname}`;
  folderName.style.color = "#666";
  displayArea.appendChild(folderName);

  // Apps Script に送信
  fetch("https://script.google.com/macros/s/AKfycbzweIJWFQZBzYg0wzjrnH7PfKQQGPVNDVKtzbK9A2NxX4nCfoiWRfRCLzedsHwjDjwm/exec", {
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

