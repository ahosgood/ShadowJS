#Shadow JS
=========
Shadow JS provides you with all the JavaScript functionality that everyone else forgot to build

##Initialisation
window.Shadow and window.shdw objects created upon inclusion

###Functions and Properties
All functions and properties can be called from the window Shadow object using either Shadow.function() or shdw.function()

**afterLast( strLastInstance String, strHaystack String, [blCaseSensitive Boolean] )**
Gets the text after the last instance of a character

**arrayToObject( arrRaw Array )**
Converts a JavaScript array to a JavaScript object

**base64Decode( strIn String )**
Decodes a base64 encoded string

**base64Encode( strIn String )**
Encodes a string to base64

**beforeFirst( strFirstInstance String, strHaystack String, [blCaseSensitive Boolean] )**
Gets the text before the first instance of a character

**cookieDelete( strName String )**
Deletes a cookie from the browser

**cookieGet( strName String )**
Gets a cookies value from the browser

**cookieSet( strName String, mxdData String, [intSecondsLife Number] )**
Sets a cookie in the browser

**contains( strNeedle String, strHaystack String, [blCaseSensitive Boolean] )**
Checks for an instance of a string in another string (case sensitive), returns true if found, false if not

**cssAnimations()**
Checks for CSS animation support, returns true is support is found, false if not

**dataSet( strName, mxdData, blPersistant )**

**dataGet( strName )**

**dataDelete( strName )**

**dataClear()**

**date( [mxdFormatUTC String/Boolean, [blUTC Boolean]] )**
Returns a date as per the PHP date function

**decimalise( fltIn Number )**
Convert the last numbers of a float or integer to a 2-digit currency

**dump( mxdIn Any, [blRenderIndents Boolean, [mxdIndent Number]] )**
Dump a variable, similar to print_r() in PHP

**endsWith( strNeedle, strHaystack, blCaseSensitive )**

**fullScreen( jqoObject jQuery )**
Requests full screen permissions for a jQuery element

**getFileHeaders( strResource String, [funCallback Function] )**
Gets the file headers for a local file

**getHash( blIncludeHash )**

**ie( mxdVersion )**

**inArray( mxdNeedle, arrHaystack )**

**iOS ()**

**iPad ()**

**iPod ()**

**iPhone ()**

**isAlpha( mxdValue )**

**isAlphanumeric( mxdValue )**

**isArray( mxdValue )**

**isBlank( mxdValue )**

**isCapsLock( e )**

**isEmail( mxdValue )**

**isHexadecimal( mxdValue )**

**isHexColor( mxdValue )**

**isInt( mxdValue )**

**isIP( mxdValue )**

**isIPV4( mxdValue )**

**isLoaclIPV4( mxdValue )**

**isIPV6( mxdValue )**

**isNull( mxdValue )**

**isNumber( mxdValue )**

**isObject( mxdValue )**

**isSet( mxdValue )**

**isUrl( mxdValue )**

**isWebkit()**

**isWindowFocused()**

**keyCodeName( e )**

**log()**

**ltrim( strIn, strTrimChars )**

**moderniseInputs( blPlaceholders, funCallback )**

**numberSuffix( intNumber, [blIncludeNumber] )**

**objectLength( objIn )**

**oldie()**

**padLeft( strRaw, intFinalLength, strPadChar )**

**padRight( strRaw, intFinalLength, strPadChar )**

**pixelDensity()**

**prettySize( intBytes, blUseSpace )**

**prettyTime( intSeconds )**

**randomString( intStringLength, mxdExtendedChars )**

**round( intNumber, intDP )**

**rtrim( strIn, strTrimChars )**

**slug( strOriginal )**

**startsWith( strNeedle, strHaystack, blCaseSensitive )**

**trim( strIn, strTrimChars )**

**version( mxdCheckVersion )