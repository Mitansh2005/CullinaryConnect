import random
from django.core.management.base import BaseCommand
from faker import Faker
from myapp.models import Countries  # Replace 'yourapp' with your actual app name
from django_countries import countries
class Command(BaseCommand):
    help = 'Populate Countries table with fake data'

    def handle(self, *args, **kwargs):
        fake = Faker()
        
        # Get a dictionary of ISO country codes mapped to their full names
        country_choices = dict(countries)
        country_codes = list(country_choices.keys())

        for _ in range(100):  # You can modify this number to generate more/less records
            country_code = random.choice(country_codes)  # Randomly choose a country code
            state = fake.state()
            city = fake.city()
            postal_code = fake.postcode()

            # Create and save the fake entry
            Countries.objects.create(
                country=country_code,
                state=state,
                city=city,
                postal_code=postal_code
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the Countries model with fake data!'))
