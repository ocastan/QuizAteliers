(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        //for(letter in currentQuestion.answers){
        currentQuestion.answers.forEach(
		  (currentAnswer, answerNumber) => {

            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${answerNumber}"/>
                ${currentAnswer}
              `
            );
          }
		);

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${questionNumber + 1} - ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
    erreurContainer.style.display = 'none';
    corbeauContainer.style.display = 'none';
    licorneContainer.style.display = 'none';
    sphinxContainer.style.display = 'none';
    phenixContainer.style.display = 'none';
  }

  function showResults(e){
	e.stopPropagation();
	
	const missingAnswers = [];
	
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    //let numCorrect = 0;
    const symbolCounts = {
		corbeau: 0,
		licorne: 0,
		sphinx: 0,
		phenix: 0
	}

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
	  console.log("Quiz question", questionNumber, userAnswer);

      // if answer is correct
      //if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        //numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = 'lightgreen';
      //}
      // if answer is wrong or blank
      //else{
        // color the answers red
        //answerContainers[questionNumber].style.color = 'red';
      //}
      if (userAnswer === undefined) {
		  missingAnswers.push(questionNumber + 1);
	  }
	  else {
		  symbolCounts[currentQuestion.symbol] += Number(userAnswer);
	  }
    });
	console.log("Quiz symbolCounts", symbolCounts);

    // show number of correct answers out of total
    //resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    if (missingAnswers.length > 0) {
		const erreurMsg = "<strong>Certaines réponses manquent. Question(s) : ";
		erreurContainer.innerHTML = erreurMsg.concat(missingAnswers.join(', '), "</strong>");
		erreurContainer.style.display = 'inline-block';
		erreurContainer.scrollIntoView();
	}
	else {
		erreurContainer.style.display = 'none';
		let maxCount = 0;
		let selectedSymbol = "";
		for (const [key, value] of Object.entries(symbolCounts)) {
			if (value>maxCount) {
				maxCount = value;
				selectedSymbol = key;
			}
		}
		if (selectedSymbol != "") {
			document.getElementById(selectedSymbol).style.display = 'inline-block';
			document.getElementById(selectedSymbol).scrollIntoView();
		}
	}
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide(e) {
	e.stopPropagation();
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide(e) {
	e.stopPropagation();
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  //const resultsContainer = document.getElementById('results');
  const erreurContainer = document.getElementById('erreur');
  const corbeauContainer = document.getElementById('corbeau');
  const licorneContainer = document.getElementById('licorne');
  const sphinxContainer = document.getElementById('sphinx');
  const phenixContainer = document.getElementById('phenix');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
	{
	  //1
	  question: "Avez-vous la sensation d’être perdu dans les options possibles pour résoudre votre problème ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "sphinx"
	},
	{
	  //2
	  question: "La peur de l’inconnu aurait-elle tendance à vous bloquer ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "corbeau"
	},
	{
	  //3
	  question: "Afin de résoudre ce problème rapidement, auriez-vous tendance à trancher sans plus de discernement, à ne pas faire dans le détail, quitte à faire quelques dégâts alentour ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "phenix"
	},
	{
	  //4
	  question: "Vous dites-vous parfois que tout est lié aux planètes et que vous ne pouvez rien y changer ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "licorne"
	},
	{
	  //5
	  question: "Votre sécurité matérielle est-elle en ce moment une de vos principales préoccupations ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "corbeau"
	},
	{
	  //6
	  question: "Avez-vous la sensation que les autres ne perçoivent pas votre problème à sa juste mesure parce qu’ils vous pensent fort(e) ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "phenix"
	},
	{
	  //7
	  question: "Ce problème vous donne-t-il une envie irrépressible de fuir la réalité ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "licorne"
	},
	{
	  //8
	  question: "Avez-vous l’impression que c’est toujours le même problème qui revient sous une forme différente ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "sphinx"
	},
	{
	  //9
	  question: "Aujourd’hui, la colère, l’agressivité pourraient-elles vous submerger, vous faire sortir de vos gonds ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "phenix"
	},
	{
	  //10
	  question: "Avez-vous tendance aujourd’hui à procrastiner ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "corbeau"
	},
	{
	  //11
	  question: "Avez-vous l’impression que le problème actuel vous asphyxie, que vous manquez d’air au sens propre comme au sens figuré ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "sphinx"
	},
	{
	  //12
	  question: "Avez-vous actuellement tendance à vouloir vous rassurer en vous documentant et en cherchant des informations ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "sphinx"
	},
	{
	  //13
	  question: "Avez-vous ces derniers temps plus particulièrement peur des lieux clos, petits, étroits ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "corbeau"
	},
	{
	  //14
	  question: "Seriez-vous enclin à vouloir tout résoudre par magie ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "licorne"
	},
	{
	  //15
	  question: "Avez-vous souvent  la sensation que votre énergie est bloquée à l’intérieur, que vous ne parvenez pas à l’exprimer ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "phenix"
	},
	{
	  //16
	  question: "Doutez-vous de la recevabilité de vos demandes à l’Univers ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "licorne"
	},
	{
	  //17
	  question: "Alternez-vous actuellement les phases d’exaltation et de dépression ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "licorne"
	},
	{
	  //18
	  question: "Auriez-vous tendance à croire que vous n’avez pas besoin des autres pour résoudre le problème qui vous préoccupe aujourd’hui ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "phenix"
	},
	{
	  //19
	  question: "Êtes-vous en ce moment sujet à la routine pour vous rassurer, quitte à tourner en boucles ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "corbeau"
	},
	{
	  //20
	  question: "Avez-vous actuellement l’impression que vous passez d’un excès de confiance en vous à une absence totale d’assurance, et vice versa ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "phenix"
	},
	{
	  //21
	  question: "Vous sentez-vous incapable de parler posément, sans pleurer ou vous effondrer, de ce qui vous préoccupe?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "licorne"
	},
	{
	  //22
	  question: "Êtes-vous plus particulièrement ces derniers temps obsédé par les détails ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "sphinx",
	},
	{
	  //23
	  question: "Auriez-vous tendance ou envie de vous en remettre à quelqu’un d’autre pour résoudre votre problème ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "corbeau"
	},
	{
	  //24
	  question: "Avez-vous tendance à vouloir sous-estimer votre problème actuel pour ne pas vous sentir vulnérable ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "phenix"
	},
	{
	  //25
	  question: "Avez-vous la sensation de ne pas avoir une vision globale et claire de ce qu’il vous faut mettre en œuvre ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "sphinx"
	},
	{
	  //26
	  question: "Avez-vous ces derniers temps du mal à faire la part des choses entre ce que vous ressentez et la réalité ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "licorne"
	},
	{
	  //27
	  question: "Avez-vous besoin, ces derniers temps, pour vous rassurer, de stocker, d’emmagasiner le plus de provisions possibles ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "corbeau"
	},
	{
	  //28
	  question: "La sensation d’une possible toute-puissance incontrôlable vous est-elle familière ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "phenix"
	},
	{
	  //29
	  question: "Ce problème bloque t-il actuellement votre capacité d’action, vous paralyse t-il ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "corbeau"
	},
	{
	  //30
	  question: "Votre problème actuel vous submerge-t-il de culpabilité ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "sphinx"
	},
	{
	  //31
	  question: "Vous sentez-vous aujourd’hui en suspens dans votre vie, comme privé de racines ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "licorne"
	},
	{
	  //32
	  question: "Êtes-vous sujet au pessimisme, au défaitisme ?",
      answers: [ "jamais", "parfois", "souvent", "absolument !" ],
	  symbol: "sphinx"
	}
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);
	
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  //submitButton.addEventListener('touchstart', showResults);
  //previousButton.addEventListener("touchstart", showPreviousSlide);
  //nextButton.addEventListener("touchstart", showNextSlide);
})();
