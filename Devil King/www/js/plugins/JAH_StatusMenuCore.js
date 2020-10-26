//=============================================================================
// JahwsUF - Status Menu Core
// JAH_StatusMenuCore.js
// Version: 1.1.1
//=============================================================================

var Imported = Imported || {};			 // If YEP_CoreEngine is imported, this has a boolean variable stating so.
Imported.JahwsUF_StatusMenuCore = true;  // Oh yeah, may as well say we're here, too.

var JahwsUF = JahwsUF || {};

//=============================================================================
/*:
 * @plugindesc v1.1.1 Creates an advanced Status window with multiple pages for each Actor.  Supports profiles and portraits.
 * @author JahwsUF
 *
 * @param ---Scrolling Params---
 * @default
 *
 * @param Scroll Multiplier
 * @desc The number of lines that the profile page should scroll at a time.  Default: 1
 * @default 1
 *
 * @param Scrolling Headers
 * @desc true if the header should be subject to scrolling.
 * false if they should remain stationary.  Default:  true
 * @default true
 *
 * @param ---Portrait Params---
 * @default
 *
 * @param Portrait Img Adjust
 * @desc Adds buffer space before all Actor portraits, except on profiles.  Default: 0
 * @default 0
 *
 * @param Portraits On All
 * @desc All pages will display an Actor's portrait if available.
 * A more vanilla version will be used if not.  Default: true
 * @default true
 *
 *
 * @param ---TP Gauge Params---
 * @default
 *
 * @param Add TP Gauge
 * @desc Add the TP Gauge between MP and EXP on the default header.
 * Blank imports from Yanfly, false = hide, true = show.
 * @default
 *
 * @param Blank after TP
 * @desc If the TP gauge is visible, adds a blank line after.
 * Default: true
 * @default true
 *
 * @param ---XP + Level Params---
 * @default
 *
 * @param Hide Levels
 * @desc Hide each Actor's level, rendering it invisible on the Status pages.
 * @default false
 *
 * @param Hide XP Bar
 * @desc Hide all XP information from the Status windows.
 * Default:  false
 * @default false
 *
 * @param XP - Show Remaining
 * @desc true - Gauges show the remaining XP until the next level.
 * false - Gauges show XP since last level + total XP needed for next.
 *
 * (Values are not cumulative - 0 marks the beginning of the current level for both values.)
 * Default: true   
 * @default true 
 *
 * @param Color: XP Gauge 1
 * @desc Color gradient component for the XP gauge.
 * Default: 30   
 * @default 30 
 *
 * @param Color: XP Gauge 2
 * @desc The other color gradient component for the XP gauge.
 * Default: 31   
 * @default 31 
 *
 *
 * @param ---Nickname Settings---
 * @default
 *
 * @param Header - Name + Nick
 * @desc true - Display both name and nickname in page headers. 
 * false - Only shows the nickname on the profile page.
 * Default: true
 * @default true
 *
 * @param Nickname Format
 * @desc The pattern used to insert nicknames in page headers.
 * Default: , "%1"    (%1 = position for nickname.)
 * @default , "%1"
 *
 *
 * @param ---Page 1---
 * @default
 *
 * @param Page 1 Name
 * @desc Menu name for the first page.
 * Default:  Parameters
 * @default Parameters
 *
 * @param Page 1 Window
 * @desc Window corresponding to the first status page.
 * Default:  JAH_Window_Status_Params
 * @default JAH_Window_Status_Params
 *
 * @param ---Page 2---
 * @default
 *
 * @param Page 2 Name
 * @desc Menu name for the second page.
 * Default: Elemental Rates
 * @default Elemental Rates
 *
 * @param Page 2 Window
 * @desc Window corresponding to the first status page.
 * Default: JAH_Window_Status_Resistances
 * @default JAH_Window_Status_Resistances
 *
 * @param ---Page 3---
 * Default: 
 * @default 
 *
 * @param Page 3 Name
 * @desc Menu name for the third page.
 * Default: State Rates  
 * @default State Rates
 *
 * @param Page 3 Window
 * @desc Window corresponding to the third status page.
 * Default: JAH_Window_State_Resistances
 * @default JAH_Window_State_Resistances
 *
 * @param ---Page 4---
 * @default
 *
 * @param Page 4 Name
 * @desc Menu name for the fourth page.
 * Default: Profile
 * @default Profile
 *
 * @param Page 4 Window
 * @desc Window corresponding to the fourth status page.
 * Default: JAH_Window_Status_Profile
 * @default JAH_Window_Status_Profile
 *
 * @param ---Page 5---
 * @default
 *
 * @param Page 5 Name
 * @desc Menu name for the fifth page.
 * Default:   
 * @default  
 *
 * @param Page 5 Window
 * @desc Window corresponding to the fifth status page.
 * Default:   
 * @default  
 *
 *
 * @param ---Page 6---
 * @default
 *
 * @param Page 6 Name
 * @desc Menu name for the sixth page.
 * Default:   
 * @default  
 *
 * @param Page 6 Window
 * @desc Window corresponding to the sixth status page.
 * Default:   
 * @default  
 *
 *
 * @param ---Extended Params---
 * @default
 *
 * @param Parameter 1 Symbol
 * @desc The system abbreviation for parameter #1.
 * Default: atk
 * @default atk
 *
 * @param Parameter 1 Name
 * @desc The text name of parameter #1.
 * Default:          - leave blank to use the database's entry.
 * @default 
 *
 * @param Parameter 1 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: false
 * @default false
 * 
 * @param Parameter 2 Symbol
 * @desc The system abbreviation for parameter #2.
 * Default: def
 * @default def
 *
 * @param Parameter 2 Name
 * @desc The text name of parameter #2.
 * Default:          - leave blank to use the database's entry.
 * @default
 *
 * @param Parameter 2 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: false
 * @default false
 * 
 * @param Parameter 3 Symbol
 * @desc The system abbreviation for parameter #3.
 * Default: mat
 * @default mat
 *
 * @param Parameter 3 Name
 * @desc The text name of parameter #3.
 * Default:          - leave blank to use the database's entry.
 * @default 
 *
 * @param Parameter 3 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: false
 * @default false
 * 
 * @param Parameter 4 Symbol
 * @desc The system abbreviation for parameter #4.
 * Default: mdf
 * @default mdf
 *
 * @param Parameter 4 Name
 * @desc The text name of parameter #4.
 * Default:          - leave blank to use the database's entry.
 * @default  
 *
 * @param Parameter 4 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: false
 * @default false
 * 
 * @param Parameter 5 Symbol
 * @desc The system abbreviation for parameter #5.
 * Default: agi
 * @default agi
 *
 * @param Parameter 5 Name
 * @desc The text name of parameter #5.
 * Default:          - leave blank to use the database's entry.
 * @default  
 *
 * @param Parameter 5 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: false
 * @default false
 * 
 * @param Parameter 6 Symbol
 * @desc The system abbreviation for parameter #6.
 * Default: luk
 * @default luk
 *
 * @param Parameter 6 Name
 * @desc The text name of parameter #6.
 * Default:          - leave blank to use the database's entry.
 * @default 
 *
 * @param Parameter 6 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: false
 * @default false
 * 
 * @param Parameter 7 Symbol
 * @desc The system abbreviation for parameter #7.
 * Space = blank. 
 * @default 
 *
 * @param Parameter 7 Name
 * @desc The text name of parameter #7.
 * Default:          - leave blank to use the database's entry.
 *
 * @default   
 *
 * @param Parameter 7 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 8 Symbol
 * @desc The system abbreviation for parameter #8.
 * Default: hit
 * @default hit
 *
 * @param Parameter 8 Name
 * @desc The text name of parameter #8.
 * Default:          - leave blank to use the database's entry.
 * @default
 *
 * @param Parameter 8 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 9 Symbol
 * @desc The system abbreviation for parameter #9.
 * Default: eva
 * @default eva
 *
 * @param Parameter 9 Name
 * @desc The text name of parameter #9.
 * Default:          
 * @default
 *
 * @param Parameter 9 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 10 Symbol
 * @desc The system abbreviation for parameter #10.
 * Space = blank. 
 * @default 
 *
 * @param Parameter 10 Name
 * @desc The text name of parameter #10.
 * Default:          
 * @default
 *
 * @param Parameter 10 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 11 Symbol
 * @desc The system abbreviation for parameter #11.
 * Space = blank.
 * @default 
 *
 * @param Parameter 11 Name
 * @desc The text name of parameter #11.
 * Default:          
 * @default
 *
 * @param Parameter 11 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 12 Symbol
 * @desc The system abbreviation for parameter #12.
 * Space = blank.
 * @default 
 *
 * @param Parameter 12 Name
 * @desc The text name of parameter #12.
 * Default:          
 * @default
 *
 * @param Parameter 12 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 13 Symbol
 * @desc The system abbreviation for parameter #13.
 * Space = blank.
 * @default 
 *
 * @param Parameter 13 Name
 * @desc The text name of parameter #13.
 * Default:          
 * @default
 *
 * @param Parameter 13 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 14 Symbol
 * @desc The system abbreviation for parameter #14.
 * Space = blank.
 * @default 
 *
 * @param Parameter 14 Name
 * @desc The text name of parameter #14.
 * Default:          
 * @default
 *
 * @param Parameter 14 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 15 Symbol
 * @desc The system abbreviation for parameter #15.
 * Space = blank.
 * @default 
 *
 * @param Parameter 15 Name
 * @desc The text name of parameter #15.
 * Default:          
 * @default
 *
 * @param Parameter 15 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 16 Symbol
 * @desc The system abbreviation for parameter #16.
 * Space = blank.
 * @default 
 *
 * @param Parameter 16 Name
 * @desc The text name of parameter #16.
 * Default:          
 * @default
 *
 * @param Parameter 16 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 17 Symbol
 * @desc The system abbreviation for parameter #17.
 * Space = blank.
 * @default 
 *
 * @param Parameter 17 Name
 * @desc The text name of parameter #17.
 * Default:          
 * @default
 *
 * @param Parameter 17 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 18 Symbol
 * @desc The system abbreviation for parameter #18.
 * Space = blank.
 * @default 
 *
 * @param Parameter 18 Name
 * @desc The text name of parameter #18.
 * Default:          
 * @default
 *
 * @param Parameter 18 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 19 Symbol
 * @desc The system abbreviation for parameter #19.
 * Default: 
 * @default 
 *
 * @param Parameter 19 Name
 * @desc The text name of parameter #19.
 * Default:          
 * @default
 *
 * @param Parameter 19 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 20 Symbol
 * @desc The system abbreviation for parameter #20.
 * Space = blank.
 * @default 
 *
 * @param Parameter 20 Name
 * @desc The text name of parameter #20.
 * Default:          
 * @default
 *
 * @param Parameter 20 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 21 Symbol
 * @desc The system abbreviation for parameter #21.
 * Space = blank.
 * @default 
 *
 * @param Parameter 21 Name
 * @desc The text name of parameter #21.
 * Default:          
 * @default
 *
 * @param Parameter 21 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 22 Symbol
 * @desc The system abbreviation for parameter #22.
 * Space = blank.
 * @default 
 *
 * @param Parameter 22 Name
 * @desc The text name of parameter #22.
 * Default:          
 * @default
 *
 * @param Parameter 22 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 23 Symbol
 * @desc The system abbreviation for parameter #23.
 * Space = blank. 
 * @default 
 *
 * @param Parameter 23 Name
 * @desc The text name of parameter #23.
 * Default:          
 * @default
 *
 * @param Parameter 23 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 24 Symbol
 * @desc The system abbreviation for parameter #24.
 * Space = blank.
 * @default 
 *
 * @param Parameter 24 Name
 * @desc The text name of parameter #24.
 * Default:          
 * @default
 *
 * @param Parameter 24 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 25 Symbol
 * @desc The system abbreviation for parameter #25.
 * Space = blank.
 * @default 
 *
 * @param Parameter 25 Name
 * @desc The text name of parameter #25.
 * Default:          
 * @default
 *
 * @param Parameter 25 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 26 Symbol
 * @desc The system abbreviation for parameter #26.
 * Space = blank.
 * @default 
 *
 * @param Parameter 26 Name
 * @desc The text name of parameter #26.
 * Default:          
 * @default
 *
 * @param Parameter 26 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 27 Symbol
 * @desc The system abbreviation for parameter #27.
 * Space = blank.
 * @default 
 *
 * @param Parameter 27 Name
 * @desc The text name of parameter #27.
 * Default:          
 * @default
 *
 * @param Parameter 27 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 28 Symbol
 * @desc The system abbreviation for parameter #28.
 * Space = blank.
 * @default 
 *
 * @param Parameter 28 Name
 * @desc The text name of parameter #28.
 * Default:          
 * @default
 *
 * @param Parameter 28 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 29 Symbol
 * @desc The system abbreviation for parameter #29.
 * Space = blank.
 * @default 
 *
 * @param Parameter 29 Name
 * @desc The text name of parameter #29.
 * Default:          
 * @default
 *
 * @param Parameter 29 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 30 Symbol
 * @desc The system abbreviation for parameter #30.
 * Space = blank.
 * @default 
 *
 * @param Parameter 30 Name
 * @desc The text name of parameter #30.
 * Default:          
 * @default
 *
 * @param Parameter 30 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 31 Symbol
 * @desc The system abbreviation for parameter #31.
 * Space = blank. 
 * @default 
 *
 * @param Parameter 31 Name
 * @desc The text name of parameter #31.
 * Default:          
 * @default
 *
 * @param Parameter 31 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 32 Symbol
 * @desc The system abbreviation for parameter #32.
 * Space = blank. 
 * @default 
 *
 * @param Parameter 32 Name
 * @desc The text name of parameter #32.
 * Default:          
 * @default
 *
 * @param Parameter 32 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 33 Symbol
 * @desc The system abbreviation for parameter #33.
 * Space = blank.
 * @default 
 *
 * @param Parameter 33 Name
 * @desc The text name of parameter #33.
 * Default:          
 * @default
 *
 * @param Parameter 33 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 34 Symbol
 * @desc The system abbreviation for parameter #34.
 * Space = blank.
 * @default 
 *
 * @param Parameter 34 Name
 * @desc The text name of parameter #34.
 * Default:          
 * @default
 *
 * @param Parameter 34 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 35 Symbol
 * @desc The system abbreviation for parameter #35.
 * Space = blank.
 * @default 
 *
 * @param Parameter 35 Name
 * @desc The text name of parameter #35.
 * Default:          
 * @default
 *
 * @param Parameter 35 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 36 Symbol
 * @desc The system abbreviation for parameter #36.
 * Space = blank.
 * @default 
 *
 * @param Parameter 36 Name
 * @desc The text name of parameter #36.
 * Default:          
 * @default
 *
 * @param Parameter 36 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 37 Symbol
 * @desc The system abbreviation for parameter #37.
 * Space = blank.
 * @default 
 *
 * @param Parameter 37 Name
 * @desc The text name of parameter #37.
 * Default:          
 * @default
 *
 * @param Parameter 37 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 38 Symbol
 * @desc The system abbreviation for parameter #38.
 * Space = blank. 
 * @default 
 *
 * @param Parameter 38 Name
 * @desc The text name of parameter #38.
 * Default:          
 * @default
 *
 * @param Parameter 38 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 39 Symbol
 * @desc The system abbreviation for parameter #39.
 * Space = blank.
 * @default 
 *
 * @param Parameter 39 Name
 * @desc The text name of parameter #39.
 * Default:          
 * @default
 *
 * @param Parameter 39 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 40 Symbol
 * @desc The system abbreviation for parameter #40.
 * Space = blank.
 * @default 
 *
 * @param Parameter 40 Name
 * @desc The text name of parameter #40.
 * Default:          
 * @default
 *
 * @param Parameter 40 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 41 Symbol
 * @desc The system abbreviation for parameter #41.
 * Space = blank.
 * @default 
 *
 * @param Parameter 41 Name
 * @desc The text name of parameter #41.
 * Default:          
 * @default
 *
 * @param Parameter 41 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 42 Symbol
 * @desc The system abbreviation for parameter #42.
 * Space = blank.
 * @default 
 *
 * @param Parameter 42 Name
 * @desc The text name of parameter #42.
 * Default:          
 * @default
 *
 * @param Parameter 42 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 43 Symbol
 * @desc The system abbreviation for parameter #43.
 * Space = blank.
 * @default 
 *
 * @param Parameter 43 Name
 * @desc The text name of parameter #43.
 * Default:          
 * @default
 *
 * @param Parameter 43 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 44 Symbol
 * @desc The system abbreviation for parameter #44.
 * Space = blank.
 * @default 
 *
 * @param Parameter 44 Name
 * @desc The text name of parameter #44.
 * Default:          
 * @default
 *
 * @param Parameter 44 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 45 Symbol
 * @desc The system abbreviation for parameter #45.
 * Space = blank. 
 * @default 
 *
 * @param Parameter 45 Name
 * @desc The text name of parameter #45.
 * Default:          
 * @default
 *
 * @param Parameter 45 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 46 Symbol
 * @desc The system abbreviation for parameter #46.
 * Space = blank.
 * @default 
 *
 * @param Parameter 46 Name
 * @desc The text name of parameter #46.
 * Default:          
 * @default
 *
 * @param Parameter 46 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 47 Symbol
 * @desc The system abbreviation for parameter #47.
 * Space = blank. 
 * @default 
 *
 * @param Parameter 47 Name
 * @desc The text name of parameter #47.
 * Default:          
 * @default
 *
 * @param Parameter 47 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param Parameter 48 Symbol
 * @desc The system abbreviation for parameter #48.
 * Space = blank.
 * @default 
 *
 * @param Parameter 48 Name
 * @desc The text name of parameter #48.
 * Default:          
 * @default
 *
 * @param Parameter 48 as %
 * @desc true - parameter should be displayed as a percent.
 * false - otherwise.
 * Default: 
 * @default 
 * 
 * @param ---Param Formatting---
 * @default
 *
 * @param Column 1 Height
 * @desc The number of parameters to list in the first column.
 * Default: 9
 * @default 9
 *
 * @param Column 1 Text Width
 * @desc Width (pixels) alloted to column 1's parameter names.
 * Default: 160
 * @default 160
 * 
 * @param Column 1 Value Width
 * @desc Width (pixels) alloted to column 1's parameter values.
 * Default: 60
 * @default 60
 * 
 * @param Column 2 Height
 * @desc The number of parameters to list in the second column.
 * If zero or blank, all parameters will be listed in a single column.
 * Default: 0
 * @default 0
 *
 * @param Column 2 Text Width
 * @desc Width (pixels) alloted to column 2's parameter names.
 * Default: 160
 * @default 160
 * 
 * @param Column 2 Value Width
 * @desc Width (pixels) alloted to column 2's parameter values.
 * Default: 60
 * @default 60
 * 
 * @param Column 3 Height
 * @desc The number of parameters to list in the third column.
 * Zero hides the column.
 * Default: 0
 * @default 0
 *
 * @param Column 3 Text Width
 * @desc Width (pixels) alloted to column 3's parameter names.
 * Default: 160
 * @default 160
 * 
 * @param Column 3 Value Width
 * @desc Width (pixels) alloted to column 3's parameter values.
 * Default: 60
 * @default 60
 * 
 * @param Display Equips?
 * @desc true - Attempt to show equips on the parameter page.
 * false - hide the equips.
 * Default: true
 * @default true
 *
 * @param Equip Column Width
 * @desc Width (pixels) for equipment listings on pages if shown.
 * Default: 320
 * @default 320
 *
 * @param ---Category Options---
 * @desc The common set of text classifications for elemental or state resistance rates.
 *
 * @param Use Color
 * @desc true - color all resistance values (text or %age)
 * false - disables all color options below.
 * @default true
 *
 * @param Threshold 1
 * @desc The minimum %-value required for the highest category. (#1)
 * Default: 201
 * @default 201
 *
 * @param Category 1 Text
 * @desc The label for this resistance category.
 * Default: Very Weak
 * @default Very Weak
 *
 * @param Category 1 Color
 * @desc The color for values from this category.
 * Leave blank to use the default color.
 * @default 10
 *
 * @param Threshold 2
 * @desc The minimum %-value required for this category.
 * Default: 101
 * @default 101
 *
 * @param Category 2 Text
 * @desc The label for this resistance category.
 * Default: Weak
 * @default Weak
 *
 * @param Category 2 Color
 * @desc The color for values from this category.
 * Leave blank to use the default color.
 * @default 2
 *
 * @param Threshold 3
 * @desc The minimum %-value required for this category.
 * Default: 100
 * @default 100
 *
 * @param Category 3 Text
 * @desc The label for this resistance category.
 * Default: Normal
 * @default Normal
 *
 * @param Category 3 Color
 * @desc The color for values from this category.
 * Leave blank to use the default color.
 * @default
 *
 * @param Threshold 4
 * @desc The minimum %-value required for this category.
 * Default: 50
 * @default 50
 *
 * @param Category 4 Text
 * @desc The label for this resistance category.
 * Default: Resist
 * @default Resist
 *
 * @param Category 4 Color
 * @desc The color for values from this category.
 * Leave blank to use the default color.
 * @default 5
 *
 * @param Threshold 5
 * @desc The minimum %-value required for this category.
 * Default: 1
 * @default 1
 *
 * @param Category 5 Text
 * @desc The label for this resistance category.
 * Default: Resist
 * @default Resist
 *
 * @param Category 5 Color
 * @desc The color for values from this category.
 * Leave blank to use the default color.
 * @default 13
 *
 * @param Threshold 6
 * @desc The minimum %-value required for this category.
 * Default: 0
 * @default 0
 *
 * @param Category 6 Text
 * @desc The label for this resistance category.
 * Default: Immune
 * @default Immune
 *
 * @param Category 6 Color
 * @desc The color for values from this category.
 * Leave blank to use the default color.
 * @default 14
 *
 * @param Threshold 7
 * @desc The minimum %-value required for this category.
 * Default: -99
 * @default -99
 *
 * @param Category 7 Text
 * @desc The label for this resistance category.
 * Default: Absorb
 * @default Absorb
 *
 * @param Category 7 Color
 * @desc The color for values from this category.
 * Leave blank to use the default color.
 * @default 3
 *
 * @param Threshold 8
 * @desc The minimum %-value required for this category.
 * Default: -1000
 * @default -1000
 *
 * @param Category 8 Text
 * @desc The label for this resistance category.
 * Default: Absorb
 * @default Absorb
 *
 * @param Category 8 Color
 * @desc The color for values from this category.
 * Leave blank to use the default color.
 * @default 11
 *
 *
 * @param ---Element Options---
 * @default
 *
 * @param Ele. Resist Header
 * @desc The text header explaining the elemental defense rates listed on
 * the Resistances page.  Can be removed if this is left blank.
 * Default:  Elemental Damage Received
 * @default Elemental Damage Received
 *
 * @param Column 1 Elements
 * @desc The number of elements to list in the first column.
 * Setting this to zero will erase all columns and empty the Resistances page.
 * Default: 4
 * @default 4
 * 
 * @param Column 2 Elements
 * @desc The number of elements to list in the second column.
 * Setting this to zero will eliminate columns 2 and 3.
 * Default: 4
 * @default 4
 *
 * @param Column 3 Elements
 * @desc The number of elements to list in the third column.
 * Setting this to zero will eliminate the column.
 * Default: 0
 * @default 0
 *
 * @param Hidden Elements
 * @desc A list of the element IDs to keep hidden. 
 * Example: 1, 2 will hide Physical and Fire if unchanged.
 * @default 1
 *
 * @param Display Ele. Percent
 * @desc true - show exact resistance percent
 * false - categorize resistance strength (like "weak")
 * @default false
 *
 * @param Center Ele. Values
 * @desc true - element rates / categories will be centered.
 * false - right-aligned instead.
 * @default true
 *
 * @param ---State Options---
 * @default
 *
 * @param State Resist Header
 * @desc The text header explaining the state defense rates listed on
 * the State Resistances page.  Can be removed if this is left blank.
 * Default: State Resistance
 * @default State Resistance
 *
 * @param Column 1 States
 * @desc The number of states to list in the first column.
 * Setting this to zero will erase all columns and empty the page.
 * Default: 4
 * @default 4
 * 
 * @param Column 2 States
 * @desc The number of elements to list in the second column.
 * Setting this to zero will eliminate columns 2 and 3.
 * Default: 4
 * @default 4
 *
 * @param Column 3 States
 * @desc The number of elements to list in the third column.
 * Setting this to zero will eliminate the column.
 * Default: 0
 * @default 0
 *
 * @param Hidden States
 * @desc A list of the state IDs to keep hidden. 
 * Example: 1, 2, 3 will hide Knockout, Guard, and Immortal.
 * @default 1, 2, 3
 *
 * @param Display State Percent
 * @desc true - show exact resistance percent
 * false - categorize resistance strength (like "weak")
 * @default true
 *
 * @param Center State Values
 * @desc true - state rates / categories will be centered.
 * false - right-aligned instead.
 * @default true
 *
 *
 * @help 
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * For those who might desire to customize their Status further than the 
 * default behavior provided by this plugin, note that this plugin takes 
 * parameters allowing you to specify the menu name and window corresponding to
 * each Status page.
 * 
 * Even without any editing, this plugin automatically provides for extended
 * Status functionality for use in your own projects.
 *
 * ============================================================================
 * How to Use This Plugin
 * ============================================================================
 *
 *
 * Extended Parameters
 * ===================
 * Rather than assume that you always want the parameters listed in a specific
 * order, this plugin allows you to choose what order all parameters are listed
 * in.  This is also helpful to allow some degree of control of how they're 
 * arranged on the screen.
 *
 * By default, RPG Maker doesn't provide any in-text names or abbreviations for
 * many extended or special parameters.  As a result, you need to specify these
 * values for any such additional parameters.  If left blank, this plugin will
 * attempt to find the names and abbreviations from the database's TextManager,
 * which will succeed for the basic parameters.
 *
 * Table of built-in parameters:
 *
 * ==========================================
 * | Symbol |      Name       | %age-based? |
 * ==========================================
 * | atk    | Attack          | false       |
 * | def    | Defense         | false       |
 * | mat    | M.Attack        | false       |
 * | mdf    | M.Defense       | false       |
 * | agi    | Agility         | false       |
 * | luk    | Luck            | false       |
 * ==========================================
 * | hit    | Hit Rate        | true        |
 * | eva    | Evasion         | true        |
 * | cri    | Critical Rate   | true        |
 * | cev    | Crit Evasion    | true        |
 * | mev    | Magic Evasion   | true        |
 * | mrf    | M. Reflection   | true        |
 * | cnt    | Counterattack   | true        |
 * | hrg    | HP Regen Rate   | true        |
 * | mrg    | MP Regen Rate   | true        |
 * | trg    | TP Regen Rate   | true        |
 * ==========================================
 * | tgr    | Target Rate     | true        |
 * | grd    | Guard Effect    | true        |
 * | rec    | Recovery Effect | true        |
 * | pha    | Pharmacology    | true        |
 * | mcr    | MP Cost Rate    | true        |
 * | tcr    | TP Cost Rate    | true        |
 * | pdr    | Phys Damage %   | true        |
 * | mdr    | Magic Damage %  | true        |
 * | fdr    | Floor Damage %  | true        |
 * | exr    | Exp Gain Rate   | true        |
 * ==========================================
 * 
 * Additionally, you can control how the Parameter page is organized through
 * the "Param Formatting" options.  The parameters may be listed on their
 * respective page in up to three columns, and each column may independently
 * be given a different length and width for its information in order to
 * fine-tune the page's visual appearance.  The default values provided
 * match those used by default for the original parameters in the vanilla
 * version of the Status window.
 *
 * If any parameter location has a blank symbol, it will be interpreted as a blank
 * to be left on the parameter page and will be counted as one of the parameters in
 * its column.  This allows you to create visual groupings of parameters should you so desire.
 *
 * Note that assigning any column 0 parameters hides that column and those
 * after it.
 *
 * Want even more options with this?
 *
 * In place of a symbol, you can use elementRate(1) - with 1 being the element's ID here -
 * to put elemental rate data on the parameters page.  Likewise, stateRate(1) - with 1 as
 * the state's ID - will put state rate / resistance data on the parameters page in that slot.
 *
 * For both of these, the name will be autodetected if left blank.
 * Furthermore, if you leave the "Parameter # as %" option blank, it will
 * default to the global setting for elements or states set toward the bottom
 * of the options.
 *
 * You can select whether or not the value/category (again, global option) is
 * centered or right-aligned via option.  This can be set differently for elements and
 * states as a group, but not individually.  (If not centered, they will be right-aligned.)
 *
 * 
 * Resistance Options
 * ==================
 * This plugin also provides a page to display elemental resistances on the
 * status page.  As the Elements are included in the "Terms" part of the
 * game database and are nearly all relevant in many game types, this page 
 * is far easier to automatically generate.
 *
 * It is possible to hide certain elements by listing them within the
 * "Hidden Elements" parameter - make sure the values therein are
 * comma-separated.  Past that, you can control the arrangement of elements
 * into columns, though their ordering is determined by their numerical IDs.
 *
 * New in v 1.02 is the ability to classify resistance levels by text and/or
 * color visually within the Resistances tab.  You can set up to 8 thresholds
 * that define the different tiers of resistance, and all colors can be killed
 * with a single swap of the "Use Color" option.
 *
 * As for selecting the colors, you can go with one of the system default 32
 * options provided by RPG Maker (see img/system/Window.png), OR you can
 * define a color via hexadecimal value, like 0x006600 for a dark green.
 * This plugin will adapt to whichever choice you take.
 *
 *
 * Profile Options
 * ===============
 * By default, RPG Maker provides limited space to provide background info
 * for each actor.  With the extended Status window functionality provided
 * by this plugin, we gain more space, and as a result a more in-depth
 * profile can be provided in-game.
 *
 * To provide an extended profile for any particular actor, use the following
 * tags:
 *
 *
 * <portrait: x> - x must be the corresponding filename from the img/pictures
 * folder.  If an actor lacks this tag, a vanilla version of the Profile
 * will appear that is organized more closely to the standard Status window
 * appearance.
 *
 * For those who purchased the "Cover Art Characters Pack" and copied the data
 * into their projects, <Portrait: Package1_1> would be a good example use.
 *
 * <portrait scale: x> - Specifies the desired default scaling of the profile portrait.
 * x = 1 provides the default scaling behavior; x = 0.5 halve the size, while
 * x = 2 doubles it.  Note that the image is confined to within the profile
 * portrait window.
 *
 * If not provided, the scaling factor will default to 1 and use the original
 * image size.
 *
 *
 * <portrait offset: x, y> - Specifies a default offset from baseline automatic positioning
 * to use for the portrait.  (Enables somewhat manual positioning.)  Positive
 * x moves the image further right, while positive y moves the image further 
 * down - but note that the image will be clipped as a result of such adjustments.
 * The profile window's border will automatically overwrite such parts of the
 * image; this cannot be helped.
 *
 *
 * <portrait anti-buffer: x> - Use to set a default adjustment for any transparency/whitespace
 * that your portraits cause on non-profile pages.  Positive values allow each page
 * to display over the left side of the portrait by the amount set, while negative values
 * provide additional buffering between the image and text.
 *
 * If this is too confusing, you can always edit the portrait to add/remove 
 * whitespace - the system DOES look at image width, just not its contents.
 * This tag exists so that you don't HAVE to edit the contents.
 *
 *  * To provide full custom specs on a per-portrait basis, use the following tag structure
 * for any "portrait switch".  The default behavior for missing options can be selected
 * globally via plugin option.
 *
 *
 * If you want different portraits at different times for your actors:
 *
 * <portrait "filename" switch: s scale: z offset: x, y antibuffer: b> 
 * 
 * Note that filename and switch are absolutely required, while you can leave out the
 * scale, offset, and antibuffer components at your leisure.  (They'll use the default
 * values set by their individual tags as listed above.)  All data per portrait is
 * to be specified inside a single complex tag.  Aside from filename, all the other
 * details may be specified in whatever order you prefer; the restrictions mentioned here
 * are necessary to distinguish between tag types.
 *
 * The portrait switching behavior follows the same rules as for profile switching, as 
 * mentioned later below.
 *
 * Please note that "filename" must be enclosed within double quotes - this is necessary
 * to allow spaces in the middle of a portrait's filename without breaking the ability
 * of this plugin to actually process the tag.
 *
 *
 * <profile>
 * Line 1 of extended backstory here...
 * Line 2...
 * 
 * Even more backstory...
 * </profile> 
 *
 *
 * Not satisfied with the limited two lines of background text alloted to you
 * by the base engine?  Feel free to write something much more in-depth via this
 * set of tags!  All whitespace will be recognized and preserved, allowing you
 * to easily write a paragraph or two.
 *
 * Do note, however, that there is no automatic line-breaking, as well as nothing
 * preventing your text from overlapping with your Actors' portraits.
 *
 * <profile Switch: x>
 * Line 1 of extended backstory here...
 * Line 2...
 * 
 * Even more backstory...
 * </profile> 
 *
 * 
 * Want your baseline extended backstory to change after certain game events?
 * You can use the "Profile Switch" tag to create alternate text that only
 * activates when the selected Switch is On.
 *
 * In the case of conflict (via multiple Profile Switch tags meeting their
 * conditions) the earliest defined Profile Switch will be used.
 *
 *
 * One extra thing - you may freely use <hr> on its own line within a <profile> tag
 * to produce a horizontal line within the text profile!  (Any other text on that
 * line will block this.)
 *
 *
 * Page Selection
 * ==============
 * Each "Page _ Name" parameter allows you to specify the name of its
 * corresponding page on the Status menu.
 * 
 * Each "Page _ Window" parameter allows you to choose a Window object to act
 * as a Status menu page.  Two have been provided by default, both based upon
 * the JAH_Window_Status_Base class.  
 * 
 * Extending the JAH_Window_Status_Base class will allow you to create your OWN
 * custom windows that can be included as part of your game's status menu
 * option!  For the simplest provided example on how to use it, should you be 
 * up to the coding involved, check the JAH_Window_Status_Profile class for how
 * to effectively do so.
 */

 //========= OBJECT DEFINITIONS - RESULTS FROM PARAMETER PROCESSING ==========

// -------------------------------------------------------
// JAH_StatusMenuCore_ParamEntry
//
// Stores all data for one Parameter listing on the Parameter page.
// Localizes all its info and saves certain details for mild optimization.
 
function JAH_StatusMenuCore_ParamEntry() {
	this.initialize.apply(this, arguments);
}
 
JAH_StatusMenuCore_ParamEntry.prototype.constructor = JAH_StatusMenuCore_ParamEntry;

JAH_StatusMenuCore_ParamEntry.prototype.initialize = function(symbol, name, asPercent, txtWidth, valWidth, align) {
	this._eval = "window._actor." + symbol;
	
	this._symbol = symbol;
	this._name = name;
	this._asPercent = asPercent || false;
	this._txtWidth = txtWidth;
	this._valWidth = valWidth;
	this._align = align || 'right';
}; 

JAH_StatusMenuCore_ParamEntry.prototype.initName = function() {
	
	var name = this._name;
	
	// Grab default name.
	if(name == undefined || name.trim() == "")
	{
		switch(this._symbol)
		{
			case 'atk':
				name = TextManager.param(2);
				break;
			case 'def':
				name = TextManager.param(3);
				break;
			case 'mat':
				name = TextManager.param(4);
				break;
			case 'mdf':
				name = TextManager.param(5);
				break;
			case 'agi':
				name = TextManager.param(6);
				break;
			case 'luk':
				name = TextManager.param(7);
				break;
			case 'hit':
				name = TextManager.param(8);
				break;
			case 'eva':
				name = TextManager.param(9);
				break;
			default:
				name = "undefined";
		}
	}
	
	this._name = name;
}

JAH_StatusMenuCore_ParamEntry.prototype.draw = function(window, x, y) {
	
	if(!this._name) this.initName();
	
	window.changeTextColor(window.systemColor());
	window.drawText(this._name, x, y, this._txtWidth);
	window.resetTextColor();
	
	var value = eval(this._eval);
	
	if(this._asPercent)
	{
		value = Math.round(value * 100) + "%";
	}
	
	window.drawText(value, x + this._txtWidth, y, this._valWidth, this._align);
}; 

// -------------------------------------------------------
// JAH_StatusMenuCore_ResistEntry
//
// Stores all data for one Resistance listing on the Parameter page.
// Localizes all its info and saves certain details for mild optimization.
 
function JAH_StatusMenuCore_ResistEntry() {
	this.initialize.apply(this, arguments);
}
 
JAH_StatusMenuCore_ResistEntry.prototype.constructor = JAH_StatusMenuCore_ResistEntry;

JAH_StatusMenuCore_ResistEntry.prototype.initialize = function(symbol, name, asPercent, txtWidth, valWidth, align) {
	this._eval = "window._actor." + symbol;
	
	this._symbol = symbol;
	this._name = name;
	
	if(asPercent === undefined || asPercent == "")
	{
		if(symbol.indexOf("elementRate") > -1)
		{
			asPercent = JahwsUF.StatusMenuCore.Param.DisplayElePercents;
		}
		else asPercent = JahwsUF.StatusMenuCore.Param.DisplayStatePercents;
	}
	
	this._asPercent = asPercent || false;
	this._txtWidth = txtWidth;
	this._valWidth = valWidth;
	this._align = align || 'right';
}; 

JAH_StatusMenuCore_ResistEntry.prototype.initName = function() {
	
	var name = this._name;
	
	// Grab default name.
	if(name === undefined || name.trim() == "")
	{
		if(this._symbol.match(/elementRate\((\d+)\)/i))
		{
			var elementID = RegExp.$1;
			
			name = $dataSystem.elements[elementID];
			
			if(name == undefined) name = "undefined";
		}
		else if(this._symbol.match(/stateRate\((\d+)\)/i))
		{
			var stateID = RegExp.$1;
			
			var state = $dataStates[stateID];
			
			if(!!state)
			{
				name = state.name;
			}
			else name = "undefined";
		}
		else name = "undefined";
	}
	
	this._name = name;
}

JAH_StatusMenuCore_ResistEntry.prototype.categorizePercentValue = function(val) {
	
	for(var i = 0; i < JahwsUF.StatusMenuCore.Param.ResistanceCategories; i++)
	{
		if(val >= JahwsUF.StatusMenuCore.Param.ResistanceThresholds[i])
		{
			return i;
		}
	}
	
	return 7;
}

JAH_StatusMenuCore_ResistEntry.prototype.draw = function(window, x, y) {
	
	if(!this._name) this.initName();
	
	window.changeTextColor(window.systemColor());
	window.drawText(this._name, x, y, this._txtWidth);
	window.resetTextColor();
	
	var value = eval(this._eval);
	var categoryIndex = this.categorizePercentValue(value);
	
	if(this._asPercent)
	{
		value = Math.round(value * 100) + "%";
	}
	else
	{
		// Resistance categorization.
		value = JahwsUF.StatusMenuCore.Param.ResistanceLabels[categoryIndex];
	}
	
	// Check color details too!
	var color = JahwsUF.StatusMenuCore.Param.ResistanceColors[categoryIndex];
	
	// Initialization automatically undefines all colors if they're not to be used.
	if(color != undefined)
	{
		if(JahwsUF.StatusMenuCore.Param.ResistanceSysColors[categoryIndex] == false)
			window.changeTextColor(color);  // We interpreted a hex color.
		else window.changeTextColor(window.textColor(color)); 
	}
	
	window.drawText(value, x + this._txtWidth, y, this._valWidth, this._align);
	window.resetTextColor();
}; 
 
function JAH_StatusMenuCore_EnhancedPortrait() {
	this.initialize.apply(this, arguments);
}
 
JAH_StatusMenuCore_EnhancedPortrait.prototype.constructor = JAH_StatusMenuCore_EnhancedPortrait;

JAH_StatusMenuCore_EnhancedPortrait.prototype.initialize = function(imageName, switchID, scale, offset, padding) {
	this.Portrait = imageName;
	this.Switch = switchID;
	this.Scale = scale;
	this.Offset = offset;
	this.BorderAdjustment = padding;
}; 
 
 //=============== START PARAMETER INITIALIZATION ===========================
 
JahwsUF.StatusMenuCore = JahwsUF.StatusMenuCore || {};

JahwsUF.StatusMenuCore.Parameters = PluginManager.parameters('JAH_StatusMenuCore');

JahwsUF.StatusMenuCore.Param = JahwsUF.StatusMenuCore.Param || {};

// For extra parameter pages - a plugin extension.
// Each parameter page will store its data in the array under its own page ID.
// The page will be constructed from a base window class that takes in the ID,
// making the copied code in the extension absolutely minimal.

JahwsUF.StatusMenuCore.Param.ParamPages           = [];
JahwsUF.StatusMenuCore.Param.ParamPages[0]        = {};

// Column data is implied with the data storage pattern here.
JahwsUF.StatusMenuCore.Param.ParamPages[0].Columns       = [];

// JahwsUF.StatusMenuCore.Param.ParamPages[0].Columns[i].TextWidth
// JahwsUF.StatusMenuCore.Param.ParamPages[0].Columns[i].ValueWidth
// JahwsUF.StatusMenuCore.Param.ParamPages[0].Columns[i].Entries = [];  // Entries will contain special organization objects!
// JahwsUF.StatusMenuCore.Param.ParamPages[0].DisplayEquips

JahwsUF.StatusMenuCore.Param.PageNames            = [];
JahwsUF.StatusMenuCore.Param.PageWindows          = [];

JahwsUF.StatusMenuCore.Param.ResistanceColors     = [];
JahwsUF.StatusMenuCore.Param.ResistanceSysColors  = [];
JahwsUF.StatusMenuCore.Param.ResistanceLabels     = [];
JahwsUF.StatusMenuCore.Param.ResistanceThresholds = [];

JahwsUF.StatusMenuCore.Param.EleResistsInColumn   = [];
JahwsUF.StatusMenuCore.Param.StateResistsInColumn = [];

JahwsUF.StatusMenuCore.Param.Portraits            = [];
// JahwsUF.StatusMenuCore.Param.PortraitScales       = [];
JahwsUF.StatusMenuCore.Param.ExtendedProfiles     = [];
JahwsUF.StatusMenuCore.Param.SwitchedProfiles     = [];
// JahwsUF.StatusMenuCore.Param.PortraitOffsets      = [];
// JahwsUF.StatusMenuCore.Param.PortraitAdjusts      = [];

JahwsUF.StatusMenuCore.Param.ResistanceCategories = 8; // Too lazy to parameterize this at the moment.

// Keep all local variables in here as purely local.
// Used to obtain and initialize all plugin parameters.
(function() {

// For the core plugin, the page ID is automatically set, rather than read from the plugin.

var paramPageId = 0;

// Read in page specification data.

var totalPages = 0;

for (var i = 1; i <= 6; i++) {
  var line = "JahwsUF.StatusMenuCore.Parameters['Page " + i + " Name']";
  var name = eval(line);
  line = "JahwsUF.StatusMenuCore.Parameters['Page " + i + " Window']";
  var page = eval(line);
  
  if(!(name == undefined || page == undefined || name == '' || page == ''))
  {
	JahwsUF.StatusMenuCore.Param.PageNames[totalPages] = name;
	JahwsUF.StatusMenuCore.Param.PageWindows[totalPages] = page;
	
	totalPages++;
  }
}

JahwsUF.StatusMenuCore.Param.TotalPages = totalPages;

// Param column formatting data.

var colCount = 1;
var column = {};

var totalColumnWidths = 0;
 
for (var i = 1; i <= 3; i++)
{
	var line = "Number(JahwsUF.StatusMenuCore.Parameters['Column " + i + " Height'])";
	var count = eval(line);
	
	if(count == '' || count == undefined || isNaN(count))
	{
		if(i == 1) count = 8;
		else count = 0;
	}
	
	line = "Number(JahwsUF.StatusMenuCore.Parameters['Column " + i + " Text Width'])";
	var textWidth = eval(line);
	
	if(textWidth == '' || textWidth == undefined || isNaN(textWidth))
	{
		textWidth = 160;
	}
	
	line = "Number(JahwsUF.StatusMenuCore.Parameters['Column " + i + " Value Width'])";
	var valWidth = eval(line);
	
	if(valWidth == '' || valWidth == undefined || isNaN(valWidth))
	{
		valWidth = 60;
	}
	
	column.Size = count;
	column.TextWidth = textWidth;
	column.ValueWidth = valWidth;
	
	if(count == 0)
	{
		break;
	}
	else 
	{
		JahwsUF.StatusMenuCore.Param.ParamPages[paramPageId].Columns[i-1] = column;
		column = {};
		
		colCount = i;		
		totalColumnWidths += textWidth + valWidth;
	}
}

// Display equipment options.

JahwsUF.StatusMenuCore.Param.DisplayEquips = JahwsUF.StatusMenuCore.Parameters['Display Equips?'];
JahwsUF.StatusMenuCore.Param.ParamPages[paramPageId].DisplayEquips = JahwsUF.StatusMenuCore.Parameters['Display Equips?'];

var equipWidth = Number(JahwsUF.StatusMenuCore.Parameters['Equip Column Width']);

	if(equipWidth == '' || equipWidth == undefined || isNaN(equipWidth))
	{
		equipWidth = 320;
	}

JahwsUF.StatusMenuCore.Param.ParamPages[paramPageId].EquipColumnWidth = equipWidth;
JahwsUF.StatusMenuCore.Param.ParamPages[paramPageId].RequiredColumnWidth = totalColumnWidths;

// Resistance alignment formatting data (needs to be passed into the param page entries.)

JahwsUF.StatusMenuCore.Param.CenterEleValues   = eval(JahwsUF.StatusMenuCore.Parameters['Center Ele. Values']);
JahwsUF.StatusMenuCore.Param.CenterStateValues = eval(JahwsUF.StatusMenuCore.Parameters['Center State Values']);

JahwsUF.StatusMenuCore.Param.CenterEleValues   = JahwsUF.StatusMenuCore.Param.CenterEleValues || false;
JahwsUF.StatusMenuCore.Param.CenterStateValues = JahwsUF.StatusMenuCore.Param.CenterStateValues || false;

// Read in parameter specification data.

var totalParams = 0;
var columnPlacement = 0;
var rowPlacement = 0;

var i = 1;

for (var columnPlacement = 0; columnPlacement < JahwsUF.StatusMenuCore.Param.ParamPages[paramPageId].Columns.length; columnPlacement++) {

	var currentColumn = JahwsUF.StatusMenuCore.Param.ParamPages[paramPageId].Columns[columnPlacement];
	currentColumn.Entries = [];  

	for (var rowPlacement = 0; rowPlacement < currentColumn.Size; rowPlacement++) {
		
		var line = "JahwsUF.StatusMenuCore.Parameters['Parameter " + i + " Symbol']";
		var symbol = eval(line);
		line = "JahwsUF.StatusMenuCore.Parameters['Parameter " + i + " Name']";
		var name = eval(line);
		line = "JahwsUF.StatusMenuCore.Parameters['Parameter " + i + " as %']";
		var percent = eval(eval(line));
	  
		// Undefined = blank space on the parameter page.
		if(symbol == '')
			symbol = undefined;
			
		if(!(symbol == undefined))
		{
			if(symbol.trim() == "")
				symbol = undefined;
		}
	  
		if(symbol)
		{
			if(symbol.indexOf("elementRate") != -1)
			{
				currentColumn.Entries[rowPlacement] = new JAH_StatusMenuCore_ResistEntry(symbol, name, percent, currentColumn.TextWidth, currentColumn.ValueWidth, JahwsUF.StatusMenuCore.Param.CenterEleValues ? 'center' : 'right');
			}
			else if(symbol.indexOf("stateRate") != -1)
			{
				currentColumn.Entries[rowPlacement] = new JAH_StatusMenuCore_ResistEntry(symbol, name, percent, currentColumn.TextWidth, currentColumn.ValueWidth, JahwsUF.StatusMenuCore.Param.CenterStateValues ? 'center' : 'right');
			}
			else 
			{
				if(percent == undefined)
					percent = true;
				
				currentColumn.Entries[rowPlacement] = new JAH_StatusMenuCore_ParamEntry(symbol, name, percent, currentColumn.TextWidth, currentColumn.ValueWidth);
			}
		}
		
		totalParams++;
		i++;
	}
}

JahwsUF.StatusMenuCore.Param.TotalParams = totalParams;

// Elemental resistances page option.

var resistanceColumnCount = 1;

for (var i = 1; i <= 3; i++)
{
	var line = "Number(JahwsUF.StatusMenuCore.Parameters['Column " + i + " Elements'])";

	var eles = eval(line);
	JahwsUF.StatusMenuCore.Param.EleResistsInColumn[i-1] = eles;
	
	if(eles == 0 || eles == '' || isNaN(eles))
	{
		break;
	}
	else
	{
		resistanceColumnCount = i;
	}
}

JahwsUF.StatusMenuCore.Param.EleResistsColumnCount = resistanceColumnCount;

var elementsToOmit = eval("[" + JahwsUF.StatusMenuCore.Parameters['Hidden Elements'] + "]");

if(elementsToOmit == undefined)
{
	elementsToOmit = [];
}

JahwsUF.StatusMenuCore.Param.EleResistsToHide = elementsToOmit;

JahwsUF.StatusMenuCore.Param.EleResistsHeader = JahwsUF.StatusMenuCore.Parameters['Ele. Resist Header'];

var displayPercents = eval(JahwsUF.StatusMenuCore.Parameters['Display Ele. Percent']);
if(displayPercents == undefined) displayPercents = true;
JahwsUF.StatusMenuCore.Param.DisplayElePercents = displayPercents;

// -----------------------------

// State resistances page option.

resistanceColumnCount = 1;

for (var i = 1; i <= 3; i++)
{
	var line = "Number(JahwsUF.StatusMenuCore.Parameters['Column " + i + " States'])";

	var state = eval(line);
	JahwsUF.StatusMenuCore.Param.StateResistsInColumn[i-1] = state;
	
	if(state == 0 || state == '' || isNaN(state))
	{
		break;
	}
	else
	{
		resistanceColumnCount = i;
	}
}

JahwsUF.StatusMenuCore.Param.StateResistsColumnCount = resistanceColumnCount;

var statesToOmit = eval("[" + JahwsUF.StatusMenuCore.Parameters['Hidden States'] + "]");

if(statesToOmit == undefined)
{
	statesToOmit = [];
}

JahwsUF.StatusMenuCore.Param.StateResistsToHide = statesToOmit;

JahwsUF.StatusMenuCore.Param.StateResistsHeader = JahwsUF.StatusMenuCore.Parameters['State Resist Header'];

var displayStatePercents = eval(JahwsUF.StatusMenuCore.Parameters['Display State Percent']);
if(displayStatePercents == undefined) displayStatePercents = true;
JahwsUF.StatusMenuCore.Param.DisplayStatePercents = displayStatePercents;

// Resistance classification data loading

var useColors = eval(JahwsUF.StatusMenuCore.Parameters['Use Color']);
if(useColors == undefined) useColors = true;
JahwsUF.StatusMenuCore.Param.ResistancesInColor = useColors;

for (var i = 1; i <= 8; i++)
{
	var line = "JahwsUF.StatusMenuCore.Parameters['Category " + i + " Color']";
	var colorID = eval(line);
	
	if(colorID == undefined) colorID = "";
	
	if(colorID.trim() == "")
		colorID = undefined;
	
	var sysColor = true;
	
	if(useColors == false || colorID == undefined)
		colorID = undefined;
	else {
		if(colorID.indexOf("0x") != -1)
		{
			sysColor = false;
			colorID = "#" + colorID.substring(colorID.indexOf("0x") + 2);
		}
		else if(colorID.indexOf("#") != -1)
		{
			sysColor = false;
		}
		else colorID = Number(colorID);
	}
	
	line = "JahwsUF.StatusMenuCore.Parameters['Category " + i + " Text']";
	var text = eval(line);
	
	line = "Number(JahwsUF.StatusMenuCore.Parameters['Threshold " + i + "'])";
	var percent = eval(line);
	
	JahwsUF.StatusMenuCore.Param.ResistanceLabels[i-1] = text;
	JahwsUF.StatusMenuCore.Param.ResistanceColors[i-1] = colorID;
	JahwsUF.StatusMenuCore.Param.ResistanceSysColors[i-1] = sysColor;
	JahwsUF.StatusMenuCore.Param.ResistanceThresholds[i-1] = percent / 100.0;
}


// Other parameters

var colorID = JahwsUF.StatusMenuCore.Parameters['Color: XP Gauge 1'];
if(colorID == undefined) colorID = 30;
JahwsUF.StatusMenuCore.Param.ColorXpGauge1 = colorID;

var colorID = JahwsUF.StatusMenuCore.Parameters['Color: XP Gauge 2'];
if(colorID == undefined) colorID = 31;
JahwsUF.StatusMenuCore.Param.ColorXpGauge2 = colorID;

var hideXP = eval(JahwsUF.StatusMenuCore.Parameters['Hide XP Bar']);
if(hideXP == undefined) hideXP = false;
JahwsUF.StatusMenuCore.Param.XpHidden = hideXP;

var hideLv = eval(JahwsUF.StatusMenuCore.Parameters['Hide Levels']);
if(hideLv == undefined) hideLv = false;
JahwsUF.StatusMenuCore.Param.LvHidden = hideLv;

var xpDisplayMode = eval(JahwsUF.StatusMenuCore.Parameters['XP - Show Remaining']);
if(xpDisplayMode == undefined) xpDisplayMode = false;
JahwsUF.StatusMenuCore.Param.XpDisplayOnlyRemaining = xpDisplayMode;

var nicknameSetting = eval(JahwsUF.StatusMenuCore.Parameters['Header - Name + Nick']);
if(nicknameSetting == undefined) nicknameSetting = true;
JahwsUF.StatusMenuCore.Param.NicknameInHeaders = nicknameSetting;

var nicknameFormat = JahwsUF.StatusMenuCore.Parameters['Nickname Format'];
if(nicknameFormat == undefined) nicknameSetting = "";
JahwsUF.StatusMenuCore.Param.NicknameFormat = nicknameFormat;

var scrollFactor = eval(JahwsUF.StatusMenuCore.Parameters['Scroll Multiplier']);
if(scrollFactor == undefined) scrollFactor = 1;
JahwsUF.StatusMenuCore.Param.ScrollFactor = scrollFactor;

var imgBuffer = Number(JahwsUF.StatusMenuCore.Parameters['Portrait Img Adjust']);
if(imgBuffer == undefined) imgBuffer = 0;
JahwsUF.StatusMenuCore.Param.ImgBuffer = imgBuffer;

var portraitsAll = eval(JahwsUF.StatusMenuCore.Parameters['Portraits On All']);
if(portraitsAll == undefined) portraitsAll = true;
JahwsUF.StatusMenuCore.Param.DefaultPortrait = portraitsAll;

var headerScrolling = eval(JahwsUF.StatusMenuCore.Parameters['Scrolling Headers']);
if(headerScrolling == undefined) headerScrolling = true;
JahwsUF.StatusMenuCore.Param.HeaderScrolling = headerScrolling;

var tpDisplay = JahwsUF.StatusMenuCore.Parameters['Add TP Gauge'];

if (tpDisplay == undefined)
	tpDisplay = "";

if(tpDisplay.trim() == "" && Imported.YEP_CoreEngine)
{
	tpDisplay = eval(Yanfly.Param.MenuTpGauge);
}
else
{
	tpDisplay = eval(tpDisplay);
	
	if(tpDisplay == undefined) tpDisplay = false;
}

JahwsUF.StatusMenuCore.Param.TpGauge = tpDisplay;

var blankAfterTP = eval(JahwsUF.StatusMenuCore.Parameters['Blank after TP']);
if(blankAfterTP == undefined) blankAfterTP = true;
JahwsUF.StatusMenuCore.Param.ExtraVanillaBlank = blankAfterTP && tpDisplay;


}());




//=============================================================================
// DataManager
//=============================================================================

JahwsUF.StatusMenuCore.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!JahwsUF.StatusMenuCore.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processActorNotetags($dataActors);
		return true;
};

// It's not a method that exists in the base RPG Maker, but it's still wise to back up any older
// versions of this method.
JahwsUF.StatusMenuCore.DataManager_processActorNotetags = DataManager.processActorNotetags;

DataManager.processActorNotetags = function(group) {
	
	if(!!JahwsUF.StatusMenuCore.DataManager_processActorNotetags)
	{
		JahwsUF.StatusMenuCore.DataManager_processActorNotetags.call(this, group);
	}
	
	// Stage 1 - analyze all baseline content.
	
	var profileStart = /<(?:PROFILE)>/i;
	var profileEnd = /<\/(?:PROFILE)>/i;
 
	var switchedProfileStart = /<(?:PROFILE SWITCH):[ ]*(\d+)>/i;
	var switchedProfileEnd = /<\/(?:PROFILE SWITCH)>/i;
	
	var offsetMatcher = /<(?:PORTRAIT OFFSET):[ ]*(\d+)\s*,\s*(\d+)>/i;
	var adjustMatcher = /<(?:PORTRAIT ANTI-BUFFER):[ ]*(-?\d+)>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
				
		var profile = "";
		var profileSpec = false;
		var profileSwitch = undefined;
		
		// Set default value.
		JahwsUF.StatusMenuCore.Param.SwitchedProfiles[n] = [];
		
		// Base portrait parameters.
		
		var portrait = undefined;
		var DefaultScale = 1;
		var DefaultOffset = [0, 0];
		var DefaultAdjust = 0;
		
		var notedata = obj.note.split(/\r?\n/);

		for (var i = 0; i < notedata.length; i++) {
			
			var line = notedata[i];
			if (line.match(/<(?:PORTRAIT):[ ]([\w\s]+)>/i)) {
				portrait = RegExp.$1;
				if (portrait == '') portrait = undefined;
				else ImageManager.loadPicture(portrait);  // Pre-load it!  Otherwise, the first attempt to do so later will fail.
			} 
			else if (line.match(/<(?:PORTRAIT SCALE):[ ]*(\d+.?\d+)>/i)) {
				DefaultScale = parseFloat(RegExp.$1);
				if (DefaultScale < 0) DefaultScale = 0;
			} else if (line.match(offsetMatcher)) {
				DefaultOffset = [parseInt(RegExp.$1), parseInt(RegExp.$2)];
			} else if (line.match(adjustMatcher)) {
				DefaultAdjust = parseInt(RegExp.$1);
			} else if (line.match(profileStart)) {
				profileSpec = true;
				profile = "";
				profileSwitch = undefined;
			} else if (line.match(switchedProfileStart)){
				profileSpec = true;
				profile = "";
				profileSwitch = parseInt(RegExp.$1);
			} else if (line.match(profileEnd) || line.match(switchedProfileEnd)) {
				if(profileSwitch == undefined)
					JahwsUF.StatusMenuCore.Param.ExtendedProfiles[n] = profile;
				else 
				{
					JahwsUF.StatusMenuCore.Param.SwitchedProfiles[n].push([profileSwitch, profile]);
				}
				
				profileSpec = false;
			} else if (profileSpec) {
				if(profile != "")
					profile += "\n";
				profile += line;
			}
		}
		
		// This sets the character's base portrait for this actor.
		JahwsUF.StatusMenuCore.Param.Portraits[n] = [];
		JahwsUF.StatusMenuCore.Param.Portraits[n][0] 
			= new JAH_StatusMenuCore_EnhancedPortrait(portrait, 0, DefaultScale, DefaultOffset, DefaultAdjust);
	}
	
	// Stage 2 - now that default parameters for Actor portraits are in place, we
	// read in all switched profiles.
	
	// New format:   <portrait "filename" switch: s scale: z offset: x, y antibuffer: b>
	
	// The below ought be safe - ':' is not a legal character in filenames.
	
	var portraitDetector = /<(?:PORTRAIT) \s*\"(.+?)\".+>/i;
	var offsetMatcher = /(?:OFFSET):[ ]*(\d+)\s*,\s*(\d+)/i;
	var adjustMatcher = /(?:ANTI-BUFFER):[ ]*(-?\d+)/i;
	var switchMatcher = /(?:SWITCH):[ ]*(\d+)\s*/i;
	var scaleMatcher  = /(?:SCALE):[ ]*(\d+.?\d+)/i

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
				
		var profile = "";
		var profileSpec = false;
		var profileSwitch = undefined;
		
		// Assimilate the original portrait data here.
		var DefaultScale = JahwsUF.StatusMenuCore.Param.Portraits[n][0].Scale;
		var DefaultOffset = JahwsUF.StatusMenuCore.Param.Portraits[n][0].Offset;
		var DefaultAdjust = JahwsUF.StatusMenuCore.Param.Portraits[n][0].BorderAdjustment;
		
		var notedata = obj.note.split(/\r?\n/);

		for (var i = 0; i < notedata.length; i++) {
			
			var line = notedata[i];
			if (line.match(portraitDetector)) {
				var portrait = RegExp.$1;
				
				if (portrait == '') portrait = undefined;
				else ImageManager.loadPicture(portrait);  // Pre-load it!  Otherwise, the first attempt to do so later will fail.
				
				// Now to read in the parameters.
			
				var switchID = -1;
				var scale  = DefaultScale;
				var offset = DefaultOffset;
				var adjust = DefaultAdjust;
			
				if (line.match(switchMatcher)) {
					switchID = parseInt(RegExp.$1);
				}
				
				if (line.match(scaleMatcher)) {
					scale = parseFloat(RegExp.$1);
					if (scale < 0) scale = 0;
				}
				
				if (line.match(offsetMatcher)) {
					offset = [parseInt(RegExp.$1), parseInt(RegExp.$2)];
				}
				
				if (line.match(adjustMatcher)) {
					adjust = parseInt(RegExp.$1);
				} 
				
				if(switchID == 0)
				{
					JahwsUF.StatusMenuCore.Param.Portraits[n][0] = new JAH_StatusMenuCore_EnhancedPortrait(portrait, switchID, scale, offset, adjust);
				}
				else JahwsUF.StatusMenuCore.Param.Portraits[n].push(new JAH_StatusMenuCore_EnhancedPortrait(portrait, switchID, scale, offset, adjust));
			}
		}
	}
};

//================== END PARAMETER INITIALIZATION ===========================


//-----------------------------------------------------------------------------
// Window_Base
//
// A few extra methods/extensions for windows.

// It maps to Window.png, final row, last two colors.  A nice purple gradient by default.
Window_Base.prototype.xpGaugeColor1 = function() {
    return this.textColor(JahwsUF.StatusMenuCore.Param.ColorXpGauge1);
};

Window_Base.prototype.xpGaugeColor2 = function() {
    return this.textColor(JahwsUF.StatusMenuCore.Param.ColorXpGauge2);
};

Window_Base.prototype.xpColor = function(actor) {
    return this.normalColor();
};

Window_Base.prototype.drawActorXp = function(actor, x, y, width, hideNextLv) {
    width = width || 186;  // default value = 186.
    var color1 = this.xpGaugeColor1();
    var color2 = this.xpGaugeColor2();
	
	// Compute ratio and format appropriate values.
	
	var value1 = this._actor.currentExp() - this._actor.currentLevelExp();
	var value2 = this._actor.nextRequiredExp() + value1;
	
	var xpRate = value1 / value2;
	
    if (this._actor.isMaxLevel()) {
        value1 = 0;
        value2 = 0;
		xpRate = 1;
    }
	
	var value3 = value2 - value1;
	
	// Only attempt this if YEP_CoreEngine is loaded; the digit-grouping function is defined there.
	if(Imported.YEP_CoreEngine)
	{
		value1 = Yanfly.Util.toGroup(value1);
		value2 = Yanfly.Util.toGroup(value2);
		value3 = Yanfly.Util.toGroup(value3);
	}
	
	// Draw the gauge itself...
    this.drawGauge(x, y, width, xpRate, color1, color2);  // Should link to Yanfly's correctly.
    this.changeTextColor(this.systemColor());
	
	// Now for the text.  The FUN part.
	var spaceWidth = this.textWidth(" ");
	var expLabelWidth = this.textWidth(TextManager.expA);
	
	var expNext = TextManager.expNext.format(TextManager.levelA);
	var nextLvWidth = this.textWidth(expNext);
	
    this.drawText(TextManager.expA, x + width - expLabelWidth, y, expLabelWidth, 'right');
	
	if(!hideNextLv)
		this.drawText(expNext, x, y, nextLvWidth);
	
	if(JahwsUF.StatusMenuCore.Param.XpDisplayOnlyRemaining)
		this.drawExpRemaining(value3, x, y, width - expLabelWidth - spaceWidth, this.xpColor(actor));
	else
		this.drawExpCurrentAndMax(value1, value2, x, y, width - expLabelWidth - spaceWidth,
                           this.xpColor(actor), this.normalColor());
};

Window_Base.prototype.drawExpRemaining = function(current, x, y, width, color) {
    this.changeTextColor(color);
    this.drawText(current, x, y, width, 'right');
};

Window_Base.prototype.drawExpCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('EXP');	
    var valueWidth = Math.max(this.textWidth('0000'), this.textWidth(max));  // Expands for more digits when necessary.
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;

	var fontSizeChange = 0;
	
	//Dynamic resizing if things get too cramped for the values.
	while(x3 < x + labelWidth)
	{
		fontSizeChange += 4;
		this.contents.fontSize -= 4;
		
		valueWidth = Math.max(this.textWidth('0000'), this.textWidth(max));
		slashWidth = this.textWidth('/');
		x1 = x + width - valueWidth;
		x2 = x1 - slashWidth;
		x3 = x2 - valueWidth;
	}
	
    this.changeTextColor(color1);
    this.drawText(current, x3, y, valueWidth, 'right');
    this.changeTextColor(color2);
    this.drawText('/', x2, y, slashWidth, 'right');
    this.drawText(max, x1, y, valueWidth, 'right');
	
	this.contents.fontSize += fontSizeChange;
};



//-----------------------------------------------------------------------------
// Scene_Status
//
// The scene class of the status screen.  Based upon the original status screen,
// replacing it.

function Scene_Status() {
    this.initialize.apply(this, arguments);
}

Scene_Status.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Status.prototype.constructor = Scene_Status;

Scene_Status.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Status.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	
	// Create the various status subwindows, pass them off to the pageMenuWindow.
	// It'll control which of them shows at any given point.
	
	// These two arrays track all needed data.
	// I'd use a Map, but apparently they're not supported well on mobile devices.  :(
	this._pageNames = [];
	this._pageWindows = [];
	
	// Each page is actually a window.
	// Now that we've got this structure in place, this could be parameterized on a plugin level!
	
	for(var i = 0; i < JahwsUF.StatusMenuCore.Param.TotalPages; i++)
	{
		var page = eval("new " + JahwsUF.StatusMenuCore.Param.PageWindows[i] + "()");
		this.addWindow(page);
		
		if(i != 0) page.hide(); // Page 0 shows by default.
		
		this._pageNames.push(JahwsUF.StatusMenuCore.Param.PageNames[i]);
		this._pageWindows.push(page);
	}
	
	// Now to initialize the core control window.
	this._statusWindow = new JAH_Window_Status_PageSelect(this._pageNames, this._pageWindows);
	this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
    this._statusWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._statusWindow.setHandler('pageup',   this.previousActor.bind(this));
	this.addWindow(this._statusWindow);
	
    this.refreshActor();
};

Scene_Status.prototype.refreshActor = function() {
    var actor = this.actor();
	
	for (var page of this._pageWindows) {
		page.setActor(actor);
		page.refresh();
	}
};

Scene_Status.prototype.onActorChange = function() {
	Scene_MenuBase.prototype.onActorChange.call(this);
	
	for(var page of this._pageWindows)
	{
		page.setActor(this.actor());
	}
	
	this._statusWindow.activate();  // By default, the system will DEACTIVATE this window on page up or page down.
}



//-----------------------------------------------------------------------------
// JAH_Window_Status_PageSelect
//
// The Status menu window - allows selection of the Status page to be viewed.

function JAH_Window_Status_PageSelect() {
	this.initialize.apply(this, arguments);
}

JAH_Window_Status_PageSelect.prototype = Object.create(Window_HorzCommand.prototype);
JAH_Window_Status_PageSelect.prototype.constructor = JAH_Window_Status_PageSelect;

JAH_Window_Status_PageSelect.prototype.initialize = function(pageNames, pageWindows) {

	this._pageNames = pageNames;
	this._pageWindows = pageWindows;

    Window_HorzCommand.prototype.initialize.call(this, 0, 0);
	this.activate();
	
	this._activePage = this.currentSymbol();  // Tracks the previously-open window.
};

JAH_Window_Status_PageSelect.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

JAH_Window_Status_PageSelect.prototype.maxCols = function() {
    return this._pageNames.length;
};

JAH_Window_Status_PageSelect.prototype.update = function() {

    Window_HorzCommand.prototype.update.call(this);
	
	// Each "page" is actually a window.  We need to hide the old page and show the new one
	// upon any change in selected Status page option.
	this._activePage.hide();
	this._activePage = this.currentSymbol();
	this._activePage.show();
	
};

// Extended with wiring + linking for compatibility with other plugins, should they have
// a need to manually refresh the status windows.
JAH_Window_Status_PageSelect.prototype.refresh = function() {

	Window_HorzCommand.prototype.refresh.call(this);
	
	if(this._pageWindows)
	{
		for(var i=0; i < this._pageWindows.length; i++)
		{
			this._pageWindows[i].refresh();
		}
	}	
};

JAH_Window_Status_PageSelect.prototype.makeCommandList = function() {

	// Dynamically constructs the menu given the setup command text and pre-made windows
	// from Scene_Status.
	
	for(var i=0; i < this._pageNames.length; i++)
	{
		this.addCommand(this._pageNames[i], this._pageWindows[i]);
	}
};

JAH_Window_Status_PageSelect.prototype.setPageWindow = function(pageWindow) {
    this._pageWindow = pageWindow;
    this.update();
};

JAH_Window_Status_PageSelect.prototype.isOkEnabled = function() {
    return false;
};
	
JAH_Window_Status_PageSelect.prototype.cursorUp = function(wrap) {

	Window_Selectable.prototype.cursorUp.call(this, wrap);

	//if(this._activePage instanceof JAH_Window_Status_Profile)
	//{
		for(var i = 0; i < JahwsUF.StatusMenuCore.Param.ScrollFactor; i++)
			this._activePage.scrollUp();
	//}
}

JAH_Window_Status_PageSelect.prototype.cursorDown = function(wrap) {

	Window_Selectable.prototype.cursorDown.call(this, wrap);

	//if(this._activePage instanceof JAH_Window_Status_Profile)
	//{
		for(var i = 0; i < JahwsUF.StatusMenuCore.Param.ScrollFactor; i++)
			this._activePage.scrollDown();
	//}
}



//-----------------------------------------------------------------------------
// JAH_Window_Status_Base
//
// Implements standard functionality needed for all Status pages.

function JAH_Window_Status_Base() {
	this.initialize.apply(this, arguments);
}

JAH_Window_Status_Base.prototype = Object.create(Window_Selectable.prototype);
JAH_Window_Status_Base.prototype.constructor = JAH_Window_Status_Base;

// the this.redraw variable is an experimental variable - if the windows are redrawn too often, it could help reduce the unnecessary redraws?

JAH_Window_Status_Base.prototype.initialize = function() {

	var lineHeight = this.lineHeight();
    var width = Graphics.boxWidth;
	//this.redraw = true;
	
	//  It turns out that lineHeight * 2 is exactly the space taken up by the Status page selection menu.
    var height = Graphics.boxHeight - lineHeight * 2;
    Window_Selectable.prototype.initialize.call(this, 0, lineHeight*2, width, height);
    this.refresh();
};

JAH_Window_Status_Base.prototype.scrollDown = function() {
	//this.redraw = true;
	Window_Selectable.prototype.scrollDown.call(this);
}

JAH_Window_Status_Base.prototype.scrollUp = function() {
	//this.redraw = true;
	Window_Selectable.prototype.scrollUp.call(this);
}

JAH_Window_Status_Base.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
		//this.redraw = true;
		
		this.resetScroll(); // Always reset scrolling when changing Actor.
        this.refresh();
    }
};

JAH_Window_Status_Base.prototype.refresh = function() {
    
	//if(this.redraw == false) return;
	//redraw = false;
	
	this.contents.clear();
	
    if (this._actor) {
	
        var lineHeight = this.lineHeight();
		
		var lineIndex = 0;

		if(JahwsUF.StatusMenuCore.Param.HeaderScrolling == true)
			lineIndex -= this.topIndex();  // What is our scroll position?  We've gotta make adjustments based on this. 
			
		// I like to think as the scroll position as the number of lines from the top we must remove.
		// We have to "print negative lines" to even our balance before we print actual lines.
		// It's probably quirky, but that line of reasoning helped me out.  That's why "lineIndex" is always <= 0 here.
			
        var headerSize = this.drawHeaderBlock(lineHeight * 0, lineIndex);
		
		var y = headerSize >= 0 ? headerSize : 0;     // Is our "print marker" off the top of the page (still offscreen) or not?
		lineIndex = headerSize < 0 ? headerSize : 0;
		
		if(JahwsUF.StatusMenuCore.Param.HeaderScrolling == true)
			this.drawPageBlock(lineHeight * y, lineIndex);
		else this.drawPageBlock(lineHeight * y, -this.topIndex());  // If our header is fixed-position, then the page block must absorb all scrolling req'ts.
    }
};

// Override this in derived pages/windows for their particular contents.
JAH_Window_Status_Base.prototype.drawPageBlock = function(y, lineIndex) {
}

JAH_Window_Status_Base.prototype.availableWidth = function(portraitMode) {
	if(portraitMode || this.isPortraitMode())
	{
		var portraitInfo = this.getActorPortraitInfo();
		var portrait = ImageManager.loadPicture(portraitInfo.Portrait);
		var scale = portraitInfo.Scale;
		var xOffset = portraitInfo.Offset[0];
		var adjust = portraitInfo.BorderAdjustment;
		
		return this.contentsWidth() - Math.floor(portrait.width * scale) - JahwsUF.StatusMenuCore.Param.ImgBuffer + xOffset + adjust;
	}
	else return this.contentsWidth();
}

JAH_Window_Status_Base.prototype.getActorPortraitInfo = function() {
	
	var switchedPortraitList = JahwsUF.StatusMenuCore.Param.Portraits[this._actor._actorId];
	
	// Index 0 is the default portrait instead.
	
	for(var i = 1; i < switchedPortraitList.length; i++)
	{
		if($gameSwitches.value(switchedPortraitList[i].Switch))
			return switchedPortraitList[i];
	}
	
	return JahwsUF.StatusMenuCore.Param.Portraits[this._actor._actorId][0];
};

// JAH_Window_Status_Base.prototype.getActorPortraitName = function() {
	// return this.getActorPortraitInfo().Portrait;
// };

// JAH_Window_Status_Base.prototype.getActorPortraitScale = function() {
	// return this.getActorPortraitInfo().Scale;
// };

// JAH_Window_Status_Base.prototype.getActorPortraitOffsets = function() {
	// return this.getActorPortraitInfo().Offset;
// };

// JAH_Window_Status_Base.prototype.getActorPortraitBorderAdjustment = function() {
	// return this.getActorPortraitInfo().BorderAdjustment;
// };

JAH_Window_Status_Base.prototype.drawHeaderBlock = function(y, lineIndex) {

	if(this.isPortraitMode())
	{
		return this.drawPortraitHeader(y, lineIndex);
	}
	else
	{
		return this.drawVanillaHeader(y, lineIndex);
	}
};

JAH_Window_Status_Base.prototype.drawPortraitHeader = function(y, lineIndex) 
{
	// Top-left of header:  name + nickname.
	var lineHeight = this.lineHeight();
	
	if(lineIndex == 0)
	{
		this.drawActorName(this._actor, this.standardPadding(), y);
		
		var x = this.textWidth(this._actor.name());
		var nickname = this._actor.nickname();
		
		if(nickname == undefined);
			nickname = "";
			
		if(nickname.trim() != "")
		{
			nickname = JahwsUF.StatusMenuCore.Param.NicknameFormat.format(nickname);		
			this.drawText(nickname, x + this.standardPadding(), y, this.textWidth(nickname));
		}
		
		// Top-right of header: lv + class.
		this.changeTextColor(this.systemColor());	
		var classText = " " + this._actor.currentClass().name;
		var classWidth = this.textWidth(classText);
		this.drawText(classText, this.contentsWidth() - classWidth, y, classWidth);
		
		if(JahwsUF.StatusMenuCore.Param.LvHidden != true)
		{
			var topRightWidth = classWidth;
			var levelValueWidth = this.textWidth(" ") + this.textWidth(this._actor.level);
			topRightWidth += levelValueWidth;
			this.drawText(this._actor.level, this.contentsWidth() - topRightWidth, y, levelValueWidth, 'right');
			
			var levelTextWidth = this.textWidth(TextManager.level);
			topRightWidth += levelTextWidth;

			this.drawText(TextManager.level, this.contentsWidth() - topRightWidth, y, levelTextWidth);
		}
		this.resetTextColor();
	}
	
	// Other left-side header lines:
	this.drawActorIcons(this._actor, this.standardPadding(), y + lineHeight * (1 + lineIndex));
	
	var xpBarWidth = Math.max(Math.floor(this.contentsWidth() / (2 * 1.61803398875)) - this.standardPadding(), 320);  // 1.618... = golden ratio, hence its use.
	
	if(JahwsUF.StatusMenuCore.Param.XpHidden != true)
	{
		this.drawActorXp(this._actor, this.standardPadding(), y + lineHeight * (2 + lineIndex), xpBarWidth);
		this.drawHorzLine(y + lineHeight * (3 + lineIndex));
	}
	else
	{
		this.drawHorzLine(y + lineHeight * (2 + lineIndex));
	}
	
	// Bottom-left of page - auto-display the character's portrait.
	var portraitInfo = this.getActorPortraitInfo();
	var portrait = ImageManager.loadPicture(portraitInfo.Portrait);
	var scale = portraitInfo.Scale;

	//Bitmap object is specified in rpg_core.js.  You can check the specs there.
	//Profile image first in case anyone wants to get fancy and put text on top of it for some crazy reason.
	
	var offsets = portraitInfo.Offset;
	
	this.contents.blt(portrait, 0, 0, portrait.width, portrait.height,  // Image, top-left (x,y) from source image, source width + height to use
	this.contentsWidth() - Math.floor(portrait.width * scale) + offsets[0], this.contentsHeight() - Math.floor(portrait.height * scale) + offsets[1], // destination (x, y) to use.  Of note - anything past contentsWidth() + contentsHeight() is auto-clipped!
	Math.floor(portrait.width * scale), Math.floor(portrait.height * scale)); // destination width, height - can be used to scale!
	
	if(JahwsUF.StatusMenuCore.Param.XpHidden == true)
		return 3 + lineIndex;
	else
		return 4 + lineIndex;  // Number of lines drawn.  Includes horizontal line.
}

JAH_Window_Status_Base.prototype.drawVanillaHeader = function(y, lineIndex) 
{
	var lineHeight = this.lineHeight();

	var offset = 0;
	
	var dropLine = JahwsUF.StatusMenuCore.Param.LvHidden && JahwsUF.StatusMenuCore.Param.XpHidden;

	if(JahwsUF.StatusMenuCore.Param.ExtraVanillaBlank == true && !dropLine)
		offset = Math.ceil(lineHeight / 2);
	
	this.drawActorFace(this._actor, this.standardPadding(), y + lineIndex * lineHeight + offset);
	
	var w = Math.max(367, 204 + this.width * 0.45);
	this.drawBasicInfo(204, y, w, lineIndex);
	
	var gaugeX = Math.max(571, w);
	this.drawGauges(gaugeX, y, this.contentsWidth() - gaugeX - this.standardPadding(), lineIndex);
	
	var dropLine = JahwsUF.StatusMenuCore.Param.LvHidden && JahwsUF.StatusMenuCore.Param.XpHidden;
		
	if(JahwsUF.StatusMenuCore.Param.ExtraVanillaBlank == true)
	{
		this.drawHorzLine(lineHeight * (5 + lineIndex - (dropLine ? 1 : 0)) + y);

		return 6 + lineIndex - (dropLine ? 1 : 0);
	}
	else 
	{
		// The standard Actor images need 4 lines for display.  Leave them enough space.
		
		this.drawHorzLine(lineHeight * (4 + lineIndex) + y);

		return 5 + lineIndex;  // Number of lines drawn.  Includes horizontal line.
	}
}

JAH_Window_Status_Base.prototype.getHeaderLineCount = function(portraitMode) {
	
	if(portraitMode || this.isPortraitMode())
	{
		if(JahwsUF.StatusMenuCore.Param.XpHidden == true)
			return 3;
		else
			return 4;
	}
	else 
	{
		var dropLine = JahwsUF.StatusMenuCore.Param.LvHidden && JahwsUF.StatusMenuCore.Param.XpHidden;
		
		if(JahwsUF.StatusMenuCore.Param.ExtraVanillaBlank == true)
			return 6 - (dropLine ? 1 : 0);
		else return 5; // Minimum amount of space b/c of Actor image.
	}
}

JAH_Window_Status_Base.prototype.getVisibleHeaderLineCount = function(portraitMode) {
	return this.getHeaderLineCount() - this.topIndex();
}

JAH_Window_Status_Base.prototype.getLineCount = function(portraitMode) {
	return this.getHeaderLineCount();
}

JAH_Window_Status_Base.prototype.maxItems = function() {
	if(this._actor == undefined)
		return 1;
	else return this.getLineCount();
}

JAH_Window_Status_Base.prototype.hasAvailablePortrait = function() {
	return this.getActorPortraitInfo().Portrait != undefined;
}

if(JahwsUF.StatusMenuCore.Param.DefaultPortrait)
{
	JAH_Window_Status_Base.prototype.isPortraitMode = function() {
	return this.hasAvailablePortrait();
	};
}
else
{
	JAH_Window_Status_Base.prototype.isPortraitMode = function() {
	return false;
	};
}

JAH_Window_Status_Base.prototype.drawHorzLine = function(y, width) {

	if(width == undefined)
		width = this.contentsWidth();

    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, width, 2, this.lineColor());
    this.contents.paintOpacity = 255;
};

JAH_Window_Status_Base.prototype.lineColor = function() {
    return this.normalColor();
};

// TODO:  Fix printing "Experience to next level" string.  It should be part of the gauges, really.
JAH_Window_Status_Base.prototype.drawBasicInfo = function(x, y, width, lineIndex) {

    var lineHeight = this.lineHeight();
	
	if(JahwsUF.StatusMenuCore.Param.NicknameInHeaders)
	{
		var nameWidth = this.textWidth(this._actor.name());
		
		//this.drawActorName(this._actor, x, y); // Happens anyway below.
		if(this._actor.nickname() != undefined && this._actor.nickname() != "")
		{
			var nickname = this._actor.nickname();
			
			nickname = JahwsUF.StatusMenuCore.Param.NicknameFormat.format(nickname);
				
			this.drawText(nickname, x + nameWidth, y + lineHeight * lineIndex, width - nameWidth - this.standardPadding());
		}
	}
	this.drawActorName    (this._actor, x      , y + lineHeight * (0 + lineIndex));

	this.drawActorClass   (this._actor, x      , y + lineHeight * (1 + lineIndex));
    this.drawActorIcons   (this._actor, x      , y + lineHeight * (2 + lineIndex));
	
	if(JahwsUF.StatusMenuCore.Param.LvHidden != true)
	{
		if(JahwsUF.StatusMenuCore.Param.ExtraVanillaBlank == true)
			 this.drawActorLevel   (this._actor, x      , y + lineHeight * (4 + lineIndex));
		else this.drawActorLevel   (this._actor, x      , y + lineHeight * (3 + lineIndex));
	}
};

JAH_Window_Status_Base.prototype.drawGauges = function(x, y, width, lineIndex) {
    var lineHeight = this.lineHeight();

    this.changeTextColor(this.systemColor());

	this.drawActorHp(this._actor, x, y + lineHeight * (0 + lineIndex), width);
    this.drawActorMp(this._actor, x, y + lineHeight * (1 + lineIndex), width);
	
	if(JahwsUF.StatusMenuCore.Param.TpGauge)
		this.drawActorTp(this._actor, x, y + lineHeight * (2 + lineIndex), width);
		
	
	var xpBarWidth = Math.max(width, 320);  // Make sure the bar gets plenty of room.
	if(JahwsUF.StatusMenuCore.Param.ExtraVanillaBlank == true && JahwsUF.StatusMenuCore.Param.XpHidden != true)
		this.drawActorXp(this._actor, x + width - xpBarWidth, y + lineHeight * (4 + lineIndex), xpBarWidth);
	else if(JahwsUF.StatusMenuCore.Param.XpHidden != true)
		this.drawActorXp(this._actor, x + width - xpBarWidth, y + lineHeight * (3 + lineIndex), xpBarWidth);
};


//-----------------------------------------------------------------------------
// JAH_Window_Status_ParamsBase
//
// Implements a Status page that displays a single Actor's parameters.

function JAH_Window_Status_ParamsBase() {
	this.initialize.apply(this, arguments);
}

JAH_Window_Status_ParamsBase.prototype = Object.create(JAH_Window_Status_Base.prototype);
JAH_Window_Status_ParamsBase.prototype.constructor = JAH_Window_Status_ParamsBase;

JAH_Window_Status_ParamsBase.prototype.initialize = function(pageId) {
    JAH_Window_Status_Base.prototype.initialize.call(this);
	
	this.pageId = pageId;
	this._pageParameterization = JahwsUF.StatusMenuCore.Param.ParamPages[pageId];
};

JAH_Window_Status_ParamsBase.prototype.drawPageBlock = function(y, lineIndex) {

    var lineHeight = this.lineHeight();
	
	var paramColumnsRequested = this._pageParameterization.Columns.length;
	//JahwsUF.StatusMenuCore.Param.ColumnCount;	
	
	
	// Optimization note - much of this data can be precomputed for the page!
	// Analyze the amount of available horizontal space - can we show equipment?
	
	var requestedColumnSpacing = this._pageParameterization.RequiredColumnWidth + 2 * paramColumnsRequested * this.standardPadding();
	var availableWidth = this.availableWidth();  // Account for window margins + visual whitespace.
	
	var displayEquips = false;
	
	var totalRequiredWidthWithEquips = requestedColumnSpacing + this._pageParameterization.EquipColumnWidth + 2 * this.standardPadding();
	
	if(totalRequiredWidthWithEquips < availableWidth && eval(this._pageParameterization.DisplayEquips) == true)
	{
		displayEquips = true;
	}
	
	// Determine the optimum padding from the margins (1 * evenPaddingAmount) and between columns (2 * evenPaddingAmount).
	var totalRequestedSpacing = displayEquips == true ? totalRequiredWidthWithEquips : requestedColumnSpacing;
	var totalActivatedColumns = paramColumnsRequested + (displayEquips == true ? 1 : 0);
	
	// Determine the actual spacings to be utilized.
	
	//var evenPaddingAmount = (availableWidth - columnsRequested * columnWidth - (displayEquips == true ? 2 * this.standardPadding() : 0)) / (2 * columnsRequested);
	var evenPaddingAmount = (availableWidth - totalRequestedSpacing) / (2 * totalActivatedColumns) + this.standardPadding();
	
	// Start of the drawing process.
	var x = evenPaddingAmount;
	var column = 0;
	
	
	// Aethestics calculations now complete.  Time to actually display ALL the things!
    for (column = 0; column < this._pageParameterization.Columns.length; column++) {
		
		// Start of column.
		var y2 = y;
		var l2 = lineIndex;
		
		if(column > 0)
		{
			x += this._pageParameterization.Columns[column - 1].TextWidth + this._pageParameterization.Columns[column - 1].ValueWidth + 2 * evenPaddingAmount;
		}
		
		for (var row = 0; row < this._pageParameterization.Columns[column].Size; row++) {
		
			var paramEntry = this._pageParameterization.Columns[column].Entries[row];
			
			if(!(paramEntry == undefined))
			{
				if(l2 >= 0)
				{
					paramEntry.draw(this, x, y2);
				}
			}
			
			l2 += 1;

			if(l2 > 0)
				y2 += lineHeight;

		}
    }
	
	x += this._pageParameterization.Columns[column - 1].TextWidth + this._pageParameterization.Columns[column - 1].ValueWidth + 2 * evenPaddingAmount;
	
	if(displayEquips)
		this.drawEquipments(x, y + lineHeight * lineIndex);
};

JAH_Window_Status_ParamsBase.prototype.getLineCount = function(portraitMode) {
	
	var maxCol = 0;
	
	for(var i = 0; i < this._pageParameterization.Columns.length; i++)
	{
		if(maxCol < this._pageParameterization.Columns[i].Size)
			maxCol = this._pageParameterization.Columns[i].Size;
	}
	
	return maxCol + this.getHeaderLineCount();
}

JAH_Window_Status_ParamsBase.prototype.drawEquipments = function(x, y) {
    var equips = this._actor.equips();
    var count = equips.length;
    for (var i = 0; i < count; i++) {
        this.drawItemName(equips[i], x, y + this.lineHeight() * i);
    }
};

//-----------------------------------------------------------------------------
// JAH_Window_Status_Params
//
// Implements a Status page that displays a single Actor's parameters.

function JAH_Window_Status_Params() {
	this.initialize.apply(this, arguments);
}

JAH_Window_Status_Params.prototype = Object.create(JAH_Window_Status_ParamsBase.prototype);
JAH_Window_Status_Params.prototype.constructor = JAH_Window_Status_Params;

JAH_Window_Status_Params.prototype.initialize = function() {
    JAH_Window_Status_ParamsBase.prototype.initialize.call(this, 0);
};

//-----------------------------------------------------------------------------
// JAH_Window_Status_Resistances
//
// Implements a Status page that displays a single Actor's ELEMENTAL resistance data.
// I'd love to change the name to something more fitting, but it'd break a few things.

function JAH_Window_Status_Resistances() {
	this.initialize.apply(this, arguments);
}

JAH_Window_Status_Resistances.prototype = Object.create(JAH_Window_Status_Base.prototype);
JAH_Window_Status_Resistances.prototype.constructor = JAH_Window_Status_Resistances;

JAH_Window_Status_Resistances.prototype.initialize = function() {
    JAH_Window_Status_Base.prototype.initialize.call(this);
};

JAH_Window_Status_Resistances.prototype.categorizePercentValue = function(val) {
	
	for(var i = 0; i < JahwsUF.StatusMenuCore.Param.ResistanceCategories; i++)
	{
		if(val >= JahwsUF.StatusMenuCore.Param.ResistanceThresholds[i])
		{
			return i;
		}
	}
	
	return 7;
}

JAH_Window_Status_Resistances.prototype.drawPageBlock = function(y, lineIndex) {

    var lineHeight = this.lineHeight();
	
	var columnCount = JahwsUF.StatusMenuCore.Param.EleResistsColumnCount;	
	
	var maxNameWidth = 0;
	var maxLabelWidth = 0;
	var percentWidth = 80;
	
	for (var i = 1; i < $dataSystem.elements.length; i++)
	{
		var name = $dataSystem.elements[i];  // TextManager is not configured to provide this String, so I grab it from the global variables instead.
		var width = this.textWidth(name);
		
		if(width > maxNameWidth) maxNameWidth = width;
	}
	
	maxNameWidth += this.standardPadding();
	
	for (var i = 0; i < JahwsUF.StatusMenuCore.Param.ResistanceCategories; i++)
	{
		var name = JahwsUF.StatusMenuCore.Param.ResistanceLabels[i];
		var width = this.textWidth(name);
		
		if(width > maxLabelWidth) maxLabelWidth = width;
	}
	
	var valueWidth = JahwsUF.StatusMenuCore.Param.DisplayElePercents == true ? percentWidth : maxLabelWidth;
	
	var totalElements = $dataSystem.elements.length - 1;  // Remember, the system leaves index 0 as null.  We don't count that.
	
	var availableWidth = this.availableWidth();  // Account for window margins + visual whitespace.
	var evenPaddingAmount = (availableWidth - (maxNameWidth + valueWidth) * columnCount) / (2 * columnCount);

	var headerWidth = (availableWidth - 4 * this.standardPadding());
	
	var header = JahwsUF.StatusMenuCore.Param.EleResistsHeader;
	
	if(header == undefined)
		header == "";
		
	if(header.trim() == "")
		header = "";
	
	if(lineIndex == 0 && header != "")
	{
		this.drawText(header, (availableWidth - headerWidth) / 2, y, headerWidth, 'center');
		lineIndex = lineIndex + 2;	
	}
	
	//If there's a header.

	y = y + Math.max(Math.min(2, lineIndex), 0) * this.lineHeight();
	
	// Start of the drawing process.
	var x = evenPaddingAmount;
	
	var column = 0;
	var columnRemaining = JahwsUF.StatusMenuCore.Param.EleResistsInColumn[0];
	
	var y2 = y;
	var l2 = lineIndex;
	
    for (i = 1; i <= totalElements; i++) {
 
		//Is this an element to skip?
		
		var skip = false;
		
		for(var j = 0; j < JahwsUF.StatusMenuCore.Param.EleResistsToHide.length; j++)
		{
			if(JahwsUF.StatusMenuCore.Param.EleResistsToHide[j] == i) 
			{
				skip = true;
				break;
			}
		}
		
		if(skip) continue;

		// No skipping this one - proceed to display!
 
		if(l2 >= 0)
		{
			this.changeTextColor(this.systemColor());
			
			var name = $dataSystem.elements[i];
			
			this.drawText(name, x, y2, maxNameWidth);
			this.resetTextColor();
			
			var value = this._actor.elementRate(i);
			var categoryIndex = this.categorizePercentValue(value);
			
			var color = JahwsUF.StatusMenuCore.Param.ResistanceColors[categoryIndex];
			
			if(color != undefined)
			{
				if(JahwsUF.StatusMenuCore.Param.ResistanceSysColors[categoryIndex] == false)
					this.changeTextColor(color);  // We interpreted a hex color.
				else this.changeTextColor(this.textColor(color));  //this.textColor RETRIEVES the color based on its ID!  Interesting, so you can specify other colors.
			}
			
			var align = "right";
			
			if(JahwsUF.StatusMenuCore.Param.CenterEleValues)
				align = "center";
			
			if(JahwsUF.StatusMenuCore.Param.DisplayElePercents)
			{
				var formattedValue = Math.round(value * 100) + "%";
				this.drawText(formattedValue, x + maxNameWidth, y2, valueWidth, align);
			}
			else
			{
				var resistText = JahwsUF.StatusMenuCore.Param.ResistanceLabels[categoryIndex];
				this.drawText(resistText, x + maxNameWidth, y2, valueWidth, align);
			}
			
			this.resetTextColor();
			
			y2 += lineHeight;
		}
		
		l2++;
		
		columnRemaining--;
		if(columnRemaining == 0) // Column done!
		{
			x += maxNameWidth + valueWidth + 2 * evenPaddingAmount;
			y2 = y;
			l2 = lineIndex;
			
			column++;

			if(column == columnCount)
				break;
				
			columnRemaining = JahwsUF.StatusMenuCore.Param.EleResistsInColumn[column];
		}
    }
};

JAH_Window_Status_Resistances.prototype.getLineCount = function(portraitMode) {
	
	var maxCol = 0;
	
	for(var i = 0; i < JahwsUF.StatusMenuCore.Param.EleResistsColumnCount; i++)
	{
		if(maxCol < JahwsUF.StatusMenuCore.Param.EleResistsInColumn[i])
			maxCol = JahwsUF.StatusMenuCore.Param.EleResistsInColumn[i];
	}
	
	var header = JahwsUF.StatusMenuCore.Param.EleResistsHeader;
	
	if(header == undefined)
		header == "";
		
	if(header.trim() == "")
		header = "";
		
	if(header != "")
		maxCol += 2;  // Two lines taken to print the header.
	
	return maxCol + this.getHeaderLineCount();
}

//-----------------------------------------------------------------------------
// JAH_Window_State_Resistances
//
// Implements a Status page that displays a single Actor's state resistance data.

function JAH_Window_State_Resistances() {
	this.initialize.apply(this, arguments);
}

JAH_Window_State_Resistances.prototype = Object.create(JAH_Window_Status_Base.prototype);
JAH_Window_State_Resistances.prototype.constructor = JAH_Window_State_Resistances;

JAH_Window_State_Resistances.prototype.initialize = function() {
    JAH_Window_Status_Base.prototype.initialize.call(this);
};

JAH_Window_State_Resistances.prototype.categorizePercentValue = function(val) {
	
	for(var i = 0; i < JahwsUF.StatusMenuCore.Param.ResistanceCategories; i++)
	{
		if(val >= JahwsUF.StatusMenuCore.Param.ResistanceThresholds[i])
		{
			return i;
		}
	}
	
	return 7;
}

JAH_Window_State_Resistances.prototype.drawPageBlock = function(y, lineIndex) {

    var lineHeight = this.lineHeight();
	
	var columnCount = JahwsUF.StatusMenuCore.Param.StateResistsColumnCount;	
	
	var maxNameWidth = 0;
	var maxLabelWidth = 0;
	var percentWidth = 80;
	
	for (var i = 1; i < $dataStates.length; i++)
	{
		var name = $dataStates[i].name;  // TextManager is not configured to provide this String, so I grab it from the global variables instead.
		var width = this.textWidth(name);
		
		if(width > maxNameWidth) maxNameWidth = width;
	}
	
	maxNameWidth += this.standardPadding();
	
	for (var i = 0; i < JahwsUF.StatusMenuCore.Param.ResistanceCategories; i++)
	{
		var name = JahwsUF.StatusMenuCore.Param.ResistanceLabels[i];
		var width = this.textWidth(name);
		
		if(width > maxLabelWidth) maxLabelWidth = width;
	}
	
	var valueWidth = JahwsUF.StatusMenuCore.Param.DisplayStatePercents == true ? percentWidth : maxLabelWidth;
	
	var totalStates = $dataStates.length - 1;  // Remember, the system leaves index 0 as null.  We don't count that.
	
	var availableWidth = this.availableWidth();  // Account for window margins + visual whitespace.
	var evenPaddingAmount = (availableWidth - (maxNameWidth + valueWidth) * columnCount) / (2 * columnCount);

	var headerWidth = (availableWidth - 4 * this.standardPadding());
	
	var header = JahwsUF.StatusMenuCore.Param.StateResistsHeader;
	
	if(header == undefined)
		header == "";
		
	if(header.trim() == "")
		header = "";
	
	if(lineIndex == 0 && header != "")
	{
		this.drawText(header, (availableWidth - headerWidth) / 2, y, headerWidth, 'center');
		lineIndex = lineIndex + 2;	
	}
	
	//If there's a header.

	y = y + Math.max(Math.min(2, lineIndex), 0) * this.lineHeight();
	
	// Start of the drawing process.
	var x = evenPaddingAmount;
	
	var column = 0;
	var columnRemaining = JahwsUF.StatusMenuCore.Param.StateResistsInColumn[0];
	
	var y2 = y;
	var l2 = lineIndex;
	
    for (i = 1; i <= totalStates; i++) {
 
		//Is this a state to skip?
		
		var skip = false;
		
		for(var j = 0; j < JahwsUF.StatusMenuCore.Param.StateResistsToHide.length; j++)
		{
			if(JahwsUF.StatusMenuCore.Param.StateResistsToHide[j] == i) 
			{
				skip = true;
				break;
			}
		}
		
		if(skip) continue;

		// No skipping this one - proceed to display!
 
		if(l2 >= 0)
		{
			this.changeTextColor(this.systemColor());
			
			var name = $dataStates[i].name;
			
			this.drawText(name, x, y2, maxNameWidth);
			this.resetTextColor();
			
			var value = this._actor.stateRate(i);
			
			if(this._actor.isStateResist(i))  // This state is utterly, 100% negated.  Undeniable immunity.
				value = 0;
			
			var categoryIndex = this.categorizePercentValue(value);
			
			var color = JahwsUF.StatusMenuCore.Param.ResistanceColors[categoryIndex];
			
			if(color != undefined)
			{
				if(JahwsUF.StatusMenuCore.Param.ResistanceSysColors[categoryIndex] == false)
					this.changeTextColor(color);  // We interpreted a hex color.
				else this.changeTextColor(this.textColor(color));  //this.textColor RETRIEVES the color based on its ID!  Interesting, so you can specify other colors.
			}
			
			var align = "right";
			
			if(JahwsUF.StatusMenuCore.Param.CenterStateValues)
				align = "center";
							
			if(JahwsUF.StatusMenuCore.Param.DisplayStatePercents)
			{
				var formattedValue = Math.round(value * 100) + "%";
				this.drawText(formattedValue, x + maxNameWidth, y2, valueWidth, align);
			}
			else
			{
				var resistText = JahwsUF.StatusMenuCore.Param.ResistanceLabels[categoryIndex];
				this.drawText(resistText, x + maxNameWidth, y2, valueWidth, align);
			}
			
			this.resetTextColor();
			
			y2 += lineHeight;
		}
		
		l2++;
		
		columnRemaining--;
		if(columnRemaining == 0) // Column done!
		{
			x += maxNameWidth + valueWidth + 2 * evenPaddingAmount;
			y2 = y;
			l2 = lineIndex;
			
			column++;

			if(column == columnCount)
				break;
				
			columnRemaining = JahwsUF.StatusMenuCore.Param.StateResistsInColumn[column];
		}
    }
};

JAH_Window_State_Resistances.prototype.getLineCount = function(portraitMode) {
	
	var maxCol = 0;
	
	for(var i = 0; i < JahwsUF.StatusMenuCore.Param.StateResistsColumnCount; i++)
	{
		if(maxCol < JahwsUF.StatusMenuCore.Param.StateResistsInColumn[i])
			maxCol = JahwsUF.StatusMenuCore.Param.StateResistsInColumn[i];
	}
	
	var header = JahwsUF.StatusMenuCore.Param.StateResistsHeader;
	
	if(header == undefined)
		header == "";
		
	if(header.trim() == "")
		header = "";
		
	if(header != "")
		maxCol += 2;  // Two lines taken to print the header.
	
	return maxCol + this.getHeaderLineCount();
}

//-----------------------------------------------------------------------------
// JAH_Window_Profile_Texter
//
// A hidden window utilized by the Profile page in order to do profile text operations.
// Facilitates escape codes, aids compatibility with word-wrapping plugins.
//

function JAH_Window_Profile_Texter() {
	this.initialize.apply(this, arguments);
}

JAH_Window_Profile_Texter.prototype = Object.create(Window_Base.prototype);
JAH_Window_Profile_Texter.prototype.constructor = JAH_Window_Profile_Texter;

JAH_Window_Profile_Texter.prototype.initialize = function(cWidth, cHeight) {
	Window_Base.prototype.initialize.call(this, 0, 0, cWidth + 2 * this.standardPadding(),
	                                                  cHeight + 2 * this.standardPadding());
	
	this.hide();
}

// Duplicate these methods from the base class.  It's actually safe, 'cause Javascript logic.
JAH_Window_Profile_Texter.prototype.drawHorzLine = JAH_Window_Status_Base.prototype.drawHorzLine;
JAH_Window_Profile_Texter.prototype.lineColor = JAH_Window_Status_Base.prototype.lineColor;

JAH_Window_Profile_Texter.prototype.convertEscapeCharacters = function(text) {

	text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
	
	// Our custom conversion comes after the others; they eliminate '\n's. 
	text = text.replace(/<hr>/g, '\x1bhr');
	
	return text;
}

JAH_Window_Profile_Texter.prototype.processEscapeCharacter = function(code, textState) {
	Window_Base.prototype.processEscapeCharacter.call(this, code, textState)
	
	if(code == "HR")
	{
		this.drawHorzLine(textState.y);
	}
}
//-----------------------------------------------------------------------------
// JAH_Window_Status_Profile
//
// Implements a Status page that displays a single Actor's parameters.
//

function JAH_Window_Status_Profile() {
	this.initialize.apply(this, arguments);
}

JAH_Window_Status_Profile.prototype = Object.create(JAH_Window_Status_Base.prototype);
JAH_Window_Status_Profile.prototype.constructor = JAH_Window_Status_Profile;

JAH_Window_Status_Profile.prototype.initialize = function() {

    JAH_Window_Status_Base.prototype.initialize.call(this);
	
	this.hiddenTextWindow = new JAH_Window_Profile_Texter(this.contentsWidth(), this.contentsHeight());
	this.totalLineCount = undefined; // Stores pre-computed line count information; it's an expensive calculation.
	//this.scrolledLines = 0;
};

//// Needed to be able to scroll.  Each item is one line height by default, anyway, which makes this REALLY convenient.
//JAH_Window_Status_Profile.prototype.maxItems = function(){
//	return this.getLineCount();
//}

JAH_Window_Status_Profile.prototype.getExtendedActorProfile = function() {
	var profile = JahwsUF.StatusMenuCore.Param.ExtendedProfiles[this._actor._actorId];
	
	var switchedProfileList = JahwsUF.StatusMenuCore.Param.SwitchedProfiles[this._actor._actorId];
	
	for(var i = 0; i < switchedProfileList.length; i++)
	{
		if($gameSwitches.value(switchedProfileList[i][0]))
			return switchedProfileList[i][1];
	}
	
	return profile;
};

JAH_Window_Status_Profile.prototype.setActor = function(actor) {

	this.totalLineCount = undefined;
	JAH_Window_Status_Base.prototype.setActor.call(this, actor);
	this.totalLineCount = this.getLineCount();

	//this.refresh();
}
 
JAH_Window_Status_Profile.prototype.getLineCount = function() {
	
	if(this._actor == undefined) return 1;  // Nothing to see here if we've not yet loaded an Actor.

	if(this.totalLineCount) return this.totalLineCount;
	
	this.hiddenTextWindow.width = this.availableWidth() + 2 * this.standardPadding();
	this.hiddenTextWindow.height = this.contentsHeight() + 2 * this.standardPadding() - this.getVisibleHeaderLineCount() * this.lineHeight();
	this.hiddenTextWindow.updateTransform();
	
	this.hiddenTextWindow.contents = new Bitmap(this.availableWidth(), this.contentsHeight());
	
	var exProfile = this.getExtendedActorProfile();
	var totalHeight = 0;
	
	if(exProfile != undefined)
	{
		//totalLines = exProfile.split('\n').length;
		var textState = { index: 0, x: 12, y: 0, left: 12 };
		textState.text = this.hiddenTextWindow.convertEscapeCharacters.call(this.hiddenTextWindow, exProfile);  
		
		totalHeight = this.calcTextHeight.call(this.hiddenTextWindow, textState, true);
	}
		
	if(this._actor.profile() != undefined && this._actor.profile() != "")
	{
		//totalLines += 3;
		
		var textState = { index: 0, x: 12, y: 0, left: 12 };
		textState.text = this.convertEscapeCharacters.call(this.hiddenTextWindow, this._actor.profile());  
		
		totalHeight += this.calcTextHeight.call(this.hiddenTextWindow, textState, true) + this.lineHeight();
	}
		
	var totalLines = Math.ceil(totalHeight / this.lineHeight());
	
	totalLines += this.getHeaderLineCount();
	
	if(!(this.isPortraitMode() || JahwsUF.StatusMenuCore.Param.NicknameInHeaders))
	{
		totalLines += 2; // Include space for the nickname!
	}
	
	this.totalLineCount = totalLines;
	
	return totalLines;
};

JAH_Window_Status_Profile.prototype.drawPageBlock = function(y, lineIndex) {
    this.drawProfile(12, y, lineIndex);
};

// Profiles will ALWAYS use the portrait if it's available.
JAH_Window_Status_Profile.prototype.isPortraitMode = function() {
	return this.hasAvailablePortrait();
};

JAH_Window_Status_Profile.prototype.drawProfile = function(x, y, lineOffset) {
	
	//var topIndex = this.topIndex();  // Gotta make adjustments based on this.
	//var lineOffset = -topIndex;
	
	// If anything should be printed above the original y, based upon topIndex, it should never be printed.
	// Otherwise, offset.
	
	if(!this.isPortraitMode())
	{
		var nickname = this._actor.nickname();
		
		if(nickname == '') nickname = undefined;
	
		// If we don't have a portrait...
		if(!JahwsUF.StatusMenuCore.Param.NicknameInHeaders && nickname != undefined)
		{
			if(lineOffset == 0)
			{
				var nickname = this._actor.nickname();
				
				if(JahwsUF.StatusMenuCore.Param.NicknameFormat.indexOf("\"") != -1)
				nickname = "\"" + nickname + "\"";
				
				this.drawText(nickname, x, y, this.textWidth(nickname));
			}
				
			lineOffset += 2;
		}
		
		if(this._actor.profile() != undefined && this._actor.profile() != "")
		{
			// Would need a "calc line height" fix.
			//this.drawTextEx(this._actor.profile(), x, y + lineOffset);
			this.printScrolledText(this._actor.profile(), x, y, lineOffset);
			
			lineOffset += 3;
		}
		
		var exProfile = this.getExtendedActorProfile();
		
		if(exProfile != undefined)
			this.printScrolledText(exProfile, x, y, lineOffset);
	}
	else
	{
		// In profile mode, the Base window class draws the image as part of the command of "portrait" mode when
		// drawing the actor block.  (This makes things more general for future extensions, in case future pages
		// want to use the profile image.)
	
		// If we DO have a standard profile entry.
		if(this._actor.profile() != undefined && this._actor.profile() != "")
		{
			//this.drawTextEx(this._actor.profile(), x, y + lineOffset);
			this.printScrolledText(this._actor.profile(), x, y, lineOffset);
			
			lineOffset += 3;
		}
		
		var exProfile = this.getExtendedActorProfile();
		
		if(exProfile != undefined)
			this.printScrolledText(exProfile, x, y, lineOffset);
			//this.drawTextEx(exProfile, x, y + lineOffset);
	}
	
}

JAH_Window_Status_Profile.prototype.printScrolledText = function(text, x, y, scroll) {

	// 1.0.3 - dramatic change in the code:  scrolling control is way different now, but
	// in a way that won't break word-wrapping plugin output.
	//
	// Word-wrap plugins still need to implement calcTextHeight properly for scrolling to work, however.
	
	var lineHeight = this.lineHeight();
	var lines = text.split('\n');
	
	var headerSize = 0;
	var saveState = undefined;
		
	y += scroll * lineHeight;
	
	this.hiddenTextWindow.contents.clear();
	this.hiddenTextWindow.drawTextEx.call(this.hiddenTextWindow, text, x, y);
	
	var yDelt = y > 0 ? y : 0;
		
	var heightToCopy = this.contentsHeight() - yDelt;
	
	this.contents.blt(this.hiddenTextWindow.contents, 0, yDelt, this.hiddenTextWindow.contentsWidth(), heightToCopy, 0, yDelt);
};
