from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from .models import Employee, Department
from .selectors import get_active_employees, get_employee
from .services import create_employee, update_employee, delete_employee

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def employee_list_api(request):
    if request.method == "GET":
        employees = get_active_employees()
        data = [
            {
                "id": emp.id,
                "name": f"{emp.first_name} {emp.last_name}",
                "first_name": emp.first_name,
                "last_name": emp.last_name,
                "email": emp.email,
                "department": emp.department.name if emp.department else "",
                "department_id": emp.department_id
            } for emp in employees
        ]
        return Response({"data": data})
    
    elif request.method == "POST":
        try:
            body = request.data
            dept_id = body.get('department_id', 1) 
            if not Department.objects.filter(id=dept_id).exists():
                dept = Department.objects.create(name="General")
                dept_id = dept.id

            emp = create_employee(
                first_name=body.get('first_name', ''),
                last_name=body.get('last_name', ''),
                email=body.get('email', ''),
                department_id=dept_id
            )
            return Response({"message": "Created", "id": emp.id}, status=201)
        except ValidationError as e:
            return Response({"error": str(e)}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def employee_detail_api(request, employee_id):
    try:
        employee = get_employee(employee_id)
    except Employee.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    if request.method == "PUT":
        try:
            body = request.data
            emp = update_employee(
                employee,
                first_name=body.get('first_name', employee.first_name),
                last_name=body.get('last_name', employee.last_name),
                email=body.get('email', employee.email),
                department_id=body.get('department_id', employee.department_id)
            )
            return Response({"message": "Updated", "id": emp.id})
        except ValidationError as e:
            return Response({"error": str(e)}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    elif request.method == "DELETE":
        delete_employee(employee)
        return Response({"message": "Deleted"}, status=204)
