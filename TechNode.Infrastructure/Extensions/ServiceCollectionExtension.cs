using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Infrastructure.Repositories;
using TechNode.Infrastructure.Seeders;

namespace TechNode.Infrastructure.Extensions;

public static class ServiceCollectionExtension
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging();
        });
        
        services.AddScoped<IDataSeeder, DataSeeder>();
        
        services.AddScoped<IProductsRepository, ProductsRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
    }
}