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

function renderQuestions() {
    const questionsDiv = document.getElementById("questions");
    if (!questionsDiv) {
        console.error("Questions div not found!");
        return;
    }

    console.log("Rendering", questions.length, "questions...");
    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
            <p class="fw-bold">${index + 1}. ${q.text}</p>
            <input type="hidden" name="q${index}" id="q${index}" value="">
            <div class="checkbox-container checkbox-yes">
                <input type="checkbox" id="yes${index}" name="answer${index}" value="0">
                <label for="yes${index}">예</label>
            </div>
            <div class="checkbox-container checkbox-no">
                <input type="checkbox" id="no${index}" name="answer${index}" value="1">
                <label for="no${index}">아니오</label>
            </div>
        `;
        questionsDiv.appendChild(div);

        // 체크박스 이벤트 추가
        const yesCheckbox = document.getElementById(`yes${index}`);
        const noCheckbox = document.getElementById(`no${index}`);
        const hiddenInput = document.getElementById(`q${index}`);

        yesCheckbox.addEventListener("change", function() {
            if (this.checked) {
                noCheckbox.checked = false; // "아니오" 체크 해제
                hiddenInput.value = this.value;
                console.log(`Question ${index + 1} selected: Yes`);
            } else {
                hiddenInput.value = noCheckbox.checked ? "1" : "";
            }
        });

        noCheckbox.addEventListener("change", function() {
            if (this.checked) {
                yesCheckbox.checked = false; // "예" 체크 해제
                hiddenInput.value = this.value;
                console.log(`Question ${index + 1} selected: No`);
            } else {
                hiddenInput.value = yesCheckbox.checked ? "0" : "";
            }
        });
    });

    console.log("Questions rendered successfully!");
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");

    const form = document.getElementById("mbti-form");
    if (form) {
        renderQuestions();

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let result = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

            questions.forEach((q, index) => {
                const answer = document.getElementById(`q${index}`).value;
                if (answer !== "") {
                    const value = parseInt(answer);
                    if (q.type === "EI") value === 0 ? result.E++ : result.I++;
                    if (q.type === "SN") value === 0 ? result.S++ : result.N++;
                    if (q.type === "TF") value === 0 ? result.T++ : result.F++;
                    if (q.type === "JP") value === 0 ? result.J++ : result.P++;
                }
            });

            const mbti = `${result.E >= result.I ? "E" : "I"}${result.S >= result.N ? "S" : "N"}${result.T >= result.F ? "T" : "F"}${result.J >= result.P ? "J" : "P"}`;
            console.log("Calculated MBTI:", mbti);
            window.location.href = `result.html?type=${mbti}`;
        });
    } else {
        console.error("Form not found!");
    }

    const mbtiTypeElement = document.getElementById("mbti-type");
    const mbtiImageElement = document.getElementById("mbti-image");
    const mbtiDescriptionElement = document.getElementById("mbti-description");

    if (mbtiTypeElement && mbtiImageElement && mbtiDescriptionElement) {
        const urlParams = new URLSearchParams(window.location.search);
        const mbti = urlParams.get("type") || "Unknown";
        mbtiTypeElement.textContent = mbti;

        const descriptions = {
            "ISTJ": {
                text: `
                    <h5>검사관 (ISTJ)</h5>
                    <p>책임감이 강하고 신뢰할 수 있는 성격으로, 세부사항에 집중하며 실용적인 접근을 선호합니다. 규칙과 전통을 중시하며, 일을 체계적으로 처리하는 데 탁월합니다.</p>
                    <p><strong>장점:</strong> 꼼꼼함, 조직력, 신뢰성</p>
                    <p><strong>단점:</strong> 융통성 부족, 변화에 대한 저항</p>
                `,
                image: "https://images.unsplash.com/photo-1503551723145-6c040742065b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ISFJ": {
                text: `
                    <h5>수호자 (ISFJ)</h5>
                    <p>따뜻하고 배려심 깊으며, 다른 사람을 돕는 데 헌신적입니다. 안정적인 환경을 선호하고, 세부사항을 잘 기억합니다.</p>
                    <p><strong>장점:</strong> 충성심, 세심함, 실용성</p>
                    <p><strong>단점:</strong> 자기 희생 과다, 변화에 대한 두려움</p>
                `,
                image: "https://images.unsplash.com/photo-1513151233558-d860c76eb389?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "INFJ": {
                text: `
                    <h5>옹호자 (INFJ)</h5>
                    <p>통찰력이 뛰어나고 이상주의적이며, 사람들의 감정을 잘 이해합니다. 깊은 의미를 추구하며, 세상을 더 나은 곳으로 만들고자 합니다.</p>
                    <p><strong>장점:</strong> 공감력, 비전, 헌신</p>
                    <p><strong>단점:</strong> 완벽주의, 감정 과부하</p>
                `,
                image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "INTJ": {
                text: `
                    <h5>전략가 (INTJ)</h5>
                    <p>논리적이고 독립적이며, 장기적인 목표를 세우고 이를 달성하는 데 능숙합니다. 전략적 사고와 문제 해결 능력이 뛰어납니다.</p>
                    <p><strong>장점:</strong> 분석력, 독창성, 목표 지향</p>
                    <p><strong>단점:</strong> 감정 표현 부족, 고집</p>
                `,
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ISTP": {
                text: `
                    <h5>장인 (ISTP)</h5>
                    <p>실제적이고 손재주가 있으며, 문제를 즉흥적으로 해결하는 데 능합니다. 자유를 사랑하고, 현재에 집중합니다.</p>
                    <p><strong>장점:</strong> 실용성, 적응력, 침착함</p>
                    <p><strong>단점:</strong> 감정 공유 부족, 충동성</p>
                `,
                image: "https://images.unsplash.com/photo-1505843490539-513c7928d189?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ISFP": {
                text: `
                    <h5>탐험가 (ISFP)</h5>
                    <p>온화하고 예술적이며, 순간을 즐기는 성격입니다. 타인에게 강요하지 않으며, 개인적인 가치를 중시합니다.</p>
                    <p><strong>장점:</strong> 따뜻함, 창의성, 유연성</p>
                    <p><strong>단점:</strong> 갈등 회피, 자기주장 부족</p>
                `,
                image: "https://images.unsplash.com/photo-1501785886872-3e2d086b6a9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "INFP": {
                text: `
                    <h5>이상주의자 (INFP)</h5>
                    <p>내면의 가치를 중시하고, 창의적이며 공감 능력이 뛰어납니다. 세상을 더 나은 곳으로 만들고자 하는 열망이 강합니다.</p>
                    <p><strong>장점:</strong> 이상주의, 창의력, 진정성</p>
                    <p><strong>단점:</strong> 현실성 부족, 과민 반응</p>
                `,
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "INTP": {
                text: `
                    <h5>사색가 (INTP)</h5>
                    <p>호기심 많고 분석적이며, 지적 탐구를 즐깁니다. 새로운 아이디어와 이론을 탐구하며 독립적인 사고를 선호합니다.</p>
                    <p><strong>장점:</strong> 논리력, 창의성, 객관성</p>
                    <p><strong>단점:</strong> 감정 표현 부족, 산만함</p>
                `,
                image: "https://images.unsplash.com/photo-1511632765486-a01980e1d76f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ESTP": {
                text: `
                    <h5>활동가 (ESTP)</h5>
                    <p>에너지가 넘치고 모험을 즐기며, 즉흥적인 결정을 내리는 데 능숙합니다. 현실적이고 실용적인 접근을 선호합니다.</p>
                    <p><strong>장점:</strong> 대담함, 실시간 대처 능력, 사교성</p>
                    <p><strong>단점:</strong> 충동성, 장기 계획 부족</p>
                `,
                image: "https://images.unsplash.com/photo-1502685104226-956e7d4e7d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ESFP": {
                text: `
                    <h5>연예인 (ESFP)</h5>
                    <p>사교적이고 낙천적이며, 순간을 즐기는 성격입니다. 사람들과 함께 있는 것을 좋아하고 분위기를 띄우는 데 능합니다.</p>
                    <p><strong>장점:</strong> 열정, 유머, 친화력</p>
                    <p><strong>단점:</strong> 집중력 부족, 충동적 소비</p>
                `,
                image: "https://images.unsplash.com/photo-1517457373958-b7bdd7f8e690?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ENFP": {
                text: `
                    <h5>활동가 (ENFP)</h5>
                    <p>열정적이고 창의적이며, 새로운 가능성을 탐구합니다. 사람들과의 관계에서 영감을 얻고 자유로운 삶을 추구합니다.</p>
                    <p><strong>장점:</strong> 창의력, 열정, 공감력</p>
                    <p><strong>단점:</strong> 산만함, 과도한 낙관주의</p>
                `,
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ENTP": {
                text: `
                    <h5>토론가 (ENTP)</h5>
                    <p>호기심 많고 재치 있으며, 새로운 아이디어를 제안하고 토론하는 것을 즐깁니다. 유연하고 창의적인 문제 해결 능력이 있습니다.</p>
                    <p><strong>장점:</strong> 독창성, 적응력, 논쟁 능력</p>
                    <p><strong>단점:</strong> 일관성 부족, 실행력 부족</p>
                `,
                image: "https://images.unsplash.com/photo-1517048676734-2d0e0d83e8fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ESTJ": {
                text: `
                    <h5>관리자 (ESTJ)</h5>
                    <p>체계적이고 실용적이며, 리더십을 발휘하는 데 능숙합니다. 질서와 효율성을 중시하며, 목표 달성에 집중합니다.</p>
                    <p><strong>장점:</strong> 조직력, 결단력, 책임감</p>
                    <p><strong>단점:</strong> 융통성 부족, 감정 무시</p>
                `,
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ESFJ": {
                text: `
                    <h5>외교관 (ESFJ)</h5>
                    <p>사교적이고 따뜻하며, 타인을 돕는 데 헌신적입니다. 조화를 중시하고 공동체에 기여하는 것을 좋아합니다.</p>
                    <p><strong>장점:</strong> 친화력, 배려심, 실용성</p>
                    <p><strong>단점:</strong> 타인 의존, 비판에 민감</p>
                `,
                image: "https://images.unsplash.com/photo-1519125323398-675f398f6978?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ENFJ": {
                text: `
                    <h5>지도자 (ENFJ)</h5>
                    <p>카리스마 넘치고 공감 능력이 뛰어나며, 사람들을 이끄는 데 능합니다. 타인의 잠재력을 끌어내는 데 탁월합니다.</p>
                    <p><strong>장점:</strong> 리더십, 공감력, 열정</p>
                    <p><strong>단점:</strong> 자기 희생, 과도한 책임감</p>
                `,
                image: "https://images.unsplash.com/photo-1511632765486-a01980e1d76f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            "ENTJ": {
                text: `
                    <h5>통솔자 (ENTJ)</h5>
                    <p>결단력 있고 전략적이며, 목표를 향해 팀을 이끄는 데 능숙합니다. 큰 그림을 그리고 이를 실현하는 데 집중합니다.</p>
                    <p><strong>장점:</strong> 리더십, 분석력, 효율성</p>
                    <p><strong>단점:</strong> 타인 감정 무시, 고집</p>
                `,
                image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            }
        };

        if (descriptions[mbti]) {
            mbtiDescriptionElement.innerHTML = descriptions[mbti].text;
            mbtiImageElement.src = descriptions[mbti].image;
        } else {
            mbtiDescriptionElement.innerHTML = "<p>해당 유형에 대한 설명이 없습니다.</p>";
            mbtiImageElement.src = "https://via.placeholder.com/300";
        }
    }
});