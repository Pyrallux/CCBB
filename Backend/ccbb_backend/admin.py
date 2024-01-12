from django.contrib import admin
from .models import Warehouse, Cycle, Bin, PresentPart, SystemPart

admin.site.register(Warehouse)
admin.site.register(Cycle)
admin.site.register(Bin)
admin.site.register(PresentPart)
admin.site.register(SystemPart)