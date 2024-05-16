from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.utils.text import slugify
from .models import Product
from .serializer import ProductSerializer
from core.pagination import CustomPagination

@api_view(['GET'])
def get_products_by_category(request, category):
    products = Product.objects.filter(category=category)
    serializer = ProductSerializer(products, many=True)
    print("estos son los datos______________________________")
    print(serializer.data)
    print("estos son los datos______________________________")
    return Response(serializer.data)

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    paginador = CustomPagination()
    products_paginados = paginador.paginate_queryset(products, request)
    serializer = ProductSerializer(products_paginados, many=True)
    return paginador.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_product_admin(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def create_product(request):
    if request.user.is_staff:
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            category = serializer.validated_data['category']
            s = name + category
            slug = slugify(s)
            if serializer.Meta.model.objects.filter(slug=slug).exists():
                return Response(status = status.HTTP_409_CONFLICT)
            serializer.save(user=request.user, slug=slug)
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['PUT'])
def edit_product(request, pk):
    product = Product.objects.get(id=pk)
    if request.user.is_staff:
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            category = serializer.validated_data['category']
            s = name + category
            slug = slugify(s)
            #if serializer.Meta.model.objects.filter(slug=slug).exists():
                #return Response(serializer.data, status = status.HTTP_409_CONFLICT)
            serializer.save(user=request.user, slug=slug)
            return Response(serializer.data, status=status.HTTP_200_OK) 
        print('serializer error', serializer.errors)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['DELETE'])
def delete_product(request, pk):
    product = Product.objects.get(id=pk)
    if request.user.is_staff:
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)