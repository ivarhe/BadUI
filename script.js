const discretePackage = (value) => {
    document.getElementById("choice").innerText = value
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

document.getElementById('charCount').addEventListener('input', function() {
    const count = parseInt(this.value);
    const nameInputDiv = document.getElementById('nameInput');
    nameInputDiv.innerHTML = ''; // Clear previous inputs

    if (isNaN(count) || count < 1 || count > 26) {
        // Do nothing or show an error
        return;
    }

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    for (let i = 0; i < count; i++) {
        // Shuffle the letters array to get random order
        const shuffledLetters = shuffle(letters.slice());

        // Create select element
        const select = document.createElement('select');
        for (let j = 0; j < shuffledLetters.length; j++) {
            const option = document.createElement('option');
            option.value = shuffledLetters[j];
            option.text = shuffledLetters[j];
            select.appendChild(option);
        }

        nameInputDiv.appendChild(select);
    }
});

document.getElementById('confirmButton').addEventListener('click', function() {
    const selects = document.querySelectorAll('#nameInput select');
    let name = '';
    selects.forEach(function(select) {
        name += select.value;
    });

    alert("Nå kan vi navnet ditt, takk skal du ha :) <3 :)")
    const confirmedNameDiv = document.getElementById('confirmedName');
    confirmedNameDiv.textContent = 'Confirmed Name: ' + name;
});


const displayInfo = () => {
    adress = document.getElementById("adress").
    name = document.getElementById("confirmedName")
    discrete = document.getElementById("choice").innerText

    alert(`Gratulerer ${name}. du har nå abbonert og får tilsendt til ${adress}. Diskret? ${discrete}`)
}