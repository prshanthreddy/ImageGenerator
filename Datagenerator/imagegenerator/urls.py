from django.urls import path, include    # Add this line
from .views import main

urlpatterns = [
    path('', main), 
]
