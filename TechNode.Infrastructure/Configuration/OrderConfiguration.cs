using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TechNode.Core.Entities.OrderAggregate;

namespace TechNode.Infrastructure.Configuration;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.OwnsOne(x => x.PaymentSummary, o => o.WithOwner());
        builder.OwnsOne(x => x.ShippingAddress, o => o.WithOwner());

        builder.Property(z => z.OrderStatus).HasConversion(
            m=> m.ToString(),
            m=>(OrderStatus)Enum.Parse(typeof(OrderStatus), m));

        builder.Property(z => z.Subtotal).HasColumnType("decimal(18,2)");
        builder.Property(z => z.OrderCreated).HasConversion(
            d=>d.ToUniversalTime(),
            d=>DateTime.SpecifyKind(d, DateTimeKind.Utc));
    }
}