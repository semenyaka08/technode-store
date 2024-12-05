using TechNode.Core.Entities;

namespace TechNode.Core.Services.Interfaces;

public interface ICartService
{
    Task<ShoppingCart?> GetCartAsync(string key);

    Task<ShoppingCart?> SetCartAsync(ShoppingCart cart);

    Task<bool> DeleteCartAsync(string key);
}