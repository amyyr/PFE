export interface League {
    league_key: number;
    league_name: string;
    country_key: number;
    country_name: string;
    league_logo: string | null;
    country_logo: string | null;
  }
  export const LEAGUES: League[] = [
    {
            "league_key": 4,
            "league_name": "UEFA Europa League",
            "country_key": 1,
            "country_name": "Eurocups",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/",
            "country_logo": null
        },
        {
            "league_key": 683,
            "league_name": "UEFA Conference League",
            "country_key": 1,
            "country_name": "Eurocups",
            "league_logo": null,
            "country_logo": null
        },
        {
            "league_key": 3,
            "league_name": "UEFA Champions League",
            "country_key": 1,
            "country_name": "Eurocups",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/3_uefa_champions_league.png",
            "country_logo": null
        },
        {
            "league_key": 152,
            "league_name": "Premier League",
            "country_key": 44,
            "country_name": "England",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/152_premier-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/44_england.png"
        },
        {
            "league_key": 302,
            "league_name": "La Liga",
            "country_key": 6,
            "country_name": "Spain",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/302_la-liga.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/6_spain.png"
        },
        {
            "league_key": 207,
            "league_name": "Serie A",
            "country_key": 5,
            "country_name": "Italy",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/207_serie-a.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/5_italy.png"
        },
        {
            "league_key": 175,
            "league_name": "Bundesliga",
            "country_key": 4,
            "country_name": "Germany",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/175_bundesliga.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/4_germany.png"
        },
        {
            "league_key": 168,
            "league_name": "Ligue 1",
            "country_key": 3,
            "country_name": "France",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/168_ligue-1.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/3_france.png"
        },
        {
            "league_key": 344,
            "league_name": "Premier League",
            "country_key": 95,
            "country_name": "Russia",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/344_premier-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/95_russia.png"
        },
        {
            "league_key": 266,
            "league_name": "Primeira Liga",
            "country_key": 92,
            "country_name": "Portugal",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/266_primeira-liga.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/92_portugal.png"
        },
        {
            "league_key": 63,
            "league_name": "First Division A",
            "country_key": 23,
            "country_name": "Belgium",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/63_first-division-a.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/23_belgium.png"
        },
        {
            "league_key": 244,
            "league_name": "Eredivisie",
            "country_key": 82,
            "country_name": "Netherlands",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/244_eredivisie.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/82_netherlands.png"
        },
        {
            "league_key": 332,
            "league_name": "MLS",
            "country_key": 114,
            "country_name": "USA",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/332_mls.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/114_usa.png"
        },
        {
            "league_key": 322,
            "league_name": "Süper Lig",
            "country_key": 111,
            "country_name": "Turkey",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/322_süper-lig.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/111_turkey.png"
        },
        {
            "league_key": 99,
            "league_name": "Serie A",
            "country_key": 27,
            "country_name": "Brazil",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/99_serie-a.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/27_brazil.png"
        },
        {
            "league_key": 279,
            "league_name": "Premiership",
            "country_key": 98,
            "country_name": "Scotland",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/279_premiership.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/98_scotland.png"
        },
        {
            "league_key": 56,
            "league_name": "Bundesliga",
            "country_key": 18,
            "country_name": "Austria",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/56_bundesliga.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/18_austria.png"
        },
        {
            "league_key": 325,
            "league_name": "Premier League",
            "country_key": 112,
            "country_name": "Ukraine",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/325_premier-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/112_ukraine.png"
        },
        {
            "league_key": 135,
            "league_name": "Superliga",
            "country_key": 40,
            "country_name": "Denmark",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/135_superliga.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/40_denmark.png"
        },
        {
            "league_key": 308,
            "league_name": "Super League",
            "country_key": 106,
            "country_name": "Switzerland",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/308_super-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/106_switzerland.png"
        },
        {
            "league_key": 127,
            "league_name": "First NL",
            "country_key": 37,
            "country_name": "Croatia",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/127_2.-hnl.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/37_croatia.png"
        },
        {
            "league_key": 178,
            "league_name": "Super League 1",
            "country_key": 51,
            "country_name": "Greece",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/178_super-league-1.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/51_greece.png"
        },
        {
            "league_key": 307,
            "league_name": "Allsvenskan",
            "country_key": 7,
            "country_name": "Sweden",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/307_allsvenskan.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/7_sweden.png"
        },
        {
            "league_key": 134,
            "league_name": "Czech Liga",
            "country_key": 39,
            "country_name": "Czech Republic",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/134_czech-liga.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/39_czech-republic.png"
        },
        {
            "league_key": 288,
            "league_name": "Super Liga",
            "country_key": 99,
            "country_name": "Serbia",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/288_super-liga.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/99_serbia.png"
        },
        {
            "league_key": 278,
            "league_name": "Saudi League",
            "country_key": 97,
            "country_name": "Saudi Arabia",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/278_pro-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/97_saudi-arabia.png"
        },
        {
            "league_key": 259,
            "league_name": "Ekstraklasa",
            "country_key": 91,
            "country_name": "Poland",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/259_ekstraklasa.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/91_poland.png"
        },
        {
            "league_key": 118,
            "league_name": "Chinese Super League",
            "country_key": 32,
            "country_name": "China",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/118_csl.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/32_china.png"
        },
    
        {
            "league_key": 209,
            "league_name": "J1 League",
            "country_key": 64,
            "country_name": "Japan",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/209_j1-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/64_japan.png"
        },
        {
            "league_key": 272,
            "league_name": "Liga I",
            "country_key": 94,
            "country_name": "Romania",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/272_liga-i.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/94_romania.png"
        },
        {
            "league_key": 269,
            "league_name": "Stars League",
            "country_key": 93,
            "country_name": "Qatar",
            "league_logo": null,
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/93_qatar.png"
        },
        {
            "league_key": 171,
            "league_name": "2. Bundesliga",
            "country_key": 4,
            "country_name": "Germany",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/171_2.-bundesliga.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/4_germany.png"
        },
    
        {
            "league_key": 164,
            "league_name": "Ligue 2",
            "country_key": 3,
            "country_name": "France",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/164_ligue-2.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/3_france.png"
        },
        {
            "league_key": 301,
            "league_name": "Segunda División",
            "country_key": 6,
            "country_name": "Spain",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/301_segunda-división.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/6_spain.png"
        },
    
        {
            "league_key": 206,
            "league_name": "Serie B",
            "country_key": 5,
            "country_name": "Italy",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/206_serie-b.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/5_italy.png"
        },
        {
            "league_key": 219,
            "league_name": "K League 1",
            "country_key": 68,
            "country_name": "Korea Republic",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/219_k-league-1.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/68_korea-republic.png"
        },
        {
            "league_key": 195,
            "league_name": "Persian Gulf Pro League",
            "country_key": 60,
            "country_name": "Iran",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/195_persian-gulf-pro-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/60_iran.png"
        },
        {
            "league_key": 328,
            "league_name": "Pro League",
            "country_key": 113,
            "country_name": "United Arab Emirates",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/328_arabian-gulf-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/113_united-arab-emirates.png"
        },
        {
            "league_key": 17,
            "league_name": "CONMEBOL Copa America",
            "country_key": 2,
            "country_name": "intl",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/17_copa-america.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/2_intl.png"
        },
    
        {
            "league_key": 29,
            "league_name": "CAF Africa Cup of Nations",
            "country_key": 2,
            "country_name": "intl",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/29_africa-cup-of-nations-qualification.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/2_intl.png"
        },
    
        {
            "league_key": 75,
            "league_name": "Serie B",
            "country_key": 27,
            "country_name": "Brazil",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/75_serie-b.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/27_brazil.png"
        },
    
        {
            "league_key": 145,
            "league_name": "League Two",
            "country_key": 44,
            "country_name": "England",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/145_league-two.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/44_england.png"
        },
    
        {
            "league_key": 153,
            "league_name": "Championship",
            "country_key": 44,
            "country_name": "England",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/153_championship.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/44_england.png"
        },
    
        {
            "league_key": 172,
            "league_name": "DFB Pokal",
            "country_key": 4,
            "country_name": "Germany",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/172_dfb-pokal.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/4_germany.png"
        },
    
    
    
    
    
    
    
    
    
    
        {
            "league_key": 141,
            "league_name": "Premier League",
            "country_key": 42,
            "country_name": "Egypt",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/141_premier-league.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/42_egypt.png"
        },
     
           {
            "league_key": 34,
            "league_name": "Ligue 1",
            "country_key": 11,
            "country_name": "Algeria",
            "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/34_ligue-1.png",
            "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/11_algeria.png"
        },
        // Add more leagues as needed...
      ];