namespace TechNode.Core.Entities;

public class Product : BaseEntity
{
    public required string Name { get; set; }

    public required string Description { get; set; }

    public decimal Price { get; set; }

    public required string PictureUrl { get; set; }

    public required string Type { get; set; }

    public required string Brand { get; set; }

    public int StockQuantity { get; set; }
    
    public int CategoryId { get; set; }

    public Category Category { get; set; } = null!;

    public ICollection<ProductSpecification> ProductSpecifications { get; set; } = [];
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}