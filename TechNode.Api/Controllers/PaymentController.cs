using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController(IPaymentService paymentService, IDeliveryMethodRepository deliveryRepository) : ControllerBase
{
    [HttpGet("deliveryMethods")]
    public async Task<IActionResult> GetDeliveryMethods()
    {
        var deliveryMethods = await deliveryRepository.GetDeliveryMethodsAsync();

        return Ok(deliveryMethods);
    }
    
    [Authorize]
    [HttpPost("{cartId}")]
    public async Task<IActionResult> CreateOrUpdatePaymentIntent([FromRoute] string cartId)
    {
        var cart = await paymentService.AddOrUpdatePaymentIntent(cartId);

        if (cart == null)
            return BadRequest("Something wrong with your cart");

        return Ok(cart);
    }
}