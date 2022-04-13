from flask import Flask, render_template, request


app = Flask(__name__)


@app.get('/')
def smile():
    return render_template('home.html')