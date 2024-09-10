#removed pandas and numpy as this code is not required but if they are required in future
#Install pandas and numpy before running the code and add it in chefWeb.settings 
import pandas as pd
from faker import Faker
import random
from datetime import datetime, timedelta
# Initialize Faker
fake = Faker()

# Define parameters
num_jobs = 50  # Number of fake jobs to generate

# Define possible employment types
employment_types = ["full","part"]
user_id_counter = 2
def get_next_user_id():
    global user_id_counter
    current_id = user_id_counter
    user_id_counter += 1
    return current_id
# Function to generate fake job data
def generate_fake_job_data(num_jobs):
    jobs = []
    for _ in range(num_jobs):
        userid = 5
        job_id=get_next_user_id()
        title = fake.job()
        description = fake.paragraph(nb_sentences=5)
        location = 1
        salary = f"${random.randint(30, 100)}k"
        employment_type = random.choice(employment_types)
        posted_date = fake.date_between(start_date='-1y', end_date='today')
        application_deadline = posted_date + timedelta(days=random.randint(15, 90))
        requirements = fake.paragraph(nb_sentences=7)

        job = {
            'user_id': userid,
            'job_id':job_id,
            'title': title,
            'description': description,
            'location': location,
            'salary': salary,
            'employment_type': employment_type,
            'posted_date': posted_date,
            'application_deadline': application_deadline,
            'requirements': requirements
        }
        jobs.append(job)
    return jobs

# Generate fake jobs data
fake_jobs = generate_fake_job_data(num_jobs)
# Create DataFrame
df = pd.DataFrame(fake_jobs)

# Show the first 5 rows of the DataFrame
print(df.head())

# Save to CSV
df.to_csv('fake_jobs_dataset.csv', index=False)
