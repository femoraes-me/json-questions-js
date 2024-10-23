let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// evento para click de fazer novamente
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function showQuestion() {
    if(questions[currentQuestion]) {

        // definindo porcentagem e tamanho da barra de progresso
        let progress = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${progress}%`
        
        // instanciando objeto de questao atual
        let q = questions[currentQuestion];

        // removendo area de score e exibindo area de questao
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        // exibindo texto da questao na tela
        document.querySelector('.question').innerHTML = q.question;

        // exibindo opções de resposta na tela
        let optionsHTML = '';
        for(let i in q.options) {
            optionsHTML += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHTML;

        // adicionando evento de click nas opções do array
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
        
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    } 

    currentQuestion ++;
    showQuestion();
}

function finishQuiz() {

    // definindo porcentagem e tamanho da barra de progresso
    document.querySelector('.progress--bar').style.width = `100%`

    // calculando porcentagem de acerto
    let points = Math.floor((correctAnswers / questions.length) * 100);

    // alterando mensagem de motivação 
    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Não foi dessa vez...';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Está no caminho certo!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }


    // exibindo informações no score
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`


    // removendo area de questao e exibindo area de score
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
}

function resetEvent() {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}