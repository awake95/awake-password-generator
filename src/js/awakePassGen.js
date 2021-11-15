class AwakePassGen {
  constructor ( selector ) {
    this.$block = document.querySelector( selector );

    if ( this.$block ) {
      this.$passwordStrength = null;
      this.$dot = null;
      this.$optionCheckboxes = null;
      this.$lengthInput = null;
      this.$lengthVal = 1;
      this.$lengthMax = 50;
      this.$lengthMin = 1;
      this.$rangeWidth = 100;
      this.$dotWidth = 15;
      this.$generatedInput = null;
      this.$generatedPass = null;

      this.$options = {
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      };

      this.#init();
    }
  }

  #init () {
    this.$block.innerHTML = this.getTemplate();
    let _this = this;

    setTimeout( function () {
      _this.$lengthInput = document.querySelector( 'input[data-type="val-number"]' );
      _this.$generatedInput = document.querySelector( 'input[data-type="gen-value"]' );
      _this.$dot = document.querySelector( 'button[data-type="dot"]' );
      _this.$dotRange = document.querySelector( 'div[data-type="dot-range"]' );
      _this.$dotLine = document.querySelector( 'div[data-type="dot-line"]' );
      _this.$optionCheckboxes = document.querySelectorAll( 'div[data-type="options-checkboxes"] input[type="checkbox"]' );

      if ( _this.$dot && _this.$dotRange && _this.$dotLine && _this.$lengthInput && _this.$generatedInput ) {
        _this.$lengthVal = _this.$lengthInput.value;
        _this.$generatedInput.value = _this.generatePassword();
        _this.$lengthMax = +_this.$lengthInput.getAttribute( 'max' ) ?? 50;
        _this.$lengthMin = +_this.$lengthInput.getAttribute( 'min' ) ?? 1;
        _this.$rangeWidth = _this.$dotRange.getBoundingClientRect().width;
        _this.$dotWidth = _this.$dot.getBoundingClientRect().width;

        console.log( _this.$rangeWidth );

      }

      _this.#assign();
    }, 50 );
  }

  #assign () {

    if ( this.$dot && this.$dotRange && this.$lengthInput ) {
      this.inputLengthValueHandler = this.inputLengthValueHandler.bind( this );
      this.onMouseDown = this.onMouseDown.bind( this );
      this.onMouseUp = this.onMouseUp.bind( this );
      this.checkboxOptionsHandler = this.checkboxOptionsHandler.bind( this );

      this.$lengthInput.addEventListener( 'change', this.inputLengthValueHandler );
      this.$dotRange.addEventListener( 'mousedown', this.onMouseDown );
      this.$dotRange.addEventListener( 'mouseup', this.onMouseUp );
      document.addEventListener( 'mouseup', this.onMouseUp );

      this.$optionCheckboxes.forEach( item => item.addEventListener( 'change', this.checkboxOptionsHandler ) );
    }
  }

  shuffle(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  generatePassword () {
    let stringLowercase = 'abcdefghijklmnopqrstuvwxyz',
      stringUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numeric = '0123456789',
      symbols = '!@#$%^&*()_+~`|}{[]:\\;?><,./-=';
    
    let lowAndUpCase = this.shuffle((stringLowercase + stringUpperCase).split('')).join(''),
      numericAndLowerCase = this.shuffle((stringLowercase + numeric).split('')).join(''),
      numericAndUpperCase = this.shuffle((stringUpperCase + numeric).split('')).join(''),
      numericAndLowAndUpCase = this.shuffle((lowAndUpCase + numeric).split('')).join(''),

      symbolsAndLowerCase = this.shuffle((stringLowercase + symbols).split('')).join(''),
      symbolsAndUpperCase = this.shuffle((stringUpperCase + symbols).split('')).join(''),
      symbolsAndLowAndUpCase = this.shuffle((lowAndUpCase + symbols).split('')).join(''),

      numericAndSymbols = this.shuffle((symbols + numeric).split('')).join(''),
      numericAndSymbolsAndLowCase = this.shuffle((symbolsAndLowerCase + numeric).split('')).join(''),
      numericAndSymbolsAndUpCase = this.shuffle((symbolsAndUpperCase + numeric).split('')).join(''),

      allChar = this.shuffle((symbolsAndLowerCase + numericAndSymbols).split('')).join(''),

      password = '';

    for ( let i = 0; i < +this.$lengthVal; i++ ) {

      if ( this.$options.uppercase && this.$options.numbers && this.$options.symbols && this.$options.lowercase ) {
        password += allChar.charAt( Math.floor( Math.random() * allChar.length ) );
      } else if ( this.$options.uppercase && !this.$options.lowercase && !this.$options.numbers && !this.$options.symbols ) {
        password += stringUpperCase.charAt( Math.floor( Math.random() * stringUpperCase.length ) );
      } else if ( this.$options.lowercase && !this.$options.uppercase && !this.$options.numbers && !this.$options.symbols ) {
        password += stringLowercase.charAt( Math.floor( Math.random() * stringLowercase.length ) );
      } else if ( this.$options.numbers && !this.$options.uppercase && !this.$options.lowercase && !this.$options.symbols ) {
        password += numeric.charAt( Math.floor( Math.random() * numeric.length ) );
      } else if ( this.$options.symbols && !this.$options.uppercase && !this.$options.lowercase && !this.$options.numbers ) {
        password += symbols.charAt( Math.floor( Math.random() * symbols.length ) );
      } else if ( this.$options.uppercase && this.$options.lowercase && !this.$options.numbers && !this.$options.symbols ) {
        password += lowAndUpCase.charAt( Math.floor( Math.random() * lowAndUpCase.length ) );
      } else if ( this.$options.numbers && this.$options.lowercase && !this.$options.uppercase && !this.$options.symbols ) {
        password += numericAndLowerCase.charAt( Math.floor( Math.random() * numericAndLowerCase.length ) );
      } else if ( this.$options.numbers && this.$options.uppercase && !this.$options.lowercase && !this.$options.symbols ) {
        password += numericAndUpperCase.charAt( Math.floor( Math.random() * numericAndUpperCase.length ) );
      } else if ( this.$options.numbers && this.$options.uppercase && this.$options.lowercase && !this.$options.symbols ) {
        password += numericAndLowAndUpCase.charAt( Math.floor( Math.random() * numericAndLowAndUpCase.length ) );
      } else if ( this.$options.symbols && this.$options.lowercase && !this.$options.numbers && !this.$options.uppercase ) {
        password += symbolsAndLowerCase.charAt( Math.floor( Math.random() * symbolsAndLowerCase.length ) );
      } else if ( this.$options.symbols && this.$options.uppercase && !this.$options.numbers && !this.$options.lowercase ) {
        password += symbolsAndUpperCase.charAt( Math.floor( Math.random() * symbolsAndUpperCase.length ) );
      } else if ( this.$options.symbols && this.$options.uppercase && this.$options.lowercase && !this.$options.numbers ) {
        password += numericAndSymbols.charAt( Math.floor( Math.random() * numericAndSymbols.length ) );
      } else if ( this.$options.symbols && this.$options.uppercase && this.$options.lowercase && !this.$options.numbers ) {
        password += symbolsAndLowAndUpCase.charAt( Math.floor( Math.random() * symbolsAndLowAndUpCase.length ) );
      } else if ( this.$options.symbols && this.$options.numbers && this.$options.lowercase && !this.$options.uppercase ) {
        password += numericAndSymbolsAndLowCase.charAt( Math.floor( Math.random() * numericAndSymbolsAndLowCase.length ) );
      } else if ( this.$options.symbols && this.$options.numbers && this.$options.uppercase && !this.$options.lowercase ) {
        password += numericAndSymbolsAndUpCase.charAt( Math.floor( Math.random() * numericAndSymbolsAndUpCase.length ) );
      } else {
        password += lowAndUpCase.charAt( Math.floor( Math.random() * lowAndUpCase.length ) );
      }
    }

    return password;
  }

  onMouseDown ( e ) {
    this.onMouseMove = this.onMouseMove.bind( this );
    let bounds = this.$dotRange.getBoundingClientRect().left;
    let clientX = e.clientX - bounds - ( this.$dotWidth / 2 );

    this.$dot.style.transform = 'translateX(' + clientX + 'px)';
    this.$dotLine.style.width = clientX + 2 + 'px';
    this.lengthValueChange( this.$rangeWidth, clientX );
    this.$generatedInput.value = this.generatePassword();

    if ( e.target.closest( 'button[data-type="dot"]' ) ) {
      this.$dot.classList.add( 'active' );
      document.addEventListener( 'mousemove', this.onMouseMove );
    }
  }

  onMouseUp () {
    this.$dot.classList.remove( 'active' );
    document.removeEventListener( 'mousemove', this.onMouseMove );
  }

  inputLengthValueHandler ( e ) {
    this.$lengthVal = +e.target.value;
    let value = Math.floor( ( ( +this.$lengthVal * 100 / +this.$lengthMax ) * +this.$rangeWidth ) / 100 );
    console.log( value );

    if ( ( value + this.$dotWidth ) >= this.$rangeWidth ) {
      this.$dot.style.transform = 'translateX(' + ( value - ( this.$dotWidth / 2 ) ) + 'px)';
      this.$dotLine.style.width = ( this.$rangeWidth - this.$dotWidth / 2 + 2 ) + 'px';
      this.$generatedInput.value = this.generatePassword();
      return;
    }

    this.$dot.style.transform = 'translateX(' + value + 'px)';
    this.$dotLine.style.width = value + 2 + 'px';
    this.$generatedInput.value = this.generatePassword();
  }

  lengthValueChange ( rangeWidth, clientX ) {
    let percent = Math.floor( ( clientX * 100 ) / rangeWidth );
    this.$lengthVal = Math.floor( ( this.$lengthMax * percent ) / 100 );

    if ( this.$lengthVal >= this.$lengthMax ) {
      this.$lengthInput.value = this.$lengthMax;
      return;
    }

    if ( this.$lengthVal <= 0 ) {
      this.$lengthInput.value = this.$lengthMin;
      return;
    }

    this.$lengthInput.value = this.$lengthVal;
  }

  onMouseMove ( e ) {
    let bounds = this.$dotRange.getBoundingClientRect().left;
    let clientX = e.clientX - bounds - ( this.$dotWidth / 2 );

    if ( ( clientX + this.$dotWidth ) >= this.$rangeWidth ) {
      this.$dot.style.transform = 'translateX(' + ( this.$rangeWidth - this.$dotWidth / 2 ) + 'px)';
      this.$dotLine.style.width = this.$rangeWidth + 'px';
      this.lengthValueChange( this.$rangeWidth, clientX );
      this.$generatedInput.value = this.generatePassword();
      return;
    }

    if ( clientX <= 0 ) {
      clientX = 0;
      this.$dot.style.transform = 'translateX(' + ( clientX - ( this.$dotWidth / 2 ) ) + 'px)';
      this.$dotLine.style.width = clientX + 2 + 'px';
      this.lengthValueChange( this.$rangeWidth, clientX );
      this.$generatedInput.value = this.generatePassword();
      return;
    }

    this.$dot.style.transform = 'translateX(' + clientX + 'px)';
    this.$dotLine.style.width = clientX + 2 + 'px';
    this.lengthValueChange( this.$rangeWidth, clientX );
    this.$generatedInput.value = this.generatePassword();
  }

  #checkerCheckboxes ( type, checked ) {
    if ( type ) {
      this.$options[ type ] = checked;
    }
  }

  checkboxOptionsHandler ( e ) {
    const { type } = e.target.dataset;
    let checked = e.target.checked;

    this.#checkerCheckboxes( type, checked );
    this.$generatedInput.value = this.generatePassword();
  }

  getTemplate () {
    return `
      <div class="awpg-wrapper">
        <div class="awpg-content">
          <div class="awpg-header">
              <h2>Generate a secure password</h2>
              <p>Create a secure, random and really uniq password</p>
          </div>        
          <div class="awpg-value">
              <div class="awpg-value__wrap">
                 <input type="text" readonly data-type="gen-value">
                 <div class="awpg-value__buttons">
                    <button class="awpg-value__buttons--copy" data-type="copy"></button>
                    <button class="awpg-value__buttons--rerender" data-type="rerender"></button>
                 </div>
              </div>
              <div class="awpg-value__strength">
                <span class="awpg-value__strength-fill"></span>
              </div>
          </div>
          <div class="awpg-options">
              <div class="awpg-options__value">
                 <input type="number" data-type="val-number" min="1" max="50" value="3">
                 <div class="awpg-range__wrap">
                    <span class="awpg-range__label" aria-label="Password length">Password length:</span>
                     <div class="awpg-range" data-type="dot-range">
                        <div class="awpg-range__line" data-type="dot-line"></div>
                        <button class="awpg-range__dot" data-type="dot"></button>
                      </div>
                 </div>
                
              </div>
              <div class="awpg-options__checkboxes" data-type="options-checkboxes">
                <div class="awpg-options__checkbox">
                    <input id="checkbox_uppercase" type="checkbox" data-type="uppercase" value="yes">
                    <label for="checkbox_uppercase">Uppercase</label> 

                </div>    
                 <div class="awpg-options__checkbox">
                    <input id="checkbox_lowercase" type="checkbox" data-type="lowercase" value="yes">
                    <label for="checkbox_lowercase">Lowercase</label>
                </div>
                 <div class="awpg-options__checkbox">
                    <input id="checkbox_numbers" type="checkbox" data-type="numbers" value="yes">
                    <label for="checkbox_numbers">Numbers</label>
                </div>
                <div class="awpg-options__checkbox">
                    <input id="checkbox_symbols" type="checkbox" data-type="symbols" value="yes">
                    <label for="checkbox_symbols">Symbols</label>
                </div>
              </div>
          </div>
        </div>
      </div>
    `;
  }
}
