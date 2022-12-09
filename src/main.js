// import './style.css'

class App {
	constructor() {
		this.data = null;
		this.cardNums = [0, 1, 2];
		this.lessButton = null;
		this.moreButton = null;
		this.cardsWrapper = null;
		this.moreButtonState = 'active';
		this.lessButtonState = 'inactive';

		this.fetchData().then(() => {
			this.intit()
		});
	}

	async fetchData() {
		const response = await fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		});

		this.data = await response.json();
	};

	bindEvents() {
		this.moreButton.addEventListener('click', this.handleClickMore.bind(this));
		this.lessButton.addEventListener('click', this.handleClickLess.bind(this));
	}

	renderCards(data) {
		console.log(data);
		console.log(this.cardNums);
		let cards = this.cardNums;
		let parentContainer = document.getElementById('content');
		parentContainer.innerHTML = '';

		if (document.getElementsByClassName('card').length < this.cardNums.length) {
			for (let i = 0; i < this.cardNums.length; i++) {
				let div = document.createElement('div');

				console.log(data[cards[i]]['name']);

				div.innerHTML = `
				<div class="card">
					<div class="name-container">
						<div class="name">${data[cards[i]]['name']}</div>
						<div class="username">${data[cards[i]]['username']}</div>
					</div>
					<div class="details-wrapper">
						<div class="address-container">
							<div class="address">${data[cards[i]]['address']['street']} ${data[cards[i]]['address']['suite']}</div>
							<div class="address">${data[cards[i]]['address']['city']} ${data[cards[i]]['address']['zip']}</div>
						</div>
						<div class="contact-container">
							<div class="contact">${data[cards[i]]['company']['name']}</div>
							<div class="contact">${data[cards[i]]['company']['catchPhrase']}</div>
							<div class="contact">${data[cards[i]]['phone']}</div>
							<div class="contact">${data[cards[i]]['email']}</div>
							<div class="contact">${data[cards[i]]['website']}</div>
						</div>
					</div>
				</div>`;

				parentContainer.appendChild(div);
			}
		}

	}

	handleClickMore() {
		this.lessButtonState = 'active';
		let lastCard = this.cardNums[this.cardNums.length -1];
		this.cardNums.push(lastCard + 1);
		this.cardNums.shift();

		if (lastCard === this.data.length - 1) {
			let button = document.getElementById("more");
			button.classList.remove("active");
			this.moreButtonState = 'inactive';
		}

		this.renderCards(this.data);
	}

	handleClickLess() {
		this.moreButtonState = 'active';
		let firstCard = this.cardNums[0];
		this.cardNums.unshift(firstCard - 1);
		this.cardNums.pop();

		if (firstCard === 0) {
			let button = document.getElementById("less");
			button.classList.remove("active");
			this.lessButtonState = 'inactive';
		}

		this.renderCards(this.data);
	}

	intit() {
		this.lessButton = document.getElementById('less');
		this.moreButton = document.getElementById('more');

		this.bindEvents();

		this.cardsWrapper.html = this.renderCards(this.data);

		console.log(this.data[0][name]);
	}

}

new App();



