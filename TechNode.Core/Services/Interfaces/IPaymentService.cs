using TechNode.Core.Entities;

namespace TechNode.Core.Services.Interfaces;

public interface IPaymentService
{
    Task<ShoppingCart?> AddOrUpdatePaymentIntent(string cartId);
}