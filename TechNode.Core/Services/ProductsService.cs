using TechNode.Core.Common;
using TechNode.Core.DTOs.ProductsDtos;
using TechNode.Core.Entities;
using TechNode.Core.Exceptions;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace TechNode.Core.Services;

public class ProductsService(IProductsRepository productsRepository, ILogger<ProductsService> logger, ICategoryRepository categoryRepository) : IProductsService
{
    public async Task<ProductGetResponse> GetProductByIdAsync(int id)
    {
        logger.LogInformation("Getting product with id {id}", id);
        
        var product = await productsRepository.GetProductByIdAsync(id);
        
        if(product == null) 
            throw new NotFoundException(nameof(Product), id);
        
        return new ProductGetResponse
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            PictureUrl = product.PictureUrl,
            Brand = product.Brand,
            StockQuantity = product.StockQuantity,
            CategoryName = product.Category.Name,
            Specifications = product.ProductSpecifications.ToDictionary(x=>x.Specification.Name, x=>x.Value)
        };
    }

    public async Task<PageResult<ProductGetResponse>> GetAllProductsAsync(ProductsGetRequest request)
    {
        logger.LogInformation("Getting all products");
        
        var (products, totalCount) = await productsRepository.GetAllProductsAsync(request.SearchPhrase, request.PageSize, request.PageNumber, request.Category, request.SortBy, request.SortDirection, request.Filters);
        
        var mappedProducts = products.Select(z=> new ProductGetResponse
        {
            Id = z.Id,
            Name = z.Name,
            Description = z.Description,
            Price = z.Price,
            PictureUrl = z.PictureUrl,
            Brand = z.Brand,
            StockQuantity = z.StockQuantity,
            CategoryName = z.Category.Name,
            Specifications = z.ProductSpecifications.ToDictionary(x=>x.Specification.Name, x=>x.Value)
        });
        
        return new PageResult<ProductGetResponse>(mappedProducts, totalCount, request.PageSize, request.PageNumber);
    }

    public async Task<int> AddProductAsync(ProductAddRequest addRequest)
    {
        logger.LogInformation("Adding product {@product}", addRequest);
        
        var category = await categoryRepository.GetCategoryByIdAsync(addRequest.CategoryId);
        
        if(category == null) throw new NotFoundException(nameof(Category), addRequest.CategoryId);
        
        var product = new Product
        {
            Name = addRequest.Name,
            Description = addRequest.Description,
            Price = addRequest.Price,
            PictureUrl = addRequest.PictureUrl,
            Brand = addRequest.Brand,
            StockQuantity = addRequest.StockQuantity,
            Category = category,
            ProductSpecifications = new List<ProductSpecification>()
        };
        
        if (addRequest.Specifications != null)
        {
            foreach (var spec in category.Specifications)
            {
                if (addRequest.Specifications.TryGetValue(spec.Name, out var value))
                {
                    product.ProductSpecifications.Add(new ProductSpecification
                    {
                        SpecificationId = spec.Id,
                        Value = value
                    });
                }
            }
        }
        
        var productId = await productsRepository.AddProductAsync(product);
        
        logger.LogInformation("Product with ID {ProductId} added successfully.", productId);
        
        return productId;
    }

    public async Task UpdateProductAsync(int id, ProductUpdateRequest updateRequest)
    {
        logger.LogInformation("Updating product {@product} with id: {productId}", updateRequest, id);
        
        var product = await productsRepository.GetProductByIdAsync(id);
        
        if(product == null) throw new NotFoundException(nameof(Product), id);
        
        if (updateRequest.CategoryId != product.CategoryId) // Проверяем, изменилась ли категория
        {
            var category = await categoryRepository.GetCategoryByIdAsync(updateRequest.CategoryId);
            if (category == null)
                throw new NotFoundException(nameof(Category), updateRequest.CategoryId);

            product.CategoryId = updateRequest.CategoryId;
        }
        
        product.Name = updateRequest.Name;
        product.Description = updateRequest.Description;
        product.Price = updateRequest.Price;
        product.PictureUrl = updateRequest.PictureUrl;
        product.Brand = updateRequest.Brand;
        product.StockQuantity = updateRequest.StockQuantity;

        if (updateRequest.Specifications != null)
        {
            foreach (var (specName, specValue) in updateRequest.Specifications)
            {
                var existingSpec = product.ProductSpecifications
                    .FirstOrDefault(ps => ps.Specification.Name == specName);

                if (existingSpec != null)
                {
                    existingSpec.Value = specValue;
                }
                else
                {
                    var category = await categoryRepository.GetCategoryByIdAsync(product.CategoryId);
                    
                    var specEntity = category!.Specifications.FirstOrDefault(z=>z.Name == specName);
                    if (specEntity != null)
                    {
                        product.ProductSpecifications.Add(new ProductSpecification
                        {
                            SpecificationId = specEntity.Id,
                            Value = specValue
                        });
                    }
                }
            }
        }
        
        await productsRepository.SaveChangesAsync();
    }

    public async Task DeleteProductAsync(int id)
    {
        logger.LogInformation("Deleting product with id: {productId}", id);
        
        var product = await productsRepository.GetProductByIdAsync(id);
        
        if(product == null) 
            throw new NotFoundException(nameof(Product), id);
        
        await productsRepository.DeleteProductAsync(product);
    }
}