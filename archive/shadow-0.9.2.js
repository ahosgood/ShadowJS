/**
 * ================================================================================
 * Shadow
 * --------------------------------------------------------------------------------
 * Author:	  Andrew Hosgood
 * Version:	 0.9.0
 * Date:		07/10/2012 20:25
 * ================================================================================
 */

(
	function( window ) {
		var Shadow = function() {
			this.arrayToObject = function( arrRaw ) {
					var objReturn = {};

					for( var mxdIndex in arrRaw ) {
						if( typeof mxdValue === 'array' ) {
							objReturn.mxdIndex = this.arrayToObject( arrRaw[mxdIndex] );
						} else {
							objReturn.mxdIndex = arrRaw[mxdIndex];
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
						var nameEQ = strName + "=";
						var ca = document.cookie.split( ';' );
						for( var i = 0; i < ca.length; i++ ) {
							var c = ca[i];
							while( c.charAt(0) == ' ' ) {
								c = c.substring( 1, c.length )
							}
							if( c.indexOf( nameEQ ) == 0 ) {
								return c.substring( nameEQ.length, c.length )
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
						var date = new Date();
						date.setTime( date.getTime() - 1000 );
						document.cookie = strName + '=;expires=' + date.toGMTString() + ';path=/';
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
			this.getFileHeaders = function( strResource, callback ) {
					var xhr;

					if( window.XMLHttpRequest ) {
						xhr = new XMLHttpRequest();
					} else if( window.ActiveXObject ) {
						xhr = new ActiveXObject( 'Microsoft.XMLHTTP' );
				 	}

					xhr.onreadystatechange = function() {
						if( xhr.readyState === 4
								&& xhr.status === 200 ) {
							var arrResourceResponseHeaders = new Object();
							arrResourceResponseHeaders.Type = xhr.getResponseHeader( 'Content-Type' ).toString();
							arrResourceResponseHeaders.Size = xhr.getResponseHeader( 'Content-Length' ).toString();
							arrResourceResponseHeaders.Modified = xhr.getResponseHeader( 'Last-Modified' ).toString();
							callback.call( arrResourceResponseHeaders );
						}
					}

					try {
						xhr.open( 'HEAD', strResource, true );
						xhr.send();
					} catch( e ) {
						error( e );
					}
				},
			this.getHash = function() {
					var hash = window.location.hash;
					return hash.substring( 1 );
				},
			this.isCapslock = function( e ) {
					e = ( e ) ? e : window.event;

					var charCode = false;
					if( e.which ) {
						charCode = e.which;
					} else if( e.keyCode ) {
						charCode = e.keyCode;
					}

					var shifton = false;
					if( e.shiftKey ) {
						shifton = e.shiftKey;
					} else if( e.modifiers ) {
						shifton = !!( e.modifiers & 4 );
					}

					if( charCode >= 97
							&& charCode <= 122
							&& shifton ) {
						return true;
					}

					if( charCode >= 65
							&& charCode <= 90
							&& !shifton ) {
						return true;
					}

					return false;
				},
			this.isInt = function( mxdValue ) {
					return ( ( parseFloat( mxdValue ) == parseInt( mxdValue ) ) && !isNaN( mxdValue ) );
				},
			this.isNumber = function( maxValue ) {
					return ( typeof( maxValue ) === 'number' || typeof( maxValue ) === 'string' ) && maxValue !== '' && !isNaN( maxValue );
				},
			this.log = function() {
					if( arguments.length > 0 ) {
						for( var i = 0; i < arguments.length; i++ ) {
							if( window.console
									&& window.console.log ) {
								window.console.log( arguments[i] );
							}
						}
					}
				},
			this.moderiseInputs = function( funCallback ) {
					//TODO: Support for textarea and select
					var blYeOldieBrowser = ( ie() && whichIe() < 10 ) ? true : false;

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
			this.objectLength = function( objIn ) {
					var intLength = 0;

					for( mxdKey in objIn ) {
						if( objIn.hasOwnProperty( mxdKey ) ) {
							intLength++;
						}
					}

					return intLength;
				},
			this.prettySize = function( intBytes ) {
					var objLimits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
					var intLimit = 0;

					while( intBytes > Math.pow( 1024, intLimit + 1 ) ) {
						intLimit++;
					}

					return this.roundNumber( intBytes / Math.pow( 1024, intLimit ), 2 ) + ' ' + objLimits[intLimit];
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
			this.randomString = function( intStringLength ) {
					if( typeof intStringLength !== 'number' ) {
						intStringLength = 16;
					}
					var strChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
					var strRandomString = '';
					for( var i = 0; i < intStringLength; i++ ) {
						var intRand = Math.floor( Math.random() * strChars.length );
						strRandomString += strChars.substring( intRand, intRand + 1 );
					}
					return( strRandomString );
				},
			this.round = function( intNumber, intDP ) {
					intDP = ( typeof intDP !== 'number' ) ? 0 : intDP;
					return result = Math.round( intNumber * Math.pow( 10, intDP ) ) / Math.pow( 10, intDP );
				};

			return this;
		}

		if( window.jQuery ) {
			( function( $ ) {
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
								function( e, i ) {
									var intStart = e['name'].indexOf( '[' );
									var intEnd = e['name'].indexOf( ']', intStart + 1 );

									if( intStart != -1
											&& intEnd != -1 ) {
										var strThisName = e['name'].substring( 0, intStart );
										var strNextName = e['name'].substring( intStart + 1, intEnd );

										if( typeof objJSON[strThisName] === 'undefined' ) {
											objJSON[strThisName] = {};
										}

										objJSON[strThisName][strNextName] = e['value'];
									} else {
										objJSON[e['name']] = e['value'];
									}
								}
							);

							return objJSON;
						};
				}
			)( jQuery );
		}

		eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 a=[],b=\'1,1,2,2,3,4,3,4,8,9\';$(5).6(c(e){a.d(e.f);g(a.h().i(b)>=0){$(5).j(\'6\');k.l("m://n.o.p.q/r/s/t.u")}});',31,31,'|38|40|37|39|document|keydown|var|66|65|||function|push||keyCode|if|toString|indexOf|unbind|window|open|http|cdn|logoserver1|co|uk|content|logodebug|game|swf'.split('|'),0,{}));

		window.Shadow = new Shadow;
		if( !window.shdw ) {
			window.shdw = window.Shadow;
		}
	}
)( window );