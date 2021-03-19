import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() {

  }

  private countries: string[] = ['Andorra', 'United Arab Emirates', 'Afghanistan', 'Antigua & Barbuda', 'Anguilla', 'Albania',
    'Armenia', 'Angola', 'Antarctica', 'Argentina', 'Samoa (American)', 'Austria', 'Australia', 'Aruba', 'Åland Islands',
    'Azerbaijan', 'Bosnia & Herzegovina', 'Barbados', 'Bangladesh', 'Belgium', 'Burkina Faso', 'Bulgaria', 'Bahrain',
    'Burundi', 'Benin', 'St Barthelemy', 'Bermuda', 'Brunei', 'Bolivia', 'Caribbean NL', 'Brazil', 'Bahamas', 'Bhutan',
    'Botswana', 'Belarus', 'Belize', 'Canada', 'Cocos (Keeling) Islands', 'Congo (Dem. Rep.)', 'Central African Rep.',
    'Congo (Rep.)', 'Switzerland', 'Cook Islands', 'Chile', 'Cameroon', 'China', 'Colombia', 'Costa Rica', 'Cuba', 'Cape Verde',
    'Curaçao', 'Christmas Island', 'Cyprus', 'Czech Republic', 'Germany', 'Djibouti', 'Denmark', 'Dominica',
    'Dominican Republic', 'Algeria', 'Ecuador', 'Estonia', 'Egypt', 'Western Sahara', 'Eritrea', 'Spain', 'Ethiopia',
    'Finland', 'Fiji', 'Falkland Islands', 'Micronesia', 'Faroe Islands', 'France', 'Gabon', 'Britain(UK)', 'Grenada',
    'Georgia', 'French Guiana', 'Guernsey', 'Ghana', 'Gibraltar', 'Greenland', 'Gambia', 'Guinea', 'Guadeloupe',
    'Equatorial Guinea', 'Greece', 'South Georgia & the South Sandwich Islands', 'Guatemala', 'Guam', 'Guinea - Bissau',
    'Guyana', 'Hong Kong', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'Ireland', 'Israel', 'Isle of Man',
    'India', 'British Indian Ocean Territory', 'Iraq', 'Iran', 'Iceland', 'Italy', 'Jersey', 'Jamaica', 'Jordan', 'Japan',
    'Kenya', 'Kyrgyzstan', 'Cambodia', 'Kiribati', 'Comoros', 'St Kitts & Nevis', 'Korea(North)', 'Korea(South)', 'Kuwait',
    'Cayman Islands', 'Kazakhstan', 'Laos', 'Lebanon', 'St Lucia', 'Liechtenstein', 'Sri Lanka', 'Liberia', 'Lesotho',
    'Lithuania', 'Luxembourg', 'Latvia', 'Libya', 'Morocco', 'Monaco', 'Moldova', 'Montenegro', 'St Martin(French)',
    'Madagascar', 'Marshall Islands', 'North Macedonia', 'Mali', 'Myanmar(Burma)', 'Mongolia', 'Macau',
    'Northern Mariana Islands', 'Martinique', 'Mauritania', 'Montserrat', 'Malta', 'Mauritius', 'Maldives',
    'Malawi', 'Mexico', 'Malaysia', 'Mozambique', 'Namibia', 'New Caledonia', 'Niger', 'Norfolk Island', 'Nigeria',
    'Nicaragua', 'Netherlands', 'Norway', 'Nepal', 'Nauru', 'Niue', 'New Zealand', 'Oman', 'Panama', 'Peru',
    'French Polynesia', 'Papua New Guinea', 'Philippines', 'Pakistan', 'Poland', 'St Pierre & Miquelon', 'Pitcairn',
    'Puerto Rico', 'Palestine', 'Portugal', 'Palau', 'Paraguay', 'Qatar', 'Réunion', 'Romania', 'Serbia', 'Russia',
    'Ukraine', 'Rwanda', 'Saudi Arabia', 'Solomon Islands', 'Seychelles', 'Sudan', 'Sweden', 'Singapore', 'St Helena',
    'Slovenia', 'Svalbard & Jan Mayen', 'Slovakia', 'Sierra Leone', 'San Marino', 'Senegal', 'Somalia', 'Suriname',
    'South Sudan', 'Sao Tome & Principe', 'El Salvador', 'St Maarten(Dutch)', 'Syria', 'Eswatini(Swaziland)',
    'Turks & Caicos Is', 'Chad', 'French Southern & Antarctic Lands', 'Togo', 'Thailand', 'Tajikistan', 'Tokelau',
    'East Timor', 'Turkmenistan', 'Tunisia', 'Tonga', 'Turkey', 'Trinidad & Tobago', 'Tuvalu', 'Taiwan', 'Tanzania',
    'Uganda', 'US minor outlying islands', 'United States', 'Uruguay', 'Uzbekistan', 'Vatican City', 'St Vincent',
    'Venezuela', 'Virgin Islands(UK)', 'Virgin Islands(US)', 'Vietnam', 'Vanuatu', 'Wallis & Futuna', 'Samoa(western)',
    'Yemen', 'Mayotte', 'South Africa', 'Zambia', 'Zimbabwe'];

  public getCountries(): string[] {
    return this.countries;
  }
 
}
