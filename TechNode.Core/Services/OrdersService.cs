using Microsoft.Extensions.Logging;
using Stripe;
using TechNode.Core.DTOs.OrderDtos;
using TechNode.Core.Entities.OrderAggregate;
using TechNode.Core.Exceptions;
using TechNode.Core.Mapper;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services.Interfaces;
using Order = TechNode.Core.Entities.OrderAggregate.Order;

namespace TechNode.Core.Services;

public class OrdersService(ICartService cartService, ILogger<OrdersService> logger, IOrderRepository orderRepository, IProductsRepository productsRepository, IDeliveryMethodRepository deliveryMethodRepository) : IOrdersService
{
    public async Task<int> AddOrderAsync(OrderCreateDto orderCreateDto, string userEmail)
    {
        logger.LogInformation("Starting the AddOrderAsync method for user: {UserEmail} and cart ID: {CartId}", userEmail, orderCreateDto.CartId);
        
        var cart = await cartService.GetCartAsync(orderCreateDto.CartId);

        if (cart == null)
            throw new NotFoundException(nameof(cart.GetType), orderCreateDto.CartId);

        logger.LogInformation("Cart with id: {CartId} retrieved successfully", orderCreateDto.CartId);
        
        var paymentIntentId = cart.PaymentIntendId;
        
        if (paymentIntentId == null)
            throw new MissingPaymentIntentException();
        
        logger.LogInformation("PaymentIntentId retrieved: {PaymentIntentId}", paymentIntentId);
        
        var orderItems = new List<OrderItem>();
        
        foreach (var item in cart.CartItems)
        {
            var product = await productsRepository.GetProductByIdAsync(item.ProductId);

            if (product == null)
                throw new NotFoundException(nameof(product.GetType), item.ProductId.ToString());

            var productOrderedItem = new ProductOrderedItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                PictureUrl = product.PictureUrl
            };

            var orderItem = new OrderItem
            {
                OrderedItem = productOrderedItem,
                Quantity = item.Quantity,
                Price = product.Price * item.Quantity
            };
            
            orderItems.Add(orderItem);
        }
        
        var deliveryMethod = await deliveryMethodRepository.GetDeliveryMethodByIdAsync(orderCreateDto.DeliveryMethodId);

        if (deliveryMethod == null)
            throw new NotFoundException(nameof(deliveryMethod.GetType), orderCreateDto.DeliveryMethodId.ToString());

        var order = new Order
        {
            OrderCreated = DateTime.Now,
            OrderStatus = OrderStatus.Pending,
            BuyerEmail = userEmail,
            PaymentSummary = orderCreateDto.PaymentSummary,
            OrderItems = orderItems,
            ShippingAddress = orderCreateDto.ShippingAddress,
            DeliveryMethod = deliveryMethod,
            Subtotal = orderItems.Sum(z => z.Price),
            PaymentIntendId = paymentIntentId
        };

        logger.LogInformation("Creating a new order for user: {UserEmail}", userEmail);
        
        var orderId = await orderRepository.AddOrderAsync(order);

        logger.LogInformation("Order created successfully with ID: {OrderId} for user: {UserEmail}", orderId, userEmail);
        
        return orderId;
    }

    public async Task<OrderDto> GetOrderByIdAsync(int orderId, string userEmail)
    {
        var order = await orderRepository.GetByIdAsync(orderId, userEmail);

        if (order == null)
            throw new NotFoundException(nameof(order.GetType), orderId.ToString());

        return order.ToDto();
    }

    public async Task<IEnumerable<OrderDto>> GetOrdersAsync(string userEmail)
    {
        var orders = await orderRepository.GetOrdersAsync(userEmail);
        
        return orders.Select(z=>z.ToDto());
    }

    public async Task UpdateOrderStatus(PaymentIntent intent)
    {
        var order = await orderRepository.GetByPaymentIntentIdAsync(intent.Id);

        if (order == null)
            throw new NotFoundException(nameof(order.GetType), intent.Id);

        order.OrderStatus = order.GetTotal() * 100 != intent.Amount 
            ? OrderStatus.PaymentMissMatch 
            : OrderStatus.PaymentReceived;

        await orderRepository.SaveChangesAsync();
    }
}