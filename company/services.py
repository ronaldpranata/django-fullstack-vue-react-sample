from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import Employee, Department

def create_employee(*, first_name: str, last_name: str, email: str, department_id: int, hire_date=None) -> Employee:
    """Create a new employee with business logic validation."""
    if Employee.objects.filter(email=email).exists():
        raise ValidationError(f"Employee with email {email} already exists.")
    
    if not hire_date:
        hire_date = timezone.now().date()
        
    department = Department.objects.get(id=department_id)
    employee = Employee(
        first_name=first_name,
        last_name=last_name,
        email=email,
        department=department,
        hire_date=hire_date
    )
    employee.full_clean()
    employee.save()
    return employee

def deactivate_employee(employee: Employee) -> Employee:
    """Deactivate an employee."""
def update_employee(employee: Employee, *, first_name: str, last_name: str, email: str, department_id: int) -> Employee:
    if Employee.objects.filter(email=email).exclude(id=employee.id).exists():
        raise ValidationError(f"Another employee with email {email} already exists.")
        
    employee.first_name = first_name
    employee.last_name = last_name
    employee.email = email
    employee.department_id = department_id
    
    employee.full_clean()
    employee.save()
    return employee

def delete_employee(employee: Employee):
    """Hard delete an employee from the database."""
    employee.delete()

def deactivate_employee(employee: Employee) -> Employee:
    """Deactivate an employee."""
    employee.is_active = False
    employee.save(update_fields=['is_active'])
    return employee
