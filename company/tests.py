import pytest
from django.core.exceptions import ValidationError
from company.models import Department, Employee
from company.services import create_employee, deactivate_employee
from company.selectors import get_active_employees

@pytest.mark.django_db
class TestEmployeeServices:
    def test_create_employee_success(self):
        dept = Department.objects.create(name="HR")
        employee = create_employee(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            department_id=dept.id
        )
        assert employee.id is not None
        assert employee.first_name == "John"
        assert employee.department == dept

    def test_create_employee_duplicate_email(self):
        dept = Department.objects.create(name="Engineering")
        create_employee(
            first_name="Jane",
            last_name="Smith",
            email="jane@example.com",
            department_id=dept.id
        )
        with pytest.raises(ValidationError):
            create_employee(
                first_name="Jane",
                last_name="Doe",
                email="jane@example.com",
                department_id=dept.id
            )

    def test_deactivate_employee(self):
        dept = Department.objects.create(name="Sales")
        emp = create_employee(
            first_name="Bob",
            last_name="Ross",
            email="bob@example.com",
            department_id=dept.id
        )
        assert emp.is_active is True
        emp = deactivate_employee(emp)
        assert emp.is_active is False

@pytest.mark.django_db
class TestEmployeeSelectors:
    def test_get_active_employees(self):
        dept = Department.objects.create(name="IT")
        emp1 = create_employee(
            first_name="Alice", last_name="A", email="a@example.com", department_id=dept.id
        )
        emp2 = create_employee(
            first_name="Bob", last_name="B", email="b@example.com", department_id=dept.id
        )
        
        deactivate_employee(emp2)
        
        active = get_active_employees()
        assert active.count() == 1
        assert active.first() == emp1
