import csv
import os
from django.core.management.base import BaseCommand

from colleges.models import College

class Command(BaseCommand):
    help = "Load colleges from CSV"

    def handle(self, *args, **kwargs):

        base_dir = os.path.dirname(__file__)
        file_path = os.path.join(base_dir, "combined.csv")
        with open(file_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)

        
            for idx,row in enumerate(reader,start=1):
                if idx<=15:
                    stream,exam = "Engineering", "JEE"
                elif idx<=25:
                    stream,exam = "Medical","NEET"
                else:
                    stream,exam = "Arts_Commerce", "CUET"

                College.objects.create(
                    name = row['Name'],
                    rating = float(row['Rating']),
                    fees = float(row['Fees(in K)']),
                    location = row['Location'],
                    website = row['Website'],
                    stream = stream,
                    exam = exam,
                )

        self.stdout.write(self.style.SUCCESS("Colleges loaded!"))