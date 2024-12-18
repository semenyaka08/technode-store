using TechNode.Core.Entities;

namespace TechNode.Core.Repositories.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync(bool? isMainCategory, int? parentCategoryId);
    
    Task<Category?> GetCategoryByIdAsync(int id);
    
    Task<int> AddCategoryAsync(Category category);

    Task SaveChangesAsync();
    
    void DeleteCategoryAsync(Category category);
}