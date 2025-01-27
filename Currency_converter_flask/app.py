from flask import Flask, render_template, request, jsonify
import requests
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/convert', methods = ['POST'])
def convert():
    try:
        data = request.get_json(force=True)
        amount = float(data.get('amount', 0))
        from_curr = data.get('from_currency')
        to_curr = data.get('to_currency')

        api_key = "0100PZZO6HBJOX9D"
        api_url = "https://www.alphavantage.co/query"

        params = {
                "function": "CURRENCY_EXCHANGE_RATE",
                "from_currency": from_curr,
                "to_currency": to_curr,
                "apikey": api_key
            }

        response = requests.get(api_url, params = params)
        data = response.json()

        if "Realtime Currency Exchange Rate" in data:
            rate = float(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
            result = amount * rate
            return jsonify({
                'success': True,
                'result': result,
                'rate': rate,
                'timestamp': datetime.now().strftime("%H:%M:%S")
            })
            
        return jsonify({'success': False, 'error': 'Could not fetch exchange rate'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    

if __name__ == '__main__':
    app.run(debug=True)