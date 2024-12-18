using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechNode.Core.DTOs.CategoriesDtos;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(ICategoryService categoryService) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCategoryById([FromRoute] int id)
    {
        var category = await categoryService.GetCategoryByIdAsync(id);
        
        return Ok(category);
    }    
    
    [HttpGet]
    public async Task<IActionResult> GetCategories([FromQuery] bool? isMainCategory, [FromQuery] int? parentCategoryId)
    {
        var categories = await categoryService.GetAllCategoriesAsync(isMainCategory, parentCategoryId);
        
        return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] CategoryAddRequest category)
    {
        int id = await categoryService.AddCategoryAsync(category);
        
        return CreatedAtAction(nameof(GetCategoryById), new { id }, new { id });
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCategory([FromRoute] int id, [FromBody] CategoryUpdateRequest updateRequest)
    {
        await categoryService.UpdateCategoryAsync(id, updateRequest);
        
        return NoContent();
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCategory([FromRoute] int id)
    {
        await categoryService.DeleteCategoryAsync(id);
        
        return NoContent();
    }
}