using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Common.Contracts.Constants;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Services.Adaptors.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Models;
using Marvin.StreamExtensions;
using Newtonsoft.Json;
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
        private readonly IProfileSettingsRequestAdaptor profileSettingsRequestAdaptor;
        private readonly IProfileSettingsResponseAdaptor profileSettingsResponseAdaptor;
        private readonly CancellationTokenSource cancellationTokenSource =
            new CancellationTokenSource();


        public CustomerClient(IHttpClientFactory httpClientFactory, IProfileSettingsRequestAdaptor profileSettingsRequestAdaptor, IProfileSettingsResponseAdaptor profileSettingsResponseAdaptor)
        {
            this.httpClientFactory = httpClientFactory;
            this.profileSettingsRequestAdaptor = profileSettingsRequestAdaptor;
            this.profileSettingsResponseAdaptor = profileSettingsResponseAdaptor;
        }



        public async Task<Response<string>> CreateCustomer(ProfileSettings profileSettings)
        {
            var httpClient = httpClientFactory.CreateClient(ApiClient.CustomerApiClient);

            var serializedProfileSetting = JsonConvert.SerializeObject(this.profileSettingsRequestAdaptor.GetCustomerModel(profileSettings));
            using (var request = new HttpRequestMessage(HttpMethod.Post, string.Empty))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Content = new StringContent(serializedProfileSetting);
                request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                using (var response = await httpClient.SendAsync(request,
                        HttpCompletionOption.ResponseHeadersRead,
                        cancellationTokenSource.Token))
                {
                    if (!response.IsSuccessStatusCode)
                    {
                        var errorStream = await response.Content.ReadAsStreamAsync();
                        var errors = errorStream.ReadAndDeserializeFromJson<List<string>>();

                        if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                        {
                            return Response<string>.ValidationError(errors);
                        }

                        else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                        {
                            return Response<string>.Failed(errors);
                        }
                    }

                    var stream = await response.Content.ReadAsStreamAsync();
                    var profileEmail = stream.ReadAndDeserializeFromJson<string>();
                    return new Response<string>() { Result = profileEmail };
                }
            }
        }

        public async Task<Response<bool>> DeleteCustomer(string email)
        {
            var httpClient = httpClientFactory.CreateClient(ApiClient.CustomerApiClient);

            using (var request = new HttpRequestMessage(HttpMethod.Delete, email))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                

                using (var response = await httpClient.SendAsync(request,
                        HttpCompletionOption.ResponseHeadersRead,
                        cancellationTokenSource.Token))
                {
                    if (!response.IsSuccessStatusCode)
                    {
                        var errorStream = await response.Content.ReadAsStreamAsync();
                        var errors = errorStream.ReadAndDeserializeFromJson<List<string>>();

                        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                        {
                            return Response<bool>.Empty(errors);
                        }

                        else if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                        {
                            return Response<bool>.ValidationError(errors);
                        }

                        else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                        {
                            return Response<bool>.Failed(errors);
                        }
                    }

                    var stream = await response.Content.ReadAsStreamAsync();
                    var profileEmail = stream.ReadAndDeserializeFromJson<string>();
                    return new Response<bool>() { Result = true };
                }
            }
        }

        public async Task<Response<ProfileSettings>> GetCustomerByEmail(string email)
        {
            var httpClient = httpClientFactory.CreateClient(ApiClient.CustomerApiClient);
            var request = new HttpRequestMessage(HttpMethod.Get, email);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            using (var response = await httpClient.SendAsync(request,
                HttpCompletionOption.ResponseHeadersRead,
                cancellationTokenSource.Token))
            {
                if (!response.IsSuccessStatusCode)
                {
                    var errorStream = await response.Content.ReadAsStreamAsync();
                    var errors = errorStream.ReadAndDeserializeFromJson<List<string>>();

                    if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                       return Response<ProfileSettings>.Empty(errors);
                    }

                    else if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                    {
                        return Response<ProfileSettings>.ValidationError(errors);
                    }

                    else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                    {
                        return Response<ProfileSettings>.Failed(errors);
                    }
                }

                var stream = await response.Content.ReadAsStreamAsync();
                var customerModel = stream.ReadAndDeserializeFromJson<CustomerModel>();

                var profileSetting = this.profileSettingsResponseAdaptor.GetProfileSettings(customerModel);
                return new Response<ProfileSettings>() { Result = profileSetting };
            }

        }


        public async Task<Response<bool>> UpdateCustomer(ProfileSettings profileSettings)
        {
            var httpClient = httpClientFactory.CreateClient(ApiClient.CustomerApiClient);

            var serializedProfileSetting = JsonConvert.SerializeObject(profileSettings);
            using (var request = new HttpRequestMessage(HttpMethod.Put, string.Empty))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                
                request.Content = new StringContent(serializedProfileSetting);
                request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                using (var response = await httpClient.SendAsync(request,
                        HttpCompletionOption.ResponseHeadersRead,
                        cancellationTokenSource.Token))
                {
                    if (!response.IsSuccessStatusCode)
                    {
                        var errorStream = await response.Content.ReadAsStreamAsync();
                        var errors = errorStream.ReadAndDeserializeFromJson<List<string>>();

                        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                        {
                            return Response<bool>.Empty(errors);
                        }

                        else if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                        {
                            return Response<bool>.ValidationError(errors);
                        }

                        else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                        {
                            return Response<bool>.Failed(errors);
                        }
                    }

                    var stream = await response.Content.ReadAsStreamAsync();
                    var profileEmail = stream.ReadAndDeserializeFromJson<string>();
                    return new Response<bool>() { Result = true };
                }
            }
        }
    }
}
