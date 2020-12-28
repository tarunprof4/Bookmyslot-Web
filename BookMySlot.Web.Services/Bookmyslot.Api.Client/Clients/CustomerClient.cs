using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Common.Contracts.Constants;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Services.Adaptors.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Models;
using Marvin.StreamExtensions;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BookMySlot.Web.Services.Bookmyslot.Api.Client.Clients
{
    public class CustomerClient : ICustomerClient
    {
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IProfileSettingsAdaptor profileSettingsAdaptor;
        private readonly CancellationTokenSource cancellationTokenSource =
            new CancellationTokenSource();


        public CustomerClient(IHttpClientFactory httpClientFactory, IProfileSettingsAdaptor profileSettingsAdaptor)
        {
            this.httpClientFactory = httpClientFactory;
            this.profileSettingsAdaptor = profileSettingsAdaptor;
        }

        public async Task<Response<ProfileSettings>> GetCustomerByEmail(string email)
        {
            var httpClient = httpClientFactory.CreateClient(ApiClient.CustomerApiClient);
            var uri = "api/v1/customer/" + email;
            var request = new HttpRequestMessage(HttpMethod.Get, uri);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            using (var response = await httpClient.SendAsync(request,
                HttpCompletionOption.ResponseHeadersRead,
                cancellationTokenSource.Token))
            {
                if (!response.IsSuccessStatusCode)
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                    }

                    response.EnsureSuccessStatusCode();
                }

                var stream = await response.Content.ReadAsStreamAsync();
                response.EnsureSuccessStatusCode();
                var customerModel = stream.ReadAndDeserializeFromJson<CustomerModel>();

                var profileSetting = this.profileSettingsAdaptor.GetProfileSettings(customerModel);
            }

            return null;
        }

        public async Task<Response<IEnumerable<ProfileSettings>>> GetCustomers()
        {
            var httpClient = httpClientFactory.CreateClient("CustomerClient");

            var request = new HttpRequestMessage(HttpMethod.Get, "api/v1/customer");
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Headers.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));

            using (var response = await httpClient.SendAsync(request,
                HttpCompletionOption.ResponseHeadersRead,
                cancellationTokenSource.Token))
            {
                if (!response.IsSuccessStatusCode)
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                    }

                    response.EnsureSuccessStatusCode();
                }

                var stream = await response.Content.ReadAsStreamAsync();
                response.EnsureSuccessStatusCode();
                var movies = stream.ReadAndDeserializeFromJson<List<CustomerModel>>();
            }

            return null;
        }
    }
}
