FROM python:3.9
ADD PythonCheese/main.py .

COPY PythonCheese/requirements.txt /app/requirements.txt

RUN pip3 install -r requirements.txt

COPY . /app

WORKDIR /PythonCheese

ENTRYPOINT [ "python3" ]

CMD ["main.py"]
