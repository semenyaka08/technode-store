﻿using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities;
using TechNode.Core.Repositories.Interfaces;

namespace TechNode.Infrastructure.Repositories;

public class CategoryRepository(ApplicationDbContext context) : ICategoryRepository
{
    public async Task<IEnumerable<Category>> GetAllCategoriesAsync(bool? isMainCategory, int? parentCategoryId)
    {
        var query = context.Categories.AsQueryable();

        if (isMainCategory is true)
        {
            query = query.Where(z=>z.IsMainCategory).Include(z=>z.ChildCategories);
        }
        else if (isMainCategory is false)
        {
            query = query.Where(z=>!z.IsMainCategory);
        }

        if (parentCategoryId != null)
        {
            query = query.Where(z => z.ParentCategoryId == parentCategoryId);
        }
        
        return await query.Include(z=>z.Specifications).ThenInclude(z=>z.ProductSpecifications).ToListAsync();
    }

    public async Task<Category?> GetCategoryByIdAsync(int id)
    {
        return await context.Categories.Include(z=>z.Specifications).ThenInclude(z=>z.ProductSpecifications)
            .FirstOrDefaultAsync(z => z.Id == id);
    }

    public async Task<int> AddCategoryAsync(Category category)
    {
        await context.Categories.AddAsync(category);
        
        await context.SaveChangesAsync();
        
        return category.Id;
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }

    public void DeleteCategoryAsync(Category category)
    {
        context.Categories.Remove(category);
    }
}