const header = document.querySelector(".js-header");

const scrollHeader = () => {
	if (window.pageYOffset > 1) {
		header.classList.add("scroll");
	} else {
		header.classList.remove("scroll");
	}
};

window.addEventListener("scroll", scrollHeader);
document.addEventListener("DOMContentLoaded", scrollHeader);

const body = document.querySelector("body"),
	menuButton = document.querySelector(".js-burger"),
	menu = document.querySelector(".js-nav"),
	menuWrapper = document.querySelector(".js-content");

const toggleBurger = () => {
	menu.classList.toggle("active");
	body.classList.toggle("body-lock");
	menuWrapper.classList.toggle("active");
};

menuWrapper.addEventListener("click", (event) => {
	event.stopPropagation();
});

menuButton.addEventListener("click", toggleBurger);
menu.addEventListener("click", toggleBurger);

const tabButtons = document.querySelectorAll(".js-tab");
const tabContents = document.querySelectorAll(".js-tab-content");
if (tabButtons) {
	tabButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			tabButtons.forEach((btn) => {
				btn.classList.remove("active");
			});
			tabContents.forEach((content) => {
				content.classList.remove("active");
			});

			tabContents[index].classList.add("active");

			button.classList.add("active");
		});
	});
}

var site = site || {};
site.window = $(window);
site.Width = site.window.width() + 400;
site.Height = site.window.height();

let Background = function () {};

Background.headparticle = function () {
	if (!Modernizr.webgl) {
		alert("Your browser dosent support WebGL");
	}

	let camera, scene, renderer;
	let mouseX = 0,
		mouseY = 0;
	let p;

	let windowHalfX = site.Width / 2;
	let windowHalfY = site.Height / 2;

	Background.camera = new THREE.PerspectiveCamera(35, site.Width / site.Height, 1, 2000);
	Background.camera.position.z = 320;

	// scene
	Background.scene = new THREE.Scene();

	// texture
	let manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {
		//console.log('webgl, twice??');
		//console.log( item, loaded, total );
	};

	// particles
	let p_geom = new THREE.Geometry();
	let p_material = new THREE.ParticleBasicMaterial({
		color: 0xffffff,
		size: 1.5,
	});

	// model
	let loader = new THREE.OBJLoader(manager);
	loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/40480/head.obj", function (object) {
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				let scale = 6.5;

				$(child.geometry.vertices).each(function () {
					p_geom.vertices.push(new THREE.Vector3(this.x * scale, this.y * scale, this.z * scale));
				});
			}
		});

		Background.scene.add(p);
	});

	p = new THREE.ParticleSystem(p_geom, p_material);

	Background.renderer = new THREE.WebGLRenderer({ alpha: true });
	Background.renderer.setSize(site.Width, site.Height);
	Background.renderer.setClearColor(0x000000, 0);

	$(".particlehead").append(Background.renderer.domElement);
	$(".particlehead").on("mousemove", onDocumentMouseMove);
	site.window.on("resize", onWindowResize);

	function onWindowResize() {
		windowHalfX = site.Width / 2;
		windowHalfY = site.Height / 2;
		//console.log(windowHalfX);

		Background.camera.aspect = site.Width / site.Height;
		Background.camera.updateProjectionMatrix();

		Background.renderer.setSize(site.Width, site.Height);
	}

	function onDocumentMouseMove(event) {
		mouseX = (event.clientX - windowHalfX) / 2;
		mouseY = (event.clientY - windowHalfY) / 2;
	}

	Background.animate = function () {
		Background.ticker = TweenMax.ticker;
		Background.ticker.addEventListener("tick", Background.animate);

		render();
	};
	Background.camera.position.x = 50; // Adjust this value to set the desired position along the x-axis
	function render() {
		Background.camera.position.x += (mouseX * 0.5 - Background.camera.position.x) * 0.05;
		Background.camera.position.y += (-(mouseY * 0.5) - Background.camera.position.y) * 0.05;
		Background.camera.lookAt(Background.scene.position);
		Background.renderer.render(Background.scene, Background.camera);
	}

	render();

	Background.animate();
};

Background.headparticle();
const seeButtons = document.querySelectorAll(".js-see");

if (seeButtons) {
	seeButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const targetId = button.dataset.target;
			const inputElement = document.querySelector(`.form__item input[data-target="${targetId}"]`);

			if (inputElement.type === "password") {
				inputElement.type = "text";
			} else {
				inputElement.type = "password";
			}
		});
	});
}
const percentSet = () => {
	const circleProgress = document.querySelectorAll(".js-circle-progress");
	const circleProgressText = document.querySelectorAll(".js-text-progress");
	if (circleProgress) {
		circleProgress.forEach((el, index) => {
			let currentPercent = parseInt(el.dataset.percent, 10);
			currentPercent = Math.min(Math.max(currentPercent, 0), 100);
			circleProgressText[index].textContent = `${currentPercent}%`;
			el.style.background = `conic-gradient(#16ff73 ${currentPercent * 3.6}deg, #61ff001a 0deg)`;
		});
	}
};

percentSet();

const element = document.querySelector(".js-choice-select");
const filtersElements = document.querySelectorAll(".js-choice-selects");
const multiSelect = () => {
	filtersElements.forEach((el) => {
		new Choices(el, {
			searchEnabled: false,
			searchChoices: false,
			position: "auto",
			itemSelectText: "",
			classNames: {
				containerOuter: "choices choices-filter",
				containerInner: "choices__inner",
				input: "choices__input",
				inputCloned: "choices__input--cloned",
				list: "choices__list",
				listItems: "choices__list--multiple",
				listSingle: "choices__list--single",
				listDropdown: "choices__list--dropdown",
				item: "choices__item",
				itemSelectable: "choices__item--selectable",
				itemDisabled: "choices__item--disabled",
				itemChoice: "choices__item--choice",
				placeholder: "choices__placeholder",
				group: "choices__group",
				groupHeading: "choices__heading",
				button: "choices__button",
				activeState: "is-active",
				focusState: "is-focused",
				openState: "is-open",
				disabledState: "is-disabled",
				highlightedState: "is-highlighted",
				selectedState: "is-selected",
				flippedState: "is-flipped",
				loadingState: "is-loading",
				noResults: "has-no-results",
				noChoices: "has-no-choices",
			},
		});
	});
};
if (filtersElements) {
	multiSelect();
}
if (element) {
	new Choices(element, {
		searchEnabled: false,
		searchChoices: false,
		position: "auto",
		itemSelectText: "",
		classNames: {
			containerOuter: "choices",
			containerInner: "choices__inner",
			input: "choices__input",
			inputCloned: "choices__input--cloned",
			list: "choices__list",
			listItems: "choices__list--multiple",
			listSingle: "choices__list--single",
			listDropdown: "choices__list--dropdown",
			item: "choices__item",
			itemSelectable: "choices__item--selectable",
			itemDisabled: "choices__item--disabled",
			itemChoice: "choices__item--choice",
			placeholder: "choices__placeholder",
			group: "choices__group",
			groupHeading: "choices__heading",
			button: "choices__button",
			activeState: "is-active",
			focusState: "is-focused",
			openState: "is-open",
			disabledState: "is-disabled",
			highlightedState: "is-highlighted",
			selectedState: "is-selected",
			flippedState: "is-flipped",
			loadingState: "is-loading",
			noResults: "has-no-results",
			noChoices: "has-no-choices",
		},
	});
}
