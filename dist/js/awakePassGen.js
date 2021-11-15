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

  generatePassword () {
    let stringLowercase = 'abcdefghijklmnopqrstuvwxyz',
      stringUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numeric = '0123456789',
      symbols = '!@#$%^&*()_+~`|}{[]:\\;?><,./-=';

    let lowAndUpCase = stringLowercase + stringUpperCase,

      numericAndLowerCase = stringLowercase + numeric,
      numericAndUpperCase = stringUpperCase + numeric,
      numericAndLowAndUpCase = lowAndUpCase + numeric,

      symbolsAndLowerCase = stringLowercase + symbols,
      symbolsAndUpperCase = stringUpperCase + symbols,
      symbolsAndLowAndUpCase = lowAndUpCase + symbols,

      numericAndSymbols = symbols + numeric,
      numericAndSymbolsAndLowCase = symbolsAndLowerCase + numeric,
      numericAndSymbolsAndUpCase = symbolsAndUpperCase + numeric,

      allChar = symbolsAndLowerCase + numericAndSymbols,

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhd2FrZVBhc3NHZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXdha2VQYXNzR2VuIHtcbiAgY29uc3RydWN0b3IgKCBzZWxlY3RvciApIHtcbiAgICB0aGlzLiRibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHNlbGVjdG9yICk7XG5cbiAgICBpZiAoIHRoaXMuJGJsb2NrICkge1xuICAgICAgdGhpcy4kcGFzc3dvcmRTdHJlbmd0aCA9IG51bGw7XG4gICAgICB0aGlzLiRkb3QgPSBudWxsO1xuICAgICAgdGhpcy4kb3B0aW9uQ2hlY2tib3hlcyA9IG51bGw7XG4gICAgICB0aGlzLiRsZW5ndGhJbnB1dCA9IG51bGw7XG4gICAgICB0aGlzLiRsZW5ndGhWYWwgPSAxO1xuICAgICAgdGhpcy4kbGVuZ3RoTWF4ID0gNTA7XG4gICAgICB0aGlzLiRsZW5ndGhNaW4gPSAxO1xuICAgICAgdGhpcy4kcmFuZ2VXaWR0aCA9IDEwMDtcbiAgICAgIHRoaXMuJGRvdFdpZHRoID0gMTU7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dCA9IG51bGw7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRQYXNzID0gbnVsbDtcblxuICAgICAgdGhpcy4kb3B0aW9ucyA9IHtcbiAgICAgICAgdXBwZXJjYXNlOiBmYWxzZSxcbiAgICAgICAgbG93ZXJjYXNlOiBmYWxzZSxcbiAgICAgICAgbnVtYmVyczogZmFsc2UsXG4gICAgICAgIHN5bWJvbHM6IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgdGhpcy4jaW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gICNpbml0ICgpIHtcbiAgICB0aGlzLiRibG9jay5pbm5lckhUTUwgPSB0aGlzLmdldFRlbXBsYXRlKCk7XG4gICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLiRsZW5ndGhJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdpbnB1dFtkYXRhLXR5cGU9XCJ2YWwtbnVtYmVyXCJdJyApO1xuICAgICAgX3RoaXMuJGdlbmVyYXRlZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2lucHV0W2RhdGEtdHlwZT1cImdlbi12YWx1ZVwiXScgKTtcbiAgICAgIF90aGlzLiRkb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnYnV0dG9uW2RhdGEtdHlwZT1cImRvdFwiXScgKTtcbiAgICAgIF90aGlzLiRkb3RSYW5nZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdkaXZbZGF0YS10eXBlPVwiZG90LXJhbmdlXCJdJyApO1xuICAgICAgX3RoaXMuJGRvdExpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnZGl2W2RhdGEtdHlwZT1cImRvdC1saW5lXCJdJyApO1xuICAgICAgX3RoaXMuJG9wdGlvbkNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnZGl2W2RhdGEtdHlwZT1cIm9wdGlvbnMtY2hlY2tib3hlc1wiXSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nICk7XG5cbiAgICAgIGlmICggX3RoaXMuJGRvdCAmJiBfdGhpcy4kZG90UmFuZ2UgJiYgX3RoaXMuJGRvdExpbmUgJiYgX3RoaXMuJGxlbmd0aElucHV0ICYmIF90aGlzLiRnZW5lcmF0ZWRJbnB1dCApIHtcbiAgICAgICAgX3RoaXMuJGxlbmd0aFZhbCA9IF90aGlzLiRsZW5ndGhJbnB1dC52YWx1ZTtcbiAgICAgICAgX3RoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gX3RoaXMuZ2VuZXJhdGVQYXNzd29yZCgpO1xuICAgICAgICBfdGhpcy4kbGVuZ3RoTWF4ID0gK190aGlzLiRsZW5ndGhJbnB1dC5nZXRBdHRyaWJ1dGUoICdtYXgnICkgPz8gNTA7XG4gICAgICAgIF90aGlzLiRsZW5ndGhNaW4gPSArX3RoaXMuJGxlbmd0aElucHV0LmdldEF0dHJpYnV0ZSggJ21pbicgKSA/PyAxO1xuICAgICAgICBfdGhpcy4kcmFuZ2VXaWR0aCA9IF90aGlzLiRkb3RSYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgX3RoaXMuJGRvdFdpZHRoID0gX3RoaXMuJGRvdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICBjb25zb2xlLmxvZyggX3RoaXMuJHJhbmdlV2lkdGggKTtcblxuICAgICAgfVxuXG4gICAgICBfdGhpcy4jYXNzaWduKCk7XG4gICAgfSwgNTAgKTtcbiAgfVxuXG4gICNhc3NpZ24gKCkge1xuXG4gICAgaWYgKCB0aGlzLiRkb3QgJiYgdGhpcy4kZG90UmFuZ2UgJiYgdGhpcy4kbGVuZ3RoSW5wdXQgKSB7XG4gICAgICB0aGlzLmlucHV0TGVuZ3RoVmFsdWVIYW5kbGVyID0gdGhpcy5pbnB1dExlbmd0aFZhbHVlSGFuZGxlci5iaW5kKCB0aGlzICk7XG4gICAgICB0aGlzLm9uTW91c2VEb3duID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICk7XG4gICAgICB0aGlzLm9uTW91c2VVcCA9IHRoaXMub25Nb3VzZVVwLmJpbmQoIHRoaXMgKTtcbiAgICAgIHRoaXMuY2hlY2tib3hPcHRpb25zSGFuZGxlciA9IHRoaXMuY2hlY2tib3hPcHRpb25zSGFuZGxlci5iaW5kKCB0aGlzICk7XG5cbiAgICAgIHRoaXMuJGxlbmd0aElucHV0LmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCB0aGlzLmlucHV0TGVuZ3RoVmFsdWVIYW5kbGVyICk7XG4gICAgICB0aGlzLiRkb3RSYW5nZS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93biApO1xuICAgICAgdGhpcy4kZG90UmFuZ2UuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCApO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCApO1xuXG4gICAgICB0aGlzLiRvcHRpb25DaGVja2JveGVzLmZvckVhY2goIGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCAnY2hhbmdlJywgdGhpcy5jaGVja2JveE9wdGlvbnNIYW5kbGVyICkgKTtcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVBhc3N3b3JkICgpIHtcbiAgICBsZXQgc3RyaW5nTG93ZXJjYXNlID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JyxcbiAgICAgIHN0cmluZ1VwcGVyQ2FzZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWicsXG4gICAgICBudW1lcmljID0gJzAxMjM0NTY3ODknLFxuICAgICAgc3ltYm9scyA9ICchQCMkJV4mKigpXyt+YHx9e1tdOlxcXFw7Pz48LC4vLT0nO1xuXG4gICAgbGV0IGxvd0FuZFVwQ2FzZSA9IHN0cmluZ0xvd2VyY2FzZSArIHN0cmluZ1VwcGVyQ2FzZSxcblxuICAgICAgbnVtZXJpY0FuZExvd2VyQ2FzZSA9IHN0cmluZ0xvd2VyY2FzZSArIG51bWVyaWMsXG4gICAgICBudW1lcmljQW5kVXBwZXJDYXNlID0gc3RyaW5nVXBwZXJDYXNlICsgbnVtZXJpYyxcbiAgICAgIG51bWVyaWNBbmRMb3dBbmRVcENhc2UgPSBsb3dBbmRVcENhc2UgKyBudW1lcmljLFxuXG4gICAgICBzeW1ib2xzQW5kTG93ZXJDYXNlID0gc3RyaW5nTG93ZXJjYXNlICsgc3ltYm9scyxcbiAgICAgIHN5bWJvbHNBbmRVcHBlckNhc2UgPSBzdHJpbmdVcHBlckNhc2UgKyBzeW1ib2xzLFxuICAgICAgc3ltYm9sc0FuZExvd0FuZFVwQ2FzZSA9IGxvd0FuZFVwQ2FzZSArIHN5bWJvbHMsXG5cbiAgICAgIG51bWVyaWNBbmRTeW1ib2xzID0gc3ltYm9scyArIG51bWVyaWMsXG4gICAgICBudW1lcmljQW5kU3ltYm9sc0FuZExvd0Nhc2UgPSBzeW1ib2xzQW5kTG93ZXJDYXNlICsgbnVtZXJpYyxcbiAgICAgIG51bWVyaWNBbmRTeW1ib2xzQW5kVXBDYXNlID0gc3ltYm9sc0FuZFVwcGVyQ2FzZSArIG51bWVyaWMsXG5cbiAgICAgIGFsbENoYXIgPSBzeW1ib2xzQW5kTG93ZXJDYXNlICsgbnVtZXJpY0FuZFN5bWJvbHMsXG5cbiAgICAgIHBhc3N3b3JkID0gJyc7XG5cbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCArdGhpcy4kbGVuZ3RoVmFsOyBpKysgKSB7XG5cbiAgICAgIGlmICggdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgdGhpcy4kb3B0aW9ucy5udW1iZXJzICYmIHRoaXMuJG9wdGlvbnMuc3ltYm9scyAmJiB0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gYWxsQ2hhci5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBhbGxDaGFyLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiAhdGhpcy4kb3B0aW9ucy5zeW1ib2xzICkge1xuICAgICAgICBwYXNzd29yZCArPSBzdHJpbmdVcHBlckNhc2UuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogc3RyaW5nVXBwZXJDYXNlLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiAhdGhpcy4kb3B0aW9ucy5zeW1ib2xzICkge1xuICAgICAgICBwYXNzd29yZCArPSBzdHJpbmdMb3dlcmNhc2UuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogc3RyaW5nTG93ZXJjYXNlLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLm51bWJlcnMgJiYgIXRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5zeW1ib2xzICkge1xuICAgICAgICBwYXNzd29yZCArPSBudW1lcmljLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIG51bWVyaWMubGVuZ3RoICkgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuJG9wdGlvbnMuc3ltYm9scyAmJiAhdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLm51bWJlcnMgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IHN5bWJvbHMuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogc3ltYm9scy5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiAhdGhpcy4kb3B0aW9ucy5zeW1ib2xzICkge1xuICAgICAgICBwYXNzd29yZCArPSBsb3dBbmRVcENhc2UuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogbG93QW5kVXBDYXNlLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLm51bWJlcnMgJiYgdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLnN5bWJvbHMgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IG51bWVyaWNBbmRMb3dlckNhc2UuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogbnVtZXJpY0FuZExvd2VyQ2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5udW1iZXJzICYmIHRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5zeW1ib2xzICkge1xuICAgICAgICBwYXNzd29yZCArPSBudW1lcmljQW5kVXBwZXJDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIG51bWVyaWNBbmRVcHBlckNhc2UubGVuZ3RoICkgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiB0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSAmJiB0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5zeW1ib2xzICkge1xuICAgICAgICBwYXNzd29yZCArPSBudW1lcmljQW5kTG93QW5kVXBDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIG51bWVyaWNBbmRMb3dBbmRVcENhc2UubGVuZ3RoICkgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuJG9wdGlvbnMuc3ltYm9scyAmJiB0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5udW1iZXJzICYmICF0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gc3ltYm9sc0FuZExvd2VyQ2FzZS5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBzeW1ib2xzQW5kTG93ZXJDYXNlLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLnN5bWJvbHMgJiYgdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiAhdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IHN5bWJvbHNBbmRVcHBlckNhc2UuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogc3ltYm9sc0FuZFVwcGVyQ2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5zeW1ib2xzICYmIHRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmIHRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLm51bWJlcnMgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IG51bWVyaWNBbmRTeW1ib2xzLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIG51bWVyaWNBbmRTeW1ib2xzLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLnN5bWJvbHMgJiYgdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubnVtYmVycyApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gc3ltYm9sc0FuZExvd0FuZFVwQ2FzZS5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBzeW1ib2xzQW5kTG93QW5kVXBDYXNlLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLnN5bWJvbHMgJiYgdGhpcy4kb3B0aW9ucy5udW1iZXJzICYmIHRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gbnVtZXJpY0FuZFN5bWJvbHNBbmRMb3dDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIG51bWVyaWNBbmRTeW1ib2xzQW5kTG93Q2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5zeW1ib2xzICYmIHRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiB0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IG51bWVyaWNBbmRTeW1ib2xzQW5kVXBDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIG51bWVyaWNBbmRTeW1ib2xzQW5kVXBDYXNlLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXNzd29yZCArPSBsb3dBbmRVcENhc2UuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogbG93QW5kVXBDYXNlLmxlbmd0aCApICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhc3N3b3JkO1xuICB9XG5cbiAgb25Nb3VzZURvd24gKCBlICkge1xuICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQoIHRoaXMgKTtcbiAgICBsZXQgYm91bmRzID0gdGhpcy4kZG90UmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICBsZXQgY2xpZW50WCA9IGUuY2xpZW50WCAtIGJvdW5kcyAtICggdGhpcy4kZG90V2lkdGggLyAyICk7XG5cbiAgICB0aGlzLiRkb3Quc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIGNsaWVudFggKyAncHgpJztcbiAgICB0aGlzLiRkb3RMaW5lLnN0eWxlLndpZHRoID0gY2xpZW50WCArIDIgKyAncHgnO1xuICAgIHRoaXMubGVuZ3RoVmFsdWVDaGFuZ2UoIHRoaXMuJHJhbmdlV2lkdGgsIGNsaWVudFggKTtcbiAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dC52YWx1ZSA9IHRoaXMuZ2VuZXJhdGVQYXNzd29yZCgpO1xuXG4gICAgaWYgKCBlLnRhcmdldC5jbG9zZXN0KCAnYnV0dG9uW2RhdGEtdHlwZT1cImRvdFwiXScgKSApIHtcbiAgICAgIHRoaXMuJGRvdC5jbGFzc0xpc3QuYWRkKCAnYWN0aXZlJyApO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUgKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlVXAgKCkge1xuICAgIHRoaXMuJGRvdC5jbGFzc0xpc3QucmVtb3ZlKCAnYWN0aXZlJyApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlICk7XG4gIH1cblxuICBpbnB1dExlbmd0aFZhbHVlSGFuZGxlciAoIGUgKSB7XG4gICAgdGhpcy4kbGVuZ3RoVmFsID0gK2UudGFyZ2V0LnZhbHVlO1xuICAgIGxldCB2YWx1ZSA9IE1hdGguZmxvb3IoICggKCArdGhpcy4kbGVuZ3RoVmFsICogMTAwIC8gK3RoaXMuJGxlbmd0aE1heCApICogK3RoaXMuJHJhbmdlV2lkdGggKSAvIDEwMCApO1xuICAgIGNvbnNvbGUubG9nKCB2YWx1ZSApO1xuXG4gICAgaWYgKCAoIHZhbHVlICsgdGhpcy4kZG90V2lkdGggKSA+PSB0aGlzLiRyYW5nZVdpZHRoICkge1xuICAgICAgdGhpcy4kZG90LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAoIHZhbHVlIC0gKCB0aGlzLiRkb3RXaWR0aCAvIDIgKSApICsgJ3B4KSc7XG4gICAgICB0aGlzLiRkb3RMaW5lLnN0eWxlLndpZHRoID0gKCB0aGlzLiRyYW5nZVdpZHRoIC0gdGhpcy4kZG90V2lkdGggLyAyICsgMiApICsgJ3B4JztcbiAgICAgIHRoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gdGhpcy5nZW5lcmF0ZVBhc3N3b3JkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4kZG90LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyB2YWx1ZSArICdweCknO1xuICAgIHRoaXMuJGRvdExpbmUuc3R5bGUud2lkdGggPSB2YWx1ZSArIDIgKyAncHgnO1xuICAgIHRoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gdGhpcy5nZW5lcmF0ZVBhc3N3b3JkKCk7XG4gIH1cblxuICBsZW5ndGhWYWx1ZUNoYW5nZSAoIHJhbmdlV2lkdGgsIGNsaWVudFggKSB7XG4gICAgbGV0IHBlcmNlbnQgPSBNYXRoLmZsb29yKCAoIGNsaWVudFggKiAxMDAgKSAvIHJhbmdlV2lkdGggKTtcbiAgICB0aGlzLiRsZW5ndGhWYWwgPSBNYXRoLmZsb29yKCAoIHRoaXMuJGxlbmd0aE1heCAqIHBlcmNlbnQgKSAvIDEwMCApO1xuXG4gICAgaWYgKCB0aGlzLiRsZW5ndGhWYWwgPj0gdGhpcy4kbGVuZ3RoTWF4ICkge1xuICAgICAgdGhpcy4kbGVuZ3RoSW5wdXQudmFsdWUgPSB0aGlzLiRsZW5ndGhNYXg7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCB0aGlzLiRsZW5ndGhWYWwgPD0gMCApIHtcbiAgICAgIHRoaXMuJGxlbmd0aElucHV0LnZhbHVlID0gdGhpcy4kbGVuZ3RoTWluO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuJGxlbmd0aElucHV0LnZhbHVlID0gdGhpcy4kbGVuZ3RoVmFsO1xuICB9XG5cbiAgb25Nb3VzZU1vdmUgKCBlICkge1xuICAgIGxldCBib3VuZHMgPSB0aGlzLiRkb3RSYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIGxldCBjbGllbnRYID0gZS5jbGllbnRYIC0gYm91bmRzIC0gKCB0aGlzLiRkb3RXaWR0aCAvIDIgKTtcblxuICAgIGlmICggKCBjbGllbnRYICsgdGhpcy4kZG90V2lkdGggKSA+PSB0aGlzLiRyYW5nZVdpZHRoICkge1xuICAgICAgdGhpcy4kZG90LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAoIHRoaXMuJHJhbmdlV2lkdGggLSB0aGlzLiRkb3RXaWR0aCAvIDIgKSArICdweCknO1xuICAgICAgdGhpcy4kZG90TGluZS5zdHlsZS53aWR0aCA9IHRoaXMuJHJhbmdlV2lkdGggKyAncHgnO1xuICAgICAgdGhpcy5sZW5ndGhWYWx1ZUNoYW5nZSggdGhpcy4kcmFuZ2VXaWR0aCwgY2xpZW50WCApO1xuICAgICAgdGhpcy4kZ2VuZXJhdGVkSW5wdXQudmFsdWUgPSB0aGlzLmdlbmVyYXRlUGFzc3dvcmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIGNsaWVudFggPD0gMCApIHtcbiAgICAgIGNsaWVudFggPSAwO1xuICAgICAgdGhpcy4kZG90LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAoIGNsaWVudFggLSAoIHRoaXMuJGRvdFdpZHRoIC8gMiApICkgKyAncHgpJztcbiAgICAgIHRoaXMuJGRvdExpbmUuc3R5bGUud2lkdGggPSBjbGllbnRYICsgMiArICdweCc7XG4gICAgICB0aGlzLmxlbmd0aFZhbHVlQ2hhbmdlKCB0aGlzLiRyYW5nZVdpZHRoLCBjbGllbnRYICk7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dC52YWx1ZSA9IHRoaXMuZ2VuZXJhdGVQYXNzd29yZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuJGRvdC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgY2xpZW50WCArICdweCknO1xuICAgIHRoaXMuJGRvdExpbmUuc3R5bGUud2lkdGggPSBjbGllbnRYICsgMiArICdweCc7XG4gICAgdGhpcy5sZW5ndGhWYWx1ZUNoYW5nZSggdGhpcy4kcmFuZ2VXaWR0aCwgY2xpZW50WCApO1xuICAgIHRoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gdGhpcy5nZW5lcmF0ZVBhc3N3b3JkKCk7XG4gIH1cblxuICAjY2hlY2tlckNoZWNrYm94ZXMgKCB0eXBlLCBjaGVja2VkICkge1xuICAgIGlmICggdHlwZSApIHtcbiAgICAgIHRoaXMuJG9wdGlvbnNbIHR5cGUgXSA9IGNoZWNrZWQ7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tib3hPcHRpb25zSGFuZGxlciAoIGUgKSB7XG4gICAgY29uc3QgeyB0eXBlIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xuICAgIGxldCBjaGVja2VkID0gZS50YXJnZXQuY2hlY2tlZDtcblxuICAgIHRoaXMuI2NoZWNrZXJDaGVja2JveGVzKCB0eXBlLCBjaGVja2VkICk7XG4gICAgdGhpcy4kZ2VuZXJhdGVkSW5wdXQudmFsdWUgPSB0aGlzLmdlbmVyYXRlUGFzc3dvcmQoKTtcbiAgfVxuXG4gIGdldFRlbXBsYXRlICgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImF3cGctd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1jb250ZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxoMj5HZW5lcmF0ZSBhIHNlY3VyZSBwYXNzd29yZDwvaDI+XG4gICAgICAgICAgICAgIDxwPkNyZWF0ZSBhIHNlY3VyZSwgcmFuZG9tIGFuZCByZWFsbHkgdW5pcSBwYXNzd29yZDwvcD5cbiAgICAgICAgICA8L2Rpdj4gICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLXZhbHVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLXZhbHVlX193cmFwXCI+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlYWRvbmx5IGRhdGEtdHlwZT1cImdlbi12YWx1ZVwiPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy12YWx1ZV9fYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYXdwZy12YWx1ZV9fYnV0dG9ucy0tY29weVwiIGRhdGEtdHlwZT1cImNvcHlcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImF3cGctdmFsdWVfX2J1dHRvbnMtLXJlcmVuZGVyXCIgZGF0YS10eXBlPVwicmVyZW5kZXJcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy12YWx1ZV9fc3RyZW5ndGhcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF3cGctdmFsdWVfX3N0cmVuZ3RoLWZpbGxcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctb3B0aW9uc19fdmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBkYXRhLXR5cGU9XCJ2YWwtbnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIjUwXCIgdmFsdWU9XCIzXCI+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLXJhbmdlX193cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXdwZy1yYW5nZV9fbGFiZWxcIiBhcmlhLWxhYmVsPVwiUGFzc3dvcmQgbGVuZ3RoXCI+UGFzc3dvcmQgbGVuZ3RoOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLXJhbmdlXCIgZGF0YS10eXBlPVwiZG90LXJhbmdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1yYW5nZV9fbGluZVwiIGRhdGEtdHlwZT1cImRvdC1saW5lXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYXdwZy1yYW5nZV9fZG90XCIgZGF0YS10eXBlPVwiZG90XCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctb3B0aW9uc19fY2hlY2tib3hlc1wiIGRhdGEtdHlwZT1cIm9wdGlvbnMtY2hlY2tib3hlc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNfX2NoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrYm94X3VwcGVyY2FzZVwiIHR5cGU9XCJjaGVja2JveFwiIGRhdGEtdHlwZT1cInVwcGVyY2FzZVwiIHZhbHVlPVwieWVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveF91cHBlcmNhc2VcIj5VcHBlcmNhc2U8L2xhYmVsPiBcblxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICBcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctb3B0aW9uc19fY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2tib3hfbG93ZXJjYXNlXCIgdHlwZT1cImNoZWNrYm94XCIgZGF0YS10eXBlPVwibG93ZXJjYXNlXCIgdmFsdWU9XCJ5ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrYm94X2xvd2VyY2FzZVwiPkxvd2VyY2FzZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNfX2NoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrYm94X251bWJlcnNcIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLXR5cGU9XCJudW1iZXJzXCIgdmFsdWU9XCJ5ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrYm94X251bWJlcnNcIj5OdW1iZXJzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1vcHRpb25zX19jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVja2JveF9zeW1ib2xzXCIgdHlwZT1cImNoZWNrYm94XCIgZGF0YS10eXBlPVwic3ltYm9sc1wiIHZhbHVlPVwieWVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveF9zeW1ib2xzXCI+U3ltYm9sczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cbiJdLCJmaWxlIjoiYXdha2VQYXNzR2VuLmpzIn0=
