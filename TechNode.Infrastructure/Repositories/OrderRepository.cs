using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities.OrderAggregate;
using TechNode.Core.Repositories.Interfaces;

namespace TechNode.Infrastructure.Repositories;

public class OrderRepository(ApplicationDbContext context) : IOrderRepository
{
    public async Task<int> AddOrderAsync(Order order)
    {
        await context.Orders.AddAsync(order);
        
        await context.SaveChangesAsync();
        
        return order.Id;
    }

    public async Task<Order?> GetByIdAsync(int id, string userEmail)
    {
        var order = await context.Orders.Include(z=>z.OrderItems).Include(z=>z.DeliveryMethod).FirstOrDefaultAsync(z=>z.Id == id && z.BuyerEmail == userEmail);

        return order;
    }

    public async Task<IEnumerable<Order>> GetOrdersAsync(string userEmail)
    {
        var orders = await context.Orders.Include(z=>z.OrderItems).Include(z=>z.DeliveryMethod).Where(z=>z.BuyerEmail == userEmail).ToListAsync();

        return orders;
    }

    public async Task<Order?> GetByPaymentIntentIdAsync(string paymentId)
    {
        var order = await context.Orders.Include(z => z.OrderItems).Include(z => z.DeliveryMethod)
            .FirstOrDefaultAsync(z=>z.PaymentIntendId == paymentId);

        return order;
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }
}