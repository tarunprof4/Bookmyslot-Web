using Newtonsoft.Json;

namespace BookMySlot.Web.Contracts
{
    public class ProfileSettings
    {
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string Email { get; set; }
    }
}
