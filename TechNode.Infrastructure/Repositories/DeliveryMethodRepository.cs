using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities;
using TechNode.Core.Repositories.Interfaces;

namespace TechNode.Infrastructure.Repositories;

public class DeliveryMethodRepository(ApplicationDbContext context) : IDeliveryMethodRepository
{
    public async Task<DeliveryMethod?> GetDeliveryMethodByIdAsync(int id)
    {
        return await context.DeliveryMethods.FirstOrDefaultAsync(z=>z.Id == id);
    }

    public async Task<IEnumerable<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
        return await context.DeliveryMethods.ToListAsync();
    }
}