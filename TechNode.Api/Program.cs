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

//Enabling CORS
builder.Services.AddCors();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseCors(z => z
    .AllowAnyMethod()
    .AllowAnyHeader()
    .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.MapControllers();

app.Run();
