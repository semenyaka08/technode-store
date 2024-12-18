using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TechNode.Core.Entities;

namespace TechNode.Infrastructure.Configuration;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasOne(c => c.ParentCategory)
            .WithMany(c => c.ChildCategories)
            .HasForeignKey(c => c.ParentCategoryId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.ToTable(table =>
        {
            table.HasCheckConstraint("CK_Category_MainCategory",
                "([IsMainCategory] = 1 AND [ParentCategoryId] IS NULL) OR ([IsMainCategory] = 0)");
        });
    }
}