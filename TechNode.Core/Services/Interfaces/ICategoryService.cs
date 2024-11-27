using TechNode.Core.DTOs.CategoriesDtos;

namespace TechNode.Core.Services.Interfaces;

public interface ICategoryService
{
    Task<CategoryGetResponse> GetCategoryByIdAsync(int categoryId);
    
    Task<IEnumerable<CategoryGetResponse>> GetAllCategoriesAsync();

    Task<int> AddCategoryAsync(CategoryAddRequest addRequest);

    Task UpdateCategoryAsync(int categoryId, CategoryUpdateRequest updateRequest);

    Task DeleteCategoryAsync(int categoryId);
}