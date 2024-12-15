using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TechNode.Core.Entities.OrderAggregate;

namespace TechNode.Infrastructure.Configuration;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.OwnsOne(z => z.OrderedItem, o => o.WithOwner());
        builder.Property(z => z.Price).HasColumnType("decimal(18,2)");
    }
}