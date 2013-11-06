/**
 * ================================================================================
 * Shadow
 * --------------------------------------------------------------------------------
 * Author:      Andrew Hosgood
 * Version:     0.9.30
 * Date:        14/04/2013
 * ================================================================================
 */

(
	function( window ) {
		var Shadow = function() {
			this.arrayToObject = function( arrRaw ) {
					var objReturn = {};

					for( var mxdIndex in arrRaw ) {
						if( typeof mxdValue === 'array' ) {
							objReturn[mxdIndex] = this.arrayToObject( arrRaw[mxdIndex] );
						} else {
							objReturn[mxdIndex] = arrRaw[mxdIndex];
						}
					}

					return objReturn;
				},
			this.base64Decode = function( strRaw ) {
					return decodeURIComponent( escape( window.atob( strRaw ) ) );
				},
			this.base64Encode = function( strRaw ) {
					return window.btoa( unescape( encodeURIComponent( strRaw ) ) );
				},
			this.blWindowFocused = false,
			this.capslock = function( e ) {
					e = ( e ) ? e : window.event;

					var mxdCharCode = false;
					if( e.which ) {
						mxdCharCode = e.which;
					} else if( e.keyCode ) {
						mxdCharCode = e.keyCode;
					}

					var blShiftOn = false;
					if( e.shiftKey ) {
						blShiftOn = e.shiftKey;
					} else if( e.modifiers ) {
						blShiftOn = !!( e.modifiers & 4 );
					}

					if( mxdCharCode >= 97
							&& mxdCharCode <= 122
							&& blShiftOn ) {
						return true;
					}

					if( mxdCharCode >= 65
							&& mxdCharCode <= 90
							&& !blShiftOn ) {
						return true;
					}

					return false;
				},
			this.cssAnimations = function() {
					var blAnimation = false;
					var strAnimation = 'animation';
					var strKeyframePrefix = '';
					var arrDOMPrefixes = 'Webkit Moz O ms Khtml'.split( ' ' );
					var strPrefix  = '';

					if( elm.style.AnimationName ) {
						blAnimation = true;
					} else {
						for( var intPrefix = 0, intDomPrefixes = arrDOMPrefixes.length; intPrefix < intDomPrefixes; intPrefix++ ) {
							if( elm.style[arrDOMPrefixes[intPrefix] + 'AnimationName'] !== undefined ) {
								strPrefix = arrDOMPrefixes[intPrefix];
								strAnimation = strPrefix + 'Animation';
								strKeyframePrefix = '-' + strPrefix.toLowerCase() + '-';
								blAnimation = true;
								break;
							}
						}
					}

					return blAnimation;
				},
			this.dataSet = function( strName, mxdData, blPersistant ) {
					if( typeof $blPersistant == 'undefined' ) {
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
						}
						catch( e ) {
							switch( e ) {
								case QUOTA_EXCEEDED_ERR:
									error( 'Local storage quota exceeded' );
									break;
							}
						}
					} else {
						document.cookie = strName + '=' + mxdData +'; path=/';
					}
				},
			this.dataGet = function( strName ) {
					if( localStorage
							|| sessionStorage ) {
						var mxdLocal = localStorage.getItem( strName );
						var mxdSession = sessionStorage.getItem( strName );

						return ( mxdLocal === null ) ? mxdSession : mxdLocal;
					} else {
						var strName = strName + "=";
						var arrData = document.cookie.split( ';' );
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
					}
				},
			this.dataDelete = function( strName ) {
					if( localStorage
							|| sessionStorage ) {
						localStorage.removeItem( strName );
						sessionStorage.removeItem( strName );
					} else {
						var datNow = new Date();
						datNow.setTime( datNow.getTime() - 1000 );
						document.cookie = strName + '=;expires=' + datNow.toGMTString() + ';path=/';
					}
				},
			this.dataClear = function() {
					if( localStorage
							|| sessionStorage ) {
						localStorage.clear();
						sessionStorage.clear();
					} else {
						//cookie
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

					var datNow = new Date();

					var objNames = {
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
						};

					var objTime = {
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

					objTime.D = objNames.days[objTime.N]['short'];
					objTime.l = objNames.days[objTime.N]['long'];
					objTime.d = this.padLeft( objTime.j, 2, '0' );
					objTime.S = this.numberSuffix( objTime.j );
					objTime.m = this.padLeft( objTime.n, 2, '0' );
					objTime.F = objNames.months[objTime.n]['long'];
					objTime.M = objNames.months[objTime.n]['short'];
					objTime.y = this.padLeft( objTime.Y, 2 );
					objTime.H = this.padLeft( objTime.G, 2, '0' );
					objTime.g = ( objTime.G > 12 ) ? objTime.G - 12 : objTime.G;
					objTime.h = this.padLeft( objTime.g, 2, '0' );
					objTime.a = ( objTime.G < 12 ) ? 'am' : 'pm';
					objTime.A = objTime.a.toUpperCase();
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

						objTime.utc.D = objNames.days[objTime.utc.N]['short'];
						objTime.utc.l = objNames.days[objTime.utc.N]['long'];
						objTime.utc.d = this.padLeft( objTime.utc.j, 2, '0' );
						objTime.utc.S = this.numberSuffix( objTime.utc.j );
						objTime.utc.m = this.padLeft( objTime.utc.n, 2, '0' );
						objTime.utc.F = objNames.months[objTime.utc.n]['long'];
						objTime.utc.M = objNames.months[objTime.utc.n]['short'];
						objTime.utc.y = this.padLeft( objTime.utc.Y, 2 );
						objTime.utc.H = this.padLeft( objTime.utc.G, 2, '0' );
						objTime.utc.g = ( objTime.utc.G > 12 ) ? objTime.utc.G - 12 : objTime.utc.G;
						objTime.utc.h = this.padLeft( objTime.utc.g, 2, '0' );
						objTime.utc.a = ( objTime.utc.G < 12 ) ? 'am' : 'pm';
						objTime.utc.A = objTime.utc.a.toUpperCase();
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
			this.dump = function( mxdIn, blRenderIndents, mxdIndent ) {
					//var blRenderIndents = typeof blRenderIndents === 'boolean' ? blRenderIndents : false;
					var blRenderIndents = true;
					if( this.isSet( JSON )
							&& this.isSet( JSON.stringify )
							&& !blRenderIndents ) {
						return JSON.stringify( mxdIn );
					} else {
						mxdIndent = this.isInt( mxdIndent ) ? mxdIndent : 0;
						var strSingleIndent = '&nbsp;&nbsp;&nbsp;&nbsp;';
						var strIndent = ( new Array( mxdIndent + 1 ) ).join( strSingleIndent );
						var strNextIndent = ( new Array( mxdIndent + 2 ) ).join( strSingleIndent );
						var strOut = '';

						if( Object.prototype.toString.call( mxdIn ) === '[object Array]' ) {
							strOut += '[\n';
							if( mxdIn.length ) {
								for( var i in mxdIn ) {
									if( Object.prototype.toString.call( mxdIn[i] ) === '[object Array]'
											|| Object.prototype.toString.call( mxdIn[i] ) === '[object Object]' ) {
										strOut += strNextIndent + this.dump( mxdIn[i], blRenderIndents, mxdIndent + 1 );
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
										strOut += strNextIndent + '"' + mxdIn[i] + '",\n';
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
										strOut += this.dump( mxdIn[i], blRenderIndents, mxdIndent + 1 );
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
										strOut += '"' + mxdIn[i] + '",\n';
									}
								}
								strOut = strOut.substring( 0, strOut.length - 2 ) + '\n';
							}
							strOut += strIndent + '},\n';
						} else {
							strOut += strNextIndent + '"' + mxdIn + '",\n';
						}

						return mxdIndent === 0 ? strOut.substring( 0, strOut.length - 2 ) : strOut;
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
			this.ie = function( version ) {
					var strUserAgent = navigator.userAgent;
					var intMSIEOffset = strUserAgent.indexOf( 'MSIE ' );
					if( ( version !== undefined
							&& version == parseFloat( strUserAgent.substring( intMSIEOffset + 5, strUserAgent.indexOf( ';', intMSIEOffset ) ) ) )
							|| ( version === undefined
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
			this.isAlpha = function( mxdValue ) {
					return ( /^[a-z]+$/i ).test( mxdValue );
				},
			this.isAlphanumeric = function( mxdValue ) {
					return ( /^[a-z0-9]+$/i ).test( mxdValue );
				},
			this.contains = function( strNeedle, strHaystack ) {
					return strHaystack.indexOf( strNeedle ) >= 0;
				},
			this.isArray = function( mxdValue ) {
					return typeof mxdValue === 'array';
				},
			this.isBlank = function( mxdValue ) {
					return mxdValue.replace( /^\s\t\r\n$/ ) === '';
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
					return mxdValue !== null && mxdValue !== undefined && mxdValue !== 'undefined' && typeof( mxdValue ) !== 'null' && typeof( mxdValue ) !== 'undefined';
				},
			this.isWindowFocused = function() {
					return this.blWindowFocused;
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
			this.moderniseInputs = function( blPlaceholders, funCallback ) {
					//TODO: Support for textarea and select
					funCallback = ( typeof funCallback === 'function' ) ? funCallback : ( ( typeof blPlaceholders === 'function' ) ? blPlaceholders : function() {} );
					blPlaceholders = ( typeof blPlaceholders === 'boolean' ) ? blPlaceholders : true;
					var mxdIEVersion = this.ie();
					var blYeOldieBrowser = ( mxdIEVersion !== false && mxdIEVersion < 10 );

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
											blValid = isEmail( jqoInput.val() );
											break;

										case 'url':
											blValid = isUrl( jqoInput.val() );
											break;

										case 'number':
											blValid = isNumber( jqoInput.val() );
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
			this.numberSuffix = function( intNumber ) {
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
						for( mxdKey in objIn ) {
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
					return this.ie( 6 ) || this.ie( 7 ) || this.ie( 8 );
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
			this.pixelDensity = this.isNumber( window.devicePixelRatio ) ? window.devicePixelRatio : 1,
			this.prettySize = function( intBytes ) {
					var arrLimits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
					var intLimit = 0;

					while( arrLimits[intLimit]
							&& intBytes > Math.pow( 1024, intLimit + 1 ) ) {
						intLimit++;
					}

					return this.round( intBytes / Math.pow( 1024, intLimit ), 2 ) + ' ' + arrLimits[intLimit];
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
					return result = Math.round( intNumber * Math.pow( 10, intDP ) ) / Math.pow( 10, intDP );
				},
			this.slug = function( strOriginal ) {
					return strOriginal.replace( /^\s+|\s+$/g, '' ).replace( /[^a-zA-Z0-9 \-_]/g, '' ).replace( /\s+/g, '' ).replace( /-+/g, '' );
				},
			this.version = function( mxdCheckVersion ) {
					var arrThisVersion = [0, 9, 30];
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

		if( window.jQuery ) {
			(
				function( $ ) {
					$.fn.formToObject = function() {
							var objOut = {};

							jQuery.map( $( this ).serializeArray(),
									function( arrElement, intindex ) {
										objOut[arrElement['name']] = arrElement['value'];
									}
							);

							return objOut;
						},
					$.fn.ShadowGetMatrix = function( blFloat ) {
							blFloat = ( typeof blFloat !== 'boolean' ) ? true : blFloat;
							var strMatrix = $( this ).css( 'transform' );
							var objMatrix = {
									scaleX: 0,
									yX: 0,
									zX: 0,
									WX: 0,

									xY: 0,
									scaleY: 0,
									zY: 0,
									WY: 0,

									xZ: 0,
									yZ: 0,
									scaleZ: 0,
									WZ: 0,

									translateX: 0,
									translateY: 0,
									translateZ: 0,
									W: 0
								};

							if( strMatrix.substr( 0, 7 ).toLowerCase() === 'matrix(' ) {
								var arrMatrix = strMatrix.slice( 7, -1 ).replace( ' ', '' ).split( ',' );

								objMatrix.scaleX = blFloat ? parseFloat( arrMatrix[0] ) : parseInt( arrMatrix[0] );
								objMatrix.yX = blFloat ? parseFloat( arrMatrix[1] ) : parseInt( arrMatrix[1] );

								objMatrix.xY = blFloat ? parseFloat( arrMatrix[2] ) : parseInt( arrMatrix[2] );
								objMatrix.scaleY = blFloat ? parseFloat( arrMatrix[3] ) : parseInt( arrMatrix[3] );

								objMatrix.translateX = blFloat ? parseFloat( arrMatrix[4] ) : parseInt( arrMatrix[4] );
								objMatrix.translateY = blFloat ? parseFloat( arrMatrix[5] ) : parseInt( arrMatrix[5] );
							} else if( strMatrix.substr( 0, 9 ).toLowerCase() === 'matrix3d(' ) {
								var arrMatrix = strMatrix.slice( 9, -1 ).replace( ' ', '' ).split( ',' );

								objMatrix.scaleX = blFloat ? parseFloat( arrMatrix[0] ) : parseInt( arrMatrix[0] );
								objMatrix.yX = blFloat ? parseFloat( arrMatrix[1] ) : parseInt( arrMatrix[1] );
								objMatrix.zX = blFloat ? parseFloat( arrMatrix[2] ) : parseInt( arrMatrix[2] );
								objMatrix.WX = blFloat ? parseFloat( arrMatrix[3] ) : parseInt( arrMatrix[3] );

								objMatrix.xY = blFloat ? parseFloat( arrMatrix[4] ) : parseInt( arrMatrix[4] );
								objMatrix.scaleY = blFloat ? parseFloat( arrMatrix[5] ) : parseInt( arrMatrix[5] );
								objMatrix.zY = blFloat ? parseFloat( arrMatrix[6] ) : parseInt( arrMatrix[6] );
								objMatrix.WY = blFloat ? parseFloat( arrMatrix[7] ) : parseInt( arrMatrix[7] );

								objMatrix.xZ = blFloat ? parseFloat( arrMatrix[8] ) : parseInt( arrMatrix[8] );
								objMatrix.yZ = blFloat ? parseFloat( arrMatrix[9] ) : parseInt( arrMatrix[9] );
								objMatrix.scaleZ = blFloat ? parseFloat( arrMatrix[10] ) : parseInt( arrMatrix[10] );
								objMatrix.WZ = blFloat ? parseFloat( arrMatrix[11] ) : parseInt( arrMatrix[11] );

								objMatrix.translateX = blFloat ? parseFloat( arrMatrix[12] ) : parseInt( arrMatrix[12] );
								objMatrix.translateY = blFloat ? parseFloat( arrMatrix[13] ) : parseInt( arrMatrix[13] );
								objMatrix.translateZ = blFloat ? parseFloat( arrMatrix[14] ) : parseInt( arrMatrix[14] );
								objMatrix.W = blFloat ? parseFloat( arrMatrix[15] ) : parseInt( arrMatrix[15] );
							}

							return objMatrix;
						},
					$.fn.serializeJSON = function() {
							var objJSON = {};

							jQuery.map( $( this ).serializeArray(),
									function( arrElement, intIndex ) {
										var intStart = arrElement['name'].indexOf( '[' );
										var intEnd = arrElement['name'].indexOf( ']', intStart + 1 );

										if( intStart != -1
												&& intEnd != -1 ) {
											var strThisName = arrElement['name'].substring( 0, intStart );
											var strNextName = arrElement['name'].substring( intStart + 1, intEnd );

											if( typeof objJSON[strThisName] === 'undefined' ) {
												objJSON[strThisName] = {};
											}

											objJSON[strThisName][strNextName] = arrElement['value'];
										} else {
											objJSON[arrElement['name']] = arrElement['value'];
										}
									}
							);

							return objJSON;
						},
					$.fn.ShadowSwipe = function( objUserOptions ) {
							var objOptions = $.extend(
								{
										threshold: {
												x: 100,
												y: 100
											},
										up: function() {},
										upright: function() {},
										right: function() {},
										downright: function() {},
										down: function() {},
										downleft: function() {},
										left: function() {},
										upleft: function() {},
										start: function() {},
										end: function() {},
										swipe: function() {},
										cancel: function() {},
										diagonals: false,
										preventMove: true
									},
								objUserOptions
							);

							return this.each(
								function() {
									var intShallowDiagonalLimit = Math.tan( 22.5 * ( Math.PI / 180 ) );
									var intSteepDiagonalLimit = 1 / intShallowDiagonalLimit;
									var objOriginalPosition = { x: 0, y: 0 };
									var objFinalPosition = { x: 0, y: 0 };

									function touchStart( e ) {
										objOriginalPosition.x = e.targetTouches[0].pageX;
										objOriginalPosition.y = e.targetTouches[0].pageY;
										objOptions.start();
									}

									function touchMove( e ) {
										if( objOptions.preventMove ) {
											e.preventDefault();
											//e.stopPropagation();
										}
										objFinalPosition.x = e.targetTouches[0].pageX;
										objFinalPosition.y = e.targetTouches[0].pageY;
									}

									function touchEnd( e ) {
										var intChangeX = objOriginalPosition.x - objFinalPosition.x;
										var intChangeY = objOriginalPosition.y - objFinalPosition.y;
										var intGradient = Math.abs( intChangeY / intChangeX );
										var blChangeXThreshold = Math.abs( intChangeX ) > objOptions.threshold.x;
										var blChangeYThreshold = Math.abs( intChangeY ) > objOptions.threshold.y;

										if( objOptions.diagonals ) {
											if( intGradient <= intShallowDiagonalLimit
													&& blChangeXThreshold ) {
												if( intChangeX > 0 ) {
													objOptions.left();
												} else {
													objOptions.right();
												}
												objOptions.swipe();
											} else if( intGradient > intShallowDiagonalLimit
													&& intGradient < intSteepDiagonalLimit
													&& (  blChangeXThreshold
													|| blChangeYThreshold ) ) {
												if( intChangeX > 0 ) {
													if( intChangeY > 0 ) {
														objOptions.upleft();
													} else {
														objOptions.downleft();
													}
												} else {
													if( intChangeY > 0 ) {
														objOptions.upright();
													} else {
														objOptions.downright();
													}
												}
												objOptions.swipe();
											} else if( blChangeYThreshold ) {
												if( intChangeY > 0 ) {
													objOptions.up();
												} else {
													objOptions.down();
												}
												objOptions.swipe();
											}
										} else {
											if( blChangeXThreshold ) {
												if( blChangeYThreshold ) {
													if( Math.abs( intChangeX ) > Math.abs( intChangeY ) ) {
														if( intChangeX > 0 ) {
															objOptions.left();
														} else {
															objOptions.right();
														}
													} else {
														if( intChangeY > 0 ) {
															objOptions.up();
														} else {
															objOptions.down();
														}
													}
												} else {
													if( intChangeX > 0 ) {
														objOptions.left();
													} else {
														objOptions.right();
													}
												}
												objOptions.swipe();
											} else if( blChangeYThreshold ) {
												if( intChangeY > 0 ) {
													objOptions.up();
												} else {
													objOptions.down();
												}
												objOptions.swipe();
											}
										}

										objOptions.end();
									}

									function touchCancel( e ) {
										objOptions.cancel();
									}

									this.addEventListener( 'touchstart', touchStart, false );
									this.addEventListener( 'touchmove', touchMove, false );
									this.addEventListener( 'touchend', touchEnd, false );
									this.addEventListener( 'touchcancel', touchCancel, false );
								}
							);
						};
				}
			)( jQuery );
		}

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
