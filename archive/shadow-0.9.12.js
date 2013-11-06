/**
 * ================================================================================
 * Shadow
 * --------------------------------------------------------------------------------
 * Author:      Andrew Hosgood
 * Version:     0.9.12
 * Date:        12/02/2013
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
				this.cssAnimations = function() {
						var blAnimation = false;
						var strAnimation = 'animation';
						var strKeyframePrefix = '';
						var arrDOMPrefixes = 'Webkit Moz O ms Khtml'.split( ' ' );
						var strPrefix  = '';

						if( elm.style.animationName ) {
							blAnimation = true;
						} else {
							for( var intPrefix = 0; intPrefix < domPrefixes.length; intPrefix++ ) {
								if( elm.style[ arrDOMPrefixes[intPrefix] + 'AnimationName' ] !== undefined ) {
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
							for( var intCharacter = 0; intCharacter < arrData.length; intCharacter++ ) {
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
				this.date = this.time,
				this.fullScreen = function( jqoObject ) {
						if( jqoObject[0].requestFullScreen ) {
							jqoObject[0].requestFullScreen();
						} else if( jqoObject[0].mozRequestFullScreen ) {
							jqoObject[0].mozRequestFullScreen();
						} else if( jqoObject[0].webkitRequestFullScreen ) {
							jqoObject[0].webkitRequestFullScreen();
						}
					},
				this.getFileHeaders = function( strResource, callback ) {
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
								callback.call( arrResourceResponseHeaders );
							}
						}

						try {
							resXHR.open( 'HEAD', strResource, true );
							resXHR.send();
						} catch( e ) {
							error( e );
						}
					},
				this.getHash = function() {
						var strHash = window.location.hash;
						return strHash.substring( 1 );
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
				this.isCapslock = function( e ) {
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
				this.isInt = function( mxdValue ) {
						return ( ( parseFloat( mxdValue ) == parseInt( mxdValue ) ) && !isNaN( mxdValue ) );
					},
				this.isEmail = function( mxdValue ) {
						return ( /^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/ ).test( mxdValue );
					},
				this.isNumber = function( maxValue ) {
						return ( typeof( maxValue ) === 'number' || typeof( maxValue ) === 'string' ) && maxValue !== '' && !isNaN( maxValue );
					},
				this.isset = function( maxValue ) {
						return typeof( maxValue ) !== 'null' && typeof( maxValue ) !== 'undefined';
					},
				this.log = function() {
						if( window.console
								&& window.console.log
								&& arguments.length > 0 ) {
							for( var intArguement = 0; intArguement < arguments.length; intArguement++ ) {
								window.console.log( arguments[intArguement] );
							}
						}
					},
				this.milliseconds = function() {
						var datNow = new Date().getTime();
	                    return parseFloat( ( datNow - ( parseInt( datNow / 1000 ) * 1000 ) ) / 1000 );
					},
				this.moderniseInputs = function( funCallback ) {
						//TODO: Support for textarea and select
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

						if( blYeOldieBrowser ) {
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

						if( typeof funCallback === 'function' ) {
							funCallback.call();
						}
					},
				this.numberSuffix = function( intNumber ) {
						if( !this.isInt( intNumber ) ) {
							intNumber = parseInt( intNumber );
						}

						var strSuffix = '';

						if( this.isInt( intNumber )
								&& intNumber > 0 ) {
							var intNumberUnits = parseInt( intNumber.toString().substr( -1 ) );

							if( intNumberUnits === 1
									&& intNumber !== 11 ) {
								strSuffix = 'st';
							} else if( intNumberUnits === 2
									&& intNumber !== 12 ) {
								strSuffix = 'nd';
							} else if( intNumberUnits === 3
									&& intNumber !== 13 ) {
								strSuffix = 'rd';
							} else {
								strSuffix = 'th';
							}
						}

						return strSuffix;
					},
				this.objectLength = function( objIn ) {
						var intLength = 0;

						for( mxdKey in objIn ) {
							if( objIn.hasOwnProperty( mxdKey ) ) {
								intLength++;
							}
						}

						return intLength;
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
				this.prettySize = function( intBytes ) {
						var objLimits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
						var intLimit = 0;

						while( intBytes > Math.pow( 1024, intLimit + 1 ) ) {
							intLimit++;
						}

						return this.round( intBytes / Math.pow( 1024, intLimit ), 2 ) + ' ' + objLimits[intLimit];
					},
				this.prettyTime = function( intSeconds ) {
						var strUptime = '';

						var objLimits = {
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
				this.randomString = function( intStringLength, blExtended ) {
						var strChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
						if( blExtended === true ) {
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
				this.time = function( mxdFormatUTC, blUTC ) {
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
								U: datNow.getTime(),
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
								} else if( strChar === 'U' ) {
									if( blUTC ) {
										strOut += Date.UTC( objTime.utc.Y, objTime.utc.n - 1, objTime.utc.j, objTime.utc.G, objTime.utc.i, objTime.utc.s, objTime.utc.u );
									} else {
										strOut += Date.UTC( objTime.Y, objTime.n - 1, objTime.j, objTime.G, objTime.i, objTime.s, objTime.u );
									}
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
					};

				return this;
			};

		if( window.jQuery ) {
			( function( $ ) {
				$.fn.formToObject = function() {
						var objOut = {};

						jQuery.map( $( this ).serializeArray(),
							function( arrElement, intindex ) {
								objOut[arrElement['name']] = arrElement['value'];
	                        }
						);

						return objOut;
					},
				$.fn.getMatrix = function( blFloat ) {
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
					};
				}
			)( jQuery );
		}

		//eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 a=[],b=\'1,1,2,2,3,4,3,4,8,9\';$(5).6(c(e){a.d(e.f);g(a.h().i(b)>=0){$(5).j(\'6\');k.l("m://n.o.p.q/r/s/t.u")}});',31,31,'|38|40|37|39|document|keydown|var|66|65|||function|push||keyCode|if|toString|indexOf|unbind|window|open|http|cdn|logoserver1|co|uk|content|logodebug|game|swf'.split('|'),0,{}));

		window.Shadow = new Shadow;
		if( !window.shdw ) {
			window.shdw = window.Shadow;
		}
	}
)( window );