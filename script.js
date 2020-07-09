const gameContainer = document.getElementById('game');

const h1 = document.querySelector('h1');

const resetBtn = document.querySelector('button');

const h2 = document.querySelector('h2');

const COLORS = [
	'https://cdnb.artstation.com/p/assets/images/images/008/399/713/large/adam-milicevic-alien-c2.jpg?1519857179',
	'https://www.pennlive.com/resizer/QerD3_kFWxzx1Mw21npKq7-eSi8=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/LPLLRDXWZNCJVGND32JCXDF2ZQ.jpeg',
	'https://media4.s-nbcnews.com/i/newscms/2018_04/2306811/180126-alien-mn-1345_a45560a5a5fd8459dcc14b914ddf1dd2.jpg',
	'https://i.pinimg.com/originals/92/4f/6c/924f6cb05e59d26f1acc9f7230d39cb8.jpg',
	'https://foreignpolicy.com/wp-content/uploads/2013/04/ufo_021.jpg?w=625&h=400&quality=90',
	'https://cdnb.artstation.com/p/assets/images/images/008/399/713/large/adam-milicevic-alien-c2.jpg?1519857179',
	'https://www.pennlive.com/resizer/QerD3_kFWxzx1Mw21npKq7-eSi8=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/LPLLRDXWZNCJVGND32JCXDF2ZQ.jpeg',
	'https://media4.s-nbcnews.com/i/newscms/2018_04/2306811/180126-alien-mn-1345_a45560a5a5fd8459dcc14b914ddf1dd2.jpg',
	'https://i.pinimg.com/originals/92/4f/6c/924f6cb05e59d26f1acc9f7230d39cb8.jpg',
	'https://foreignpolicy.com/wp-content/uploads/2013/04/ufo_021.jpg?w=625&h=400&quality=90'
];

let amtClicked = 0;

let tries = 0;

let matches = 0;

let lastClicked;

//tries counter
h2.innerText = `Number of tries: 0`;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		newDiv.innerText = '𓁈';

		newDiv.setAttribute('data-flipped', false);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		resetBtn.addEventListener('click', resetboard);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(e) {
	if (amtClicked > 1 || e.target.getAttribute('data-flipped') === 'true') {
		return;
	}

	amtClicked++;

	let initbackground = e.target.style.background;

	if (amtClicked === 1) {
		lastClicked = e.target;
		e.target.setAttribute('data-flipped', true);
	} else if (amtClicked === 2 && e.target.getAttribute('class') === lastClicked.getAttribute('class')) {
		e.target.setAttribute('data-flipped', true);
		amtClicked = 0;
		matches++;
		tries++;
	} else if (amtClicked === 2) {
		setTimeout(function() {
			e.target.style.background = initbackground;
			lastClicked.style.background = initbackground;
			e.target.style.color = 'black';
			lastClicked.style.color = 'black';
			lastClicked.setAttribute('data-flipped', false);
			amtClicked = 0;
		}, 1000);
		tries++;
	}
	let tempclass = e.target.getAttribute('class');
	e.target.style.backgroundImage = `url(${tempclass})`;
	e.target.style.color = 'rgba(0, 0, 0, 0)';

	h2.innerText = `Number of tries: ${tries}`;

	if (matches === 5) {
		h1.style.color = 'red';
		h1.innerText = 'YOU WIN!';
	}
}

//Reset Function
function resetboard(e) {
	oldDivs = document.querySelectorAll('#game div');
	for (div of oldDivs) {
		div.remove();
	}
	shuffledColors = shuffle(COLORS);
	createDivsForColors(shuffledColors);
	amtClicked = 0;
	tries = 0;
	matches = 0;
	lastClicked = undefined;
	h1.style.color = 'black';
	h1.innerText = 'Memory Game!';
	h2.innerText = `Number of tries: 0`;
}

// when the DOM loads
createDivsForColors(shuffledColors);
