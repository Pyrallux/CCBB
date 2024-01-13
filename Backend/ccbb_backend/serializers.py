from rest_framework import serializers
from .models import Warehouse, PhysicallyMissingPart, SystematicallyMissingPart, Transaction, Cycle, Bin, PresentPart, SystemPart

# REMINDER! Setup Views For Serialized Models

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['warehouse_id', 'name', 'manual', 'path']

class PhysicallyMissingPartSerializer(serializers.ModelSerializer):
    warehouse_id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = PhysicallyMissingPart
        fields = ['physically_missing_part_id', 'number', 'quantity', 'location', 'date', 'warehouse_id']

class SystematicallyMissingPartSerializer(serializers.ModelSerializer):
    warehouse_id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = SystematicallyMissingPart
        fields = ['systematically_missing_part_id', 'number', 'quantity', 'location', 'date', 'warehouse_id']

class TransactionSerializer(serializers.ModelSerializer):
    warehouse_id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = Transaction
        fields = ['transaction_id', 'part_number', 'old_location', 'new_location', 'quantity', 'date', 'warehouse_id']

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
        fields = ['present_part_id', 'number', 'quantity', 'bin_id']

class SystemPartSerializer(serializers.ModelSerializer):
    bin_id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = SystemPart
        fields = ['system_part_id', 'number', 'quantity', 'bin_id']