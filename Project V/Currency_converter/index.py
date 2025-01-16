import tkinter as tk
from tkinter import messagebox, ttk
from forex_python.converter import CurrencyRates
from threading import Thread

class CurrencyConverterGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Currency Converter")
        self.root.geometry("1080x720")

        self.c = CurrencyRates()

        self.create_widgets()

    
    def create_widgets(self):
        main_frame = ttk.Frame(self.root, padding = "10")
        main_frame.grid(row = 0, column = 0, sticky = (tk.W, tk.E, tk.N, tk.S, ))

        amount_frame = ttk.LabelFrame(main_frame, text = "Amount", padding = "10")
        amount_frame.grid(row = 0, column = 0, sticky = (tk.W, tk.E), pady =10)

        self.amount_entry = ttk.Entry(amount_frame, width = 30)
        self.amount_entry.grid(row = 0, column = 0, padx = 5, pady = 5)

        curr_frame =ttk.LabelFrame(main_frame, text = "Select Currencies", padding = "10")
        curr_frame.grid(row = 1, column = 0, sticky = (tk.W, tk.E), pady = 10)

        ttk.Label(curr_frame, text = "Form:").grid(row = 0, column = 0, padx = 5, pady = 5)
        self.from_currency = ttk.combobox(curr_frame, width = 20)
        self.from_currency['values'] = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR']
        self.from_currency.set('USD')
        self.from_currency.grid(row = 0, column = 1, padx = 5, pady = 5)

        


    def convert(self):
        try:
            amount = float(self.amount_entrty.get())
            from_curr = self.from_currency.get()
            to_curr = self.to_currency.get()

            result = self.c.convert(from_curr, to_curr, amount)

            self.result_label.config(
                text = f"{amount:.2f} {from_curr} = {result:.2f} {to_curr}"
            )

            self.history_text.insert('1.0',
                f"{amount:.2f} {from_curr} -> {result:.2f} { to_curr}\n")

            
        except ValueError:
            messagebox.showerror("Error", "Please enter a valid amount")

        except Exception as e:
            messagebox.showerror("Error", str(e))
        