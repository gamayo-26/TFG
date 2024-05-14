from django.contrib import admin

# Register your models here.
from .models import Product
from .models import Review

# damos acceso a los modelos desde el admin
admin.site.register(Product)
admin.site.register(Review)