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
      }

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

      this.$optionCheckboxes.forEach(item => item.addEventListener('change', this.checkboxOptionsHandler));
    }
  }

  generatePassword() {
    let length = this.$lengthVal,
    string = "abcdefghijklmnopqrstuvwxyz", //to upper
    numeric = '0123456789',
    symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=',
    retVal = "";

    console.log(length);
    for (let i = 0, n = string.length; i < length; ++i) {
      if (this.$options.uppercase) {
        retVal += string.charAt(Math.floor(Math.random() * n)).toUpperCase();
      }else {
        retVal += string.charAt(Math.floor(Math.random() * n));
      }
    }
    return retVal;
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

  #checkerCheckboxes(type, checked) {
    if ( type ) {
      this.$options[type] = checked
    }
  }

  checkboxOptionsHandler(e) {
    const {type} = e.target.dataset;
    let checked = e.target.checked;

    this.#checkerCheckboxes(type, checked)
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhd2FrZVBhc3NHZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXdha2VQYXNzR2VuIHtcbiAgY29uc3RydWN0b3IgKCBzZWxlY3RvciApIHtcbiAgICB0aGlzLiRibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHNlbGVjdG9yICk7XG5cbiAgICBpZiAoIHRoaXMuJGJsb2NrICkge1xuICAgICAgdGhpcy4kcGFzc3dvcmRTdHJlbmd0aCA9IG51bGw7XG4gICAgICB0aGlzLiRkb3QgPSBudWxsO1xuICAgICAgdGhpcy4kb3B0aW9uQ2hlY2tib3hlcyA9IG51bGw7XG4gICAgICB0aGlzLiRsZW5ndGhJbnB1dCA9IG51bGw7XG4gICAgICB0aGlzLiRsZW5ndGhWYWwgPSAxO1xuICAgICAgdGhpcy4kbGVuZ3RoTWF4ID0gNTA7XG4gICAgICB0aGlzLiRsZW5ndGhNaW4gPSAxO1xuICAgICAgdGhpcy4kcmFuZ2VXaWR0aCA9IDEwMDtcbiAgICAgIHRoaXMuJGRvdFdpZHRoID0gMTU7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dCA9IG51bGw7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRQYXNzID0gbnVsbDtcblxuICAgICAgdGhpcy4kb3B0aW9ucyA9IHtcbiAgICAgICAgdXBwZXJjYXNlOiBmYWxzZSxcbiAgICAgICAgbG93ZXJjYXNlOiBmYWxzZSxcbiAgICAgICAgbnVtYmVyczogZmFsc2UsXG4gICAgICAgIHN5bWJvbHM6IGZhbHNlLFxuICAgICAgfVxuXG4gICAgICB0aGlzLiNpbml0KCk7XG4gICAgfVxuICB9XG5cbiAgI2luaXQgKCkge1xuICAgIHRoaXMuJGJsb2NrLmlubmVySFRNTCA9IHRoaXMuZ2V0VGVtcGxhdGUoKTtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgc2V0VGltZW91dCggZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuJGxlbmd0aElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2lucHV0W2RhdGEtdHlwZT1cInZhbC1udW1iZXJcIl0nICk7XG4gICAgICBfdGhpcy4kZ2VuZXJhdGVkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnaW5wdXRbZGF0YS10eXBlPVwiZ2VuLXZhbHVlXCJdJyApO1xuICAgICAgX3RoaXMuJGRvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdidXR0b25bZGF0YS10eXBlPVwiZG90XCJdJyApO1xuICAgICAgX3RoaXMuJGRvdFJhbmdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2RpdltkYXRhLXR5cGU9XCJkb3QtcmFuZ2VcIl0nICk7XG4gICAgICBfdGhpcy4kZG90TGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdkaXZbZGF0YS10eXBlPVwiZG90LWxpbmVcIl0nICk7XG4gICAgICBfdGhpcy4kb3B0aW9uQ2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICdkaXZbZGF0YS10eXBlPVwib3B0aW9ucy1jaGVja2JveGVzXCJdIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScgKTtcblxuICAgICAgaWYgKCBfdGhpcy4kZG90ICYmIF90aGlzLiRkb3RSYW5nZSAmJiBfdGhpcy4kZG90TGluZSAmJiBfdGhpcy4kbGVuZ3RoSW5wdXQgJiYgX3RoaXMuJGdlbmVyYXRlZElucHV0ICkge1xuICAgICAgICBfdGhpcy4kbGVuZ3RoVmFsID0gX3RoaXMuJGxlbmd0aElucHV0LnZhbHVlO1xuICAgICAgICBfdGhpcy4kZ2VuZXJhdGVkSW5wdXQudmFsdWUgPSBfdGhpcy5nZW5lcmF0ZVBhc3N3b3JkKCk7XG4gICAgICAgIF90aGlzLiRsZW5ndGhNYXggPSArX3RoaXMuJGxlbmd0aElucHV0LmdldEF0dHJpYnV0ZSggJ21heCcgKSA/PyA1MDtcbiAgICAgICAgX3RoaXMuJGxlbmd0aE1pbiA9ICtfdGhpcy4kbGVuZ3RoSW5wdXQuZ2V0QXR0cmlidXRlKCAnbWluJyApID8/IDE7XG4gICAgICAgIF90aGlzLiRyYW5nZVdpZHRoID0gX3RoaXMuJGRvdFJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBfdGhpcy4kZG90V2lkdGggPSBfdGhpcy4kZG90LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCBfdGhpcy4kcmFuZ2VXaWR0aCApO1xuXG4gICAgICB9XG5cbiAgICAgIF90aGlzLiNhc3NpZ24oKTtcbiAgICB9LCA1MCApO1xuICB9XG5cbiAgI2Fzc2lnbiAoKSB7XG5cbiAgICBpZiAoIHRoaXMuJGRvdCAmJiB0aGlzLiRkb3RSYW5nZSAmJiB0aGlzLiRsZW5ndGhJbnB1dCApIHtcbiAgICAgIHRoaXMuaW5wdXRMZW5ndGhWYWx1ZUhhbmRsZXIgPSB0aGlzLmlucHV0TGVuZ3RoVmFsdWVIYW5kbGVyLmJpbmQoIHRoaXMgKTtcbiAgICAgIHRoaXMub25Nb3VzZURvd24gPSB0aGlzLm9uTW91c2VEb3duLmJpbmQoIHRoaXMgKTtcbiAgICAgIHRoaXMub25Nb3VzZVVwID0gdGhpcy5vbk1vdXNlVXAuYmluZCggdGhpcyApO1xuICAgICAgdGhpcy5jaGVja2JveE9wdGlvbnNIYW5kbGVyID0gdGhpcy5jaGVja2JveE9wdGlvbnNIYW5kbGVyLmJpbmQoIHRoaXMgKTtcblxuICAgICAgdGhpcy4kbGVuZ3RoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lciggJ2NoYW5nZScsIHRoaXMuaW5wdXRMZW5ndGhWYWx1ZUhhbmRsZXIgKTtcbiAgICAgIHRoaXMuJGRvdFJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duICk7XG4gICAgICB0aGlzLiRkb3RSYW5nZS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwICk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwICk7XG5cbiAgICAgIHRoaXMuJG9wdGlvbkNoZWNrYm94ZXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGVja2JveE9wdGlvbnNIYW5kbGVyKSk7XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVQYXNzd29yZCgpIHtcbiAgICBsZXQgbGVuZ3RoID0gdGhpcy4kbGVuZ3RoVmFsLFxuICAgIHN0cmluZyA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIiwgLy90byB1cHBlclxuICAgIG51bWVyaWMgPSAnMDEyMzQ1Njc4OScsXG4gICAgc3ltYm9scyA9ICchQCMkJV4mKigpXyt+YHx9e1tdXFw6Oz8+PCwuLy09JyxcbiAgICByZXRWYWwgPSBcIlwiO1xuXG4gICAgY29uc29sZS5sb2cobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHN0cmluZy5sZW5ndGg7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHRoaXMuJG9wdGlvbnMudXBwZXJjYXNlKSB7XG4gICAgICAgIHJldFZhbCArPSBzdHJpbmcuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG4pKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgfWVsc2Uge1xuICAgICAgICByZXRWYWwgKz0gc3RyaW5nLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBvbk1vdXNlRG93biAoIGUgKSB7XG4gICAgdGhpcy5vbk1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApO1xuICAgIGxldCBib3VuZHMgPSB0aGlzLiRkb3RSYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIGxldCBjbGllbnRYID0gZS5jbGllbnRYIC0gYm91bmRzIC0gKCB0aGlzLiRkb3RXaWR0aCAvIDIgKTtcblxuICAgIHRoaXMuJGRvdC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgY2xpZW50WCArICdweCknO1xuICAgIHRoaXMuJGRvdExpbmUuc3R5bGUud2lkdGggPSBjbGllbnRYICsgMiArICdweCc7XG4gICAgdGhpcy5sZW5ndGhWYWx1ZUNoYW5nZSggdGhpcy4kcmFuZ2VXaWR0aCwgY2xpZW50WCApO1xuICAgIHRoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gdGhpcy5nZW5lcmF0ZVBhc3N3b3JkKCk7XG5cbiAgICBpZiAoIGUudGFyZ2V0LmNsb3Nlc3QoICdidXR0b25bZGF0YS10eXBlPVwiZG90XCJdJyApICkge1xuICAgICAgdGhpcy4kZG90LmNsYXNzTGlzdC5hZGQoICdhY3RpdmUnICk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSApO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VVcCAoKSB7XG4gICAgdGhpcy4kZG90LmNsYXNzTGlzdC5yZW1vdmUoICdhY3RpdmUnICk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUgKTtcbiAgfVxuXG4gIGlucHV0TGVuZ3RoVmFsdWVIYW5kbGVyICggZSApIHtcbiAgICB0aGlzLiRsZW5ndGhWYWwgPSArZS50YXJnZXQudmFsdWU7XG4gICAgbGV0IHZhbHVlID0gTWF0aC5mbG9vciggKCAoICt0aGlzLiRsZW5ndGhWYWwgKiAxMDAgLyArdGhpcy4kbGVuZ3RoTWF4ICkgKiArdGhpcy4kcmFuZ2VXaWR0aCApIC8gMTAwICk7XG4gICAgY29uc29sZS5sb2coIHZhbHVlICk7XG5cbiAgICBpZiAoICggdmFsdWUgKyB0aGlzLiRkb3RXaWR0aCApID49IHRoaXMuJHJhbmdlV2lkdGggKSB7XG4gICAgICB0aGlzLiRkb3Quc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArICggdmFsdWUgLSAoIHRoaXMuJGRvdFdpZHRoIC8gMiApICkgKyAncHgpJztcbiAgICAgIHRoaXMuJGRvdExpbmUuc3R5bGUud2lkdGggPSAoIHRoaXMuJHJhbmdlV2lkdGggLSB0aGlzLiRkb3RXaWR0aCAvIDIgKyAyICkgKyAncHgnO1xuICAgICAgdGhpcy4kZ2VuZXJhdGVkSW5wdXQudmFsdWUgPSB0aGlzLmdlbmVyYXRlUGFzc3dvcmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiRkb3Quc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIHZhbHVlICsgJ3B4KSc7XG4gICAgdGhpcy4kZG90TGluZS5zdHlsZS53aWR0aCA9IHZhbHVlICsgMiArICdweCc7XG4gICAgdGhpcy4kZ2VuZXJhdGVkSW5wdXQudmFsdWUgPSB0aGlzLmdlbmVyYXRlUGFzc3dvcmQoKTtcbiAgfVxuXG4gIGxlbmd0aFZhbHVlQ2hhbmdlICggcmFuZ2VXaWR0aCwgY2xpZW50WCApIHtcbiAgICBsZXQgcGVyY2VudCA9IE1hdGguZmxvb3IoICggY2xpZW50WCAqIDEwMCApIC8gcmFuZ2VXaWR0aCApO1xuICAgIHRoaXMuJGxlbmd0aFZhbCA9IE1hdGguZmxvb3IoICggdGhpcy4kbGVuZ3RoTWF4ICogcGVyY2VudCApIC8gMTAwICk7XG5cbiAgICBpZiAoIHRoaXMuJGxlbmd0aFZhbCA+PSB0aGlzLiRsZW5ndGhNYXggKSB7XG4gICAgICB0aGlzLiRsZW5ndGhJbnB1dC52YWx1ZSA9IHRoaXMuJGxlbmd0aE1heDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIHRoaXMuJGxlbmd0aFZhbCA8PSAwICkge1xuICAgICAgdGhpcy4kbGVuZ3RoSW5wdXQudmFsdWUgPSB0aGlzLiRsZW5ndGhNaW47XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4kbGVuZ3RoSW5wdXQudmFsdWUgPSB0aGlzLiRsZW5ndGhWYWw7XG4gIH1cblxuICBvbk1vdXNlTW92ZSAoIGUgKSB7XG4gICAgbGV0IGJvdW5kcyA9IHRoaXMuJGRvdFJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgbGV0IGNsaWVudFggPSBlLmNsaWVudFggLSBib3VuZHMgLSAoIHRoaXMuJGRvdFdpZHRoIC8gMiApO1xuXG4gICAgaWYgKCAoIGNsaWVudFggKyB0aGlzLiRkb3RXaWR0aCApID49IHRoaXMuJHJhbmdlV2lkdGggKSB7XG4gICAgICB0aGlzLiRkb3Quc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArICggdGhpcy4kcmFuZ2VXaWR0aCAtIHRoaXMuJGRvdFdpZHRoIC8gMiApICsgJ3B4KSc7XG4gICAgICB0aGlzLiRkb3RMaW5lLnN0eWxlLndpZHRoID0gdGhpcy4kcmFuZ2VXaWR0aCArICdweCc7XG4gICAgICB0aGlzLmxlbmd0aFZhbHVlQ2hhbmdlKCB0aGlzLiRyYW5nZVdpZHRoLCBjbGllbnRYICk7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dC52YWx1ZSA9IHRoaXMuZ2VuZXJhdGVQYXNzd29yZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICggY2xpZW50WCA8PSAwICkge1xuICAgICAgY2xpZW50WCA9IDA7XG4gICAgICB0aGlzLiRkb3Quc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArICggY2xpZW50WCAtICggdGhpcy4kZG90V2lkdGggLyAyICkgKSArICdweCknO1xuICAgICAgdGhpcy4kZG90TGluZS5zdHlsZS53aWR0aCA9IGNsaWVudFggKyAyICsgJ3B4JztcbiAgICAgIHRoaXMubGVuZ3RoVmFsdWVDaGFuZ2UoIHRoaXMuJHJhbmdlV2lkdGgsIGNsaWVudFggKTtcbiAgICAgIHRoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gdGhpcy5nZW5lcmF0ZVBhc3N3b3JkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4kZG90LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBjbGllbnRYICsgJ3B4KSc7XG4gICAgdGhpcy4kZG90TGluZS5zdHlsZS53aWR0aCA9IGNsaWVudFggKyAyICsgJ3B4JztcbiAgICB0aGlzLmxlbmd0aFZhbHVlQ2hhbmdlKCB0aGlzLiRyYW5nZVdpZHRoLCBjbGllbnRYICk7XG4gICAgdGhpcy4kZ2VuZXJhdGVkSW5wdXQudmFsdWUgPSB0aGlzLmdlbmVyYXRlUGFzc3dvcmQoKTtcbiAgfVxuXG4gICNjaGVja2VyQ2hlY2tib3hlcyh0eXBlLCBjaGVja2VkKSB7XG4gICAgaWYgKCB0eXBlICkge1xuICAgICAgdGhpcy4kb3B0aW9uc1t0eXBlXSA9IGNoZWNrZWRcbiAgICB9XG4gIH1cblxuICBjaGVja2JveE9wdGlvbnNIYW5kbGVyKGUpIHtcbiAgICBjb25zdCB7dHlwZX0gPSBlLnRhcmdldC5kYXRhc2V0O1xuICAgIGxldCBjaGVja2VkID0gZS50YXJnZXQuY2hlY2tlZDtcblxuICAgIHRoaXMuI2NoZWNrZXJDaGVja2JveGVzKHR5cGUsIGNoZWNrZWQpXG4gIH1cblxuICBnZXRUZW1wbGF0ZSAoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8aDI+R2VuZXJhdGUgYSBzZWN1cmUgcGFzc3dvcmQ8L2gyPlxuICAgICAgICAgICAgICA8cD5DcmVhdGUgYSBzZWN1cmUsIHJhbmRvbSBhbmQgcmVhbGx5IHVuaXEgcGFzc3dvcmQ8L3A+XG4gICAgICAgICAgPC9kaXY+ICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy12YWx1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy12YWx1ZV9fd3JhcFwiPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWFkb25seSBkYXRhLXR5cGU9XCJnZW4tdmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctdmFsdWVfX2J1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImF3cGctdmFsdWVfX2J1dHRvbnMtLWNvcHlcIiBkYXRhLXR5cGU9XCJjb3B5XCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhd3BnLXZhbHVlX19idXR0b25zLS1yZXJlbmRlclwiIGRhdGEtdHlwZT1cInJlcmVuZGVyXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctdmFsdWVfX3N0cmVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhd3BnLXZhbHVlX19zdHJlbmd0aC1maWxsXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1vcHRpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNfX3ZhbHVlXCI+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgZGF0YS10eXBlPVwidmFsLW51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCI1MFwiIHZhbHVlPVwiM1wiPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1yYW5nZV9fd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF3cGctcmFuZ2VfX2xhYmVsXCIgYXJpYS1sYWJlbD1cIlBhc3N3b3JkIGxlbmd0aFwiPlBhc3N3b3JkIGxlbmd0aDo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1yYW5nZVwiIGRhdGEtdHlwZT1cImRvdC1yYW5nZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctcmFuZ2VfX2xpbmVcIiBkYXRhLXR5cGU9XCJkb3QtbGluZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImF3cGctcmFuZ2VfX2RvdFwiIGRhdGEtdHlwZT1cImRvdFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNfX2NoZWNrYm94ZXNcIiBkYXRhLXR5cGU9XCJvcHRpb25zLWNoZWNrYm94ZXNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1vcHRpb25zX19jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVja2JveF91cHBlcmNhc2VcIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLXR5cGU9XCJ1cHBlcmNhc2VcIiB2YWx1ZT1cInllc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2tib3hfdXBwZXJjYXNlXCI+VXBwZXJjYXNlPC9sYWJlbD4gXG5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNfX2NoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrYm94X2xvd2VyY2FzZVwiIHR5cGU9XCJjaGVja2JveFwiIGRhdGEtdHlwZT1cImxvd2VyY2FzZVwiIHZhbHVlPVwieWVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveF9sb3dlcmNhc2VcIj5Mb3dlcmNhc2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1vcHRpb25zX19jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVja2JveF9udW1iZXJzXCIgdHlwZT1cImNoZWNrYm94XCIgZGF0YS10eXBlPVwibnVtYmVyc1wiIHZhbHVlPVwieWVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveF9udW1iZXJzXCI+TnVtYmVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctb3B0aW9uc19fY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2tib3hfc3ltYm9sc1wiIHR5cGU9XCJjaGVja2JveFwiIGRhdGEtdHlwZT1cInN5bWJvbHNcIiB2YWx1ZT1cInllc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2tib3hfc3ltYm9sc1wiPlN5bWJvbHM8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG4iXSwiZmlsZSI6ImF3YWtlUGFzc0dlbi5qcyJ9
