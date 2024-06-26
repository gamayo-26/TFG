from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search),
    path('', views.get_products),
    path('get/<slug:slug>/', views.get_product),
    path('get/admin/<int:pk>/', views.get_product_admin),
    path('post/', views.create_product),
    path('edit/<int:pk>/', views.edit_product),
    path('delete/<int:pk>/', views.delete_product),
    path('menu/<str:category>/', views.get_products_by_category),
]