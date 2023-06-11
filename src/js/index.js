let words = []
let lettersArray = []

function normalizeData(dataArray){
    for (let element of dataArray){
        const newWord = {
            word: element.word,
            meaning: element.meaning,
            spanish: element.spanish
        }
        words.push(newWord)
    }
    return words
}

let n
let word
let currentIndex = 0

function getDataFromJSON(){
    fetch('./api/words.json')
    .then(response => response.json())
    .then(data => normalizeData(data))
    .then(jsondata =>{
        words = jsondata
        n = words.length
        shuffleArray(words)
        word = nextWord()
        document.querySelector("#translation-text").addEventListener("click", function(){
            document.querySelector("#spanish").classList.toggle("show-text")
        })
        document.addEventListener("keypress", function(event){
            if (window.matchMedia("(min-width: 601px)").matches) {
                if (/^[a-z]$/i.test(event.key)){
                    for (let i = 0; i < lettersArray.length; i++){
                        if (lettersArray[i]==""){
                            lettersArray[i] = event.key.toLocaleLowerCase()
                            document.querySelector("#letter_" + i.toString()).textContent = event.key.toLocaleLowerCase()
                            break
                        }
                    }
                    setTimeout(function(){
                        if (!lettersArray.includes("")){
                            checkGuess(word)
                        }
                    }, 50)
                }
            }
        })
        document.addEventListener("keydown", function(event){
            if (window.matchMedia("(min-width: 601px)").matches) {
                if (event.key == "Backspace"){
                    for (let i = lettersArray.length - 1; i>=0; i--){
                        if (lettersArray[i]!=""){
                            lettersArray[i] = ""
                            document.querySelector("#letter_" + i.toString()).textContent = ""
                            break
                        }
                    }
                }
            }
        })
    })
}

getDataFromJSON()

function nextWord(){
    lettersArray = []
    let index = currentIndex % words.length
    currentIndex++
    document.querySelector("#spanish").textContent = words[index].spanish
    document.querySelector("#meaning").textContent = words[index].meaning
    document.querySelector("#image").src = ""
    document.querySelector("#image").src = "https://source.unsplash.com/200x200/?" + words[index].word
    for (let i = 0; i < (words[index].word).length; i++){
        lettersArray.push("")
        const newPar = document.createElement("p")
        newPar.classList.add("letter")
        newPar.setAttribute("id", "letter_" + i)
        newPar.addEventListener("click", function(){
            lettersArray[i] = ""
            newPar.textContent = ""
        })
        document.querySelector("#letters-container").appendChild(newPar)
    }
    return words[index].word
}

// function randomWord(n){
//     lettersArray = []
//     index = Math.floor(Math.random() * n)
//     document.querySelector("#spanish").textContent = words[index].spanish
//     document.querySelector("#meaning").textContent = words[index].meaning
//     document.querySelector("#image").src = ""
//     document.querySelector("#image").src = "https://source.unsplash.com/200x200/?" + words[index].word
//     for (let i = 0; i < (words[index].word).length; i++){
//         lettersArray.push("")
//         const newPar = document.createElement("p")
//         newPar.classList.add("letter")
//         newPar.setAttribute("id", "letter_" + i)
//         newPar.addEventListener("click", function(){
//             lettersArray[i] = ""
//             newPar.textContent = ""
//         })
//         document.querySelector("#letters-container").appendChild(newPar)
//     }
//     return words[index].word
// }

function correctlyGuessed(){
    alert("Congratulations, you guessed!")
    document.querySelector("#guess").value = ""
    document.querySelector("#textFieldContainer").classList.remove("is-dirty")
    document.querySelectorAll(".letter").forEach(p => p.remove())
    word = nextWord()
    if (document.querySelector("#spanish").classList.contains("show-text")){
        document.querySelector("#spanish").classList.toggle("show-text")
    }
}

document.querySelector("#validateButton").addEventListener("click", function(){
    let inputText = document.querySelector("#guess").value
    if (inputText.trim().toLocaleLowerCase() == word){
        correctlyGuessed()
    } else {
        alert("Ups, try again!")
    }
})

document.querySelector("#guess").addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        event.stopPropagation()
        document.querySelector("#validateButton").click();
    }
})

function checkGuess(wordToGuess){
    if (lettersArray.join('')==wordToGuess){
        correctlyGuessed()
    } else {
        alert("Ups, try again!")
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}