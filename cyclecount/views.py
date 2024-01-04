from django.shortcuts import render
from django.http import HttpResponse

# request -> response
def say_hello(request):
    return HttpResponse('Balls')
