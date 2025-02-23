// 질문 데이터 (32개 질문)
const questions = [
    { text: "사람들과 함께 있는 것이 에너지를 준다고 느낀다.", type: "EI" },
    { text: "새로운 사람을 만나는 것이 즐겁다.", type: "EI" },
    { text: "큰 모임에서 쉽게 대화를 시작한다.", type: "EI" },
    { text: "혼자 있는 시간이 필요하다고 자주 느낀다.", type: "EI" },
    { text: "낯선 사람과 이야기하는 것이 부담스럽다.", type: "EI" },
    { text: "친구들과 자주 외출하며 시간을 보낸다.", type: "EI" },
    { text: "조용한 환경에서 더 집중이 잘 된다.", type: "EI" },
    { text: "파티에서 적극적으로 사람들과 어울린다.", type: "EI" },
    { text: "구체적인 사실과 세부사항에 집중한다.", type: "SN" },
    { text: "미래의 가능성을 상상하는 것을 좋아한다.", type: "SN" },
    { text: "현실적인 문제 해결에 관심이 많다.", type: "SN" },
    { text: "추상적인 개념을 탐구하는 것이 흥미롭다.", type: "SN" },
    { text: "과거의 경험을 바탕으로 결정을 내린다.", type: "SN" },
    { text: "아이디어를 연결하며 새로운 가능성을 찾는다.", type: "SN" },
    { text: "눈앞의 현실에 기반한 결정을 선호한다.", type: "SN" },
    { text: "큰 그림을 먼저 보고 세부사항은 나중에 생각한다.", type: "SN" },
    { text: "결정을 내릴 때 논리와 분석을 중시한다.", type: "TF" },
    { text: "다른 사람의 감정을 고려해 행동한다.", type: "TF" },
    { text: "공정함이 감정보다 중요하다고 생각한다.", type: "TF" },
    { text: "사람들에게 상처를 주는 말을 피하려 한다.", type: "TF" },
    { text: "문제 해결 시 객관적인 기준을 따른다.", type: "TF" },
    { text: "결정할 때 내 감정이 영향을 미친다.", type: "TF" },
    { text: "논쟁에서 이기는 것이 중요하다고 느낀다.", type: "TF" },
    { text: "조화를 유지하는 것이 더 중요하다.", type: "TF" },
    { text: "계획을 세우고 따르는 것을 좋아한다.", type: "JP" },
    { text: "즉흥적으로 행동하는 것이 편하다.", type: "JP" },
    { text: "할 일 목록을 작성하며 정리한다.", type: "JP" },
    { text: "마감 기한이 다가올 때까지 여유롭게 둔다.", type: "JP" },
    { text: "규칙과 질서를 따르는 것이 중요하다.", type: "JP" },
    { text: "상황에 따라 유연하게 대처한다.", type: "JP" },
    { text: "일을 미리 끝내는 편이다.", type: "JP" },
    { text: "자유로운 스케줄을 선호한다.", type: "JP" },
];

// 페이지별 로직 분리
if (document.getElementById("mbti-form")) {
    // index.html에서 실행
    const form = document.getElementById("mbti-form");
    const questionsDiv = document.getElementById("questions");

    // 질문 렌더링
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

    // 폼 제출 처리
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
        console.log("Calculated MBTI:", mbti); // 디버깅용
        window.location.href = `result.html?type=${mbti}`;
    });
}

// result.html에서 실행
if (document.getElementById("mbti-type")) {
    const urlParams = new URLSearchParams(window.location.search);
    const mbti = urlParams.get("type") || "Unknown";
    document.getElementById("mbti-type").textContent = mbti;

    const descriptions = {
        "ISTJ": "조용하고 신뢰할 수 있으며, 책임감이 강한 성격입니다.",
        "ENFP": "열정적이고 창의적이며, 새로운 가능성을 탐구하는 자유로운 영혼입니다.",
        "ENTJ": "결단력 있고 리더십이 뛰어나며, 목표를 향해 나아가는 성격입니다.",
        // 나머지 유형 추가 가능
    };
    document.getElementById("mbti-description").textContent = descriptions[mbti] || "해당 유형에 대한 설명이 없습니다.";
}