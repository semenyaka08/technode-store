namespace TechNode.Core.DTOs.ProductsDtos;

public record ProductsGetRequest(string? SearchPhrase, string? SortBy, string? SortDirection, int PageSize = 10, int PageNumber = 1);