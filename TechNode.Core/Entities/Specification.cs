namespace TechNode.Core.Entities;

public class Specification : BaseEntity
{
    public required string Name { get; set; }
    public ICollection<Category> Categories { get; set; } = [];
    public ICollection<ProductSpecification> ProductSpecifications { get; set; } = [];
}