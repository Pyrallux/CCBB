from rest_framework import serializers
from .models import Warehouse, Cycle

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['warehouse_id', 'name']

class CycleSerializer(serializers.ModelSerializer): # ** MISSING ** WarehouseID tag in cycle
    parts = serializers.ListField(
    child=serializers.CharField()
)
        
    class Meta:
        model = Cycle
        fields = ['cycle_id', 'name', 'parts', 'bin']