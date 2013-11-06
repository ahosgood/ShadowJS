#Shadow JS
=========
##Shadow JS provides you with all the JavaScript functionality that everyone else forgot to build

###Initialisation
window.Shadow and window.shdw objects created upon inclusion

###Functions and Properties
All functions and properties can be called from the window Shadow object using either Shadow.function() or shdw.function()


####afterLast( strLastInstance String, strHaystack String, [blCaseSensitive Boolean] )
Gets the text after the last instance of a character
#####Parameters
.*strLastInstance
..*The character(s) to find the last instance of
.*strHaystack
..*The string to check
.*[blCaseSensitive]
..*Perform a case sensitive search (Default: false)
#####Example
shdw.afterLast( '678', '1234567890abcdef' );
#####Output
90abcdef

arrayToObject( arrRaw Array )
Converts a JavaScript array to a JavaScript object
Parameters

arrRaw
    Array to convert

Example

shdw.arrayToObject( [6, window, 'orange'] );

Output

Object {0: 6, 1: Window, 2: "orange"}

base64Decode( strIn String )

Decodes a base64 encoded string
Parameters

strIn
    Encoded string

Example

shdw.base64Decode( 'SGVsbG8gd29ybGQh' );

Output

Hello world!

base64Encode( strIn String )

Encodes a string to base64
Parameters

strIn
    Raw string

Example

shdw.base64Decode( 'Hello world!' );

Output

SGVsbG8gd29ybGQh

beforeFirst( strFirstInstance String, strHaystack String, [blCaseSensitive Boolean] )

Gets the text before the first instance of a character
Parameters

strFirstInstance
    The character(s) to find the first instance of
strHaystack
    The string to check
[blCaseSensitive]
    Perform a case sensitive search (Default: false)

Example

shdw.afterLast( '90a', '1234567890abcdef' );

Output

12345678

cookieDelete( strName String )

Deletes a cookie from the browser
Parameters

strName
    The name of the cookie

Example

shdw.cookieSet( 'fav_colour', 'blue' );
shdw.cookieGet( 'fav_colour' );
shdw.cookieDelete( 'fav_colour' );
shdw.cookieGet( 'fav_colour' );

Output

blue
	NULL

cookieGet( strName String )

Gets a cookies value from the browser
Parameters

strName
    The name of the cookie

Example

shdw.cookieSet( 'fav_colour', 'yellow' );
	shdw.cookieGet( 'fav_colour' );

Output

yellow

cookieSet( strName String, mxdData String, [intSecondsLife Number] )

Sets a cookie in the browser
Parameters

strName
    The name of the cookie
mxdData
    The value of the cookie
[intSecondsLife]
    The life of the cookie in seconds (Default: no expiry)

Example

shdw.cookieSet( 'fav_colour', 'green' );

contains( strNeedle String, strHaystack String, [blCaseSensitive Boolean] )

Checks for an instance of a string in another string (case sensitive), returns true if found, false if not
Parameters

strNeedle
    The string to search for
strHaystack
    The string to search within
blCaseSensitive
    Case sensitive search (Default: false)

Example

shdw.contains( 'CHICK', 'chicken' );
shdw.contains( 'chick', 'chicken' );
shdw.contains( 'CHICK', 'chicken', true );

Output

TRUE
TRUE
FALSE

cssAnimations()

Checks for CSS animation support, returns true is support is found, false if not
dataSet( strName, mxdData, blPersistant )
dataGet( strName )
dataDelete( strName )
dataClear()
date( [mxdFormatUTC String/Boolean, [blUTC Boolean]] )

Returns a date as per the PHP date function
Parameters

[mxdFormatUTC]

        String - The format of datetime to be returned
        Boolean - Return object of date and time, true returns UTC data, false returns local data

[blUTC]
    True returns UTC data, false returns local data

Format

N
    Number of day (1-7)
j
    Date (1-31)
d
    Date with padding (00-31)
S
    Date suffix (st, nd, rd, th)
D
    Day name short (Mon-Sun)
l
    Day name long (Monday-Sunday)
n
    Month number (1-12)
m
    Month with padding (01-12)
F
    Month name long (January-December)
M
    Month name short (Jan-Dec)
Y
    Year (4-digit)
y
    Year (2-digit)
L
    Leap year (0-1)
G
    Hours (0-23)
H
    Hours with padding (00-23)
g
    Hours (0-12)
h
    Hours (00-12)
i
    Minutes (00-59)
s
    Seconds (00-59)
u
    Milliseconds (0-999)
Z
    Timezone offset in seconds (-43200-50400)
a
    am/pm
A
    AM/PM
U
    Seconds since Unix Epoch
r
    RFC 2822 formatted date (example: Thu, 21 Dec 2000 16:01:07 +0200)
\
    Escape character

Example

shdw.date( 'Y-m-d H:i:s' );

Output

2013-08-06 01:38:21

decimalise( fltIn Number )

Convert the last numbers of a float or integer to a 2-digit currency
Parameters

fltIn
    The number to decimalise

Example

shdw.decimalise( 3.7 );

Output

3.70

dump( mxdIn Any, [blRenderIndents Boolean, [mxdIndent Number]] )

Dump a variable, similar to print_r() in PHP
Parameters

mxdIn
    The variable to dump
[blRenderIndents]
    True indents the output, false just uses line breaks (Default: false)
[mxdIndent]
    The initial level of indentation (Default: 0)

Example

shdw.dump( window.Shadow );

Output

{
arrayToObject: function (e){var t={};for(var n in e){if(typeof mxdValue==="array"){t[n]=this.arrayToObject(e[n])}else{t[n]=e[n]}}return t},
base64Decode: function (t){return decodeURIComponent(escape(e.atob(t)))},
base64Encode: function (t){return e.btoa(unescape(encodeURIComponent(t)))},
...

endsWith( strNeedle, strHaystack, blCaseSensitive )
fullScreen( jqoObject jQuery )

Requests full screen permissions for a jQuery element
Parameters

jqoObject
    The jQuery object to request full screen for

Example

shdw.fullScreen( $( 'body' ) );

getFileHeaders( strResource String, [funCallback Function] )

Gets the file headers for a local file
Parameters

strResource
    Relative URI to file
[funCallback]
    Callback function upon success

Example

shdw.getFileHeaders( '/css/base.css' );

Output

???

getHash( blIncludeHash )
ie( mxdVersion )
inArray( mxdNeedle, arrHaystack )
iOS ()
iPad ()
iPod ()
iPhone ()
isAlpha( mxdValue )
isAlphanumeric( mxdValue )
isArray( mxdValue )
isBlank( mxdValue )
isCapsLock( e )
isEmail( mxdValue )
isHexadecimal( mxdValue )
isHexColor( mxdValue )
isInt( mxdValue )
isIP( mxdValue )
isIPV4( mxdValue )
isLoaclIPV4( mxdValue )
isIPV6( mxdValue )
isNull( mxdValue )
isNumber( mxdValue )
isObject( mxdValue )
isSet( mxdValue )
isUrl( mxdValue )
isWebkit()
isWindowFocused()
keyCodeName( e )
log()
ltrim( strIn, strTrimChars )
moderniseInputs( blPlaceholders, funCallback )
numberSuffix( intNumber, [blIncludeNumber] )
objectLength( objIn )
oldie()
padLeft( strRaw, intFinalLength, strPadChar )
padRight( strRaw, intFinalLength, strPadChar )
pixelDensity()
prettySize( intBytes, blUseSpace )
prettyTime( intSeconds )
randomString( intStringLength, mxdExtendedChars )
round( intNumber, intDP )
rtrim( strIn, strTrimChars )
slug( strOriginal )
startsWith( strNeedle, strHaystack, blCaseSensitive )
trim( strIn, strTrimChars )
version( mxdCheckVersion )
Bugs and Improvements

dump

        Improvement - Add support for [Object HTMLBodyElement], [Object HTMLDocument]

getFileHeaders

        Bug - Doesn't work

Change Log
1.9.7

Released: 24/10/2013

Download: Full Development | Minified

1 Feature Added

Feature Added

        isLocalIPV4() checks for valid local IPV4 addresses (10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255 and 192.168.0.0–192.168.255.255)

1.9.6

Released: 02/10/2013

Download: Full Development | Minified

1 Change

Changes

        isIPV4() changed from JavaScript checks to a single regular expression

1.9.5

Released: 27/09/2013

Download: Full Development | Minified

2 Features Added

Features Added

        beforeFirst() gets the string before the first instance of a character
        afterLast() gets the string after the last instance of a character

1.9.4

Released: 25/09/2013

Download: Full Development | Minified

2 Features Added

Features Added

        startsWith() checks if a string starts with another string
        endsWith() checks if a string ends with another string

1.9.3

Released: 16/09/2013

Download: Full Development | Minified

1 Bugs Fixed

Bug Fixes

        slug() removes 's' instead of whitespace characters

1.9.2

Released: 13/09/2013

Download: Full Development | Minified

3 Changes

Changes

        ltrim() and rtrim() accept multiple characters
        slug() produces a more URL-friendly string
        Passed the global document object as a parameter to avoid conflict

1.9.1

Released: 03/09/2013

Download: Full Development | Minified

1 Bug Fixed

Bugs Fixed

        arrayToObject() failed on certain array elements

1.9.0

Released: 02/09/2013

Download: Full Development | Minified

1 Feature Added

Features Added

        Added an option to numberSuffix() to return the number as well as its suffix

1.8.0

Released: 30/08/2013

Download: Full Development | Minified

2 Changes, 1 Bug Fixed

Changes

        Moved ShadowSwipe out to ShadowSwipeables plugin
        Added a case-sensitive option to contain()

Bugs Fixed

        dump() wasn't able to output functions

1.7.1

Released: 30/08/2013

Download: Full Development | Minified

1 Bug Fixed

Bugs Fixed

        base64Decode() and base64Encode() not not working in older browsers (<IE9)

