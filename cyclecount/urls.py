from django.urls import path
from . import views

# URL Configuration
urlpatterns = [
    path('balls/', views.say_hello)
]
