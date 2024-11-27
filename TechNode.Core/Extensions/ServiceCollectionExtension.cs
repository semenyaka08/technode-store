using Microsoft.Extensions.DependencyInjection;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Core.Extensions;

public static class ServiceCollectionExtension
{
    public static void AddCore(this IServiceCollection services)
    {
        services.AddScoped<IProductsService, ProductsService>();
        services.AddScoped<ICategoryService, CategoriesService>();
    }
}