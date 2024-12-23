namespace TechNode.Core.DTOs.OrderDtos.AdminOrdersSection;

public record AdminOrdersGetRequest(int PageSize = 12, int PageNumber = 1, string? SortBy = null, string? SortDirection = null, string? OrderStatus = null, string? SearchParam = null); //Search param expect to be ether orderId or Buyer Email