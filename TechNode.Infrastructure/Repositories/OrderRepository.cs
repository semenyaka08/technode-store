using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TechNode.Core.DTOs.OrderDtos.AdminOrdersSection;
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

    public async Task<(IEnumerable<Order>, int)> GetAllOrdersAsync(AdminOrdersGetRequest request)
    {
        var query = context.Orders.Include(z => z.OrderItems).Include(z => z.DeliveryMethod)
            .Where(z => request.SearchParam == null
                        || z.BuyerEmail.Contains(request.SearchParam)
                        || z.Id.ToString() == request.SearchParam);
        
        
        if (!string.IsNullOrWhiteSpace(request.OrderStatus))
        {
            if (Enum.TryParse<OrderStatus>(request.OrderStatus, ignoreCase: true, out var status))
            {
                query = query.Where(z=>z.OrderStatus == status);
            }
        }
        
        int totalCount = query.Count();
        
        query = request.SortDirection == "asc" ? query.OrderBy(GetSelectorKey(request.SortBy)) : query.OrderByDescending(GetSelectorKey(request.SortBy));
        
        return (await query.Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize).ToListAsync(), totalCount);
    }
    
    private Expression<Func<Order, object>> GetSelectorKey(string? sortItem)
    {
        return sortItem switch
        {
            "status" => z => z.OrderStatus,
            "amount" => z => z.Subtotal + z.DeliveryMethod.Price,
            _ => z => z.OrderStatus
        };
    }
}