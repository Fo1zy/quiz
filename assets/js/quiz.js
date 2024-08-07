
class Quiz {
    constructor(questions) {
        this.questions = questions
        this.index = 0;
        this.answer = {
            success: 0,
            error: 0,
        };
        this.ui = {
            time: document.querySelector(`#time`),
            question: document.querySelector(`#question`),
            CurrentQuestion: document.querySelector(`#CurrentQuestion`),
            TotalQuestion: document.querySelector(`#TotalQuestion`),
            btnnext: document.querySelector(`#btnnext`),
            resultContent: document.querySelector(`#resultContent`),
            quizContent: document.querySelector(`#quizContent`),
            success: document.querySelector(`#success`),
            error: document.querySelector(`#error`),
            reloadQuiz: document.querySelector(`#reloadQuiz`),
            timer: document.querySelector(`#timer`),
        }
    }
    
    
    getQuestion() {
        return this.questions[this.index];
    }

    uiAnswer(variant, text) {
        return `
        <div data-variant="${variant}" class="py-[9px] px-[12px] cursor-pointer rounded border border-gray-400">
                    <b>${variant}.</b> ${text}.
                </div>
                `
    }

    nextQuestion() {
        this.nextQuestionShow();
        this.disableclick();
        if (this.index < this.questions.length - 1) {
            this.index++;
            this.start();
            this.ui.CurrentQuestion.innerHTML = this.index + 1;
        }

    }

    disableclick(status) {
        if (status) {
            this.ui.question.style.pointerEvents = `none`;
        } else {
            this.ui.question.style.pointerEvents = `initial`;
        }

    }

    successAnswer(variant) {
        const el = this.ui.question.querySelector(`[data-variant="${variant}"]`);
        this.answer.success += 1;
        this.disableclick(true);
        if (el) {
            el.classList.add('bg-[#d4ffba]');
        }
    }

    errorAnswer(variant) {
        const question = this.getQuestion();
        const selectEl = this.ui.question.querySelector(`[data-variant="${variant}"]`);
        const correctEl = this.ui.question.querySelector(`[data-variant="${question.correct}"]`);
        this.answer.error += 1;
        if (selectEl) {
            this.disableclick(true);
            selectEl.classList.add(`bg-[#ffdede]`)
        }
        if (correctEl) {
            correctEl.classList.add(`bg-[#d4ffba]`)
        }
    }

    nextQuestionShow(status) {
        if (status) {
            this.ui.btnnext.classList.remove(`hidden`)
        } else {
            this.ui.btnnext.classList.add(`hidden`)
        }
    }

    selectVariant(e) {
        const question = this.getQuestion();
        const obj = e.target.closest(`[data-variant]`) ? e.target.closest(`[data-variant]`) : e.target;
        const variant = obj.dataset.variant;
        console.log(question);
        if (variant) {
            
            
            if (variant === question.correct) {
                this.successAnswer(variant);
            } 
            else {
                this.errorAnswer(variant);
            }
            if (this.index < this.questions.length - 1) {
                this.disableclick(true);
            this.nextQuestionShow(true);
            }
            else {
                this.quizFinished();
            }
        }
    }

    quizFinished () {
        this.ui.success.textContent = this.answer.success;
        this.ui.error.textContent = this.answer.error;
        this.ui.resultContent.classList.remove(`hidden`);
        this.ui.quizContent.classList.add(`hidden`);
    }

    start() {
        const question = this.getQuestion();
        this.ui.quizContent.classList.remove(`hidden`);
        let html = `<div class="mt-[16px] space-y-3">`;
        for (let answer of Object.keys(question.answers)) {
            html += this.uiAnswer(answer, question.answers[answer])
        }
        html += `</div>`;
        this.ui.question.innerHTML = `
        <h1><b>${this.index+1}</b> ${question.text} </h1>
         ${html}    
        `
    }

    events() {
        this.ui.btnnext.addEventListener(`click`, this.nextQuestion.bind(this))
        this.ui.question.addEventListener(`click`, this.selectVariant.bind(this))
        this.ui.reloadQuiz.addEventListener(`click`, () => {
            window.location.reload();
        }) 
    }
}

export default Quiz