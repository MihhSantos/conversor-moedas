const moedas = {
    "USD": "Dólar Americano",
    "EUR": "Euro",
    "BRL": "Real Brasileiro",
    "JPY": "Iene Japonês",
    "GBP": "Libra Esterlina",
    "AUD": "Dólar Australiano",
    "CAD": "Dólar Canadense",
    "CHF": "Franco Suíço",
    "CNY": "Yuan Chinês",
    "SEK": "Coroa Sueca",
    "NZD": "Dólar Neozelandês",
    "MXN": "Peso Mexicano",
    "SGD": "Dólar de Cingapura",
    "HKD": "Dólar de Hong Kong",
    "NOK": "Coroa Norueguesa",
    "KRW": "Won Sul-Coreano",
    "TRY": "Lira Turca",
    "RUB": "Rublo Russo",
    "INR": "Rúpia Indiana",
    "ZAR": "Rand Sul-Africano",
    "ARS": "Peso Argentino",
    "CLP": "Peso Chileno",
    "COP": "Peso Colombiano",
    "THB": "Baht Tailandês",
    "IDR": "Rupia Indonésia",
    "PHP": "Peso Filipino",
    "MYR": "Ringgit Malaio",
    "CZK": "Coroa Tcheca",
    "PLN": "Zloty Polonês",
    "HUF": "Forint Húngaro",
    "DKK": "Coroa Dinamarquesa",
    "AED": "Dirham dos Emirados Árabes",
    "SAR": "Rial Saudita",
    "QAR": "Rial Catariano",
    "EGP": "Libra Egípcia",
    "VND": "Dong Vietnamita",
    "NGN": "Naira Nigeriana",
    "BDT": "Taka de Bangladesh",
    "PKR": "Rúpia Paquistanesa",
    "UAH": "Hryvnia Ucraniana"
};

// Preenche os selects com as moedas
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const exchangeRateText = document.getElementById("exchangeRate");

Object.keys(moedas).forEach(codigo => {
    let option1 = document.createElement("option");
    option1.value = codigo;
    option1.textContent = `${moedas[codigo]} (${codigo})`;
    fromCurrency.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = codigo;
    option2.textContent = `${moedas[codigo]} (${codigo})`;
    toCurrency.appendChild(option2);
});

// Define valores padrão
fromCurrency.value = "USD";
toCurrency.value = "BRL";

// Função para buscar e exibir a taxa de câmbio
async function atualizarTaxa() {
    const from = fromCurrency.value;
    const apiKey = "b10d93545b733f47c81d8b10"; // Substitua pela sua chave da API
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.conversion_rates) {
            const to = toCurrency.value;
            const rate = data.conversion_rates[to];
            exchangeRateText.textContent = `Taxa: 1 ${from} = ${rate.toFixed(2)} ${to}`;
        } else {
            exchangeRateText.textContent = "Erro ao obter taxa.";
        }
    } catch (error) {
        exchangeRateText.textContent = "Erro na API.";
    }
}

// Atualiza a taxa ao trocar a moeda
fromCurrency.addEventListener("change", atualizarTaxa);
toCurrency.addEventListener("change", atualizarTaxa);

// Atualiza a taxa ao iniciar o site
atualizarTaxa();

// Evento para conversão
document.getElementById("convert").addEventListener("click", async function() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = document.getElementById("amount").value;

    if (!amount) {
        alert("Digite um valor para converter!");
        return;
    }

    const apiKey = "b10d93545b733f47c81d8b10"; // Substitua pela sua chave da API
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.conversion_rates[to]) {
            const rate = data.conversion_rates[to];
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById("result").textContent = `Resultado: ${convertedAmount} ${to}`;
        } else {
            alert("Erro ao obter a taxa de câmbio.");
        }
    } catch (error) {
        alert("Erro ao acessar a API.");
    }
});
