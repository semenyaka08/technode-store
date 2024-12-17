using Serilog;
using TechNode.Api.Middlewares;

namespace TechNode.Api.Extensions;

public static class ServiceCollectionExtension
{
    public static void AddPresentation(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        
        builder.Services.AddScoped<ExceptionHandlingMiddleware>();

        builder.Host.UseSerilog((context, configuration) =>
        {
            configuration.ReadFrom.Configuration(context.Configuration);
        });

        builder.Services.AddSignalR();
    }
}