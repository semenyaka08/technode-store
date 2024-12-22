using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services.Interfaces;
using TechNode.Infrastructure.Repositories;
using TechNode.Infrastructure.Seeders;
using TechNode.Infrastructure.Services;

namespace TechNode.Infrastructure.Extensions;

public static class ServiceCollectionExtension
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), sqlOptions =>
            {
                sqlOptions.EnableRetryOnFailure(maxRetryCount: 5, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
            }).EnableSensitiveDataLogging();
        });
        
        services.AddScoped<IDataSeeder, DataSeeder>();
        
        services.AddScoped<IProductsRepository, ProductsRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IDeliveryMethodRepository, DeliveryMethodRepository>();
        services.AddScoped<IPaymentService, PaymentService>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        
        services.AddSingleton<IConnectionMultiplexer>(_ =>
        {
            var connectionString = configuration.GetConnectionString("Redis");
            if (connectionString == null) throw new Exception("Can not get redis connection string");
            var conf = ConfigurationOptions.Parse(connectionString, true);
            return ConnectionMultiplexer.Connect(conf);
        });
        services.AddSingleton<ICartService, CartService>();
    }
}