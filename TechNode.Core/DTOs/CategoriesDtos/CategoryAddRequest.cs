using System.ComponentModel.DataAnnotations;

namespace TechNode.Core.DTOs.CategoriesDtos;

public class CategoryAddRequest
{
    [Required] 
    public string Name { get; set; } = string.Empty;

    [Required]
    public bool IsMainCategory { get; set; }
    
    public int? ParentCategoryId { get; set; }
}