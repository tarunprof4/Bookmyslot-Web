using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Contracts.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Interfaces;
using System.Threading.Tasks;

namespace BookMySlot.Web.Services
{
    public class ProfileSettingsService : IProfileSettingsService
    {
        private readonly ICustomerClient customerClient;
        public ProfileSettingsService(ICustomerClient customerClient)
        {
            this.customerClient = customerClient;
        }

        public async Task<Response<ProfileSettings>> GetProfileSettings(string email)
        {
            await this.customerClient.GetCustomerByEmail("a@gmail.com");

            return await Task.FromResult<Response<ProfileSettings>>(null);
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
