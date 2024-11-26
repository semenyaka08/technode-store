namespace TechNode.Core.Entities;

public class ProductSpecification
{
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    
    public int SpecificationId { get; set; }
    public Specification Specification { get; set; } = null!;
    
    public required string Value { get; set; }
}