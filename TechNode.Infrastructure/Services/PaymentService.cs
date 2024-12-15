using Microsoft.Extensions.Configuration;
using Stripe;
using TechNode.Core.Entities;
using TechNode.Core.Repositories.Interfaces;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Infrastructure.Services;

public class PaymentService(ICartService cartService, IConfiguration configuration, IDeliveryMethodRepository deliveryMethodRepository, IProductsRepository productsRepository) : IPaymentService
{
    public async Task<ShoppingCart?> AddOrUpdatePaymentIntent(string cartId)
    {
        StripeConfiguration.ApiKey = configuration["StripeSettings:SecretKey"];

        var cart = await cartService.GetCartAsync(cartId);

        if (cart == null)
            return null;

        var shippingPrice = 0m;
        
        if (cart.DeliveryMethodId.HasValue)
        {
            var delivery = await deliveryMethodRepository.GetDeliveryMethodByIdAsync((int)cart.DeliveryMethodId);
            if (delivery == null) return null;

            shippingPrice += delivery.Price;
        }

        foreach (var item in cart.CartItems)
        {
            var product = await productsRepository.GetProductByIdAsync(item.ProductId);
            if (product == null)
            {
                cart.CartItems.Remove(item);
                return null;
            }

            if (item.Price != product.Price)
                item.Price = product.Price;
        }
        
        var service = new PaymentIntentService();

        if (string.IsNullOrEmpty(cart.PaymentIntendId))
        {
            var intentConfig = new PaymentIntentCreateOptions
            {
                Amount = (long?)cart.CartItems.Sum(x => x.Quantity * x.Price * 100),
                Currency = "usd",
                PaymentMethodTypes = ["card"]
            };

            var paymentIntent = await service.CreateAsync(intentConfig);
            
            cart.PaymentIntendId = paymentIntent.Id;
            cart.ClientSecret = paymentIntent.ClientSecret;
        }
        else
        {
            var intentConfig = new PaymentIntentUpdateOptions
            {
                Amount = cart.CartItems.Sum(z=> (long)(z.Quantity * z.Price * 100))
                         + (long)shippingPrice * 100
            };

            await service.UpdateAsync(cart.PaymentIntendId, intentConfig);
        }

        await cartService.SetCartAsync(cart);

        return cart;
    }
}