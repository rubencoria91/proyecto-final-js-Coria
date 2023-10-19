//////////////////////////////////////////////////////////////

fetch(
        `https://v6.exchangerate-api.com/v6/6d7364de0308c97ed2d98afd/latest/USD`, {
            headers: {
                Key: "6d7364de0308c97ed2d98afd",
            },
        }
    )
    .then((response) => response.json())
    .then((data) => {
        const valorDolar = document.getElementById("valor-dolar");
        valorDolar.innerHTML = `<p class="texto-dolar">$${data.conversion_rates.ARS} ARS</p>`;
    });