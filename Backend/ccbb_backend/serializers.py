from rest_framework import serializers
from .models import Warehouse, Cycle, Bin, PresentPart, SystemPart

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['warehouse_id', 'name', 'manual']

class CycleSerializer(serializers.ModelSerializer):
    warehouse_id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = Cycle
        fields = ['cycle_id', 'name', 'date', 'warehouse_id']

class BinSerializer(serializers.ModelSerializer):
    cycle_id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = Bin
        fields = ['bin_id', 'name', 'cycle_id']

class PresentPartSerializer(serializers.ModelSerializer):
    bin_id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = PresentPart
        fields = ['presentPart_id', 'number', 'quantity', 'bin_id']

class SystemPartSerializer(serializers.ModelSerializer):
    bin_id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = SystemPart
        fields = ['systemPart_id', 'number', 'quantity', 'bin_id']