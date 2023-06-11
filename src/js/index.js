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

function getDataFromJSON(){
    fetch('./api/words.json')
    .then(response => response.json())
    .then(data => normalizeData(data))
    .then(jsondata =>{
        words = jsondata
        n = words.length
        word = randomWord(n)
        document.querySelector("#translation-text").addEventListener("click", function(){
            document.querySelector("#spanish").classList.toggle("show-text")
        })
        document.addEventListener("keypress", function(event){
            if (window.matchMedia("(min-width: 601px)").matches) {
                if(/^[a-z]$/i.test(event.key)){
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
    })
}

getDataFromJSON()

function randomWord(n){
    lettersArray = []
    index = Math.floor(Math.random() * n)
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
    // const verifyButton = document.createElement("button")
    // verifyButton.textContent = "Verificar"
    // verifyButton.classList.add("mdl-button", "mdl-js-button", "mdl-button--raised", "mdl-button--colored")
    // let input = document.querySelector("#guess")
    // input.parentNode.insertBefore(verifyButton, input.nextSibling)
    // verifyButton.addEventListener("click", function(){
    //     validar(words[index].word, verifyButton)
    // })
    return words[index].word
}

document.querySelector("#validateButton").addEventListener("click", function(){
    let inputText = document.querySelector("#guess").value
    if (inputText.trim().toLocaleLowerCase() == word){
        alert("Congratulations, you guessed!")
        document.querySelector("#guess").value = ""
        document.querySelector("#textFieldContainer").classList.remove("is-dirty")
        document.querySelectorAll(".letter").forEach(p => p.remove())
        word = randomWord(n)
        if (document.querySelector("#spanish").classList.contains("show-text")){
            document.querySelector("#spanish").classList.toggle("show-text")
        }
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
        alert("Congratulations, you guessed!")
        document.querySelector("#guess").value = ""
        document.querySelector("#textFieldContainer").classList.remove("is-dirty")
        document.querySelectorAll(".letter").forEach(p => p.remove())
        word = randomWord(n)
        if (document.querySelector("#spanish").classList.contains("show-text")){
            document.querySelector("#spanish").classList.toggle("show-text")
        }
    } else {
        alert("Ups, try again!")
    }
}