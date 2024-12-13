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

            if (!context.DeliveryMethods.Any())
            {
                var deliveryMethods = GetDeliveryMethod();
                await context.DeliveryMethods.AddRangeAsync(deliveryMethods);
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

    private IEnumerable<DeliveryMethod> GetDeliveryMethod()
    {
        return new List<DeliveryMethod>
        {
            new() { Name = "UPS1", Description = "Fastest delivery time", DeliveryTime = "1-2 Days", Price = 40 },
            new() { Name = "UPS2", Description = "Get it within 5 days", DeliveryTime = "2-5 Days", Price = 20 },
            new() { Name = "UPS3", Description = "Slower but cheap", DeliveryTime = "5-10 Days", Price = 10 },
            new() { Name = "Free", Description = "You get what you pay for", DeliveryTime = "1-2 weeks", Price = 0 }
        };
    }
}