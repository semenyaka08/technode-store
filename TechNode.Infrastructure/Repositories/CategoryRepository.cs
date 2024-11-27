using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities;
using TechNode.Core.Repositories.Interfaces;

namespace TechNode.Infrastructure.Repositories;

public class CategoryRepository(ApplicationDbContext context) : ICategoryRepository
{
    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        return await context.Categories.ToListAsync();
    }

    public async Task<Category?> GetCategoryByIdAsync(int id)
    {
        return await context.Categories.Include(z=>z.Specifications)
            .FirstOrDefaultAsync(z => z.Id == id);
    }

    public async Task<int> AddCategoryAsync(Category category)
    {
        await context.Categories.AddAsync(category);
        
        await context.SaveChangesAsync();
        
        return category.Id;
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }

    public void DeleteCategoryAsync(Category category)
    {
        context.Categories.Remove(category);
    }
}