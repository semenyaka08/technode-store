using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities;

namespace TechNode.Infrastructure.Seeders;

public class DataSeeder(ApplicationDbContext context) : IDataSeeder
{
    public async Task SeedAsync()
    {
        if ((await context.Database.GetPendingMigrationsAsync()).Any())
        {
            await context.Database.MigrateAsync();
        }
        
        if (await context.Database.CanConnectAsync())
        {
            if (!context.Categories.Any())
            {
                var categories = GetCategories();
                await context.Categories.AddRangeAsync(categories);
                await context.SaveChangesAsync();
            }
            
            if (!context.Specifications.Any())
            {
                var specifications = GetSpecifications();
                await context.Specifications.AddRangeAsync(specifications);
                await context.SaveChangesAsync();
            }
            
            var videocardsCategory = await context.Categories.Include(category => category.Specifications).FirstOrDefaultAsync(c => c.Name == "Videocards");
            if (videocardsCategory != null && !videocardsCategory.Specifications.Any())
            {
                var specifications = await context.Specifications
                    .Where(s => new[]
                    {
                        "Processor family",
                        "Memory capacity",
                        "Funs number",
                        "Memory bus width",
                        "Memory type"
                    }.Contains(s.Name))
                    .ToListAsync();

                videocardsCategory.Specifications = specifications;
                await context.SaveChangesAsync();
            }
        }

    }

    private IEnumerable<Specification> GetSpecifications()
    {
        return new List<Specification>
        {
            new() { Name = "Processor family" },
            new() { Name = "Memory capacity" },
            new() { Name = "Funs number" },
            new() { Name = "Memory bus width" },
            new() { Name = "Memory type" }
        };
    }

    private IEnumerable<Category> GetCategories()
    {
        return new List<Category>
        {
            new() { Name = "Videocards" },
            new() { Name = "Processors" },
            new() { Name = "Motherboards" }
        };
    }
}