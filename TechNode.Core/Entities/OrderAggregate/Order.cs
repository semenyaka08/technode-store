namespace TechNode.Core.Entities.OrderAggregate;

public class Order
{
    public int Id { get; set; }
    
    public DateTime OrderCreated { get; set; }

    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

    public required string BuyerEmail { get; set; }

    public PaymentSummary PaymentSummary { get; set; } = null!;

    public ICollection<OrderItem> OrderItems { get; set; } = [];

    public ShippingAddress ShippingAddress { get; set; } = null!;

    public DeliveryMethod DeliveryMethod { get; set; } = null!;

    public decimal Subtotal { get; set; }
    
    public required string PaymentIntendId { get; set; }

    public decimal GetTotal()
    {
        return Subtotal + DeliveryMethod.Price;
    }
}