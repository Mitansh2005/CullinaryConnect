from importlib import import_module
import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from faker import Faker
from myapp.models import JobsTable  # Replace 'yourapp' with your actual app name
from myapp.models import CustomUser,Countries
# Initialize Faker
fake = Faker()

# Define possible employment types
employment_types = ["full", "part"]
user_id_counter = 2

def get_next_user_id():
    global user_id_counter
    current_id = user_id_counter
    user_id_counter += 1
    return current_id

# Function to generate fake job data
def generate_fake_job_data(num_jobs):
    jobs = []
        # Fetch only users who are employers
    employer_users = CustomUser.objects.filter(user_type="employer")
    locations_choices=Countries.objects.all()

    if not employer_users.exists():
        raise ValueError("No employer users found in the CustomUser table. Please create employers first.")

    for _ in range(num_jobs):
        userid =random.choice(employer_users)
        job_id = get_next_user_id()
        title = fake.job()
        description = fake.paragraph(nb_sentences=5)
        location = random.choice(locations_choices)
        salary = random.randint(300000, 4000000)
        employment_type = random.choice(employment_types)
        posted_date = fake.date_between(start_date='-1y', end_date='today')
        application_deadline = posted_date + timedelta(days=random.randint(15, 90))
        requirements = fake.paragraph(nb_sentences=7)

        job = JobsTable(
            user_id=userid,
            job_id=job_id,
            title=title,
            description=description,
            location=location,
            salary=salary,
            employment_type=employment_type,
            posted_date=posted_date,
            application_deadline=application_deadline,
            requirements=requirements
        )
        jobs.append(job)
    return jobs

class Command(BaseCommand):
    help = 'Populate Jobs table with fake data'

    def handle(self, *args, **kwargs):
        num_jobs = 50  # You can adjust this value
        fake_jobs = generate_fake_job_data(num_jobs)

        # Bulk create fake jobs in the database
        JobsTable.objects.bulk_create(fake_jobs)

        self.stdout.write(self.style.SUCCESS(f'Successfully populated {num_jobs} fake jobs into the database!'))
