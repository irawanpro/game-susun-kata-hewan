// Ambil elemen-elemen DOM yang dibutuhkan
const gameArea = document.getElementById('game-area');
const factArea = document.getElementById('fact-area');
const congratulationsScreen = document.getElementById('congratulations-screen');
const animalImage = document.getElementById('animal-image');
const clueText = document.getElementById('clue-text');
const scrambledWordDiv = document.getElementById('scrambled-word');
const answerInput = document.getElementById('answer-input');
const checkButton = document.getElementById('check-button');
const messageDisplay = document.getElementById('message');
const factAnimalName = document.getElementById('fact-animal-name');
const animalFact = document.getElementById('animal-fact');
const nextButton = document.getElementById('next-button');
const playAgainButton = document.getElementById('play-again-button');

let currentAnimalIndex = 0;
let shuffledAnimals = [];

// Fungsi untuk mengacak array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fungsi untuk mengacak kata
function scrambleWord(word) {
    let a = word.split("");
    let n = a.length;

    for(let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    // Pastikan kata yang diacak tidak sama dengan kata aslinya, jika memungkinkan
    if (a.join("") === word && word.length > 1) {
        return scrambleWord(word); // Ulangi pengacakan jika sama
    }
    return a.join("");
}

// Fungsi untuk menampilkan hewan berikutnya
function loadNextAnimal() {
    if (currentAnimalIndex < shuffledAnimals.length) {
        const animal = shuffledAnimals[currentAnimalIndex];
        animalImage.src = animal.image;
        clueText.textContent = animal.clue;
        scrambledWordDiv.textContent = scrambleWord(animal.name);
        answerInput.value = ''; // Kosongkan input
        messageDisplay.textContent = ''; // Hapus pesan
        gameArea.classList.remove('hidden');
        factArea.classList.add('hidden');
        congratulationsScreen.classList.add('hidden');
        answerInput.focus(); // Fokuskan kembali ke input
    } else {
        showCongratulationsScreen();
    }
}

// Fungsi untuk menampilkan layar selamat
function showCongratulationsScreen() {
    gameArea.classList.add('hidden');
    factArea.classList.add('hidden');
    congratulationsScreen.classList.remove('hidden');
}

// Event listener untuk tombol Cek Jawaban
checkButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.toLowerCase().trim();
    const correctAnswer = shuffledAnimals[currentAnimalIndex].name.toLowerCase();

    if (userAnswer === correctAnswer) {
        messageDisplay.textContent = 'Benar!';
        messageDisplay.style.color = 'green';
        setTimeout(() => {
            gameArea.classList.add('hidden');
            factArea.classList.remove('hidden');
            factAnimalName.textContent = shuffledAnimals[currentAnimalIndex].name;
            animalFact.textContent = shuffledAnimals[currentAnimalIndex].fact;
        }, 1000);
    } else {
        messageDisplay.textContent = 'Salah! Coba lagi.';
        messageDisplay.style.color = 'red';
        answerInput.value = ''; // Kosongkan input otomatis
    }
});

// Event listener untuk tombol Hewan Selanjutnya
nextButton.addEventListener('click', () => {
    currentAnimalIndex++;
    loadNextAnimal();
});

// Event listener untuk tombol Main Lagi
playAgainButton.addEventListener('click', () => {
    currentAnimalIndex = 0;
    shuffledAnimals = shuffleArray([...animalsData]); // Acak ulang data
    loadNextAnimal();
});

// Inisialisasi game saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    shuffledAnimals = shuffleArray([...animalsData]); // Buat salinan data dan acak
    loadNextAnimal();
});

// Memungkinkan cek jawaban dengan menekan Enter
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkButton.click();
    }
});