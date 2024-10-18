# Step 1: Use Python base image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt to install dependencies
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend code into the container
COPY . .

# Expose the port Flask will run on
EXPOSE 5005

# Set the environment variable for Flask
ENV FLASK_APP=app.py

# Run Flask when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]
