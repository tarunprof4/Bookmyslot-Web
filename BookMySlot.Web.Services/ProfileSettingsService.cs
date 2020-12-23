using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Contracts.Interfaces;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace BookMySlot.Web.Services
{
    public class ProfileSettingsService : IProfileSettingsService
    {
        private readonly HttpClient client = new HttpClient();
        private readonly string customerApi = "api/customer/a@gmail.com";
        public ProfileSettingsService()
        {
            client.BaseAddress = new Uri("https://localhost:44364/");
        }

        public async Task<Response<ProfileSettings>> GetProfileSettings(string email)
        {
            HttpResponseMessage response = await client.GetAsync(customerApi);
            if (response.IsSuccessStatusCode)
            {
                var profileSetting = await response.Content.ReadAsAsync<ProfileSettings>();
                return new Response<ProfileSettings>() { Result = profileSetting };
            }
            return null;
        }

        public Task<Response<string>> SaveProfileSettings(ProfileSettings profileSettings)
        {
            throw new NotImplementedException();
        }

        public Task<Response<bool>> UpdateProfileSettings(ProfileSettings profileSettings)
        {
            throw new NotImplementedException();
        }
    }
}
