namespace TechNode.Core.Entities;

public class Category : BaseEntity
{
    public required string Name { get; set; }

    public ICollection<Specification> Specifications { get; set; } = [];
    
    public ICollection<Product> Products { get; set; } = [];
}