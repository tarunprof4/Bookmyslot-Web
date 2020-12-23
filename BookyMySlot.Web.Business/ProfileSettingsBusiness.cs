using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Contracts.Interfaces;
using System;
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

        public async Task<Response<ProfileSettings>> GetProfileSettings(string email)
        {
            return await this.profileSettingsService.GetProfileSettings(email);
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
