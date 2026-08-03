(() => {
  const chunksOfFour = (items) => {
    const pages = [];
    for (let i = 0; i < items.length; i += 4) pages.push(items.slice(i, i + 4));
    return pages;
  };

  const safe = (value) => escapeTeacher(value);
  const placeCard = (place, words, thoughts) => `
    <article class="place" style="--accent:${categoryColors[place[1]]?.[0] || "#4b9bd1"}">
      <header class="place-head"><span class="place-icon">${place[4] || "📍"}</span><div><small>${safe(place[1])} · ${safe(subtype(place))}</small><h2>${safe(place[0])}</h2></div></header>
      <section class="card-section clues"><b>🔎 발견한 핵심 정보</b><div class="chips">${(words[place[0]] || []).length ? (words[place[0]] || []).slice(0, 5).map((word) => `<span>${safe(word)}</span>`).join("") : "<em>아직 발견한 핵심 정보가 없어요.</em>"}</div></section>
      <section class="card-section"><b>🧭 나의 장소 경험</b><p>${safe(selectedExperienceText(place))}</p></section>
      <section class="thought"><b>💡 이 장소에서 떠오른 생각</b><p>${safe(thoughts[place[0]] || "아직 작성한 생각이 없어요.")}</p></section>
    </article>`;

  function buildWorksheetHtml() {
    const places = todayPlaces();
    const words = collectedWords();
    const thoughts = savedThoughts();
    const today = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date());
    const pageGroups = chunksOfFour(places);
    const sheets = pageGroups.map((page, pageIndex) => `
      <section class="sheet">
        <header class="worksheet-head">
          <div class="title-row"><div class="pin">☺</div><div><h1>나의 탐구 수첩</h1><p>오늘 살펴본 장소와 발견한 핵심 정보, 나의 경험을 모았어요.</p></div><div class="date">오늘 날짜&nbsp;&nbsp; ${today}</div></div>
          <div class="student-info"><span>🏫 학교</span><span>🧑‍🤝‍🧑 학년·반</span><span>✏️ 이름</span></div>
        </header>
        <main class="place-grid">${page.map((place) => placeCard(place, words, thoughts)).join("")}${Array.from({ length: 4 - page.length }, () => '<article class="place empty" aria-hidden="true"></article>').join("")}</main>
        <footer>ROAD ON LINK · 우리 지역 도움 장소 지도 <span>${pageIndex + 1} / ${pageGroups.length}</span></footer>
      </section>`).join("");
    return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>나의 우리 지역 탐구 학습지</title><style>
      @page{size:A4 portrait;margin:0}*{box-sizing:border-box}html,body{margin:0;background:#e9f5fb;color:#132b52;font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif}.sheet{width:210mm;height:297mm;margin:10mm auto;background:#fff;overflow:hidden;page-break-after:always;break-after:page;padding:8mm 7mm 5mm;display:flex;flex-direction:column;border:1px solid #d9effb}.sheet:last-child{page-break-after:auto;break-after:auto}.worksheet-head{flex:0 0 47mm;border-bottom:2px solid #a8d9f4}.title-row{height:29mm;display:flex;align-items:center;gap:4mm;background:linear-gradient(180deg,#e9f8ff,#fff);border-radius:5mm 5mm 0 0;padding:3mm 4mm}.pin{width:17mm;height:17mm;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:grid;place-items:center;background:#4b9bd1;color:white;font-size:8mm;box-shadow:0 2px 0 #2979ad}.pin::first-letter{transform:rotate(45deg)}h1{font-size:9mm;line-height:1;margin:0 0 2mm;letter-spacing:-.5mm}.title-row p{margin:0;font-size:3.2mm;color:#42556e}.date{margin-left:auto;align-self:flex-start;margin-top:2mm;padding:2.2mm 3mm;border:1px solid #9fd4f3;border-radius:4mm;background:white;font-size:3mm;white-space:nowrap}.student-info{height:15mm;display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;align-items:center}.student-info span{height:10mm;padding:2.6mm 3mm;border:1px solid #a9d7f2;border-radius:3mm;font-size:3.6mm;font-weight:700}.place-grid{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:4mm;padding-top:4mm}.place{min-height:0;overflow:hidden;border:1.5px dashed #65b9ea;border-radius:5mm;padding:4mm;background:linear-gradient(145deg,#fff,#fbfdff);display:flex;flex-direction:column}.place.empty{border-color:#d8eaf4;background:#fbfdff}.place-head{display:flex;gap:3mm;align-items:center;border-bottom:1px dashed #9ed7f4;padding-bottom:3mm;min-height:18mm}.place-icon{font-size:9mm;line-height:1}.place-head small{font-size:3mm;font-weight:700;color:var(--accent)}.place-head h2{font-size:6.2mm;line-height:1.15;margin:1mm 0 0;letter-spacing:-.25mm}.card-section{padding-top:3mm}.card-section b,.thought b{font-size:3.6mm}.card-section p{font-size:3.5mm;line-height:1.5;margin:2mm 0 0;color:#25364d}.chips{display:flex;flex-wrap:wrap;gap:1.5mm;margin-top:2mm}.chips span{display:inline-block;padding:1.6mm 2.4mm;border:1px solid #9ed7f4;border-radius:4mm;background:#eaf7ff;color:#164a72;font-size:3.2mm;font-weight:700;line-height:1.25}.chips em{font-size:3mm;color:#718092;font-style:normal}.thought{margin-top:auto;padding:2.7mm 3mm;border:1px solid #f2cf62;border-radius:4mm;background:#fff9dd}.thought b{color:#9b641c}.thought p{font-size:3.7mm;line-height:1.45;margin:1.5mm 0 0;font-weight:600;color:#25364d}footer{height:7mm;padding-top:2mm;font-size:2.7mm;color:#65758b}footer span{float:right}@media print{html,body{background:white}.sheet{margin:0;border:0}}
    </style></head><body>${sheets}</body></html>`;
  }

  function downloadHtmlFourUp() {
    const blob = new Blob([buildWorksheetHtml()], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, `우리지역_탐구학습지_${localDateKey()}.html`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function roundedRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath(); ctx.roundRect(x, y, width, height, radius);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  }

  function canvasLines(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const lines = []; let line = "";
    for (const char of String(text)) {
      const next = line + char;
      if (ctx.measureText(next).width > maxWidth && line) { lines.push(line); line = char; if (lines.length === maxLines - 1) break; } else line = next;
    }
    if (line && lines.length < maxLines) lines.push(line);
    lines.forEach((value, index) => ctx.fillText(value, x, y + index * lineHeight));
  }

  function drawCard(ctx, place, x, y, width, height, words, thoughts) {
    const accent = categoryColors[place[1]]?.[0] || "#4b9bd1"; const pad = 25;
    ctx.lineWidth = 3; ctx.setLineDash([7, 6]); roundedRect(ctx, x, y, width, height, 24, "#fff", "#65b9ea"); ctx.setLineDash([]);
    ctx.fillStyle = accent; ctx.font = "bold 19px Malgun Gothic, sans-serif"; ctx.fillText(`${place[1]} · ${subtype(place)}`, x + pad, y + 38);
    ctx.fillStyle = "#132b52"; ctx.font = "bold 31px Malgun Gothic, sans-serif"; canvasLines(ctx, place[0], x + pad, y + 78, width - pad * 2, 35, 2);
    ctx.strokeStyle = "#b6dff5"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + pad, y + 118); ctx.lineTo(x + width - pad, y + 118); ctx.stroke();
    ctx.fillStyle = "#17355f"; ctx.font = "bold 21px Malgun Gothic, sans-serif"; ctx.fillText("🔎 발견한 핵심 정보", x + pad, y + 154);
    let chipX = x + pad, chipY = y + 174; ctx.font = "bold 17px Malgun Gothic, sans-serif";
    const clues = (words[place[0]] || []).slice(0, 5);
    if (!clues.length) { ctx.fillStyle = "#718092"; ctx.fillText("아직 발견한 핵심 정보가 없어요.", chipX, chipY + 23); }
    clues.forEach((clue) => { const label = String(clue), chipWidth = Math.min(width - pad * 2, ctx.measureText(label).width + 30); if (chipX + chipWidth > x + width - pad) { chipX = x + pad; chipY += 42; } roundedRect(ctx, chipX, chipY, chipWidth, 32, 16, "#eaf7ff", "#9ed7f4"); ctx.fillStyle = "#164a72"; ctx.fillText(label, chipX + 15, chipY + 22); chipX += chipWidth + 8; });
    const experienceY = Math.max(y + 263, chipY + 72); ctx.fillStyle = "#17355f"; ctx.font = "bold 21px Malgun Gothic, sans-serif"; ctx.fillText("🧭 나의 장소 경험", x + pad, experienceY);
    ctx.fillStyle = "#25364d"; ctx.font = "19px Malgun Gothic, sans-serif"; canvasLines(ctx, selectedExperienceText(place), x + pad, experienceY + 33, width - pad * 2, 27, 3);
    const thoughtY = y + height - 128; roundedRect(ctx, x + pad, thoughtY, width - pad * 2, 102, 18, "#fff9dd", "#f2cf62");
    ctx.fillStyle = "#9b641c"; ctx.font = "bold 18px Malgun Gothic, sans-serif"; ctx.fillText("💡 이 장소에서 떠오른 생각", x + pad + 18, thoughtY + 29);
    ctx.fillStyle = "#25364d"; ctx.font = "bold 19px Malgun Gothic, sans-serif"; canvasLines(ctx, thoughts[place[0]] || "아직 작성한 생각이 없어요.", x + pad + 18, thoughtY + 60, width - pad * 2 - 36, 27, 2);
  }

  function downloadPngFourUp() {
    const places = todayPlaces(), words = collectedWords(), thoughts = savedThoughts(), pages = chunksOfFour(places), width = 1200, height = 1697;
    pages.forEach((page, pageIndex) => {
      const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"); canvas.width = width; canvas.height = height;
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, width, height); ctx.fillStyle = "#e9f8ff"; ctx.fillRect(0, 0, width, 230);
      ctx.fillStyle = "#132b52"; ctx.font = "bold 53px Malgun Gothic, sans-serif"; ctx.fillText("📍 나의 탐구 수첩", 55, 82);
      ctx.font = "22px Malgun Gothic, sans-serif"; ctx.fillText("오늘 살펴본 장소와 발견한 핵심 정보, 나의 경험을 모았어요.", 60, 122);
      ctx.font = "20px Malgun Gothic, sans-serif"; roundedRect(ctx, 780, 40, 360, 55, 22, "#fff", "#9fd4f3"); ctx.fillText(`오늘 날짜  ${localDateKey()}`, 810, 75);
      const infoWidth = 340; ["🏫 학교", "🧑‍🤝‍🧑 학년·반", "✏️ 이름"].forEach((label, index) => { roundedRect(ctx, 55 + index * (infoWidth + 35), 154, infoWidth, 55, 12, "#fff", "#a9d7f2"); ctx.font = "bold 21px Malgun Gothic, sans-serif"; ctx.fillStyle = "#17355f"; ctx.fillText(label, 75 + index * (infoWidth + 35), 189); });
      const gap = 24, cardWidth = 533, cardHeight = 674, startX = 55, startY = 246;
      page.forEach((place, index) => drawCard(ctx, place, startX + (index % 2) * (cardWidth + gap), startY + Math.floor(index / 2) * (cardHeight + gap), cardWidth, cardHeight, words, thoughts));
      ctx.fillStyle = "#65758b"; ctx.font = "16px Malgun Gothic, sans-serif"; ctx.fillText("ROAD ON LINK · 우리 지역 도움 장소 지도", 55, 1670); ctx.fillText(`${pageIndex + 1} / ${pages.length}`, 1100, 1670);
      setTimeout(() => triggerDownload(canvas.toDataURL("image/png"), `우리지역_탐구학습지_${localDateKey()}_${pageIndex + 1}.png`), pageIndex * 250);
    });
  }

  downloadWorksheet = function () {
    const places = todayPlaces();
    if (!places.length) { showWordToast("먼저 장소를 탐구해 주세요."); return; }
    if ($("downloadFormat").value === "png") downloadPngFourUp(); else downloadHtmlFourUp();
  };
  const worksheetDownloadButton = $("notebookDownload");
  if (worksheetDownloadButton) worksheetDownloadButton.onclick = downloadWorksheet;
})();
