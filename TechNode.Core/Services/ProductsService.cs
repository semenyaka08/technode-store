using TechNode.Core.Common;
using TechNode.Core.DTOs.ProductsDtos;
using TechNode.Core.Entities;
using TechNode.Core.Exceptions;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace TechNode.Core.Services;

public class ProductsService(IProductsRepository productsRepository, ILogger<ProductsService> logger) : IProductsService
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
            Type = product.Type,
            Brand = product.Brand,
            QuantityInStock = product.StockQuantity,
        };
    }

    public async Task<PageResult<ProductGetResponse>> GetAllProductsAsync(ProductsGetRequest request)
    {
        logger.LogInformation("Getting all products");
        
        var (products, totalCount) = await productsRepository.GetAllProductsAsync(request.SearchPhrase, request.PageSize, request.PageNumber, request.SortBy, request.SortDirection);
        
        var mappedProducts = products.Select(z=> new ProductGetResponse
        {
            Id = z.Id,
            Name = z.Name,
            Description = z.Description,
            Price = z.Price,
            PictureUrl = z.PictureUrl,
            Type = z.Type,
            Brand = z.Brand,
            QuantityInStock = z.StockQuantity,
        });
        
        return new PageResult<ProductGetResponse>(mappedProducts, totalCount, request.PageSize, request.PageNumber);
    }

    public async Task<int> AddProductAsync(ProductAddRequest addRequest)
    {
        logger.LogInformation("Adding product {@product}", addRequest);
        
        var product = new Product
        {
            Name = addRequest.Name,
            Description = addRequest.Description,
            Price = addRequest.Price,
            PictureUrl = addRequest.PictureUrl,
            Type = addRequest.Type,
            Brand = addRequest.Brand,
            StockQuantity = addRequest.QuantityInStock,
            Category = new Category{Name = ""}
        };
        
        var productId = await productsRepository.AddProductAsync(product);
        
        return productId;
    }

    public async Task UpdateProductAsync(int id, ProductUpdateRequest updateRequest)
    {
        logger.LogInformation("Updating product {@product} with id: {productId}", updateRequest, id);
        
        var product = await productsRepository.GetProductByIdAsync(id);
        
        if(product == null) throw new NotFoundException(nameof(Product), id);
        
        product.Name = updateRequest.Name;
        product.Description = updateRequest.Description;
        product.Price = updateRequest.Price;
        product.PictureUrl = updateRequest.PictureUrl;
        product.Type = updateRequest.Type;
        product.Brand = updateRequest.Brand;
        product.StockQuantity = updateRequest.QuantityInStock;

        await productsRepository.SaveChangesAsync();
    }

    public async Task DeleteProductAsync(int id)
    {
        logger.LogInformation("Deleting product with id: {productId}", id);
        
        var product = await productsRepository.GetProductByIdAsync(id);
        
        if(product == null) 
            throw new NotFoundException(nameof(Product), id);
        
        productsRepository.DeleteProductAsync(product);
    }
}