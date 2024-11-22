using Serilog;
using Serilog.Events;
using TechNode.Api.Extensions;
using TechNode.Api.Middlewares;
using TechNode.Core.Extensions;
using TechNode.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.AddPresentation();
builder.Services.AddCore();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapControllers();

app.Run();
