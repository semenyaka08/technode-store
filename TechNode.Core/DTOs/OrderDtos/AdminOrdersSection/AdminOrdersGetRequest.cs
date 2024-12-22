namespace TechNode.Core.DTOs.OrderDtos.AdminOrdersSection;

public record AdminOrdersGetRequest(int PageSize = 12, int PageNumber = 1, string? BuyerEmail = null);