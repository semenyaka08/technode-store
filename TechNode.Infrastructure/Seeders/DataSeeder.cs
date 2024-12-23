﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TechNode.Core.Entities;

namespace TechNode.Infrastructure.Seeders;

public class DataSeeder(ApplicationDbContext context, UserManager<AppUser> userManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager) : IDataSeeder
{
    public async Task SeedAsync()
    {
        if ((await context.Database.GetPendingMigrationsAsync()).Any())
        {
            await context.Database.MigrateAsync();
        }
        
        if (await context.Database.CanConnectAsync())
        {
            string[] roles = ["Admin", "User"];
            
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
            
            if (!userManager.Users.Any(z => z.Email == configuration["AdminData:Email"]))
            {
                var (adminUser, password) = GetAdminUser();
                await userManager.CreateAsync(adminUser, password);
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
            
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
            
            var processorsCategory = await context.Categories.Include(c => c.Specifications)
                .FirstOrDefaultAsync(c => c.Name == "Processors");
            if (processorsCategory != null && !processorsCategory.Specifications.Any())
            {
                var processorSpecifications = await context.Specifications
                    .Where(s => new[]
                    {
                        "Core count",
                        "Thread count",
                        "Base clock speed",
                        "TDP"
                    }.Contains(s.Name))
                    .ToListAsync();

                processorsCategory.Specifications = processorSpecifications;
                await context.SaveChangesAsync();
            }
            
            var motherboardsCategory = await context.Categories.Include(c => c.Specifications)
                .FirstOrDefaultAsync(c => c.Name == "Motherboards");
            if (motherboardsCategory != null && !motherboardsCategory.Specifications.Any())
            {
                var motherboardSpecifications = await context.Specifications
                    .Where(s => new[]
                    {
                        "Socket type",
                        "Chipset",
                        "Form factor",
                        "RAM slots"
                    }.Contains(s.Name))
                    .ToListAsync();

                motherboardsCategory.Specifications = motherboardSpecifications;
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
            new() { Name = "Memory type" },
            
            new() { Name = "Core count" },
            new() { Name = "Thread count" },
            new() { Name = "Base clock speed" },
            new() { Name = "TDP" },
            
            new() { Name = "Socket type" },
            new() { Name = "Chipset" },
            new() { Name = "Form factor" },
            new() { Name = "RAM slots" }
        };
    }

    private IEnumerable<Category> GetCategories()
    {
        //MainCategories
        var components = new Category { Name = "Components", IsMainCategory = true };
        var laptops = new Category { Name = "Laptops", IsMainCategory = true };
        var monitors = new Category { Name = "Monitors", IsMainCategory = true };
        var gamingPeripherals = new Category { Name = "Gaming Peripherals", IsMainCategory = true };

        // SubCategories
        var videocards = new Category { Name = "Videocards", IsMainCategory = false, ParentCategory = components };
        var processors = new Category { Name = "Processors", IsMainCategory = false, ParentCategory = components };
        var motherboards = new Category { Name = "Motherboards", IsMainCategory = false, ParentCategory = components };

        return new List<Category>
        {
            components,
            laptops,
            monitors,
            gamingPeripherals,
            videocards,
            processors,
            motherboards
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

    private (AppUser, string) GetAdminUser()
    {
        var adminUser = new AppUser
        {
            FirstName = configuration["AdminData:FirstName"],
            LastName = configuration["AdminData:LastName"],
            UserName = configuration["AdminData:Email"],
            Email = configuration["AdminData:Email"],
        };
        
        string password = configuration["AdminData:Password"]!;
        
        return (adminUser, password);
    }
}