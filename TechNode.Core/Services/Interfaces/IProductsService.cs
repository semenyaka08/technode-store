using TechNode.Core.Common;
using TechNode.Core.DTOs.ProductsDtos;

namespace TechNode.Core.Services.Interfaces;

public interface IProductsService
{
    Task<ProductGetResponse> GetProductByIdAsync(int id);

    Task<PageResult<ProductGetResponse>> GetAllProductsAsync(ProductsGetRequest request);

    Task<int> AddProductAsync(ProductAddRequest addRequest);

    Task UpdateProductAsync(int id, ProductUpdateRequest updateRequest);

    Task DeleteProductAsync(int id);
}