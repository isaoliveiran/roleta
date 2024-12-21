let spinON = false; // Variável de controle da roleta antes de rodar
let valorPremio = "1€" // Valor da mensagem prémio
let imagemSrc = "images/feliz.jpeg";
let urlResgate = "https://google.com"; // exemplo

    function balanco() {
      const wheel = document.getElementById('wheel');
      let angle = 0; 

      function animarBalanco() {
        if (spinON) return; 

  
        angle = angle === 10 ? -10 : 10;
        wheel.style.transform = `rotate(${angle}deg)`;

        
        setTimeout(animarBalanco, 200);
      }

      animarBalanco(); 
    }
balanco();
document.getElementById('spinButton').addEventListener('click', function () {
  //////////////////////////////////////////////////////////////////
    spinON = true; // resposta balanço, importante para não conflitar 
    ////////////////////////////////////////////////////////////////
    audio();

    const wheel = document.getElementById('wheel');
  
    const targetSlice = 4; 
    const totalSlices = 8; 
    const degreesPerSlice = 360 / totalSlices;
  
    const randomExtraSpins = 5; 
    const finalAngle = randomExtraSpins * 360 + targetSlice * degreesPerSlice;
  
    wheel.style.transition = 'transform 4s ease-out';
    wheel.style.transform = `rotate(${finalAngle}deg)`;
  
    setTimeout(() => {
      wheel.style.transition = 'none';
      wheel.style.transform = `rotate(${targetSlice * degreesPerSlice}deg)`;
      gerarElementoPremiado(valorPremio, imagemSrc);

    }, 4000);
    
  });
  
  function gerarElementoPremiado(valorPremio, imagemSrc){

    const divPremiado = document.createElement("div");
    divPremiado.className = "premiado";

    const titulo = document.createElement("h3");
    titulo.textContent = `Parabéns! Você foi premiado com ${valorPremio} !`;
    
    const imagem = document.createElement("img");
    imagem.src = imagemSrc;
    imagem.alt = "Imagem do prêmio";

    const botao = document.createElement("button");
    botao.id = "resgate";
    botao.textContent = "Resgatar prêmio";

    divPremiado.appendChild(titulo);
    divPremiado.appendChild(imagem);
    divPremiado.appendChild(botao);

    document.body.appendChild(divPremiado);
    
    apagarButton();

    document.getElementById('resgate').addEventListener('click', function () {

      window.location.href = urlResgate;
      })



    setTimeout(() => {
      jogarConfetesNaDiv() ;

    }, 1000);

  }




function jogarConfetesNaDiv() {
  // Seleciona a div com a classe "premiado"
  const divPremiado = document.querySelector('.premiado');

  if (divPremiado) {
    const rect = divPremiado.getBoundingClientRect();

    // Configuração do confetti dentro da posição da div
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth, // Posição horizontal centralizada
        y: (rect.top + rect.height / 2) / window.innerHeight, // Posição vertical centralizada
      },
      particleCount: 1200, // Quantidade de confetes
      spread: 140, // Espalhamento
      startVelocity: 30, // Velocidade inicial


      
    });
  } else {
    console.warn("A div com a classe 'premiado' não foi encontrada.");
  }

}

function apagarButton(){
  const spinButton = document.getElementById('spinButton');
  spinButton.remove();

}

///////////////////////////////////
const roletaSom = new Audio('audio/Spinning.mp3'); 
function audio() {
  
  roletaSom.currentTime = 7; // sicronização 6
  roletaSom.play()          
    
}