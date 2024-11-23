using TechNode.Core.Entities;

namespace TechNode.Core.Repositories.Interfaces;

public interface IProductsRepository
{
    Task<(IEnumerable<Product>, int)> GetAllProductsAsync(string? searchPhrase, int pageSize, int pageNumber, string? sortBy, string? sortDirection);
    
    Task<Product?> GetProductByIdAsync(int id);
    
    Task<int> AddProductAsync(Product product);

    Task SaveChangesAsync();
    
    void DeleteProductAsync(Product product);
}