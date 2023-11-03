const sendButton = document.getElementById("send-button");
const formEl = document.querySelector("form");

const formInputDivs = document.getElementsByClassName("form-input");
const resultTxtArea = document.getElementById("result");

formEl.addEventListener("keyup", (e) => {
	if (e.target.type === "button") return;
	if (e.key !== "Enter") return;

	sendButton.click();
});

sendButton.addEventListener("click", (e) => {
	const incorrectValues = validateForm();

	if (incorrectValues.length > 0) {
		incorrectInputsValuesAlert(incorrectValues);
		return;
	}

	const obj = generateJSON(formInputDivs);

	resultTxtArea.innerHTML = JSON.stringify(obj, null, 4);

	e.preventDefault();
});

function validateForm() {
	let incorrectValues = [];

	const emptyInputs = getEmptyInputsLabels(formInputDivs);
	if (emptyInputs.length > 0) {
		for (let empty of emptyInputs) {
			pushIfUnique(incorrectValues, empty);
		}
	}

	const phoneInput = document.getElementById("celular");
	if (!isValidPhone(phoneInput.value)) pushIfUnique(incorrectValues, "Celular");

	const emailInput = document.getElementById("email");
	if (!isValidEmail(emailInput.value)) pushIfUnique(incorrectValues, "E-mail");

	return incorrectValues;
}

function pushIfUnique(arr, item) {
	if (arr.indexOf(item) == -1) {
		arr.push(item);
	}
}

function isValidEmail(email) {
	const regex = /^[\w\-\.]{1,64}@[a-zA-z]{1,250}(\.[a-zA-Z]{2,4}|\.[a-zA-Z]{2,4}\.[a-zA-Z]{2})$/;
	return regex.test(email);
}

function isValidPhone(phone) {
	const regex = /^[\d]{2}\-[\d]{5}\-[\d]{4}$/;
	return regex.test(phone);
}

function incorrectInputsValuesAlert(input) {
	alert(`Preencha corretamente: \n${input.map((i) => `\n- ${i}`).join("")}`);
}

function getEmptyInputsLabels(formInputDivs) {
	let emptyInputs = [];
	for (let div of formInputDivs) {
		const formLabel = div.children[0];
		const formInput = div.children[1];

		if (!formInput.value) emptyInputs.push(formLabel.innerHTML.replace(": ", ""));
	}

	return emptyInputs;
}

function calculaIMC(peso, altura) {
	peso = parseFloat(peso);
	altura = parseFloat(altura);

	if (!Number.isFinite(peso)) return -1;
	if (!Number.isFinite(altura)) return -1;

	return (peso / (altura * altura)).toFixed(2);
}

function getClassificacaoIMC(imc) {
	if (imc < 0) {
		return "IMC inválido.";
	}

	if (imc < 18.5) {
		return "Abaixo do peso";
	} else if (imc >= 18.5 && imc < 24.9) {
		return "Peso normal";
	} else if (imc >= 25 && imc < 29.9) {
		return "Sobrepeso";
	} else if (imc >= 30 && imc < 34.9) {
		return "Obesidade grau I";
	} else if (imc >= 35 && imc < 39.9) {
		return "Obesidade grau II (severa)";
	} else {
		return "Obesidade grau III (mórbida)";
	}
}

function generateJSON(formInputDivs) {
	let obj = {};

	for (let div of formInputDivs) {
		obj[div.children[1].name] = div.children[1].value;
	}

	obj["imc"] = calculaIMC(obj.peso, obj.altura);
	obj["imc_class"] = getClassificacaoIMC(obj.imc);

	return obj;
}
