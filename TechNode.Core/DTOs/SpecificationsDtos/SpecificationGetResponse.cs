namespace TechNode.Core.DTOs.SpecificationsDtos;

public class SpecificationGetResponse
{
    public int Id { get; set; }
    
    public required string Name { get; set; }

    public IEnumerable<string> Values { get; set; } = [];
}