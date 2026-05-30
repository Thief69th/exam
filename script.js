/**
 * QuizPro - Vanilla JavaScript Logic
 * Includes State Management, Timer, and Score Calculation
 */

// 1. Quiz Data (20 Sample Questions)
const quizData = [
    {
        title: "Web Development Basics",
        description: "Test your knowledge of HTML, CSS, and basic Web concepts.",
        difficulty: "Beginner",
        timeLimit: 15, // minutes
        questions: [
            { q: "What does HTML stand for?", a: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Tabular Main Language", "None of these"], correct: 0, exp: "HTML is the standard markup language for documents designed to be displayed in a web browser." },
            { q: "Which CSS property is used to change text color?", a: ["font-color", "text-color", "color", "background-color"], correct: 2, exp: "The 'color' property specifies the color of text." },
            { q: "What is the correct way to write a JavaScript array?", a: ["var colors = 'red', 'green', 'blue'", "var colors = ['red', 'green', 'blue']", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 1 = ('red'), 2 = ('green')"], correct: 1, exp: "Arrays in JavaScript are written with square brackets." },
            { q: "Which HTML tag is used to define an internal style sheet?", a: ["<css>", "<script>", "<style>", "<link>"], correct: 2, exp: "The <style> tag is used to define style information (CSS) for a document." },
            { q: "Which property is used to change the font of an element?", a: ["font-style", "font-weight", "font-family", "font-size"], correct: 2, exp: "The font-family property specifies the font for an element." },
            { q: "How do you make the text bold in CSS?", a: ["font-weight: bold", "style: bold", "font: bold", "text-decoration: bold"], correct: 0, exp: "The font-weight property sets how thick or thin characters in text should be displayed." },
            { q: "Which HTML attribute is used to define inline styles?", a: ["class", "styles", "font", "style"], correct: 3, exp: "The style attribute specifies an inline style for an element." },
            { q: "How do you create a function in JavaScript?", a: ["function = myFunction()", "function myFunction()", "function:myFunction()", "create myFunction()"], correct: 1, exp: "A JavaScript function is defined with the function keyword, followed by a name, followed by parentheses ()." },
            { q: "How do you call a function named 'myFunction'?", a: ["call myFunction()", "myFunction()", "call function myFunction()", "execute myFunction()"], correct: 1, exp: "You call a function by its name followed by parentheses." },
            { q: "How to write an IF statement in JavaScript?", a: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"], correct: 2, exp: "In JavaScript, if statements use parentheses around the condition." },
            { q: "Which operator is used to assign a value to a variable?", a: ["*", "x", "=", "-"], correct: 2, exp: "The assignment operator (=) assigns a value to a variable." },
            { q: "What will the following code return: Boolean(10 > 9)?", a: ["false", "true", "NaN", "undefined"], correct: 1, exp: "10 is indeed greater than 9, so it returns true." },
            { q: "Is JavaScript case-sensitive?", a: ["No", "Yes", "Only in variables", "Only in functions"], correct: 1, exp: "Yes, JavaScript is case-sensitive." },
            { q: "Which HTML element is used for the largest heading?", a: ["<h6>", "<head>", "<heading>", "<h1>"], correct: 3, exp: "<h1> defines the most important heading." },
            { q: "What is the correct HTML element for inserting a line break?", a: ["<break>", "<lb>", "<br>", "<hr>"], correct: 2, exp: "The <br> tag inserts a single line break." },
            { q: "How can you add a comment in a JavaScript?", a: ["'This is a comment", "//This is a comment", "<!--This is a comment-->", "*This is a comment"], correct: 1, exp: "Double slashes are used for single-line comments in JavaScript." },
            { q: "Which event occurs when the user clicks on an HTML element?", a: ["onmouseclick", "onchange", "onclick", "onmouseover"], correct: 2, exp: "The onclick event occurs when the user clicks on an element." },
            { q: "How do you declare a JavaScript variable?", a: ["v carName;", "variable carName;", "var carName;", "declare carName;"], correct: 2, exp: "Variables can be declared using var, let, or const." },
            { q: "Which HTML element is used to specify a footer for a document or section?", a: ["<bottom>", "<section>", "<footer>", "<aside>"], correct: 2, exp: "The <footer> element defines a footer for a document or section." },
            { q: "In CSS, what is the correct option to select all p elements inside a div element?", a: ["div p", "div + p", "div.p", "div > p"], correct: 0, exp: "The descendant selector (space) matches all elements that are descendants of a specified element." }
        ]
    }
];

// 2. State Management
let currentState = {
    currentView: 'home',
    activeTestIndex: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    timer: null,
    timeLeft: 0,
    startTime: null,
    endTime: null
};

// 3. Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderTestSelection();
    loadPersistedState();
});

function renderTestSelection() {
    const testList = document.getElementById('test-list');
    testList.innerHTML = quizData.map((test, index) => `
        <div class="test-card">
            <h3>${test.title}</h3>
            <p>${test.description}</p>
            <div class="test-meta">
                <span>📝 ${test.questions.length} Questions</span>
                <span>⏱️ ${test.timeLimit} Mins</span>
                <span>📊 ${test.difficulty}</span>
            </div>
            <button class="btn-primary" onclick="startTest(${index})">Start Assessment</button>
        </div>
    `).join('');
}

// 4. View Management
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${viewId}-view`).classList.add('active');
    currentState.currentView = viewId;
    window.scrollTo(0, 0);
    saveState();
}

// 5. Quiz Logic
function startTest(index) {
    const test = quizData[index];
    currentState.activeTestIndex = index;
    currentState.currentQuestionIndex = 0;
    currentState.userAnswers = {};
    currentState.timeLeft = test.timeLimit * 60;
    currentState.startTime = new Date();
    
    document.getElementById('current-test-name').textContent = test.title;
    showView('quiz');
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const test = quizData[currentState.activeTestIndex];
    const q = test.questions[currentState.currentQuestionIndex];
    
    // Update UI
    document.getElementById('question-counter').textContent = `Question ${currentState.currentQuestionIndex + 1} of ${test.questions.length}`;
    document.getElementById('question-text').textContent = q.q;
    
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = q.a.map((opt, i) => `
        <div class="option ${currentState.userAnswers[currentState.currentQuestionIndex] === i ? 'selected' : ''}" 
             onclick="selectOption(${i})">
            <span class="opt-letter">${String.fromCharCode(65 + i)}.</span>
            <span class="opt-text">${opt}</span>
        </div>
    `).join('');

    // Progress bar
    const progress = ((currentState.currentQuestionIndex + 1) / test.questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    // Footer buttons
    document.getElementById('prev-btn').disabled = currentState.currentQuestionIndex === 0;
    if (currentState.currentQuestionIndex === test.questions.length - 1) {
        document.getElementById('next-btn').classList.add('hide');
        document.getElementById('finish-btn').classList.remove('hide');
    } else {
        document.getElementById('next-btn').classList.remove('hide');
        document.getElementById('finish-btn').classList.add('hide');
    }
}

function selectOption(index) {
    currentState.userAnswers[currentState.currentQuestionIndex] = index;
    loadQuestion();
    saveState();
}

function nextQuestion() {
    if (currentState.currentQuestionIndex < quizData[currentState.activeTestIndex].questions.length - 1) {
        currentState.currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        loadQuestion();
    }
}

// 6. Timer
function startTimer() {
    if (currentState.timer) clearInterval(currentState.timer);
    
    currentState.timer = setInterval(() => {
        currentState.timeLeft--;
        updateTimerDisplay();
        
        if (currentState.timeLeft <= 0) {
            clearInterval(currentState.timer);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(currentState.timeLeft / 60);
    const secs = currentState.timeLeft % 60;
    document.getElementById('timer-text').textContent = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    if (currentState.timeLeft < 60) {
        document.querySelector('.timer-box').style.color = 'var(--error)';
    }
}

// 7. Submission
function showSubmitScreen() {
    const test = quizData[currentState.activeTestIndex];
    const answered = Object.keys(currentState.userAnswers).length;
    
    document.getElementById('total-q-count').textContent = test.questions.length;
    document.getElementById('answered-count').textContent = answered;
    document.getElementById('remaining-count').textContent = test.questions.length - answered;
    
    showView('submit');
}

function submitQuiz() {
    clearInterval(currentState.timer);
    currentState.endTime = new Date();
    calculateResults();
    showView('result');
    localStorage.removeItem('quizPro_state'); // Clear progress after submission
}

function calculateResults() {
    const test = quizData[currentState.activeTestIndex];
    let correct = 0;
    
    test.questions.forEach((q, i) => {
        if (currentState.userAnswers[i] === q.correct) correct++;
    });

    const total = test.questions.length;
    const percent = Math.round((correct / total) * 100);
    const wrong = total - correct;
    const timeTaken = Math.floor((currentState.endTime - currentState.startTime) / 1000);
    const mins = Math.floor(timeTaken / 60);
    const secs = timeTaken % 60;

    // Update Results UI
    document.getElementById('result-percentage').textContent = `${percent}%`;
    document.getElementById('result-progress').setAttribute('stroke-dasharray', `${percent}, 100`);
    document.getElementById('res-correct').textContent = correct;
    document.getElementById('res-wrong').textContent = wrong;
    document.getElementById('res-time').textContent = `${mins}m ${secs}s`;

    const badge = document.getElementById('pass-fail-badge');
    if (percent >= 50) {
        badge.textContent = 'Passed';
        badge.className = 'badge pass';
    } else {
        badge.textContent = 'Failed';
        badge.className = 'badge fail';
    }
}

// 8. Review
function showReview() {
    const test = quizData[currentState.activeTestIndex];
    const reviewList = document.getElementById('review-list');
    
    reviewList.innerHTML = test.questions.map((q, i) => {
        const userAns = currentState.userAnswers[i];
        const isCorrect = userAns === q.correct;
        
        return `
            <div class="review-item">
                <p class="review-q">${i + 1}. ${q.q}</p>
                <div class="review-options">
                    ${q.a.map((opt, optIdx) => {
                        let statusClass = '';
                        if (optIdx === q.correct) statusClass = 'correct';
                        else if (optIdx === userAns && !isCorrect) statusClass = 'wrong';
                        
                        return `<div class="review-option ${statusClass}">${opt}</div>`;
                    }).join('')}
                </div>
                <div class="review-explanation">
                    <strong>Explanation:</strong> ${q.exp}
                </div>
            </div>
        `;
    }).join('');
    
    showView('review');
}

function retakeTest() {
    startTest(currentState.activeTestIndex);
}

// 9. Persistence & Helpers
function saveState() {
    if (currentState.currentView === 'quiz') {
        localStorage.setItem('quizPro_state', JSON.stringify(currentState));
    }
}

function loadPersistedState() {
    const saved = localStorage.getItem('quizPro_state');
    if (saved) {
        // Option to resume could be added here
        // For now, we clear to avoid confusion on page reload
        localStorage.removeItem('quizPro_state');
    }
}

function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
