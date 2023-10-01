let currentCountry = {};
let correctCount = 0;
let wrongCount = 0;
const nextButton = document.getElementById('nextButton');

//função para carregar uma bandeira 
function loadFlag(){
    let apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags';
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => { 
        const randomIndex = Math.floor(Math.random() * data.length);
        currentCountry = data[randomIndex];
        const flagElement = document.getElementById('flag');
        flagElement.src = currentCountry.flags.png;

        //definindo ALTs
        flagElement.alt = `Bandeira do país ${currentCountry.name.common}`;
    })
    .catch(error => console.error('Erro ao carregar a imagem', error));
}

//verificar a resposta do usuário
function checkGuess(){
    const guess =document.getElementById('guess').value;
    const resultElement = document.getElementById('result');
    if (guess.toLowerCase() === currentCountry.name.common.toLowerCase()){
        resultElement.textContent = 'Resposta correta!';
        correctCount++;
        //carrega nova bandeira após verificar a resposta
        loadFlag(document.getElementById('guess').value); 
        //limpa o input
        setTimeout(function(){
           document.getElementById('guess').value = "";
           resultElement.textContent = ""; //remove a mensagem
        }, 2000);
        
    }

    else{
        resultElement.textContent = 'Resposta incorreta. Tente novamente';
        wrongCount++;
        setTimeout(function(){
            resultElement.textContent = "";
        }, 2000);
    }
    updateCounters();
}

function updateCounters(){
    const correctCountElement = document.getElementById('correctCount');
    const wrongCountElement = document.getElementById('wrongCount');

    correctCountElement.textContent = `${correctCount}`;
    wrongCountElement.textContent = `${wrongCount}`;
}

//gerar a bandeira ao carregar a página
window.onload = function(){
    loadFlag();
};

checkButton.addEventListener('click', checkGuess);

nextButton.addEventListener('click', () => {
    const selectedRegion = document.getElementById('guess').value;
    loadFlag();
});