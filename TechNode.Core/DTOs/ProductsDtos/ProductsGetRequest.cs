namespace TechNode.Core.DTOs.ProductsDtos;

public record ProductsGetRequest(string? SearchPhrase, string? SortBy, string? SortDirection, string? Category, int PageSize = 12, int PageNumber = 1);