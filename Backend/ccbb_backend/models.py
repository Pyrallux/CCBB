from django.db import models

class Warehouse(models.Model):
	warehouse_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)
	manual = models.BooleanField()
	
class Cycle(models.Model):
	cycle_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)
	date = models.DateField()
	warehouse_id = models.ForeignKey(Warehouse, on_delete=models.CASCADE)

class Bin(models.Model):
	bin_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)
	cycle_id = models.ForeignKey(Cycle, on_delete=models.CASCADE)

class PresentPart(models.Model):
	presentPart_id = models.AutoField(primary_key=True)
	number = models.CharField(max_length=100)
	quantity = models.FloatField()
	bin_id = models.ForeignKey(Cycle, on_delete=models.CASCADE)
	
class SystemPart(models.Model):
	systemPart_id = models.AutoField(primary_key=True)
	number = models.CharField(max_length=100)
	quantity = models.FloatField(max_length=100)
	bin_id = models.ForeignKey(Cycle, on_delete=models.CASCADE)