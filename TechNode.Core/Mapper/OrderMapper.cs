using TechNode.Core.DTOs.OrderDtos;
using TechNode.Core.Entities.OrderAggregate;

namespace TechNode.Core.Mapper;

public static class OrderMapper
{
    public static OrderDto ToDto(this Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            OrderCreated = order.OrderCreated,
            OrderStatus = order.OrderStatus.ToString(),
            BuyerEmail = order.BuyerEmail,
            PaymentSummary = order.PaymentSummary,
            OrderItems = order.OrderItems.Select(z=>z.ToDto()).ToList(),
            ShippingAddress = order.ShippingAddress,
            DeliveryMethodId = order.DeliveryMethod.Id,
            Subtotal = order.Subtotal,
            Total = order.GetTotal(),
            PaymentIntendId = order.PaymentIntendId
        };
    }

    private static OrderItemDto ToDto(this OrderItem orderItem)
    {
        return new OrderItemDto
        {
            ProductId = orderItem.OrderedItem.ProductId,
            ProductName = orderItem.OrderedItem.ProductName,
            PictureUrl = orderItem.OrderedItem.PictureUrl,
            Quantity = orderItem.Quantity,
            Price = orderItem.Price
        };
    }
}