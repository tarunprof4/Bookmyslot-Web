using BookMySlot.Web.Contracts.Interfaces;
using BookMySlot.Web.Services;
using BookMySlot.Web.Services.Adaptors;
using BookMySlot.Web.Services.Adaptors.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Clients;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Interfaces;
using BookyMySlot.Web.Business;
using Microsoft.Extensions.DependencyInjection;

namespace BookMySlot.Web.Injections
{
    public class ProfileSettingsInjections
    {
        public static void WebInjections(IServiceCollection services)
        {
            services.AddTransient<IProfileSettingsBusiness, ProfileSettingsBusiness>();
            services.AddTransient<IProfileSettingsService, ProfileSettingsService>();

            services.AddScoped<ICustomerClient, CustomerClient>();
            services.AddScoped<IProfileSettingsAdaptor, ProfileSettingsAdaptor>();
        }
    }
}
