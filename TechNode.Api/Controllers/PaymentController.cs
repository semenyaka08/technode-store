using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Stripe;
using TechNode.Api.Extensions;
using TechNode.Api.SignalR;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController(IPaymentService paymentService, IDeliveryMethodRepository deliveryRepository, ILogger<PaymentController> logger, IOrdersService ordersService, IConfiguration configuration, IHubContext<NotificationHub> hubContext) : ControllerBase
{
    private readonly string _whSecret = configuration["StripeSettings:WhSecret"]!;
    
    [Authorize]
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

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = ConstructStripeEvent(json);

            if (stripeEvent.Data.Object is not PaymentIntent intent)
            {
                return BadRequest("Invalid event data");
            }

            await HandlePaymentIntentSucceeded(intent);

            return Ok();
        }
        catch (StripeException ex)
        {
            logger.LogError(ex, "Stripe webhook error");
            return StatusCode(StatusCodes.Status500InternalServerError, "Stripe webhook error");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unexpected error occured");
            return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occured");
        }
    }

    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
    {
        if (intent.Status == "succeeded")
        {
            var order = await ordersService.UpdateOrderStatus(intent);
            
            var connectionId = NotificationHub.GetConnectionIdByEmail(order.BuyerEmail);

            if (!string.IsNullOrEmpty(connectionId))
            {
                await hubContext.Clients.Client(connectionId)
                    .SendAsync("Order complete notification", order);
            }
        }
    }

    private Event ConstructStripeEvent(string json)
    {
        try
        {
            return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _whSecret);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to construct stripe event");
            throw new StripeException("Invalid signature");
        }
    }
}