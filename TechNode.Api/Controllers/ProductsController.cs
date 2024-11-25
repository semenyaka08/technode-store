
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechNode.Core.DTOs.ProductsDtos;
using TechNode.Core.Entities;
using TechNode.Core.Services.Interfaces;
using TechNode.Infrastructure;


namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductsService productsService, ApplicationDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetProducts([FromQuery] ProductsGetRequest request)
    {
        var products = await productsService.GetAllProductsAsync(request);
        
        return Ok(products);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProductById([FromRoute] int id)
    {
        var product = await productsService.GetProductByIdAsync(id);
        
        return Ok(product);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] ProductAddRequest product)
    {
        int id = await productsService.AddProductAsync(product);
        
        return CreatedAtAction(nameof(GetProductById), new { id }, new { id });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody] ProductUpdateRequest updateRequest)
    {
        await productsService.UpdateProductAsync(id, updateRequest);
        
        return NoContent();
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct([FromRoute] int id)
    {
        await productsService.DeleteProductAsync(id);
        
        return NoContent();
    }

    [HttpGet("{category}")]
    public async Task<IActionResult> GetProductsByCategory([FromRoute] string category)
    {
        var products = await context.Products.Where(z=> z.Type.Contains(category)).ToListAsync();
        
        return Ok(products);
    }
    
    [HttpGet("{category}/filters/{*filters}")]
    public async Task<IActionResult> GetProductsByCategory([FromRoute] string category, string? filters)
    {
        var filterList = filters?.Split('/') ?? [];
        
        var products = await context.Products.Where(z=> z.Type.Contains(category)).ToListAsync();

        products = products.Where(z=> z.Name.ToLower().Contains(filterList[0].ToLower())).ToList();
        
        throw new NotImplementedException();
    }
}