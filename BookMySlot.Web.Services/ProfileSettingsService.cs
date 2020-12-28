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

        public async Task<Response<bool>> DeleteProfileSettings(string email)
        {
            return await this.customerClient.DeleteCustomer(email);
        }

        public async Task<Response<ProfileSettings>> GetProfileSettings(string email)
        {
            return await this.customerClient.GetCustomerByEmail(email);
        }

        public async Task<Response<string>> SaveProfileSettings(ProfileSettings profileSettings)
        {
            return await this.customerClient.CreateCustomer(profileSettings);
        }

        public async Task<Response<bool>> UpdateProfileSettings(ProfileSettings profileSettings)
        {
            return await this.customerClient.UpdateCustomer(profileSettings);
        }
    }
}
