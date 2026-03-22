from django.db.models import QuerySet
from .models import Employee

def get_active_employees() -> QuerySet[Employee]:
    """Return all active employees, optimized with select_related."""
    return Employee.objects.filter(is_active=True).select_related('department')

def get_employees_by_department(department_id: int) -> QuerySet[Employee]:
    """Return all employees in a specific department."""
    return Employee.objects.filter(department_id=department_id).select_related('department')

def get_employee(employee_id: int) -> Employee:
    """Return a single employee or raise DoesNotExist."""
    return Employee.objects.select_related('department').get(id=employee_id)
