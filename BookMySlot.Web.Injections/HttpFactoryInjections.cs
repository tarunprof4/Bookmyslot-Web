using BookMySlot.Web.Common.Contracts.Constants;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookMySlot.Web.Injections
{
    public class HttpFactoryInjections
    {
        public static void WebInjections(IServiceCollection services, Dictionary<string, string> appConfigurations)
        {
            services.AddHttpClient();

            services.AddHttpClient(ApiClient.CustomerApiClient, client =>
            {
                client.BaseAddress = new Uri(appConfigurations[AppConfigurations.CustomerApiUrl]);
                client.Timeout = new TimeSpan(0, 0, 30);
                client.DefaultRequestHeaders.Clear();
            });
        }
    }
}
