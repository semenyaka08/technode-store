using TechNode.Core.DTOs.OrderDtos;

namespace TechNode.Core.Services.Interfaces;

public interface IOrdersService
{
    Task<int> AddOrderAsync(OrderCreateDto orderCreateDto, string userEmail);

    Task<OrderDto> GetOrderByIdAsync(int orderId, string userEmail);

    Task<IEnumerable<OrderDto>> GetOrdersAsync(string userEmail);
}