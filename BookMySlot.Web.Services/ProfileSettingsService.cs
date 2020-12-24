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
            //HttpResponseMessage response = await client.GetAsync(customerApi);
            //if (response.IsSuccessStatusCode)
            //{
            //    var profileSetting = await response.Content.ReadAsAsync<ProfileSettings>();
            //    return new Response<ProfileSettings>() { Result = profileSetting };
            //}
            //return null;
            var profileSettingsResponse = new Response<ProfileSettings>();
            var profileSettings = new ProfileSettings();
            profileSettings.FirstName = "TAF";
            profileSettings.MiddleName = "TAM";
            profileSettings.LastName = "TAL";
            profileSettings.Gender = "Female";
            profileSettings.Email = "a@gmail.com";
            profileSettingsResponse.Result = profileSettings;

            return await Task.FromResult<Response<ProfileSettings>>(profileSettingsResponse);
        }

        public async Task<Response<string>> SaveProfileSettings(ProfileSettings profileSettings)
        {
            var profileSettingsResponse = new Response<string>();
            profileSettingsResponse.Result = "a@gmail.com";
            return await Task.FromResult<Response<string>>(profileSettingsResponse);
        }

        public async Task<Response<bool>> UpdateProfileSettings(ProfileSettings profileSettings)
        {
            var profileSettingsResponse = new Response<bool>();
            profileSettingsResponse.Result = true;
            return await Task.FromResult<Response<bool>>(profileSettingsResponse);
        }
    }
}
