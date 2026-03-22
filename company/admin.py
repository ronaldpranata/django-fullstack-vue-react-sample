from django.contrib import admin
from .models import Department, Employee

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'department', 'hire_date', 'is_active')
    list_filter = ('is_active', 'department', 'hire_date')
    search_fields = ('first_name', 'last_name', 'email')
    ordering = ('-hire_date',)
