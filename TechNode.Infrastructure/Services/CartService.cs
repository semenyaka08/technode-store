using System.Text.Json;
using StackExchange.Redis;
using TechNode.Core.Entities;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Infrastructure.Services;

public class CartService(IConnectionMultiplexer redis) : ICartService
{
    private readonly IDatabase _database = redis.GetDatabase();
    
    public async Task<ShoppingCart?> GetCartAsync(string key)
    {
        var data = await _database.StringGetAsync(key);

        if (data.IsNullOrEmpty)
            return null;

        return JsonSerializer.Deserialize<ShoppingCart>(data!)!;
    }

    public async Task<ShoppingCart?> SetCartAsync(ShoppingCart cart)
    {
        var createdCart = await _database.StringSetAsync(cart.Id, JsonSerializer.Serialize(cart), TimeSpan.FromDays(30));

        if (!createdCart) return null;

        return await GetCartAsync(cart.Id);
    }

    public async Task<bool> DeleteCartAsync(string key)
    {
        return await _database.KeyDeleteAsync(key);
    }
}