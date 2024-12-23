using TechNode.Core.DTOs.OrderDtos.AdminOrdersSection;
using TechNode.Core.Entities.OrderAggregate;

namespace TechNode.Core.Repositories.Interfaces;

public interface IOrderRepository
{
    Task<int> AddOrderAsync(Order order);

    Task<Order?> GetByIdAsync(int id, string userEmail);
    
    Task<IEnumerable<Order>> GetOrdersAsync(string userEmail);

    Task<Order?> GetByPaymentIntentIdAsync(string paymentId);

    Task SaveChangesAsync();
    
    Task<(IEnumerable<Order>, int)> GetAllOrdersAsync(AdminOrdersGetRequest request);
}