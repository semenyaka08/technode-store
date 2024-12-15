namespace TechNode.Core.Entities.OrderAggregate;

public class ProductOrderedItem
{
    public int ProductId { get; set; }

    public required string ProductName { get; set; }

    public required string PictureUrl { get; set; }
}