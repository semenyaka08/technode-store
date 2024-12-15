using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities;
using TechNode.Core.Entities.OrderAggregate;

namespace TechNode.Infrastructure;

public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Product> Products { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<ProductSpecification> ProductSpecifications { get; set; }

    public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

    public DbSet<Specification> Specifications { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        
        modelBuilder.Entity<ProductSpecification>()
            .HasKey(ps => new { ps.ProductId, ps.SpecificationId });
        
        modelBuilder.Entity<ProductSpecification>()
            .HasOne(ps => ps.Product)
            .WithMany(p => p.ProductSpecifications)
            .HasForeignKey(ps => ps.ProductId);

        modelBuilder.Entity<ProductSpecification>()
            .HasOne(ps => ps.Specification)
            .WithMany(s => s.ProductSpecifications)
            .HasForeignKey(ps => ps.SpecificationId);
    }
}