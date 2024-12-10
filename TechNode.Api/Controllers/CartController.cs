using Microsoft.AspNetCore.Mvc;
using TechNode.Core.Entities;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController(ICartService cartService) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetShoppingCart([FromRoute] string id)
    {
        var cart = await cartService.GetCartAsync(id) ?? new ShoppingCart{Id = id};

        return Ok(cart);
    }

    [HttpPost]
    public async Task<IActionResult> SetShoppingCart(ShoppingCart cart)
    {
        var updatedCart = await cartService.SetCartAsync(cart);

        if (updatedCart == null)
            return BadRequest("Some problems with shopping cart");

        return Ok(updatedCart);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShoppingCart(string id)
    {
        var result = await cartService.DeleteCartAsync(id);

        if (!result) return BadRequest("problems with deleting shopping cart");

        return Ok();
    }
}