"""
URL configuration for ccbb_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('warehouses/', views.warehouse_list),
    path('warehouses/<int:id>', views.warehouse_detail),
    path('cycles/', views.cycle_list),
    path('cycles/<int:id>', views.cycle_detail),
    path('bins/', views.bin_list),
    path('bins/<int:id>', views.bin_detail),
    path('presentParts/', views.presentPart_list),
    path('presentParts/<int:id>', views.presentPart_detail),
    path('systemParts/', views.systemPart_list),
    path('systemParts/<int:id>', views.systemPart_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
