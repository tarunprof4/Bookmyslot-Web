import { Injectable, OnInit } from '@angular/core';
import { DelimiterConstants } from '../shared/constants/delimiter-constants';
import { CountryTimeZone } from '../shared/country-timezone';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor() { }
  private countryWithTimeZones = ['Andorra::Europe/Andorra', 'United Arab Emirates::Asia/Dubai', 'Afghanistan::Asia/Kabul', 'Antigua & Barbuda::America/Antigua', 'Anguilla::America/Anguilla', 'Albania::Europe/Tirane', 'Armenia::Asia/Yerevan', 'Angola::Africa/Luanda', 'Antarctica::Antarctica/McMurdo', 'Antarctica::Antarctica/Casey', 'Antarctica::Antarctica/Davis', 'Antarctica::Antarctica/DumontDUrville', 'Antarctica::Antarctica/Mawson', 'Antarctica::Antarctica/Palmer', 'Antarctica::Antarctica/Rothera', 'Antarctica::Antarctica/Syowa', 'Antarctica::Antarctica/Troll', 'Antarctica::Antarctica/Vostok', 'Argentina::America/Argentina/Buenos_Aires', 'Argentina::America/Argentina/Cordoba', 'Argentina::America/Argentina/Salta', 'Argentina::America/Argentina/Jujuy', 'Argentina::America/Argentina/Tucuman', 'Argentina::America/Argentina/Catamarca', 'Argentina::America/Argentina/La_Rioja', 'Argentina::America/Argentina/San_Juan', 'Argentina::America/Argentina/Mendoza', 'Argentina::America/Argentina/San_Luis', 'Argentina::America/Argentina/Rio_Gallegos', 'Argentina::America/Argentina/Ushuaia', 'Samoa (American)::Pacific/Pago_Pago', 'Austria::Europe/Vienna', 'Australia::Australia/Lord_Howe', 'Australia::Antarctica/Macquarie', 'Australia::Australia/Hobart', 'Australia::Australia/Melbourne', 'Australia::Australia/Sydney', 'Australia::Australia/Broken_Hill', 'Australia::Australia/Brisbane', 'Australia::Australia/Lindeman', 'Australia::Australia/Adelaide', 'Australia::Australia/Darwin', 'Australia::Australia/Perth', 'Australia::Australia/Eucla', 'Aruba::America/Aruba', 'Åland Islands::Europe/Mariehamn', 'Azerbaijan::Asia/Baku', 'Bosnia & Herzegovina::Europe/Sarajevo', 'Barbados::America/Barbados', 'Bangladesh::Asia/Dhaka', 'Belgium::Europe/Brussels', 'Burkina Faso::Africa/Ouagadougou', 'Bulgaria::Europe/Sofia', 'Bahrain::Asia/Bahrain', 'Burundi::Africa/Bujumbura', 'Benin::Africa/Porto-Novo', 'St Barthelemy::America/St_Barthelemy', 'Bermuda::Atlantic/Bermuda', 'Brunei::Asia/Brunei', 'Bolivia::America/La_Paz', 'Caribbean NL::America/Kralendijk', 'Brazil::America/Noronha', 'Brazil::America/Belem', 'Brazil::America/Fortaleza', 'Brazil::America/Recife', 'Brazil::America/Araguaina', 'Brazil::America/Maceio', 'Brazil::America/Bahia', 'Brazil::America/Sao_Paulo', 'Brazil::America/Campo_Grande', 'Brazil::America/Cuiaba', 'Brazil::America/Santarem', 'Brazil::America/Porto_Velho', 'Brazil::America/Boa_Vista', 'Brazil::America/Manaus', 'Brazil::America/Eirunepe', 'Brazil::America/Rio_Branco', 'Bahamas::America/Nassau', 'Bhutan::Asia/Thimphu', 'Botswana::Africa/Gaborone', 'Belarus::Europe/Minsk', 'Belize::America/Belize', 'Canada::America/St_Johns', 'Canada::America/Halifax', 'Canada::America/Glace_Bay', 'Canada::America/Moncton', 'Canada::America/Goose_Bay', 'Canada::America/Blanc-Sablon', 'Canada::America/Toronto', 'Canada::America/Nipigon', 'Canada::America/Thunder_Bay', 'Canada::America/Iqaluit', 'Canada::America/Pangnirtung', 'Canada::America/Atikokan', 'Canada::America/Winnipeg', 'Canada::America/Rainy_River', 'Canada::America/Resolute', 'Canada::America/Rankin_Inlet', 'Canada::America/Regina', 'Canada::America/Swift_Current', 'Canada::America/Edmonton', 'Canada::America/Cambridge_Bay', 'Canada::America/Yellowknife', 'Canada::America/Inuvik', 'Canada::America/Creston', 'Canada::America/Dawson_Creek', 'Canada::America/Fort_Nelson', 'Canada::America/Whitehorse', 'Canada::America/Dawson', 'Canada::America/Vancouver', 'Cocos (Keeling) Islands::Indian/Cocos', 'Congo (Dem. Rep.)::Africa/Kinshasa', 'Congo (Dem. Rep.)::Africa/Lubumbashi', 'Central African Rep.::Africa/Bangui', 'Congo (Rep.)::Africa/Brazzaville', 'Switzerland::Europe/Zurich', 'Cook Islands::Pacific/Rarotonga', 'Chile::America/Santiago', 'Chile::America/Punta_Arenas', 'Chile::Pacific/Easter', 'Cameroon::Africa/Douala', 'China::Asia/Shanghai', 'China::Asia/Urumqi', 'Colombia::America/Bogota', 'Costa Rica::America/Costa_Rica', 'Cuba::America/Havana', 'Cape Verde::Atlantic/Cape_Verde', 'Curaçao::America/Curacao', 'Christmas Island::Indian/Christmas', 'Cyprus::Asia/Nicosia', 'Cyprus::Asia/Famagusta', 'Czech Republic::Europe/Prague', 'Germany::Europe/Berlin', 'Germany::Europe/Busingen', 'Djibouti::Africa/Djibouti', 'Denmark::Europe/Copenhagen', 'Dominica::America/Dominica', 'Dominican Republic::America/Santo_Domingo', 'Algeria::Africa/Algiers', 'Ecuador::America/Guayaquil', 'Ecuador::Pacific/Galapagos', 'Estonia::Europe/Tallinn', 'Egypt::Africa/Cairo', 'Western Sahara::Africa/El_Aaiun', 'Eritrea::Africa/Asmara', 'Spain::Europe/Madrid', 'Spain::Africa/Ceuta', 'Spain::Atlantic/Canary', 'Ethiopia::Africa/Addis_Ababa', 'Finland::Europe/Helsinki', 'Fiji::Pacific/Fiji', 'Falkland Islands::Atlantic/Stanley', 'Micronesia::Pacific/Chuuk', 'Micronesia::Pacific/Pohnpei', 'Micronesia::Pacific/Kosrae', 'Faroe Islands::Atlantic/Faroe', 'France::Europe/Paris', 'Gabon::Africa/Libreville', 'Britain (UK)::Europe/London', 'Grenada::America/Grenada', 'Georgia::Asia/Tbilisi', 'French Guiana::America/Cayenne', 'Guernsey::Europe/Guernsey', 'Ghana::Africa/Accra', 'Gibraltar::Europe/Gibraltar', 'Greenland::America/Nuuk', 'Greenland::America/Danmarkshavn', 'Greenland::America/Scoresbysund', 'Greenland::America/Thule', 'Gambia::Africa/Banjul', 'Guinea::Africa/Conakry', 'Guadeloupe::America/Guadeloupe', 'Equatorial Guinea::Africa/Malabo', 'Greece::Europe/Athens', 'South Georgia & the South Sandwich Islands::Atlantic/South_Georgia', 'Guatemala::America/Guatemala', 'Guam::Pacific/Guam', 'Guinea-Bissau::Africa/Bissau', 'Guyana::America/Guyana', 'Hong Kong::Asia/Hong_Kong', 'Honduras::America/Tegucigalpa', 'Croatia::Europe/Zagreb', 'Haiti::America/Port-au-Prince', 'Hungary::Europe/Budapest', 'Indonesia::Asia/Jakarta', 'Indonesia::Asia/Pontianak', 'Indonesia::Asia/Makassar', 'Indonesia::Asia/Jayapura', 'Ireland::Europe/Dublin', 'Israel::Asia/Jerusalem', 'Isle of Man::Europe/Isle_of_Man', 'India::Asia/Kolkata', 'British Indian Ocean Territory::Indian/Chagos', 'Iraq::Asia/Baghdad', 'Iran::Asia/Tehran', 'Iceland::Atlantic/Reykjavik', 'Italy::Europe/Rome', 'Jersey::Europe/Jersey', 'Jamaica::America/Jamaica', 'Jordan::Asia/Amman', 'Japan::Asia/Tokyo', 'Kenya::Africa/Nairobi', 'Kyrgyzstan::Asia/Bishkek', 'Cambodia::Asia/Phnom_Penh', 'Kiribati::Pacific/Tarawa', 'Kiribati::Pacific/Enderbury', 'Kiribati::Pacific/Kiritimati', 'Comoros::Indian/Comoro', 'St Kitts & Nevis::America/St_Kitts', 'Korea (North)::Asia/Pyongyang', 'Korea (South)::Asia/Seoul', 'Kuwait::Asia/Kuwait', 'Cayman Islands::America/Cayman', 'Kazakhstan::Asia/Almaty', 'Kazakhstan::Asia/Qyzylorda', 'Kazakhstan::Asia/Qostanay', 'Kazakhstan::Asia/Aqtobe', 'Kazakhstan::Asia/Aqtau', 'Kazakhstan::Asia/Atyrau', 'Kazakhstan::Asia/Oral', 'Laos::Asia/Vientiane', 'Lebanon::Asia/Beirut', 'St Lucia::America/St_Lucia', 'Liechtenstein::Europe/Vaduz', 'Sri Lanka::Asia/Colombo', 'Liberia::Africa/Monrovia', 'Lesotho::Africa/Maseru', 'Lithuania::Europe/Vilnius', 'Luxembourg::Europe/Luxembourg', 'Latvia::Europe/Riga', 'Libya::Africa/Tripoli', 'Morocco::Africa/Casablanca', 'Monaco::Europe/Monaco', 'Moldova::Europe/Chisinau', 'Montenegro::Europe/Podgorica', 'St Martin (French)::America/Marigot', 'Madagascar::Indian/Antananarivo', 'Marshall Islands::Pacific/Majuro', 'Marshall Islands::Pacific/Kwajalein', 'North Macedonia::Europe/Skopje', 'Mali::Africa/Bamako', 'Myanmar (Burma)::Asia/Yangon', 'Mongolia::Asia/Ulaanbaatar', 'Mongolia::Asia/Hovd', 'Mongolia::Asia/Choibalsan', 'Macau::Asia/Macau', 'Northern Mariana Islands::Pacific/Saipan', 'Martinique::America/Martinique', 'Mauritania::Africa/Nouakchott', 'Montserrat::America/Montserrat', 'Malta::Europe/Malta', 'Mauritius::Indian/Mauritius', 'Maldives::Indian/Maldives', 'Malawi::Africa/Blantyre', 'Mexico::America/Mexico_City', 'Mexico::America/Cancun', 'Mexico::America/Merida', 'Mexico::America/Monterrey', 'Mexico::America/Matamoros', 'Mexico::America/Mazatlan', 'Mexico::America/Chihuahua', 'Mexico::America/Ojinaga', 'Mexico::America/Hermosillo', 'Mexico::America/Tijuana', 'Mexico::America/Bahia_Banderas', 'Malaysia::Asia/Kuala_Lumpur', 'Malaysia::Asia/Kuching', 'Mozambique::Africa/Maputo', 'Namibia::Africa/Windhoek', 'New Caledonia::Pacific/Noumea', 'Niger::Africa/Niamey', 'Norfolk Island::Pacific/Norfolk', 'Nigeria::Africa/Lagos', 'Nicaragua::America/Managua', 'Netherlands::Europe/Amsterdam', 'Norway::Europe/Oslo', 'Nepal::Asia/Kathmandu', 'Nauru::Pacific/Nauru', 'Niue::Pacific/Niue', 'New Zealand::Pacific/Auckland', 'New Zealand::Pacific/Chatham', 'Oman::Asia/Muscat', 'Panama::America/Panama', 'Peru::America/Lima', 'French Polynesia::Pacific/Tahiti', 'French Polynesia::Pacific/Marquesas', 'French Polynesia::Pacific/Gambier', 'Papua New Guinea::Pacific/Port_Moresby', 'Papua New Guinea::Pacific/Bougainville', 'Philippines::Asia/Manila', 'Pakistan::Asia/Karachi', 'Poland::Europe/Warsaw', 'St Pierre & Miquelon::America/Miquelon', 'Pitcairn::Pacific/Pitcairn', 'Puerto Rico::America/Puerto_Rico', 'Palestine::Asia/Gaza', 'Palestine::Asia/Hebron', 'Portugal::Europe/Lisbon', 'Portugal::Atlantic/Madeira', 'Portugal::Atlantic/Azores', 'Palau::Pacific/Palau', 'Paraguay::America/Asuncion', 'Qatar::Asia/Qatar', 'Réunion::Indian/Reunion', 'Romania::Europe/Bucharest', 'Serbia::Europe/Belgrade', 'Russia::Europe/Kaliningrad', 'Russia::Europe/Moscow', 'Ukraine::Europe/Simferopol', 'Russia::Europe/Kirov', 'Russia::Europe/Volgograd', 'Russia::Europe/Astrakhan', 'Russia::Europe/Saratov', 'Russia::Europe/Ulyanovsk', 'Russia::Europe/Samara', 'Russia::Asia/Yekaterinburg', 'Russia::Asia/Omsk', 'Russia::Asia/Novosibirsk', 'Russia::Asia/Barnaul', 'Russia::Asia/Tomsk', 'Russia::Asia/Novokuznetsk', 'Russia::Asia/Krasnoyarsk', 'Russia::Asia/Irkutsk', 'Russia::Asia/Chita', 'Russia::Asia/Yakutsk', 'Russia::Asia/Khandyga', 'Russia::Asia/Vladivostok', 'Russia::Asia/Ust-Nera', 'Russia::Asia/Magadan', 'Russia::Asia/Sakhalin', 'Russia::Asia/Srednekolymsk', 'Russia::Asia/Kamchatka', 'Russia::Asia/Anadyr', 'Rwanda::Africa/Kigali', 'Saudi Arabia::Asia/Riyadh', 'Solomon Islands::Pacific/Guadalcanal', 'Seychelles::Indian/Mahe', 'Sudan::Africa/Khartoum', 'Sweden::Europe/Stockholm', 'Singapore::Asia/Singapore', 'St Helena::Atlantic/St_Helena', 'Slovenia::Europe/Ljubljana', 'Svalbard & Jan Mayen::Arctic/Longyearbyen', 'Slovakia::Europe/Bratislava', 'Sierra Leone::Africa/Freetown', 'San Marino::Europe/San_Marino', 'Senegal::Africa/Dakar', 'Somalia::Africa/Mogadishu', 'Suriname::America/Paramaribo', 'South Sudan::Africa/Juba', 'Sao Tome & Principe::Africa/Sao_Tome', 'El Salvador::America/El_Salvador', 'St Maarten (Dutch)::America/Lower_Princes', 'Syria::Asia/Damascus', 'Eswatini (Swaziland)::Africa/Mbabane', 'Turks & Caicos Is::America/Grand_Turk', 'Chad::Africa/Ndjamena', 'French Southern & Antarctic Lands::Indian/Kerguelen', 'Togo::Africa/Lome', 'Thailand::Asia/Bangkok', 'Tajikistan::Asia/Dushanbe', 'Tokelau::Pacific/Fakaofo', 'East Timor::Asia/Dili', 'Turkmenistan::Asia/Ashgabat', 'Tunisia::Africa/Tunis', 'Tonga::Pacific/Tongatapu', 'Turkey::Europe/Istanbul', 'Trinidad & Tobago::America/Port_of_Spain', 'Tuvalu::Pacific/Funafuti', 'Taiwan::Asia/Taipei', 'Tanzania::Africa/Dar_es_Salaam', 'Ukraine::Europe/Kiev', 'Ukraine::Europe/Uzhgorod', 'Ukraine::Europe/Zaporozhye', 'Uganda::Africa/Kampala', 'US minor outlying islands::Pacific/Midway', 'US minor outlying islands::Pacific/Wake', 'United States::America/New_York', 'United States::America/Detroit', 'United States::America/Kentucky/Louisville', 'United States::America/Kentucky/Monticello', 'United States::America/Indiana/Indianapolis', 'United States::America/Indiana/Vincennes', 'United States::America/Indiana/Winamac', 'United States::America/Indiana/Marengo', 'United States::America/Indiana/Petersburg', 'United States::America/Indiana/Vevay', 'United States::America/Chicago', 'United States::America/Indiana/Tell_City', 'United States::America/Indiana/Knox', 'United States::America/Menominee', 'United States::America/North_Dakota/Center', 'United States::America/North_Dakota/New_Salem', 'United States::America/North_Dakota/Beulah', 'United States::America/Denver', 'United States::America/Boise', 'United States::America/Phoenix', 'United States::America/Los_Angeles', 'United States::America/Anchorage', 'United States::America/Juneau', 'United States::America/Sitka', 'United States::America/Metlakatla', 'United States::America/Yakutat', 'United States::America/Nome', 'United States::America/Adak', 'United States::Pacific/Honolulu', 'Uruguay::America/Montevideo', 'Uzbekistan::Asia/Samarkand', 'Uzbekistan::Asia/Tashkent', 'Vatican City::Europe/Vatican', 'St Vincent::America/St_Vincent', 'Venezuela::America/Caracas', 'Virgin Islands (UK)::America/Tortola', 'Virgin Islands (US)::America/St_Thomas', 'Vietnam::Asia/Ho_Chi_Minh', 'Vanuatu::Pacific/Efate', 'Wallis & Futuna::Pacific/Wallis', 'Samoa (western)::Pacific/Apia', 'Yemen::Asia/Aden', 'Mayotte::Indian/Mayotte', 'South Africa::Africa/Johannesburg', 'Zambia::Africa/Lusaka', 'Zimbabwe::Africa/Harare'];
  private countryTimeZones: CountryTimeZone[] = [];



  public getCountryTimeZones(): CountryTimeZone[] {
    if (this.countryTimeZones.length == 0) {
      this.initCountryTimeZone();
    }
    return this.countryTimeZones;
  }


  private initCountryTimeZone(): void {
    for (let countryWithTimeZone of this.countryWithTimeZones) {
      var arr = countryWithTimeZone.split(DelimiterConstants.CountryWithTimeZone);
      console.log(countryWithTimeZone);
      let countryName = arr[0];
      let timeZone = arr[1];
      let countryTimeZone = new CountryTimeZone();
      countryTimeZone.countryName = countryName;
      countryTimeZone.timeZone = timeZone;

      this.countryTimeZones.push(countryTimeZone);
    }
  }


}
