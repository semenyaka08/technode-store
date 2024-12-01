using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities;
using TechNode.Core.Repositories.Interfaces;

namespace TechNode.Infrastructure.Repositories;

public class ProductsRepository(ApplicationDbContext context, ICategoryRepository categoryRepository) : IProductsRepository
{
    public async Task<(IEnumerable<Product>, int)> GetAllProductsAsync(string? searchPhrase, int pageSize, int pageNumber, string? category, string? sortBy, string? sortDirection, Dictionary<int, string[]>? filters)
    {
        var products = context.Products
            .Include(c=>c.Category)
            .Include(m=>m.ProductSpecifications)
            .ThenInclude(v=>v.Specification)
            .Where(z => searchPhrase == null
                                                   || z.Name.Contains(searchPhrase)
                                                   || z.Description.Contains(searchPhrase)
                                                   || z.Category.Name.Contains(searchPhrase)
                                                   || z.Brand.ToString().Contains(searchPhrase));
        
        if(category != null)
            products = products.Where(z => z.Category.Name.Contains(category));

        if (filters != null && filters.Any())
        {
            foreach (var (specificationId, values) in filters)
            {
                products = products.Where(p => p.ProductSpecifications
                    .Any(ps => ps.SpecificationId == specificationId && values.Select(z=>z.Replace(" ", "")).Contains(ps.Value)));
            }
        }
        
        int totalCount = products.Count();

        products = sortDirection == "asc" ? products.OrderBy(GetSelectorKey(sortBy)) : products.OrderByDescending(GetSelectorKey(sortBy));
        
        return (await products.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(), totalCount);
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        return await context.Products
            .Include(c=>c.Category)
            .Include(m=>m.ProductSpecifications)
            .ThenInclude(v=>v.Specification)
            .FirstOrDefaultAsync(z => z.Id == id);
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

    public async Task DeleteProductAsync(Product product)
    {
        context.Products.Remove(product);
        
        await context.SaveChangesAsync();
    }

    private Expression<Func<Product, object>> GetSelectorKey(string? sortItem)
    {
        return sortItem switch
        {
            "name" => z => z.Brand,
            "price" => z => z.Price,
            _ => z => z.Brand
        };
    }
}