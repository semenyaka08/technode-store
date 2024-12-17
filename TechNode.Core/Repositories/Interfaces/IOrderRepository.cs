using TechNode.Core.Entities.OrderAggregate;

namespace TechNode.Core.Repositories.Interfaces;

public interface IOrderRepository
{
    Task<int> AddOrderAsync(Order order);

    Task<Order?> GetByIdAsync(int id, string userEmail);
    
    Task<IEnumerable<Order>> GetOrdersAsync(string userEmail);

    Task<Order?> GetByPaymentIntentIdAsync(string paymentId);

    Task SaveChangesAsync();
}