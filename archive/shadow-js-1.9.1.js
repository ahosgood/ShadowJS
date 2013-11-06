/**
 * ================================================================================
 * Shadow
 * --------------------------------------------------------------------------------
 * Author:      Andrew Hosgood
 * Version:     1.9.1
 * Date:        03/09/2013
 * ================================================================================
 */

(
	function( window ) {
		var Shadow = function() {
				var objUnlistedKeyNames = {
					    8: 'Backspace',
					    13: 'Return',
					    16: 'Shift',
					    17: 'Ctrl',
					    18: 'Alt',
					    19: 'F15',
					    27: 'Escape',
					    32: 'Space',
					    44: 'F13',
					    112: 'F1',
					    113: 'F2',
					    114: 'F3',
					    115: 'F4',
					    116: 'F5',
					    117: 'F6',
					    118: 'F7',
					    119: 'F8',
					    120: 'F9',
					    121: 'F10',
					    122: 'F11',
					    123: 'F12',
					    145: 'F14',
					    224: 'Cmd'
					};

				this.arrayToObject = function( arrRaw ) {
						var objReturn = {};
						for( var mxdIndex in arrRaw ) {
							if( typeof arrRaw[mxdIndex] === 'array' ) {
								objReturn[mxdIndex] = this.arrayToObject( arrRaw[mxdIndex] );
							} else {
								objReturn[mxdIndex] = arrRaw[mxdIndex];
							}
						}
						return objReturn;
					},
				this.base64String = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
				this.base64Decode = function( strIn ) {
						if( this.isSet( window.atob ) ) {
							return decodeURIComponent( window.atob( strIn ) );
						} else {
							// http://kevin.vanzonneveld.net
							// +   original by: Tyler Akins (http://rumkin.com)
							// +   improved by: Thunder.m
							// +      input by: Aman Gupta
							// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
							// +   bugfixed by: Onno Marsman
							// +   bugfixed by: Pellentesque Malesuada
							// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
							// +      input by: Brett Zamir (http://brett-zamir.me)
							// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
							var strOctet1, strOctet2, strOctet3, strHextet1, strHextet2, strHextet3, strHextet4, intBits,
								intChar = 0,
								intOutChar = 0,
								arrOut = [];
							if( !strIn ) {
								return strIn;
							}
							strIn += '';
							do {
								strHextet1 = this.base64String.indexOf( strIn.charAt( intChar++ ) );
								strHextet2 = this.base64String.indexOf( strIn.charAt( intChar++ ) );
								strHextet3 = this.base64String.indexOf( strIn.charAt( intChar++ ) );
								strHextet4 = this.base64String.indexOf( strIn.charAt( intChar++ ) );
								intBits = strHextet1 << 18 | strHextet2 << 12 | strHextet3 << 6 | strHextet4;
								strOctet1 = intBits >> 16 & 0xff;
								strOctet2 = intBits >> 8 & 0xff;
								strOctet3 = intBits & 0xff;
								if( strHextet3 == 64 ) {
									arrOut[intOutChar++] = String.fromCharCode( strOctet1 );
								} else if( strHextet4 == 64 ) {
									arrOut[intOutChar++] = String.fromCharCode( strOctet1, strOctet2 );
								} else {
									arrOut[intOutChar++] = String.fromCharCode( strOctet1, strOctet2, strOctet3 );
								}
							} while( intChar < strIn.length );
							return arrOut.join( '' );
						}
					},
				this.base64Encode = function( strIn ) {
						var strOut;
						if( this.isSet( window.btoa ) ) {
							strOut = window.btoa( encodeURIComponent( strIn ) );
						} else {
							// http://kevin.vanzonneveld.net
							// +   original by: Tyler Akins (http://rumkin.com)
							// +   improved by: Bayron Guevara
							// +   improved by: Thunder.m
							// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
							// +   bugfixed by: Pellentesque Malesuada
							// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
							// +   improved by: Rafał Kukawski (http://kukawski.pl)
							var strOctet1, strOctet2, strOctet3, strHextet1, strHextet2, strHextet3, strHextet4, intBits,
								intChar = 0,
								intOutChar = 0,
								arrOut = [];
							if( !strIn ) {
								return strIn;
							}
							do {
								strOctet1 = strIn.charCodeAt( intChar++ );
								strOctet2 = strIn.charCodeAt( intChar++ );
								strOctet3 = strIn.charCodeAt( intChar++ );
								intBits = strOctet1 << 16 | strOctet2 << 8 | strOctet3;
								strHextet1 = intBits >> 18 & 0x3f;
								strHextet2 = intBits >> 12 & 0x3f;
								strHextet3 = intBits >> 6 & 0x3f;
								strHextet4 = intBits & 0x3f;
								arrOut[intOutChar++] = this.base64String.charAt( strHextet1 ) + this.base64String.charAt( strHextet2 ) + this.base64String.charAt( strHextet3 ) + this.base64String.charAt( strHextet4 );
							} while( intChar < strIn.length );
							strOut = arrOut.join( '' );
						}
						var intRemainder = strIn.length % 3;
						return ( intRemainder ? strOut.slice( 0, intRemainder - 3 ) : strOut ) + '==='.slice( intRemainder || 3 );
					},
				this.blWindowFocused = false,
				this.cookieDelete = function( strName ) {
						var datNow = new Date();
						datNow.setTime( datNow.getTime() - 1000 );
						document.cookie = strName + '=;expires=' + datNow.toUTCString() + ';path=/';
					},
				this.cookieGet = function( strName ) {
						var strName = strName + "=",
						arrData = document.cookie.split( ';' );
						for( var intCharacter = 0, intDataLength = arrData.length; intCharacter < intDataLength; intCharacter++ ) {
							var strData = arrData[intCharacter];
							while( strData.charAt( 0 ) == ' ' ) {
								strData = strData.substring( 1, strData.length )
							}
							if( strData.indexOf( strName ) === 0 ) {
								return strData.substring( strName.length, strData.length )
							}
						}
						return null;
					},
				this.cookieSet = function( strName, mxdData, intSecondsLife, strPath ) {
						strPath = ( this.isSet( strPath ) && !this.isBlank( strPath ) ) ? strPath : '/';
						if( this.isInt( intSecondsLife ) ) {
							var datNow = new Date();
							datNow.setTime( datNow.getTime() + ( 1000 * intSecondsLife ) );
							document.cookie = strName + '=' + mxdData +';expires=' + datNow.toUTCString() + ';path=' + strPath;
						} else {
							document.cookie = strName + '=' + mxdData +';path=' + strPath;
						}
					},
				this.contains = function( strNeedle, strHaystack, blCaseSensitive ) {
						blCaseSensitive = ( typeof blCaseSensitive === 'boolean' ) ? blCaseSensitive : false;
						if( blCaseSensitive ) {
							return strHaystack.indexOf( strNeedle ) !== -1;
						} else {
							return strHaystack.toLowerCase().indexOf( strNeedle.toLowerCase() ) !== -1;
						}
					},
				this.cssAnimations = function() {
						var blAnimation = false,
						strAnimation = 'animation',
						strKeyframePrefix = '',
						arrDOMPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'],
						strPrefix  = '';
						if( elm.style.AnimationName ) {
							blAnimation = true;
						} else {
							for( var intPrefix = 0, intDomPrefixes = arrDOMPrefixes.length; intPrefix < intDomPrefixes; intPrefix++ ) {
								if( this.isSet( elm.style[arrDOMPrefixes[intPrefix] + 'AnimationName'] ) ) {
									strPrefix = arrDOMPrefixes[intPrefix];
									strAnimation = strPrefix + 'Animation';
									strKeyframePrefix = '-' + strPrefix.toLowerCase() + '-';
									blAnimation = true;
									break;
								}
							}
						}
						this.cssAnimations = blAnimation ? function() { return true; } : function() { return false; };
						return blAnimation;
					},
				this.dataSet = function( strName, mxdData, blPersistant ) {
						if( !this.isSet( blPersistant ) ) {
							blPersistant = true;
						}
						if( ( blPersistant
								&& localStorage )
								|| ( !blPersistant
								&& sessionStorage ) ) {
							try {
								if( blPersistant ) {
									localStorage.setItem( strName, mxdData );
								} else {
									sessionStorage.setItem( strName, mxdData );
								}
							} catch( e ) {
								switch( e ) {
									case QUOTA_EXCEEDED_ERR:
										error( 'Local storage quota exceeded' );
										break;
								}
							}
						} else {
							this.cookieSet( strName, mxdData );
						}
					},
				this.dataGet = function( strName ) {
						if( localStorage
								|| sessionStorage ) {
							var mxdLocal = localStorage.getItem( strName );
							var mxdSession = sessionStorage.getItem( strName );

							return ( mxdLocal === null ) ? mxdSession : mxdLocal;
						} else {
							return this.cookieGet( strName );
						}
					},
				this.dataDelete = function( strName ) {
						if( localStorage
								|| sessionStorage ) {
							localStorage.removeItem( strName );
							sessionStorage.removeItem( strName );
						} else {
							this.cookieDelete( strName );
						}
					},
				this.dataClear = function() {
						if( localStorage
								|| sessionStorage ) {
							localStorage.clear();
							sessionStorage.clear();
						}
					},
				this.date = function( mxdFormatUTC, blUTC ) {
						var strFormat;
						if( typeof mxdFormatUTC === 'boolean' ) {
							blUTC = mxdFormatUTC;
						} else if( typeof mxdFormatUTC === 'string' ) {
							strFormat = mxdFormatUTC;
							if( typeof blUTC !== 'boolean' ) {
								blUTC = false;
							}
						}
						var datNow = new Date(),
						objNames = {
								days: {
										0: {
												long: 'Sunday',
												short: 'Sun'
											},
										1: {
												long: 'Monday',
												short: 'Mon'
											},
										2: {
												long: 'Tuesday',
												short: 'Tue'
											},
										3: {
												long: 'Wednesday',
												short: 'Wed'
											},
										4: {
												long: 'Thursday',
												short: 'Thu'
											},
										5: {
												long: 'Friday',
												short: 'Fri'
											},
										6: {
												long: 'Saturday',
												short: 'Sat'
											}
									},
								months: {
										1: {
												long: 'January',
												short: 'Jan'
											},
										2: {
												long: 'February',
												short: 'Feb'
											},
										3: {
												long: 'March',
												short: 'Mar'
											},
										4: {
												long: 'April',
												short: 'Apr'
											},
										5: {
												long: 'May',
												short: 'May'
											},
										6: {
												long: 'June',
												short: 'Jun'
											},
										7: {
												long: 'July',
												short: 'Jul'
											},
										8: {
												long: 'August',
												short: 'Aug'
											},
										9: {
												long: 'September',
												short: 'Sep'
											},
										10: {
												long: 'October',
												short: 'Oct'
											},
										11: {
												long: 'November',
												short: 'Nov'
											},
										12: {
												long: 'December',
												short: 'Dec'
											}
									}
								},
						objTime = {
								N: datNow.getDay() % 7,
								j: datNow.getDate(),
								n: datNow.getMonth() + 1,
								Y: datNow.getFullYear(),
								G: datNow.getHours(),
								i: this.padLeft( datNow.getMinutes(), 2, '0' ),
								s: this.padLeft( datNow.getSeconds(), 2, '0' ),
								u: datNow.getMilliseconds(),
								U: Math.floor( datNow.getTime() / 1000 ),
								Z: datNow.getTimezoneOffset() * 3600
							};
						objTime.D = objNames.days[objTime.N]['short'],
						objTime.l = objNames.days[objTime.N]['long'],
						objTime.d = this.padLeft( objTime.j, 2, '0' ),
						objTime.S = this.numberSuffix( objTime.j ),
						objTime.m = this.padLeft( objTime.n, 2, '0' ),
						objTime.F = objNames.months[objTime.n]['long'],
						objTime.M = objNames.months[objTime.n]['short'],
						objTime.y = this.padLeft( objTime.Y, 2 ),
						objTime.H = this.padLeft( objTime.G, 2, '0' ),
						objTime.g = objTime.G == 0 ? 12 : ( objTime.G > 12 ? objTime.G - 12 : objTime.G ),
						objTime.h = this.padLeft( objTime.g, 2, '0' ),
						objTime.a = ( objTime.G < 12 ) ? 'am' : 'pm',
						objTime.A = objTime.a.toUpperCase(),
						objTime.L = ( objTime.Y % 4 === 0 && ( ( objTime.Y % 100 === 0 && objTime.Y % 400 === 0 ) || objTime.Y % 100 !== 0 ) ) ? 1 : 0;
						if( blUTC ) {
							objTime.utc = {
									N: datNow.getDay() % 7,
									j: datNow.getUTCDate(),
									n: datNow.getUTCMonth() + 1,
									Y: datNow.getUTCFullYear(),
									G: datNow.getUTCHours(),
									i: this.padLeft( datNow.getUTCMinutes(), 2, '0' ),
									s: this.padLeft( datNow.getUTCSeconds(), 2, '0' ),
									U: objTime.U,
									u: datNow.getUTCMilliseconds()
								};
							objTime.utc.D = objNames.days[objTime.utc.N]['short'],
							objTime.utc.l = objNames.days[objTime.utc.N]['long'],
							objTime.utc.d = this.padLeft( objTime.utc.j, 2, '0' ),
							objTime.utc.S = this.numberSuffix( objTime.utc.j ),
							objTime.utc.m = this.padLeft( objTime.utc.n, 2, '0' ),
							objTime.utc.F = objNames.months[objTime.utc.n]['long'],
							objTime.utc.M = objNames.months[objTime.utc.n]['short'],
							objTime.utc.y = this.padLeft( objTime.utc.Y, 2 ),
							objTime.utc.H = this.padLeft( objTime.utc.G, 2, '0' ),
							objTime.utc.g = ( objTime.utc.G > 12 ) ? objTime.utc.G - 12 : objTime.utc.G,
							objTime.utc.h = this.padLeft( objTime.utc.g, 2, '0' ),
							objTime.utc.a = ( objTime.utc.G < 12 ) ? 'am' : 'pm',
							objTime.utc.A = objTime.utc.a.toUpperCase(),
							objTime.utc.L = ( objTime.utc.Y % 4 === 0 && ( ( objTime.utc.Y % 100 === 0 && objTime.utc.Y % 400 === 0 ) || objTime.utc.Y % 100 !== 0 ) ) ? 1 : 0;
						}
						if( typeof strFormat === 'string' ) {
							var strOut = '';
							var intChar = 0;
							while( intChar < strFormat.length ) {
								var strChar = strFormat.charAt( intChar );
								if( strChar === '\\' ) {
									intChar++;
									strOut += strFormat.substr( intChar, 1 );
								} else if( strChar === 'r' ) {
									if( blUTC ) {
										strOut += objTime.utc.D + ', ' + objTime.utc.j + ' ' + objTime.utc.M + ' ' + objTime.utc.Y + ' ' + objTime.utc.H + ':' + objTime.utc.i + ':' + objTime.utc.s;
									} else {
										strOut += objTime.D + ', ' + objTime.j + ' ' + objTime.M + ' ' + objTime.Y + ' ' + objTime.H + ':' + objTime.i + ':' + objTime.s;
									}
								} else if( strChar === 'x' ) {
									if( blUTC ) {
										strOut += objTime.utc.Y + '-' + objTime.utc.m + '-' + objTime.utc.d + '\\T' + objTime.utc.H + ':' + objTime.utc.i + ':' + objTime.utc.s + '\\Z';
									} else {
										strOut += objTime.Y + '-' + objTime.m + '-' + objTime.d + '\\T' + objTime.H + ':' + objTime.i + ':' + objTime.s + '\\Z';
									}
								} else {
									if( strChar !== ''
											&& objTime.hasOwnProperty( strChar ) ) {
										strOut += blUTC ? objTime.utc[strChar] : objTime[strChar];
									} else {
										strOut += strChar;
									}
								}
								intChar++;
							}
							return strOut;
						} else {
							return objTime;
						}
					},
				this.decimalise = function( fltIn ) {
						var strRounded = this.round( fltIn, 2 ).toString();
						if( this.contains( '.', strRounded ) ) {
							var arrSplit = strRounded.split( '.' );
							var strDigitsAfterPoint = arrSplit.pop();
							arrSplit.push( this.padRight( strDigitsAfterPoint, 2, '0' ) );
							return arrSplit.join( '.' );
						} else {
							return strRounded + '.00';
						}
					},
				this.dump = function( mxdIn, blRenderIndents, intIndent ) {
						var blRenderIndents = typeof blRenderIndents === 'boolean' ? blRenderIndents : false;
						if( Object.prototype.toString.call( mxdIn ) === '[object Function]'
								|| Object.prototype.toString.call( mxdIn ) === '[object Number]'
								|| Object.prototype.toString.call( mxdIn ) === '[object Boolean]'
								|| Object.prototype.toString.call( mxdIn ) === '[object Null]'
								|| Object.prototype.toString.call( mxdIn ) === '[object Undefined]' ) {
							return mxdIn.toString();
						} else {
							if( this.isSet( JSON )
									&& this.isSet( JSON.stringify )
									&& !blRenderIndents ) {
								return JSON.stringify( mxdIn );
							} else {
								intIndent = this.isInt( intIndent ) ? intIndent : 0;
								var strSingleIndent = '&nbsp;&nbsp;&nbsp;&nbsp;';
								var strIndent = ( new Array( intIndent + 1 ) ).join( strSingleIndent );
								var strNextIndent = ( new Array( intIndent + 2 ) ).join( strSingleIndent );
								var strOut = '';
								shdw.dump( Object.prototype.toString.call( mxdIn ) );
								if( Object.prototype.toString.call( mxdIn ) === '[object Array]' ) {
									strOut += '[\n';
									if( mxdIn.length ) {
										for( var i in mxdIn ) {
											if( Object.prototype.toString.call( mxdIn[i] ) === '[object Array]'
													|| Object.prototype.toString.call( mxdIn[i] ) === '[object Object]' ) {
												strOut += strNextIndent + this.dump( mxdIn[i], blRenderIndents, intIndent + 1 );
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Function]' ) {
												strOut += strNextIndent + mxdIn[i].toString() + ',\n';
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Number]' ) {
												strOut += strNextIndent + mxdIn[i] + ',\n';
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Boolean]' ) {
												strOut += strNextIndent + ( mxdIn[i] ? 'TRUE' : 'FALSE' ) + ',\n';
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Null]' ) {
												strOut += strNextIndent + 'NULL,\n';
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Undefined]' ) {
												strOut += strNextIndent + 'UNDEFINED,\n';
											} else {
												strOut += strNextIndent + '"' + mxdIn[i].toString() + '",\n';
											}
										}
										strOut = strOut.substring( 0, strOut.length - 2 ) + '\n';
									}
									strOut += strIndent + '],\n';
								} else if( Object.prototype.toString.call( mxdIn ) === '[object Object]' ) {
									strOut += '{\n';
									if( this.objectLength( mxdIn ) ) {
										for( var i in mxdIn ) {
											strOut += strNextIndent + i + ': ';
											if( Object.prototype.toString.call( mxdIn[i] ) === '[object Array]'
													|| Object.prototype.toString.call( mxdIn[i] ) === '[object Object]' ) {
												strOut += this.dump( mxdIn[i], blRenderIndents, intIndent + 1 );
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Function]' ) {
												strOut += mxdIn[i].toString() + ',\n';
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Number]' ) {
												strOut += mxdIn[i] + ',\n';
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Boolean]' ) {
												strOut += ( mxdIn[i] ? 'TRUE' : 'FALSE' ) + ',\n';
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Null]' ) {
												strOut += 'NULL,\n';
											} else if( Object.prototype.toString.call( mxdIn[i] ) === '[object Undefined]' ) {
												strOut += 'UNDEFINED,\n';
											} else {
												strOut += '"' + mxdIn[i].toString() + '",\n';
											}
										}
										strOut = strOut.substring( 0, strOut.length - 2 ) + '\n';
									}
									strOut += strIndent + '},\n';
								} else {
									strOut += strNextIndent + '"' + mxdIn.toString() + '",\n';
								}
								return intIndent === 0 ? strOut.substring( 0, strOut.length - 2 ) : strOut;
							}
						}
					},
				this.fullScreen = function( jqoObject ) {
						if( jqoObject[0].requestFullScreen ) {
							jqoObject[0].requestFullScreen();
						} else if( jqoObject[0].mozRequestFullScreen ) {
							jqoObject[0].mozRequestFullScreen();
						} else if( jqoObject[0].webkitRequestFullScreen ) {
							jqoObject[0].webkitRequestFullScreen();
						}
					},
				this.getFileHeaders = function( strResource, funCallback ) {
						var resXHR;
						if( window.XMLHttpRequest ) {
							resXHR = new XMLHttpRequest();
						} else if( window.ActiveXObject ) {
							resXHR = new ActiveXObject( 'Microsoft.XMLHTTP' );
						}
						resXHR.onreadystatechange = function() {
							if( resXHR.readyState === 4
									&& resXHR.status === 200 ) {
								var arrResourceResponseHeaders = new Object();
								arrResourceResponseHeaders.Type = resXHR.getResponseHeader( 'Content-Type' ).toString();
								arrResourceResponseHeaders.Size = resXHR.getResponseHeader( 'Content-Length' ).toString();
								arrResourceResponseHeaders.Modified = resXHR.getResponseHeader( 'Last-Modified' ).toString();
								funCallback.call( arrResourceResponseHeaders );
							}
						}
						try {
							resXHR.open( 'HEAD', strResource, true );
							resXHR.send();
						} catch( e ) {
							error( e );
						}
					},
				this.getHash = function( blIncludeHash ) {
						blIncludeHash = typeof blIncludeHash === 'boolean' ? blIncludeHash : false;
						var strHash = window.location.hash;
						return blIncludeHash? strHash : strHash.substring( 1 );
					},
				this.ie = function( mxdVersion ) {
						var strUserAgent = navigator.userAgent,
						intMSIEOffset = strUserAgent.indexOf( 'MSIE ' );
						if( ( this.isSet( mxdVersion )
									&& mxdVersion == parseFloat( strUserAgent.substring( intMSIEOffset + 5, strUserAgent.indexOf( ';', intMSIEOffset ) ) ) )
								|| ( !this.isSet( mxdVersion )
									&& intMSIEOffset !== -1 ) ) {
							return ( intMSIEOffset === -1 ) ? false : parseFloat( strUserAgent.substring( intMSIEOffset + 5, strUserAgent.indexOf( ';', intMSIEOffset ) ) );
						} else {
							return false;
						}
					},
				this.inArray = function( mxdNeedle, arrHaystack ) {
						var blMatch = false;
						for( var mxdValue in arrHaystack ) {
							if( arrHaystack[mxdValue] === mxdNeedle ) {
								blMatch = true;
							}
						}
						return blMatch;
					},
				this.iOS = function () {
						var blResult = this.iPad() || this.iPod() || this.iPhone();
						this.iOS = blResult ? function() { return true; } : function() { return false; };
						return blResult;
					},
				this.iPad = function () {
						var blResult = this.contains( 'iPad', navigator.userAgent );
						this.iPad = blResult ? function() { return true; } : function() { return false; };
						return blResult;
					},
				this.iPod = function () {
						var blResult = this.contains( 'iPod', navigator.userAgent );
						this.iPod = blResult ? function() { return true; } : function() { return false; };
						return blResult;
					},
				this.iPhone = function () {
						var blResult = this.contains( 'iPhone', navigator.userAgent );
						this.iPhone = blResult ? function() { return true; } : function() { return false; };
						return blResult;
					},
				this.isAlpha = function( mxdValue ) {
						return ( /^[a-z]+$/i ).test( mxdValue );
					},
				this.isAlphanumeric = function( mxdValue ) {
						return ( /^[a-z0-9]+$/i ).test( mxdValue );
					},
				this.isArray = function( mxdValue ) {
						return typeof mxdValue === 'array';
					},
				this.isBlank = function( mxdValue ) {
						return mxdValue.replace( /[\s\t\r\n]*/g, '' ) == '';
					},
				this.isCapsLock = function( e ) {
						e = e ? e : window.event;
						var intCharCode = e.which ? e.which : e.keyCode,
						blShiftOn = false;
						if( e.shiftKey ) {
							blShiftOn = e.shiftKey;
						} else if( e.modifiers ) {
							blShiftOn = !!( e.modifiers & 4 );
						}
						if( intCharCode >= 97
								&& intCharCode <= 122
								&& blShiftOn ) {
							return true;
						}
						if( intCharCode >= 65
								&& intCharCode <= 90
								&& !blShiftOn ) {
							return true;
						}
						return false;
					},
				this.isEmail = function( mxdValue ) {
						return ( /^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/ ).test( mxdValue );
					},
				this.isHexadecimal = function( mxdValue ) {
						return ( /^[0-9a-f]+$/i ).test( mxdValue );
					},
				this.isHexColor = function( mxdValue ) {
						return ( /^#?[0-9a-f]{3,6}$/i ).test( mxdValue );
					},
				this.isInt = function( mxdValue ) {
						return ( parseFloat( mxdValue ) == parseInt( mxdValue ) ) && !isNaN( mxdValue );
					},
				this.isIP = function( mxdValue ) {
						return this.isIPV4( mxdValue ) || this.isIPV6( mxdValue );
					},
				this.isIPV4 = function( mxdValue ) {
						if( ( /^(\d{1,3})(\.\d{1,3}){3}$/ ).test( mxdValue ) ) {
							var arrParts = mxdValue.split( '.' );
							if( parseInt( arrParts[0] ) === 0
									|| parseInt( arrParts[3] ) === 0 ) {
								return false;
							}
							for( var intPart in arrParts ) {
								if( parseInt( arrParts[intPart] ) > 255 ) {
									return false;
								}
							}
							return true;
						} else {
							return false;
						}
					},
				this.isIPV6 = function( mxdValue ) {
						return ( /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?$/i ).test( mxdValue );
					},
				this.isNull = function( mxdValue ) {
						return typeof( mxdValue ) === 'null' || mxdValue === null;
					},
				this.isNumber = function( mxdValue ) {
						return typeof( mxdValue ) === 'number' || ( typeof( mxdValue ) === 'string' && mxdValue !== '' && !isNaN( mxdValue ) );
					},
				this.isObject = function( mxdValue ) {
						return typeof mxdValue === 'object';
					},
				this.isSet = function( mxdValue ) {
						return mxdValue !== null && mxdValue !== undefined && typeof mxdValue !== 'null' && typeof mxdValue !== 'undefined' && mxdValue !== 'undefined';
					},
				this.isUrl = function( mxdValue ) {
						return ( /^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i ).test(  mxdValue );
					},
				this.isWebkit = function() {
						var blResult = this.contains( 'AppleWebKit', navigator.userAgent );
						this.isWebkit = blResult ? function() { return true; } : function() { return false; };
						return blResult;
					},
				this.isWindowFocused = function() {
						return this.blWindowFocused;
					},
				this.keyCodeName = function( e ) {
						e = e ? e : window.event;
						var strReturn = '[UNKNOWN]';
						var intCharCode = e.which ? e.which : e.keyCode;
						if( ( this.ie()
									&& Object.prototype.hasOwnProperty.call( objUnlistedKeyNames, intCharCode ) )
								|| objUnlistedKeyNames.hasOwnProperty( intCharCode ) ) {
							strReturn = objUnlistedKeyNames[intCharCode];
						} else {
							strReturn = String.fromCharCode( intCharCode );
						}
						return strReturn;
					},
				this.log = function() {
						var arrArguements = arguments;
						if( this.isSet( window.console )
								&& this.isSet( window.console.log )
								&& arrArguements.length > 0 ) {
							for( var intArguement in arrArguements ) {
								window.console.log( arrArguements[intArguement] );
							}
						}
					},
				this.ltrim = function( strIn, strTrimChars ) {
						return strIn.replace( new RegExp( '^' + ( ( typeof strTrimChars !== 'string' || strTrimChars === '' ) ? ' ' : strTrimChars ) + '+' ), '' );
					},
				this.moderniseInputs = function( blPlaceholders, funCallback ) {
						//TODO: Support for textarea and select
						funCallback = ( typeof funCallback === 'function' ) ? funCallback : ( ( typeof blPlaceholders === 'function' ) ? blPlaceholders : function() {} );
						blPlaceholders = ( typeof blPlaceholders === 'boolean' ) ? blPlaceholders : true;
						var blYeOldieBrowser = this.oldie();
						var arrInputs = new Array( 'text', 'hidden', 'password', 'button', 'reset', 'submit', 'checkbox', 'radio', 'email', 'number', 'tel', 'url', 'range', 'search', 'file', 'color', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local' );
						var arrInputAttrs = new Array( 'required', 'readonly', 'required', 'disabled' );
						for( var intInput in arrInputs ) {
							var strInput = arrInputs[intInput];
							$( 'input[type="' + strInput + '"]:not(.input-' + strInput + ')' ).addClass( 'input-' + strInput );
						}
						for( var intInputAttr in arrInputAttrs ) {
							var strInputAttr = arrInputAttrs[intInputAttr];
							$( 'input[' + strInputAttr + ']:not(.input-' + strInputAttr + ')' ).addClass( 'input-' + strInputAttr );
						}
						if( typeof document.createElement( 'input' ).checkValidity !== 'function' ) {
							//$( 'input[type="email"], input[type="url"], input[type="number"], input[type="color"], input[type="date"], input[type="month"], input[type="week"], input[type="time"], input[type="datetime"], input[type="datetime-local"]' ).not( '.input-html5' ).on( 'ready focus keyup change blur',
							$( 'input[type="email"], input[type="url"], input[type="number"]' ).not( '.input-html5' ).on( 'ready focus keyup change blur',
									function() {
										var jqoInput = $( this );
										/*jqoInput.removeClass( 'input-invalid' );
										 if( jqoInput.is( ':invalid' ) ) {
										    jqoInput.addClass( 'input-invalid' );
										 }*/
										var blValid = true;
										var validator = jqoInput.prop( 'type' );
										var blRequired = !jqoInput.prop( 'required' ) == null;
										switch( validator ){
											case 'email':
												blValid = this.isEmail( jqoInput.val() );
												break;

											case 'url':
												blValid = this.isUrl( jqoInput.val() );
												break;

											case 'number':
												blValid = this.isNumber( jqoInput.val() );
												break;
										}
										if( blValid
												&& blRequired
												&& jqoInput.val().replace( jqoInput.attr( 'placeholder' ), '' ) === '' ) {
											blValid = false;
										}
										if( blValid
												|| ( !blRequired
												&& jqoInput.val() === '' ) ) {
											jqoInput.removeClass( 'input-invalid' );
											jqoInput.addClass( 'input-valid' );
											return true;
										} else {
											jqoInput.removeClass( 'input-valid' );
											jqoInput.addClass( 'input-invalid' );
											return false;
										}
									}
							).addClass( 'input-html5' );
						}
						if( blYeOldieBrowser
								&& blPlaceholders ) {
							$( 'input[placeholder]:not(.placeholder)' ).each(
								function() {
									var jqoInput = $( this );
									var strPlaceholder = jqoInput.attr( 'placeholder' );
									if( jqoInput.val() == ''
											&& blYeOldieBrowser ) {
										jqoInput.val( strPlaceholder );
										jqoInput.addClass( 'placeholder' );
									}
									jqoInput.focus(
										function() {
											$( this ).removeClass( 'placeholder' );
											if( blYeOldieBrowser
													&& jqoInput.val() == strPlaceholder ) {
												jqoInput.val( '' );
											}
										}
									).blur(
										function() {
											if( jqoInput.val() == ''
													&& blYeOldieBrowser ) {
												jqoInput.val( strPlaceholder );
												$( this ).addClass( 'placeholder' );
											}
										}
									);
								}
							).closest( 'form' ).submit(
								function() {
									$( this ).find( 'input.placeholder' ).val( '' );
								}
							);
						}
						funCallback.call();
					},
				this.numberSuffix = function( intNumber, blIncludeNumber ) {
						blIncludeNumber = ( typeof blIncludeNumber === 'boolean' ) ? blIncludeNumber : false;
						if( !this.isInt( intNumber ) ) {
							intNumber = parseInt( intNumber );
						}
						var strSuffix = '';
						if( this.isInt( intNumber )
								&& intNumber > 0 ) {
							var intNumberTensUnits = parseInt( intNumber.toString().substr( -2 ) );
							var intNumberUnits = parseInt( intNumber.toString().substr( -1 ) );

							if( intNumberUnits === 1
									|| ( intNumberTensUnits > 10
										&& intNumberTensUnits !== 11 ) ) {
								strSuffix = 'st';
							} else if( intNumberUnits === 2
									|| ( intNumberTensUnits > 10
										&& intNumberTensUnits !== 12 ) ) {
								strSuffix = 'nd';
							} else if( intNumberUnits === 3
									|| ( intNumberTensUnits > 10
										&& intNumberTensUnits !== 13 ) ) {
								strSuffix = 'rd';
							} else {
								strSuffix = 'th';
							}
						}
						return strSuffix;
					},
				this.objectLength = function( objIn ) {
						var intLength = 0;
						if( typeof objIn === 'object' ) {
							for( var mxdKey in objIn ) {
								if( ( this.ie()
											&& Object.prototype.hasOwnProperty.call( objIn, mxdKey ) )
										|| objIn.hasOwnProperty( mxdKey ) ) {
									intLength++;
								}
							}
						}
						return intLength;
					},
				this.oldie = function() {
						var blResult = this.ie( 6 ) || this.ie( 7 ) || this.ie( 8 );
						this.oldie = blResult ? function() { return true; } : function() { return false; };
						return blResult;
					},
				this.padLeft = function( strRaw, intFinalLength, strPadChar ) {
						strRaw = strRaw.toString();
						strPadChar = ( typeof strPadChar === 'string' ) ? strPadChar : ' ';
						if( strRaw.length < intFinalLength ) {
							for( var intChar = 0; intChar < intFinalLength; intChar++ ) {
								strRaw = strPadChar + strRaw;
							}
						}
						return strRaw.substr( -intFinalLength );
					},
				this.padRight = function( strRaw, intFinalLength, strPadChar ) {
						strRaw = strRaw.toString();
						strPadChar = ( typeof strPadChar === 'string' ) ? strPadChar : ' ';
						if( strRaw.length < intFinalLength ) {
							for( var intChar = 0; intChar < intFinalLength; intChar++ ) {
								strRaw += strPadChar;
							}
						}
						return strRaw.substr( 0, intFinalLength );
					},
				this.pixelDensity = function() {
						return this.isNumber( window.devicePixelRatio ) ? window.devicePixelRatio : 1;
					},
				this.prettySize = function( intBytes, blUseSpace ) {
						var arrLimits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
						var intLimit = 0;
						while( arrLimits[intLimit]
								&& intBytes > Math.pow( 1024, intLimit + 1 ) ) {
							intLimit++;
						}
						return this.round( intBytes / Math.pow( 1024, intLimit ), 2 ) + ( typeof blUseSpace === 'boolean' && blUseSpace ? ' ' : '' ) + arrLimits[intLimit];
					},
				this.prettyTime = function( intSeconds ) {
						var strUptime = '';
						var fltYearDays = 356.2425;
						var objLimits = {
								year: fltYearDays * 86400,
								month: ( fltYearDays / 84 ) * 604800,
								week: 604800,
								day: 86400,
								hour: 3600,
								minute: 60
							};
						for( var strLimit in objLimits ) {
							if( intSeconds >= objLimits[strLimit] ) {
								strUptime += Math.floor( intSeconds / objLimits[strLimit] ) + ' ' + strLimit + ( ( Math.floor( intSeconds / objLimits[strLimit] ) === 1 ) ? '' : 's' ) + ' ';
								intSeconds -= Math.floor( intSeconds / objLimits[strLimit] ) * objLimits[strLimit];
							} else if( strUptime !== '' ) {
								strUptime += '0 ' + strLimit + 's ';
							}
						}
						return strUptime + intSeconds + ' seconds';
					},
				this.randomString = function( intStringLength, mxdExtendedChars ) {
						intStringLength = this.isSet( intStringLength ) && this.isInt( intStringLength ) ? intStringLength : 16;
						var strChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
						if( typeof mxdExtendedChars === 'string' ) {
							strChars = mxdExtendedChars;
						} else if( mxdExtendedChars === true ) {
							strChars += '!@£$%^&*()_-=+[]{};:|<>?/';
						}
						var strRandomString = '';
						for( var intChar = 0; intChar < intStringLength; intChar++ ) {
							var intRand = Math.floor( Math.random() * strChars.length );
							strRandomString += strChars.substring( intRand, intRand + 1 );
						}
						return( strRandomString );
					},
				this.round = function( intNumber, intDP ) {
						intDP = ( typeof intDP !== 'number' ) ? 0 : intDP;
						return intDP === 0 ? parseInt( Math.round( intNumber * Math.pow( 10, intDP ) ) / Math.pow( 10, intDP ) ) : parseFloat( Math.round( intNumber * Math.pow( 10, intDP ) ) / Math.pow( 10, intDP ) );
					},
				this.rtrim = function( strIn, strTrimChars ) {
						return strIn.replace( new RegExp( ( ( typeof strTrimChars !== 'string' || strTrimChars === '' ) ? ' ' : strTrimChars ) + '+$' ), '' );
					},
				this.slug = function( strOriginal ) {
						return strOriginal.replace( /^\s+|\s+$/g, '' ).replace( /[^a-zA-Z0-9 \-_]/g, '' ).replace( /\s+/g, '' ).replace( /-+/g, '' );
					},
				this.trim = function( strIn, strTrimChars ) {
						if( typeof strTrimChars !== 'string'
								|| strTrimChars === '' ) {
							strTrimChars = ' ';
						}
						return this.ltrim( this.rtrim( strIn, strTrimChars ), strTrimChars );
					},
				this.version = function( mxdCheckVersion ) {
						var arrThisVersion = [1, 9, 1];
						if( this.isSet( mxdCheckVersion ) ) {
							if( typeof mxdCheckVersion === 'boolean' ) {
								return mxdCheckVersion ? arrThisVersion : arrThisVersion.join( '.' );
							} else if( typeof mxdCheckVersion === 'string' ) {
								var arrCheckVersion = mxdCheckVersion.split( '.' );
								for( var intVersionPart in arrThisVersion ) {
									if( this.isSet( arrCheckVersion[intVersionPart] ) ) {
										if( parseInt( arrThisVersion[intVersionPart] ) < parseInt( arrCheckVersion[intVersionPart] ) ) {
											return false;
										}
									} else {
										return true;
									}
								}
								return true;
							}
						} else {
							return arrThisVersion.join( '.' );
						}
					};

				return this;
			};

		window.Shadow = new Shadow;
		window.onfocus = function() {
				window.Shadow.blWindowFocused = true;
			},
		window.onblur = function() {
				window.Shadow.blWindowFocused = false;
			};
		if( !window.shdw ) {
			window.shdw = window.Shadow;
		}
	}
)( window );