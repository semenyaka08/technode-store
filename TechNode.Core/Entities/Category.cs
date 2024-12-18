namespace TechNode.Core.Entities;

public class Category : BaseEntity
{
    public required string Name { get; set; }

    public ICollection<Specification> Specifications { get; set; } = [];
    
    public ICollection<Product> Products { get; set; } = [];
    
    // Self-referencing relationship
    public int? ParentCategoryId { get; set; }
    
    public Category? ParentCategory { get; set; }
    
    public ICollection<Category> ChildCategories { get; set; } = new List<Category>();

    public required bool IsMainCategory { get; set; } = false;
}