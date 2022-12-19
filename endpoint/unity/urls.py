from django.urls import path
from unity import views

urlpatterns = [
    path('email/', views.push),
    path('monthly-new-email/', views.get_email_by_month),
]