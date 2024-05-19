from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer
from productos.models import Product

@api_view(['GET'])
@permission_classes([IsAdminUser])
def search(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    order = Order.objects.filter(user__email__icontains=query)
    serializer = OrderSerializer(order, many=True)
    return Response({'orders': serializer.data})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_orders(request):
    orders = Order.objects.all().order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    data = request.data
    orderItems = data['order_items']
    total_price = data['total_price']

    # Calcular la suma de los precios de los productos
    sum_of_prices = sum(float(item['price'])*float(item['quantity']) for item in orderItems)
    print('Sum of prices:', sum_of_prices)
    print('Total price:', total_price)
    if total_price == sum_of_prices:
        # Crear la orden
        order = Order.objects.create(
            user=user,
            phone=data['phone'],
            total_price=total_price
        )

        ShippingAddress.objects.create(
            order=order,
            address=data['address'],
            city=data['city'],
            postal_code=data['postal_code'],
            comentary=data['comentary']
        )

        for i in orderItems:
            product = Product.objects.get(id=i['id'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=i['quantity'],
                price=i['price']
            )

            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('El precio total no coincide con la suma de los precios de los productos')
        return Response({'mensaje': 'El precio total no coincide con la suma de los precios de los productos'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def solo_order(request, pk):
    user = request.user
    try:
        order = Order.objects.get(pk=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'No access to view orders'},
                     status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def delivered(request, pk):
    order = Order.objects.get(pk=pk)
    order.is_delivered = True
    order.save()
    return Response('Order was delivered')