using BookMySlot.Web.Common.Contracts;
using System.Threading.Tasks;

namespace BookMySlot.Web.Contracts.Interfaces
{
    public interface IProfileSettingsBusiness
    {
        Task<Response<ProfileSettings>> GetProfileSettings(string email);
        Task<Response<string>> SaveProfileSettings(ProfileSettings profileSettings);
        Task<Response<bool>> UpdateProfileSettings(ProfileSettings profileSettings);

        Task<Response<bool>> DeleteProfileSettings(string email);
    }
}
