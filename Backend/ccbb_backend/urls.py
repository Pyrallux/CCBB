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
    path("admin/", admin.site.urls),
    path("warehouses/", views.warehouse_list),
    path("warehouses/<int:id>", views.warehouse_detail),
    path("physically_missing_parts/", views.physically_missing_part_list),
    path("physically_missing_parts/<int:id>", views.physically_missing_part_detail),
    path("systematically_missing_parts/", views.systematically_missing_part_list),
    path(
        "systematically_missing_parts/<int:id>",
        views.systematically_missing_part_detail,
    ),
    path("transactions/", views.transaction_list),
    path("transactions/<int:id>", views.transaction_detail),
    path("cycles/", views.cycle_list),
    path("cycles/<int:id>", views.cycle_detail),
    path("cycles/parent/<int:parent_id>", views.cycle_parent),
    path("bins/", views.bin_list),
    path("bins/<int:id>", views.bin_detail),
    path("bins/parent/<int:parent_id>", views.bin_parent),
    path("present_parts/", views.present_part_list),
    path("present_parts/<int:id>", views.present_part_detail),
    path("present_parts/parent/<int:parent_id>", views.present_part_parent),
    path("system_parts/", views.system_part_list),
    path("system_parts/<int:id>", views.system_part_detail),
    path("system_parts/parent/<int:parent_id>", views.system_part_parent),
]

urlpatterns = format_suffix_patterns(urlpatterns)
