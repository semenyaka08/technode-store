using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities;
using TechNode.Core.Repositories.Interfaces;

namespace TechNode.Infrastructure.Repositories;

public class ProductsRepository(ApplicationDbContext context) : IProductsRepository
{
    public async Task<(IEnumerable<Product>, int)> GetAllProductsAsync(string? searchPhrase, int pageSize, int pageNumber ,string? sortBy, string? sortDirection)
    {
        var products = context.Products.Where(z => searchPhrase == null
                                                   || z.Name.Contains(searchPhrase)
                                                   || z.Description.Contains(searchPhrase)
                                                   || z.Type.ToString().Contains(searchPhrase)
                                                   || z.Brand.ToString().Contains(searchPhrase));

        int totalCount = products.Count();

        products = sortDirection == "asc" ? products.OrderBy(GetSelectorKey(sortBy)) : products.OrderByDescending(GetSelectorKey(sortBy));
        
        return (await products.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(), totalCount);
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        return await context.Products.FindAsync(id);
    }

    public async Task<int> AddProductAsync(Product product)
    {
        await context.Products.AddAsync(product);

        await context.SaveChangesAsync();

        return product.Id;
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }

    public void DeleteProductAsync(Product product)
    {
        context.Products.Remove(product);
    }

    private Expression<Func<Product, object>> GetSelectorKey(string? sortItem)
    {
        return sortItem switch
        {
            "name" => z => z.Name,
            "price" => z => z.Price,
            _ => z => z.Name
        };
    }

}