const currencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD',
    'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'BRL', 'DKK',
    'PLN', 'THB', 'ILS', 'IDR', 'CZK', 'AED', 'TRY', 'SAR', 'PHP', 'MYR',
    'HUF', 'PKR', 'EGP', 'CLP', 'COP', 'TWD', 'ARS', 'DZD', 'MAD', 'VND',
    'RON', 'PEN', 'NIO', 'OMR', 'UAH', 'LKR', 'MMK', 'BHD', 'KWD', 'ISK'
 ];
const fromSelect = document.getElementById('fromCurrency');

window.onload = function() {
    currencies.forEach(currency => {
        let option = new Option(currency, currency);
        fromSelect.options.add(option);
    });
    console.log('Options added:', fromSelect.options.length);
}

function initializeCurrencies() {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        fromSelect.appendChild(new Option(currency, currency));
        toSelect.appendChild(new Option(currency, currency));
    });

    fromSelect.value = 'USD';
    toSelect.value = 'EUR';

    console.log('From currencies:', fromSelect.options.length);
    console.log('To currencies:', toSelect.options.length);
}

async function convert() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if(!amount) {
        alert('Please enter an amount');
        return;
    }

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                from_currency: fromCurrency,
                to_currency: toCurrency
            })
        });

        const data = await response.json();

        if (data.success) {
            displayResult(amount, fromCurrency, data.result, toCurrency, data.rate);
            addToHistory(data.timestamp, amount, fromCurrency, data.result, toCurrency);
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('ERror: ' + error);
    }
}

function displayResult(amount, fromCurr, result, toCurr, rate) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class = "font-medium">${amount} ${fromCurr} = ${result.toFixed(2)} ${toCurr}</div>
        <div class="text-sm text-gray-600">Rate: 1 ${fromCurr} = ${rate.toFixed(4)} ${toCurr}</div>
    `;
    resultDiv.classList.remove('hidden');
}

function addToHistory(timestamp, amount, fromCurr, result, toCurr) {
    const historyDiv = document.getElementById('history');
    const entry = document.createElement('div');
    entry.className = 'text-sm text-gray-600 mb-1';
    entry.textContent = `[${timestamp}] ${amount} ${fromCurr} → ${result.toFixed(2)} ${toCurr}`;
    historyDiv.insertBefore(entry, historyDiv.firstChild);
}

function swapCurrencies() {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
}

function clearFields() {
    document.getElementById('amount').value = '';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('history').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', initializeCurrencies);