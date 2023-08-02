# FROM python:3.10.9
FROM python:3.10.9


WORKDIR /app
# copy the requirements file into the image
COPY './requirements.txt' .


RUN pip install --upgrade pip
# install the dependencies and packages in the requirements file
RUN pip install -r requirements.txt

# copy every content from the local file to the image
COPY . .

# configure the container to run in an executed manner
CMD ["python", "server.py"]