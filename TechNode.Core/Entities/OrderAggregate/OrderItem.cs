namespace TechNode.Core.Entities.OrderAggregate;

public class OrderItem
{
    public int Id { get; set; }

    public ProductOrderedItem OrderedItem { get; set; } = null!;

    public int Quantity { get; set; }

    public decimal Price { get; set; }
}