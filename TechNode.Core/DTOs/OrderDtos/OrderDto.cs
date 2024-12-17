using TechNode.Core.Entities;
using TechNode.Core.Entities.OrderAggregate;

namespace TechNode.Core.DTOs.OrderDtos;

public class OrderDto
{
    public int Id { get; set; }
    
    public DateTime OrderCreated { get; set; }

    public required string OrderStatus { get; set; }

    public required string BuyerEmail { get; set; }

    public required PaymentSummary PaymentSummary { get; set; }

    public required ICollection<OrderItemDto> OrderItems { get; set; }

    public required ShippingAddress ShippingAddress { get; set; }

    public required int DeliveryMethodId { get; set; }

    public decimal Subtotal { get; set; }
    
    public required string PaymentIntendId { get; set; }

    public required decimal Total { get; set; }

    public required decimal ShippingPrice { get; set; }
}