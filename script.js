document.getElementById("showButton").addEventListener("click", async function () {
  const nickname = document.getElementById("nickname").value || "guest";
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

  // 表示領域をクリア
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = "";

  // 各画像を読み込んで表示
  imageNames.forEach((imgName, index) => {
    const img = document.createElement("img");
    img.src = `images/${imgName}`;  // GitHub内のimagesフォルダから読み込む
    img.className = `spin${index + 1}`;
    displayArea.appendChild(img);
  });

  // タイムスタンプ
  const now = new Date();
  const timestamp = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

  // POSTリクエストでApps Scriptに送信
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
