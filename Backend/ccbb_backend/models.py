from django.db import models

class Warehouse(models.Model):
	warehouse_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=20)
	def __str__(self):
	    return self.name
	
class Cycle(models.Model):
	cycle_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=20)
	parts = models.JSONField(max_length=50)
	bin = models.CharField(max_length=20)
	warehouses_id = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
	def __str__(self):
	    return self.name