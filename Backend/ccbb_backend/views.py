from .models import Warehouse, Cycle, Bin, PresentPart, SystemPart
from .serializers import ( WarehouseSerializer, CycleSerializer, 
                          BinSerializer, PresentPartSerializer, 
                          SystemPartSerializer )
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Warehouse
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def warehouse_list(request, format=None):
    if request.method =='GET':
        warehouse = Warehouse.objects.all()
        serializer = WarehouseSerializer(warehouse, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = WarehouseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        serializer = WarehouseSerializer(warehouse, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        warehouse = Warehouse.objects.all()
        warehouse.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
@api_view(['GET', 'PUT', 'DELETE'])
def warehouse_detail(request, id, format=None):
    try:
        warehouse = Warehouse.objects.get(pk=id)
    except Warehouse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = WarehouseSerializer(warehouse)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = WarehouseSerializer(warehouse, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        warehouse.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Cycle
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def cycle_list(request, format=None):
    if request.method =='GET':
        cycle = Cycle.objects.all()
        serializer = CycleSerializer(cycle, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CycleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        serializer = CycleSerializer(cycle, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        cycle = Cycle.objects.all()
        cycle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def cycle_detail(request, id, format=None):
    try:
        cycle = Cycle.objects.get(pk=id)
    except Cycle.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CycleSerializer(cycle)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CycleSerializer(cycle, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        cycle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Bin
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def bin_list(request, format=None):
    if request.method =='GET':
        bin = Bin.objects.all()
        serializer = BinSerializer(bin, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BinSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        serializer = BinSerializer(bin, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        bin = Bin.objects.all()
        bin.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def bin_detail(request, id, format=None):
    try:
        bin = Bin.objects.get(pk=id)
    except Bin.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BinSerializer(bin)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BinSerializer(bin, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        bin.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# PresentPart
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def presentPart_list(request, format=None):
    if request.method =='GET':
        presentPart = PresentPart.objects.all()
        serializer = PresentPartSerializer(presentPart, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PresentPartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        serializer = PresentPartSerializer(presentPart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        presentPart = PresentPart.objects.all()
        presentPart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def presentPart_detail(request, id, format=None):
    try:
        presentPart = PresentPart.objects.get(pk=id)
    except PresentPart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PresentPartSerializer(presentPart)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PresentPartSerializer(presentPart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        presentPart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# SystemPart
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def systemPart_list(request, format=None):
    if request.method =='GET':
        systemPart = SystemPart.objects.all()
        serializer = SystemPartSerializer(systemPart, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SystemPartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        serializer = SystemPartSerializer(systemPart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        systemPart = SystemPart.objects.all()
        systemPart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def systemPart_detail(request, id, format=None):
    try:
        systemPart = SystemPart.objects.get(pk=id)
    except SystemPart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SystemPartSerializer(systemPart)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SystemPartSerializer(systemPart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, stats=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        systemPart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)