using TechNode.Core.DTOs.SpecificationsDtos;

namespace TechNode.Core.DTOs.CategoriesDtos;

public class CategoryGetResponse
{
    public int Id { get; set; }
    public required string Name { get; set; }

    public IEnumerable<SpecificationGetResponse> Specifications { get; set; } = [];
}