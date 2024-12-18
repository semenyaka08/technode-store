using Microsoft.Extensions.Logging;
using TechNode.Core.DTOs.CategoriesDtos;
using TechNode.Core.DTOs.SpecificationsDtos;
using TechNode.Core.Entities;
using TechNode.Core.Exceptions;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Core.Services;

public class CategoriesService(ICategoryRepository categoryRepository, ILogger<CategoriesService> logger) : ICategoryService
{
    public async Task<CategoryGetResponse> GetCategoryByIdAsync(int categoryId)
    {
        var category = await categoryRepository.GetCategoryByIdAsync(categoryId);

        if(category == null)
            throw new NotFoundException(nameof(Category), categoryId.ToString());
        
        return new CategoryGetResponse
        {
            Id = category.Id,
            Name = category.Name,
            Specifications = category.Specifications.Select(z=> new SpecificationGetResponse
            {
                Id = z.Id,
                Name = z.Name,
            })
        };
    }

    public async Task<IEnumerable<CategoryGetResponse>> GetAllCategoriesAsync(bool? isMainCategory, int? parentCategoryId)
    {
        logger.LogInformation("Getting all categories");

        var categories = await categoryRepository.GetAllCategoriesAsync(isMainCategory, parentCategoryId);
        
        return categories.Select(z=> new CategoryGetResponse
        {
            Id = z.Id,
            Name = z.Name,
            Specifications = z.Specifications.Select(specification=> new SpecificationGetResponse
            {
                Id = specification.Id,
                Name = specification.Name,
                Values = specification.ProductSpecifications
                    .Select(ps => ps.Value)
                    .Distinct()
            }),
            ChildrenCategories = z.ChildCategories.Select(child => new CategoryGetResponse
            {
                Id = child.Id,
                Name = child.Name,
                Specifications = child.Specifications.Select(specification => new SpecificationGetResponse
                {
                    Id = specification.Id,
                    Name = specification.Name,
                    Values = specification.ProductSpecifications
                        .Select(ps => ps.Value)
                        .Distinct()
                }).ToList()
            }).ToList()
        });
    }

    public async Task<int> AddCategoryAsync(CategoryAddRequest addRequest)
    {
        logger.LogInformation("Adding new category");
        
        var category = new Category{Name = addRequest.Name, IsMainCategory = addRequest.IsMainCategory};
        
        if (addRequest.ParentCategoryId.HasValue)
        {
            var parentCategory = await categoryRepository.GetCategoryByIdAsync(addRequest.ParentCategoryId.Value);

            category.ParentCategory = parentCategory;
        }
        
        return await categoryRepository.AddCategoryAsync(category);
    }

    public async Task UpdateCategoryAsync(int categoryId, CategoryUpdateRequest updateRequest)
    {
        logger.LogInformation("Updating category");
        
        var category = await categoryRepository.GetCategoryByIdAsync(categoryId);
        
        if(category == null)
            throw new NotFoundException(nameof(Category), categoryId.ToString());
        
        category.Name = updateRequest.Name;

        if (updateRequest.ParentCategoryId.HasValue)
        {
            var parentCategory = await categoryRepository.GetCategoryByIdAsync(updateRequest.ParentCategoryId.Value);

            category.ParentCategory = parentCategory;
        }

        await categoryRepository.SaveChangesAsync();
    }

    public async Task DeleteCategoryAsync(int categoryId)
    {
        logger.LogInformation("Deleting category");
        
        var category = await categoryRepository.GetCategoryByIdAsync(categoryId);
        
        if(category == null)
            throw new NotFoundException(nameof(Category), categoryId.ToString());
        
        categoryRepository.DeleteCategoryAsync(category);

        await categoryRepository.SaveChangesAsync();
    }
}