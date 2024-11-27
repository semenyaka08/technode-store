using TechNode.Core.Entities;

namespace TechNode.Core.Repositories.Interfaces;

public interface IProductsRepository
{
    Task<(IEnumerable<Product>, int)> GetAllProductsAsync(string? searchPhrase, int pageSize, int pageNumber, string? category ,string? sortBy, string? sortDirection);
    
    Task<Product?> GetProductByIdAsync(int id);
    
    Task<int> AddProductAsync(Product product);

    Task SaveChangesAsync();
    
    Task DeleteProductAsync(Product product);
}