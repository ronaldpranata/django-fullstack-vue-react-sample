from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from company.models import Department, Employee
from datetime import date

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the DB with sample administrators, secondary users, enterprise departments, and employee hierarchies.'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Deploying database seed sequence...'))

        # Create Admin
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@corporate.local', 'admin')
            self.stdout.write(self.style.SUCCESS('--> Auth Seed: Created Superuser "admin" (pwd: admin)'))
        else:
            self.stdout.write(self.style.SUCCESS('--> Auth Seed: "admin" already active.'))
        
        # Create Alternate User
        if not User.objects.filter(username='user2').exists():
            User.objects.create_user('user2', 'user2@corporate.local', 'password')
            self.stdout.write(self.style.SUCCESS('--> Auth Seed: Created User "user2" (pwd: password)'))
        else:
            self.stdout.write(self.style.SUCCESS('--> Auth Seed: "user2" already active.'))

        # Departments
        d1, _ = Department.objects.get_or_create(name="Engineering", defaults={"description": "Software Development Plattoon"})
        d2, _ = Department.objects.get_or_create(name="Human Resources", defaults={"description": "HR & Payroll Teams"})
        d3, _ = Department.objects.get_or_create(name="Marketing", defaults={"description": "Global Brands & Advertising"})

        # Employees
        employees = [
            {"first_name": "Alan", "last_name": "Turing", "email": "turing@enigma.com", "department": d1, "hire_date": date(2023, 1, 15)},
            {"first_name": "Ada", "last_name": "Lovelace", "email": "ada@analytics.com", "department": d1, "hire_date": date(2023, 2, 20)},
            {"first_name": "Grace", "last_name": "Hopper", "email": "hopper@navy.mil", "department": d2, "hire_date": date(2022, 11, 5)},
            {"first_name": "Steve", "last_name": "Wozniak", "email": "woz@apple.com", "department": d3, "hire_date": date(2024, 3, 10)},
            {"first_name": "Tim", "last_name": "Berners-Lee", "email": "tim@www.org", "department": d1, "hire_date": date(2023, 5, 22)},
        ]

        for emp_data in employees:
            Employee.objects.get_or_create(email=emp_data["email"], defaults=emp_data)

        self.stdout.write(self.style.SUCCESS(f'\n*** SEED SUCCESSFUL ***\nTotal Departments: {Department.objects.count()}\nTotal Employees: {Employee.objects.count()}'))
