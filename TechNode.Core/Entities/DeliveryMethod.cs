namespace TechNode.Core.Entities;

public class DeliveryMethod
{
    public int Id { get; set; }
    
    public required string Name { get; set; }

    public required string Description { get; set; }

    public required string DeliveryTime { get; set; }

    public decimal Price { get; set; }
}