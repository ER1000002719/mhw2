function hasEnded(){
   for (let answer in answers){
       console.log(answers[answer]);
        if (answers[answer] === ""){
            console.log("false");
            return false;
        }
    }
    console.log("true");
    return true;
}

function getResults(){
    let possible_answers = {
        'blep':0,
        'burger':0,
        'cart':0,
        'dopey':0,
        'happy':0,
        'nerd':0,
        'shy':0,
        'sleeping':0,
        'sleepy':0
    };
    for (let answer in answers){
        possible_answers[answers[answer]] += 1;
    }
    let max = answers.one;
    for (let answer in possible_answers){
        if(possible_answers[answer] > possible_answers[max]){
            max = answer;
        }
    }
    return max;
}

function displayResults(){
    if (hasEnded()){
        document.querySelector("button").classList.remove("hidden");   
        for (div of document.querySelectorAll(".choice-grid div")){
            div.removeEventListener('click', Selezionato);
        }

        risultato = getResults();
        
        document.querySelector("#results-title").textContent = RESULTS_MAP[risultato].title;
        document.querySelector("#results-text").textContent = RESULTS_MAP[risultato].contents;
    }
}

function Selezionato(event){
    const box = event.currentTarget;
    box.classList.add("Selezionato");
    box.classList.remove("opaque");
    let img = box.querySelector(".checkbox");
    img.src = "images/checked.png";

    for (const div of document.querySelectorAll('.choice-grid div')){
        if((div.dataset.questionId === box.dataset.questionId) && (div.dataset.choiceId !== box.dataset.choiceId)){
            div.classList.add("opaque");
            div.classList.remove("Selezionato");
            div.querySelector(".checkbox").src = "images/unchecked.png"
        }
    }

    answers[box.dataset.questionId] = box.dataset.choiceId;

    displayResults();

}

function Restart(){
    for (let div of Options){
        div.addEventListener('click', Selezionato);
        div.classList.remove("Selezionato");
        div.classList.remove("opaque");
        let img = div.querySelector(".checkbox");
        img.src = "images/unchecked.png";
    }

    document.querySelector("button").classList.add("hidden");

    document.querySelector("#results-title").textContent = '';
    document.querySelector("#results-text").textContent = '';

    answers.one = '';
    answers.two = '';
    answers.three = '';
}

const Options = document.querySelectorAll('.choice-grid div');
for (let div of Options){
    div.addEventListener('click', Selezionato);
}
document.querySelector("button").addEventListener("click", Restart); 

const answers = {
    one: "",
    two: "",
    three: ""
};

