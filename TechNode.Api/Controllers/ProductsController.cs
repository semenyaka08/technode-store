
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TechNode.Core.DTOs.ProductsDtos;

using TechNode.Core.Services.Interfaces;



namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductsService productsService) : ControllerBase
{
    [HttpGet("{category?}")]
    public async Task<IActionResult> GetProducts([FromQuery] ProductsGetRequest request, [FromRoute] string? category = null)
    {
        if (!string.IsNullOrEmpty(category))
            request = request with { Category = category };
        
        var products = await productsService.GetAllProductsAsync(request);
        
        return Ok(products);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProductById([FromRoute] int id)
    {
        var product = await productsService.GetProductByIdAsync(id);
        
        return Ok(product);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] ProductAddRequest product)
    {
        int id = await productsService.AddProductAsync(product);
        
        return CreatedAtAction(nameof(GetProductById), new { id }, new { id });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody] ProductUpdateRequest updateRequest)
    {
        await productsService.UpdateProductAsync(id, updateRequest);
        
        return NoContent();
    }
    
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct([FromRoute] int id)
    {
        await productsService.DeleteProductAsync(id);
        
        return NoContent();
    }
}