from django.urls import path
from . import views

urlpatterns = [
    path('employees/', views.employee_list_api, name='api-employee-list'),
    path('employees/<int:employee_id>/', views.employee_detail_api, name='api-employee-detail'),
]
