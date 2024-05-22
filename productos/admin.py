from django.contrib import admin

# Register your models here.
from .models import Product

# damos acceso a los modelos desde el admin
admin.site.register(Product)