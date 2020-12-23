using BookMySlot.Web.Contracts.Interfaces;
using BookMySlot.Web.Services;
using BookyMySlot.Web.Business;
using Microsoft.Extensions.DependencyInjection;

namespace BookMySlot.Web.Injections
{
    public class Injections
    {
        public static void WebInjections(IServiceCollection services)
        {
            services.AddTransient<IProfileSettingsBusiness, ProfileSettingsBusiness>();
            services.AddTransient<IProfileSettingsService, ProfileSettingsService>();
        }
    }
}
