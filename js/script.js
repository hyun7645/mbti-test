const questions = [ /* 이전에 제공한 32개 질문 리스트 */ ];

// 질문 생성
const form = document.getElementById("mbti-form");
const questionsDiv = document.getElementById("questions");

questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
        <p class="fw-bold">${index + 1}. ${q.text}</p>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="q${index}" id="q${index}yes" value="0">
            <label class="form-check-label" for="q${index}yes">예</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="q${index}" id="q${index}no" value="1">
            <label class="form-check-label" for="q${index}no">아니오</label>
        </div>
    `;
    questionsDiv.appendChild(div);
});

// 결과 계산 및 페이지 이동 (이전과 동일)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let result = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    questions.forEach((q, index) => {
        const answer = document.querySelector(`input[name="q${index}"]:checked`);
        if (answer) {
            const value = parseInt(answer.value);
            if (q.type === "EI") value === 0 ? result.E++ : result.I++;
            if (q.type === "SN") value === 0 ? result.S++ : result.N++;
            if (q.type === "TF") value === 0 ? result.T++ : result.F++;
            if (q.type === "JP") value === 0 ? result.J++ : result.P++;
        }
    });

    const mbti = `${result.E >= result.I ? "E" : "I"}${result.S >= result.N ? "S" : "N"}${result.T >= result.F ? "T" : "F"}${result.J >= result.P ? "J" : "P"}`;
    window.location.href = `result.html?type=${mbti}`;
});

// result.html용 스크립트 (이전과 동일)
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mbti = urlParams.get("type");
    document.getElementById("mbti-type").textContent = mbti;

    const descriptions = {
        "ISTJ": "조용하고 신뢰할 수 있으며, 책임감이 강한 성격입니다.",
        "ENFP": "열정적이고 창의적이며, 새로운 가능성을 탐구하는 자유로운 영혼입니다.",
        // 나머지 유형 추가
    };
    document.getElementById("mbti-description").textContent = descriptions[mbti] || "설명 없음";
});