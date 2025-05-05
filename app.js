const allQuestions = [
    {
        question: "Q1: JavaScriptda qaysi kalit so'z o'zgaruvchi e'lon qilishda ishlatiladi?",
        answers: [
            { text: "var", correct: true },
            { text: "print", correct: false },
            { text: "echo", correct: false },
            { text: "define", correct: false },
        ]
    },
    {
        question: "Q2: HTML nima uchun ishlatiladi?",
        answers: [
            { text: "Veb sahifalarni stilizatsiya qilish", correct: false },
            { text: "Veb sahifalarga funksionallik qo‘shish", correct: false },
            { text: "Veb sahifalarning tuzilishini yaratish", correct: true },
            { text: "Ma'lumotlar bazasini boshqarish", correct: false },
        ]
    },
    {
        question: "Q1. HTML nimaning qisqartmasi?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Markdown Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Q2. CSS fayli nima uchun kerak?",
        answers: [
            { text: "Matn yozish uchun", correct: false },
            { text: "Veb sahifa dizayni uchun", correct: true },
            { text: "Rasmlar yuklash uchun", correct: false },
            { text: "Server yaratish uchun", correct: false }
        ]
    },
    {
        question: "Q3. JavaScript qanday til?",
        answers: [
            { text: "Styling tili", correct: false },
            { text: "Belgilash tili", correct: false },
            { text: "Interaktiv dasturlash tili", correct: true },
            { text: "Fayl saqlash tili", correct: false }
        ]
    },
    {
        question: "Q4. HTMLda havola yaratish uchun qaysi teg ishlatiladi?",
        answers: [
            { text: "<img>", correct: false },
            { text: "<a>", correct: true },
            { text: "<p>", correct: false },
            { text: "<link>", correct: false }
        ]
    },
    {
        question: "Q5. CSS-da rangni belgilash uchun nima ishlatiladi?",
        answers: [
            { text: "font-color", correct: false },
            { text: "color", correct: true },
            { text: "text-color", correct: false },
            { text: "bgcolor", correct: false }
        ]
    },
    {
        question: "Q6. JavaScriptda funksiyani qanday e'lon qilamiz?",
        answers: [
            { text: "function myFunc()", correct: true },
            { text: "func myFunc()", correct: false },
            { text: "def myFunc()", correct: false },
            { text: "fun myFunc()", correct: false }
        ]
    },
    {
        question: "Q7. CSS’da margin nima qiladi?",
        answers: [
            { text: "Element ichidagi joyni belgilaydi", correct: false },
            { text: "Element atrofidagi tashqi bo‘shliqni belgilaydi", correct: true },
            { text: "Matn rangini belgilaydi", correct: false },
            { text: "Elementni markazlaydi", correct: false }
        ]
    },
    {
        question: "Q8. `console.log()` nima qiladi?",
        answers: [
            { text: "Sahifani yangilaydi", correct: false },
            { text: "HTML kod yozadi", correct: false },
            { text: "Brauzer konsoliga ma'lumot chiqaradi", correct: true },
            { text: "JavaScript faylini ochadi", correct: false }
        ]
    },
    {
        question: "Q9. HTML-da rasm qo‘yish uchun qaysi teg ishlatiladi?",
        answers: [
            { text: "<a>", correct: false },
            { text: "<img>", correct: true },
            { text: "<div>", correct: false },
            { text: "<picture>", correct: false }
        ]
    },
    {
        question: "Q10. JavaScriptda o'zgaruvchi e'lon qilish uchun to‘g‘ri usul?",
        answers: [
            { text: "var x = 5;", correct: true },
            { text: "int x = 5;", correct: false },
            { text: "x := 5", correct: false },
            { text: "let x == 5;", correct: false }
        ]
    }
];

if (allQuestions.length === 0) {
    document.getElementById("quiz-container").innerHTML = "<p class='text-red-500 text-center'>Savollar mavjud emas.</p>";
    throw new Error("Savollar ro'yxati bo'sh");
}

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const messageContainer = document.getElementById("message");
const scoreMessageContainer = document.getElementById("score-message");

function showQuestion() {
    resetState();
    const currentQuestion = allQuestions[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    resultContainer.classList.add("hidden");
    messageContainer.classList.add("hidden");
    scoreMessageContainer.classList.add("hidden");
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answersContainer.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < allQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionContainer.innerText = "";
    resetState();
    resultContainer.innerText = `Siz ${allQuestions.length} ta savoldan ${score} tasiga to‘g‘ri javob berdingiz.`;
    resultContainer.classList.remove("hidden");

    let message = "";
    if (score >= 10 && score <= 20) {
        message = "Juda a'lo! Barakalla!";
    } else if (score >= 4 && score < 10) {
        message = "Harakat qiling, sizda hammasi yaxshi bo‘ladi!";
    } else {
        message = "Natija yomon. Kuchliroq o‘qing!";
    }
    messageContainer.innerText = message;
    messageContainer.classList.remove("hidden");

    scoreMessageContainer.innerText = `Sizning natijangiz: ${score} javob to'g'ri.`;
    scoreMessageContainer.classList.remove("hidden");

    nextButton.innerText = "Yana boshlash";
    nextButton.classList.remove("hidden");
    nextButton.onclick = () => location.reload();

}

showQuestion();