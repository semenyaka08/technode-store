namespace TechNode.Core.DTOs.CategoriesDtos;

public class CategoryUpdateRequest
{
    public required string Name { get; set; }

    public int? ParentCategoryId { get; set; }
}