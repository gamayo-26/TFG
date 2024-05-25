from django.db import models
from users.models import User

CATEGORY_CHOICES = [
    ('Menu', 'Menu'),
    ('Hamburguesas', 'Hamburguesas'),
    ('Pizzeta', 'Pizzeta'),
    ('Pizza Mediana', 'Pizza Mediana'),
    ('Pizza Familiar', 'Pizza Familiar'),
    ('Bocadillo', 'Bocadillo'),
    ('Sandwich', 'Sandwich'),
    ('Perrito', 'Perrito'),
    ('Picoteo', 'Picoteo'),
    ('Bebida', 'Bebida'),
    ('Postre', 'Postre'),
    ('Ensalada', 'Ensalada'),
]

class Product(models.Model):
    slug = models.SlugField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=True)
    image = models.ImageField(default='placeholder.jpg')
    category = models.CharField(max_length=100, blank=True, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)