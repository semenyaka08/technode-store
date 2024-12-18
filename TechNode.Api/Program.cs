using TechNode.Api.Extensions;
using TechNode.Api.Middlewares;
using TechNode.Api.SignalR;
using TechNode.Core.Entities;
using TechNode.Core.Extensions;
using TechNode.Infrastructure;
using TechNode.Infrastructure.Extensions;
using TechNode.Infrastructure.Seeders;

var builder = WebApplication.CreateBuilder(args);

builder.AddPresentation();
builder.Services.AddCore();
builder.Services.AddInfrastructure(builder.Configuration);

//Enabling CORS
builder.Services.AddCors();

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

//Configuring Cookies
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

var app = builder.Build();

//seeding data
var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<IDataSeeder>();
await seeder.SeedAsync();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseCors(z => z
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<AppUser>();
app.MapHub<NotificationHub>("hub/notifications");

app.Run();
