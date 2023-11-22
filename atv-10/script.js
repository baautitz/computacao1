const calcularButton = document.getElementById("button-calcular");

const pesoInput = document.getElementById("input-peso");
const alturaInput = document.getElementById("input-altura");

const imcSpan = document.getElementById("resultado-imc");
const classificacaoSpan = document.getElementById("resultado-classificacao");

calcularButton.addEventListener("click", () => {
	const peso = parseFloat(pesoInput.value);
	const altura = parseFloat(alturaInput.value);

	if (Number.isFinite(peso) && Number.isFinite(altura)) {
		let result = calculaIMC(peso, altura).toFixed(2);

		imcSpan.innerHTML = result;
		classificacaoSpan.innerHTML = classificacao(result);
	}
});

function calculaIMC(peso, altura) {
	return peso / (altura * altura);
}

function classificacao(imc) {
	if (imc < 18.5) {
		return "Abaixo do peso";
	} else if (imc >= 18.5 && imc < 25) {
		return "Peso normal";
	} else if (imc >= 25 && imc < 30) {
		return "Sobrepeso";
	} else if (imc >= 30 && imc < 35) {
		return "Obesidade grau I";
	} else if (imc >= 35 && imc < 40) {
		return "Obesidade grau II (severa)";
	} else {
		return "Obesidade grau III (mórbida)";
	}
}
