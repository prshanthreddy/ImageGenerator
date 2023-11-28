from django.contrib import admin
from django.urls import path, include    # Add this line


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('imagegenerator.urls')),
]
