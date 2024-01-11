from django.http import JsonResponse
from .models import Warehouse, Cycle
from .serializers import WarehouseSerializer, CycleSerializer

def warehouse_list(request):
    warehouse = Warehouse.objects.all()
    serializer = WarehouseSerializer(warehouse, many=True)
    return JsonResponse(serializer.data, safe=False)

def cycle_list(request):
    cycle = Cycle.objects.all()
    serializer = CycleSerializer(cycle, many=True)
    return JsonResponse(serializer.data, safe=False)