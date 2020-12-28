using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Contracts.Interfaces;
using System.Threading.Tasks;

namespace BookyMySlot.Web.Business
{
    public class ProfileSettingsBusiness : IProfileSettingsBusiness
    {
        private readonly IProfileSettingsService profileSettingsService;
        public ProfileSettingsBusiness(IProfileSettingsService profileSettingsService)
        {
            this.profileSettingsService = profileSettingsService;
        }

        public async Task<Response<bool>> DeleteProfileSettings(string email)
        {
            return await this.profileSettingsService.DeleteProfileSettings(email);
        }

        public async Task<Response<ProfileSettings>> GetProfileSettings(string email)
        {
            return await this.profileSettingsService.GetProfileSettings(email);
        }

        public async Task<Response<string>> SaveProfileSettings(ProfileSettings profileSettings)
        {
            return await this.profileSettingsService.SaveProfileSettings(profileSettings);
        }

        public async Task<Response<bool>> UpdateProfileSettings(ProfileSettings profileSettings)
        {
            return await this.profileSettingsService.UpdateProfileSettings(profileSettings);
        }
    }
}
